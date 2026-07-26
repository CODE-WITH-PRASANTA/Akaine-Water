const { Route, RouteAssignment } = require("../models/Route");

/* ===========================================================
   SECTION A — ROUTE / STOPS  (left map panel)
=========================================================== */

// @desc    Get Current Active Route and Stops
// @route   GET /api/routeRoutes/active
exports.getActiveRoute = async (req, res) => {
  try {
    let route = await Route.findOne({ isActive: true }).sort({ updatedAt: -1 });

    // Return default initial stops if DB is empty
    if (!route) {
      route = await Route.create({
        title: 'Bhubaneswar Active Route',
        hubCoords: [20.3050, 85.8280],
        stops: [
          { id: 1, name: 'Patia', distance: 2.1, coords: [20.3540, 85.8330] },
          { id: 2, name: 'KIIT Square', distance: 3.4, coords: [20.3510, 85.8180] },
          { id: 3, name: 'Sailashree Vihar', distance: 2.8, coords: [20.3390, 85.8150] },
          { id: 4, name: 'Chandrasekharpur', distance: 3.2, coords: [20.3250, 85.8180] }
        ],
        totalDistance: 11.5,
        estimatedTime: '1h 8m'
      });
    }

    res.status(200).json({ success: true, data: route });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Post / Save Entire Route State
// @route   POST /api/routeRoutes
exports.postRoute = async (req, res) => {
  try {
    const { stops, totalDistance, estimatedTime, hubCoords } = req.body;

    // Deactivate old routes
    await Route.updateMany({}, { isActive: false });

    const newRoute = await Route.create({
      stops,
      totalDistance,
      estimatedTime,
      hubCoords: hubCoords || [20.3050, 85.8280],
      isActive: true
    });

    res.status(201).json({ success: true, data: newRoute });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Post/Add Single New Stop
// @route   POST /api/routeRoutes/add-stop
exports.addStop = async (req, res) => {
  try {
    const { name, distance, coords } = req.body;

    let route = await Route.findOne({ isActive: true });
    if (!route) {
      route = new Route({ stops: [], hubCoords: [20.3050, 85.8280] });
    }

    const newStop = {
      id: Date.now(),
      name,
      distance: parseFloat(distance),
      coords
    };

    route.stops.push(newStop);

    // Calculate metrics dynamically
    route.totalDistance = route.stops.reduce((sum, s) => sum + s.distance, 0);
    const totalMinutes = Math.round(route.stops.length * 8 + route.totalDistance * 3.2);
    const hrs = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    route.estimatedTime = hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;

    await route.save();

    res.status(200).json({ success: true, data: route });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete Stop by ID
// @route   DELETE /api/routeRoutes/stop/:stopId
exports.deleteStop = async (req, res) => {
  try {
    const { stopId } = req.params;
    let route = await Route.findOne({ isActive: true });

    if (!route) {
      return res.status(404).json({ success: false, message: 'Route not found' });
    }

    route.stops = route.stops.filter((s) => s.id !== parseInt(stopId));
    route.totalDistance = route.stops.reduce((sum, s) => sum + s.distance, 0);

    const totalMinutes = Math.round(route.stops.length * 8 + route.totalDistance * 3.2);
    const hrs = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    route.estimatedTime = hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;

    await route.save();
    res.status(200).json({ success: true, data: route });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/* ===========================================================
   SECTION B — ROUTE ASSIGNMENT DIRECTORY  (right table)
   This is the piece that was missing: the "Add New Entry" form
   was only ever written to local React state, so the table
   showed stop-derived placeholder rows instead of real submitted
   entries. These endpoints persist real entries to MongoDB.
=========================================================== */

// @desc    Get all Route Assignment Directory entries
// @route   GET /api/routeRoutes/assignments
exports.getAssignments = async (req, res) => {
  try {
    const assignments = await RouteAssignment.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: assignments.length, data: assignments });
  } catch (error) {
    console.error('getAssignments error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new Route Assignment Directory entry
// @route   POST /api/routeRoutes/assignments
exports.createAssignment = async (req, res) => {
  try {
    const { date, name, order, locations, vehicleNo, vehicle, image } = req.body;

    if (!date || !name || !order || !vehicleNo || !vehicle) {
      console.log('createAssignment rejected — received body:', {
        date, name, order, locations, vehicleNo, vehicle, hasImage: !!image
      });
      return res.status(400).json({
        success: false,
        message: `Missing required field(s): ${[
          !date && 'date',
          !name && 'name',
          !order && 'order',
          !vehicleNo && 'vehicleNo',
          !vehicle && 'vehicle'
        ].filter(Boolean).join(', ')}`
      });
    }

    const newAssignment = await RouteAssignment.create({
      date,
      name,
      order,
      locations: Array.isArray(locations) && locations.length ? locations : ['General Location'],
      vehicleNo,
      vehicle,
      image: image || ''
    });

    res.status(201).json({ success: true, data: newAssignment });
  } catch (error) {
    console.error('createAssignment error:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update a Route Assignment Directory entry
// @route   PUT /api/routeRoutes/assignments/:id
exports.updateAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, name, order, locations, vehicleNo, vehicle, image } = req.body;

    const existing = await RouteAssignment.findById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }

    existing.date = date ?? existing.date;
    existing.name = name ?? existing.name;
    existing.order = order ?? existing.order;
    existing.locations = Array.isArray(locations) ? locations : existing.locations;
    existing.vehicleNo = vehicleNo ?? existing.vehicleNo;
    existing.vehicle = vehicle ?? existing.vehicle;
    if (image) existing.image = image; // only overwrite if a new image was sent

    const updated = await existing.save();
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error('updateAssignment error:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete a Route Assignment Directory entry
// @route   DELETE /api/routeRoutes/assignments/:id
exports.deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await RouteAssignment.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }

    res.status(200).json({ success: true, message: 'Record deleted', data: deleted });
  } catch (error) {
    console.error('deleteAssignment error:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};