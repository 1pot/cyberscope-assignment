const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/coins", async (req, res) => {
  try {
    const { page } = req.query;
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          per_page: 10, // number of coins to retrieve
          page: page || 1, // pagination
        },
      }
    );

    if (response && response.data) {
      const coins = response.data.map(
        ({
          id,
          name,
          symbol,
          current_price,
          high_24h,
          low_24h,
          price_change_percentage_24h,
        }) => ({
          id,
          name,
          symbol,
          currentPrice: current_price,
          highestPrice24: high_24h,
          lowestPrice24: low_24h,
          priceChange24: price_change_percentage_24h,
        })
      );

      res.json({
        success: true,
        coins,
      });
    }
  } catch (error) {
    console.log("error", error);
    console.error("Error fetching data:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

module.exports = router;
