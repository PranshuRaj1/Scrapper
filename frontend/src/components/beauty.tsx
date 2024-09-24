function extractSecondPrice(input: string): string | null {
  // Find the positions of both ₹ symbols
  const firstIndex = input.indexOf("₹");
  if (firstIndex === -1) return null; // If there's no ₹ symbol, return null

  const secondIndex = input.indexOf("₹", firstIndex + 1);
  if (secondIndex === -1) return null; // If there's no second ₹ symbol, return null

  // Extract the string starting from the second ₹ symbol
  const priceString = input.slice(secondIndex + 1);

  // Use a regex to match the price (numbers with commas) after the second ₹
  const match = priceString.match(/[\d,]+/);

  // If a match is found, return it, otherwise return null
  return match ? match[0] : null;
}

// Example usage
const input = `Name: ASUS Zenbook 14 OLED AI PC Intel Core Ultra 9 185H - (32 GB/1 TB SSD/Windows 11 Home) UX3405MA-PZ961WS Thin and Light Laptop  (14 inch, Foggy Silver, 1.28 Kg, With MS Office)
  Price: ₹1,44,990₹1,70,99015% off`;

const secondPrice = extractSecondPrice(input);
console.log(secondPrice); // Output: 1,70,990
