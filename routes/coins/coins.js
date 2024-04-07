const express = require("express");
const router = express.Router();
const axios = require("axios");
const { round } = require("../../utils/utils");

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
    console.error("Error fetching data:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.get("/coins/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}`
    );

    const { name, description } = response.data;
    const {
      current_price,
      price_change_24h,
      price_change_percentage_7d,
      price_change_percentage_14d,
      price_change_percentage_30d,
      price_change_percentage_60d,
      price_change_percentage_200d,
      price_change_percentage_1y,
      high_24h,
      low_24h,
    } = response.data.market_data;
    const currentPrice = current_price.usd;

    const coinData = {
      name,
      description: description.en,
      marketData: {
        currentPrice,
        highestPrice24: high_24h.usd,
        lowestPrice24: low_24h.usd,
        // Since the fields for all price_change_{duration} were not available in the response,
        // I manually calculated the absolute prices. Below, we have the absolute prices.
        priceChanges: {
          day: round(price_change_24h),
          week: round(currentPrice * (price_change_percentage_7d / 100)),
          twoWeeks: round(currentPrice * (price_change_percentage_14d / 100)),
          month: round(currentPrice * (price_change_percentage_30d / 100)),
          twoMonths: round(currentPrice * (price_change_percentage_60d / 100)),
          twoHundredDays: round(
            currentPrice * (price_change_percentage_200d / 100)
          ),
          year: round(currentPrice * (price_change_percentage_1y / 100)),
        },
      },
    };

    res.json({ success: true, coin: coinData });
  } catch (error) {
    console.error("Error fetching coin data:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

module.exports = router;
