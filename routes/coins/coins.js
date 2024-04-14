const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/coins", async (req, res) => {
  try {
    const page = req.query.page;

    // Validate the 'page' parameter
    if (isNaN(page) || page < 1) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid page parameter" });
    }

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

    if (!response.data) {
      return res
        .status(404)
        .json({ success: false, error: "Coins Market not found!" });
    }

    const coins = response.data.map(
      ({
        id,
        name,
        symbol,
        current_price,
        high_24h,
        low_24h,
        price_change_percentage_24h,
      }) => {
        if (
          typeof id !== "string" ||
          typeof name !== "string" ||
          typeof symbol !== "string"
        ) {
          throw new Error("Invalid parameter type received from CoinGecko API");
        }

        // Validate string lengths if needed
        if (id.length === 0 || name.length === 0 || symbol.length === 0) {
          throw new Error(
            "Invalid parameter value received from CoinGecko API"
          );
        }
        // Validate parameters
        const validatedCurrentPrice = parseFloat(current_price);
        const validatedHigh24h = parseFloat(high_24h);
        const validatedLow24h = parseFloat(low_24h);
        const validatedPriceChange24h = parseFloat(price_change_percentage_24h);

        // Check if any parameter is invalid
        if (
          isNaN(validatedCurrentPrice) ||
          isNaN(validatedHigh24h) ||
          isNaN(validatedLow24h) ||
          isNaN(validatedPriceChange24h)
        ) {
          throw new Error("Invalid parameter received from CoinGecko API");
        }

        return {
          id,
          name,
          symbol,
          currentPrice: validatedCurrentPrice,
          highestPrice24: validatedHigh24h,
          lowestPrice24: validatedLow24h,
          priceChange24: validatedPriceChange24h,
        };
      }
    );

    res.json({
      success: true,
      coins,
    });
  } catch (error) {
    if (error.response) {
      const { status } = error.response;

      // Handle specific HTTP status codes returned by the CoinGecko API
      switch (status) {
        case 400:
          res.status(400).json({ success: false, error: "Bad request" });
          break;
        case 401:
          res.status(401).json({ success: false, error: "Unauthorized" });
          break;
        case 403:
          res.status(403).json({ success: false, error: "Forbidden" });
          break;
        case 404:
          res.status(404).json({ success: false, error: "Not found" });
          break;
        case 429:
          res
            .status(429)
            .json({ success: false, error: "Rate limit exceeded" });
          break;
        case 500:
          res
            .status(500)
            .json({ success: false, error: "Internal server error" });
          break;
        default:
          res
            .status(status)
            .json({ success: false, error: "An error occurred" });
      }
    } else {
      // Handle other types of errors
      res.status(500).json({ success: false, error: "An error occurred" });
    }
  }
});

router.get("/coins/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, error: "Coin ID is required" });
    }

    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}`
    );

    if (!response.data) {
      return res.status(404).json({ success: false, error: "Coin not found" });
    }

    const marketData = response.data.market_data;

    // Check if the market_data object exists
    if (!marketData) {
      // Handle case where market_data is missing from the response
      console.error("Market data not found in API response");
      return;
    }

    if (
      marketData.current_price === undefined ||
      marketData.price_change_24h === undefined ||
      marketData.price_change_percentage_7d === undefined ||
      marketData.price_change_percentage_14d === undefined ||
      marketData.price_change_percentage_30d === undefined ||
      marketData.price_change_percentage_60d === undefined ||
      marketData.price_change_percentage_200d === undefined ||
      marketData.price_change_percentage_1y === undefined ||
      marketData.high_24h === undefined ||
      marketData.low_24h === undefined
    ) {
      // Handle case where one or more required properties are missing
      console.error("One or more required properties missing from market data");
      return;
    }

    const coinData = {
      name: response.data.name,
      description: response.data.description.en,
      currentPrice: marketData.current_price.usd,
      lowestPrice24: marketData.low_24h.usd,
      highestPrice24: marketData.high_24h.usd,
      priceChanges: {
        day: marketData.price_change_24h,
        week: marketData.price_change_percentage_7d,
        twoWeeks: marketData.price_change_percentage_14d,
        month: marketData.price_change_percentage_30d,
        twoMonths: marketData.price_change_percentage_60d,
        twoHundredDays: marketData.price_change_percentage_200d,
        year: marketData.price_change_percentage_1y,
      },
    };

    // Validate properties before sending back to the client
    if (
      coinData.name === undefined ||
      coinData.currentPrice === undefined ||
      coinData.lowestPrice24 === undefined ||
      coinData.highestPrice24 === undefined ||
      coinData.description === undefined ||
      // Check if any of the price change properties are undefined
      Object.values(coinData.priceChanges).some((value) => value === undefined)
    ) {
      console.error("One or more required properties missing from coin data");
      return;
    }
    res.json({ success: true, coin: coinData });
  } catch (error) {
    if (error.response) {
      const { status } = error.response;

      // Handle specific HTTP status codes returned by the CoinGecko API
      switch (status) {
        case 400:
          res.status(400).json({ success: false, error: "Bad request" });
          break;
        case 401:
          res.status(401).json({ success: false, error: "Unauthorized" });
          break;
        case 403:
          res.status(403).json({ success: false, error: "Forbidden" });
          break;
        case 404:
          res.status(404).json({ success: false, error: "Not found" });
          break;
        case 429:
          res
            .status(429)
            .json({ success: false, error: "Rate limit exceeded" });
          break;
        case 500:
          res
            .status(500)
            .json({ success: false, error: "Internal server error" });
          break;
        default:
          res
            .status(status)
            .json({ success: false, error: "An error occurred" });
      }
    } else {
      // Handle other types of errors
      res.status(500).json({ success: false, error: "An error occurred" });
    }
  }
});

module.exports = router;
