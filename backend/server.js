import express from "express";
import puppeteer from "puppeteer";
import cors from "cors";
import getGroqChatCompletion from "./components/detailForProduct.js"; // Assuming this handles the Groq completion

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());

const scrapeProduct = async (url) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url);

  try {
    // Extract the HTML content of the page
    const htmlContent = await page.content();
    const first8000Chars = htmlContent.slice(0, 8000);

    // Send the HTML content to the Groq API to get the name and price
    const groqResponse = await getGroqChatCompletion(first8000Chars);

    // Extract the actual message content from the Groq response
    const groqMessage =
      groqResponse?.choices?.[0]?.message?.content ||
      "No valid response from Groq";

    console.log("Groq Message Content:", groqMessage);

    // Optionally, you can scrape directly using Puppeteer if needed
    const productDetails = await page.evaluate(() => {
      const name = document.querySelector("span.VU-ZEz")?.innerText || "N/A";
      const price = document.querySelector("div.hl05eU")?.innerText || "N/A";
      return { name, price };
    });

    // Return the final product details, possibly combined with Groq results
    return {
      ...productDetails,
      additionalInfo: groqMessage, // Include Groq data (message content)
    };
  } catch (error) {
    console.error("Error during scraping:", error);
    throw new Error("Failed to scrape product details");
  } finally {
    await browser.close();
  }
};

// API route to scrape product details
app.get("/scrape", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).json({ error: "Missing URL parameter" });
  }

  try {
    const productDetails = await scrapeProduct(url);
    res.json(productDetails);
  } catch (error) {
    res.status(500).json({ error: "Failed to scrape product details" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
