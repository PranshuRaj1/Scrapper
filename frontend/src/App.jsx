import React, { useState } from "react";

const ScraperApp = () => {
  const [url, setUrl] = useState("");
  const [productDetails, setProductDetails] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!url) {
      setError("Please enter a valid URL.");
      return;
    }

    try {
      setError(""); // Clear any previous errors
      const response = await fetch(
        `http://localhost:3000/scrape?url=${encodeURIComponent(url)}`
      );
      if (response.ok) {
        const data = await response.json();
        setProductDetails(data);
      } else {
        setError("Failed to fetch product details. Please try again.");
      }
    } catch (err) {
      setError("Error occurred while fetching product details.");
      console.log("===========================s=========");
      console.log(err);
      console.log("====================================");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Flipkart Product Scraper</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Flipkart product URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ padding: "10px", width: "300px" }}
        />
        <button
          type="submit"
          style={{ padding: "10px 20px", marginLeft: "10px" }}
        >
          Scrape
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {productDetails && (
        <div style={{ marginTop: "20px" }}>
          <h2>Product Details</h2>
          <p>
            <strong>Name:</strong> {productDetails.name}
          </p>
          <p>
            <strong>Price:</strong> {productDetails.price}
          </p>
        </div>
      )}
    </div>
  );
};

export default ScraperApp;
