const DamagedStock = require("../models/DamagedStock");

// =========================================
// CREATE DAMAGED STOCK
// =========================================
exports.createDamagedStock = async (req, res) => {
  try {
    console.log("========== DAMAGE REQUEST ==========");
    console.log(req.body);
    console.log("====================================");

    let {
      product,
      category,
      volumes,
      selectedVolume,

      // New UI
      broken,
      leakage,
      lost,
      customerDamage,

      // Old UI
      broken20L,
      broken10L,
      broken5L,
      broken1L,

      leakage20L,
      leakage10L,
      leakage5L,
      leakage1L,

      lost20L,
      lost10L,
      lost5L,
      lost1L,

      customerDamage20L,
      customerDamage10L,
      customerDamage5L,
      customerDamage1L,
    } = req.body;

    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product is required",
      });
    }

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    if (!volumes || !Array.isArray(volumes)) {
      volumes = ["20L", "10L", "5L", "1L"];
    }

    // Support new frontend
    if (selectedVolume) {
      switch (selectedVolume) {
        case "20L":
          broken20L = broken;
          leakage20L = leakage;
          lost20L = lost;
          customerDamage20L = customerDamage;
          break;

        case "10L":
          broken10L = broken;
          leakage10L = leakage;
          lost10L = lost;
          customerDamage10L = customerDamage;
          break;

        case "5L":
          broken5L = broken;
          leakage5L = leakage;
          lost5L = lost;
          customerDamage5L = customerDamage;
          break;

        case "1L":
          broken1L = broken;
          leakage1L = leakage;
          lost1L = lost;
          customerDamage1L = customerDamage;
          break;
      }
    }

    const damagedStock = await DamagedStock.create({
      product,
      category,
      volumes,

      broken: {
        v20L: Number(broken20L) || 0,
        v10L: Number(broken10L) || 0,
        v5L: Number(broken5L) || 0,
        v1L: Number(broken1L) || 0,
      },

      leakage: {
        v20L: Number(leakage20L) || 0,
        v10L: Number(leakage10L) || 0,
        v5L: Number(leakage5L) || 0,
        v1L: Number(leakage1L) || 0,
      },

      lost: {
        v20L: Number(lost20L) || 0,
        v10L: Number(lost10L) || 0,
        v5L: Number(lost5L) || 0,
        v1L: Number(lost1L) || 0,
      },

      customerDamage: {
        v20L: Number(customerDamage20L) || 0,
        v10L: Number(customerDamage10L) || 0,
        v5L: Number(customerDamage5L) || 0,
        v1L: Number(customerDamage1L) || 0,
      },
    });

    res.status(201).json({
      success: true,
      message: "Damaged stock saved successfully",
      data: damagedStock,
    });
  } catch (error) {
    console.error("Create Damage Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================================
// GET DAMAGE SUMMARY
// =========================================
exports.getDamagedStockSummary = async (req, res) => {
  try {
    const { product, category } = req.query;

    const filter = {};

    if (product) filter.product = product;
    if (category) filter.category = category;

    const records = await DamagedStock.find(filter);

    const summary = {
      Broken: { v20L: 0, v10L: 0, v5L: 0, v1L: 0 },
      Leakage: { v20L: 0, v10L: 0, v5L: 0, v1L: 0 },
      Lost: { v20L: 0, v10L: 0, v5L: 0, v1L: 0 },
      "Customer Damage": { v20L: 0, v10L: 0, v5L: 0, v1L: 0 },
    };

    records.forEach((item) => {
      ["v20L", "v10L", "v5L", "v1L"].forEach((v) => {
        summary.Broken[v] += item.broken?.[v] || 0;
        summary.Leakage[v] += item.leakage?.[v] || 0;
        summary.Lost[v] += item.lost?.[v] || 0;
        summary["Customer Damage"][v] += item.customerDamage?.[v] || 0;
      });
    });

    const tableData = Object.keys(summary).map((reason) => {
      const row = summary[reason];

      return {
        reason,
        v20L: row.v20L,
        v10L: row.v10L,
        v5L: row.v5L,
        v1L: row.v1L,
        total: row.v20L + row.v10L + row.v5L + row.v1L,
      };
    });

    const totalDamaged = tableData.reduce(
      (sum, item) => sum + item.total,
      0
    );

    const summaryCards = [
      {
        key: "totalDamaged",
        label: "Total Damaged",
        value: totalDamaged,
        isRed: true,
      },
      ...tableData.map((item) => ({
        key: item.reason,
        label: item.reason,
        value: item.total,
      })),
    ];

    res.status(200).json({
      success: true,
      tableData,
      summaryCards,
    });
  } catch (error) {
    console.error("Summary Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};