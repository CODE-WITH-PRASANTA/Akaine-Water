const Route = require('../models/Route');

// @desc    Get Current Active Route and Stops
// @route   GET /api/routes/active
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
// @route   POST /api/routes
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
// @route   POST /api/routes/add-stop
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
// @route   DELETE /api/routes/stop/:stopId
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