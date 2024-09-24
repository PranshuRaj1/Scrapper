// Import dotenv to load environment variables
import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";

// Access the API key from the environment variable
const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  throw new Error("Missing GROQ_API_KEY environment variable");
}

const groq = new Groq({
  apiKey: apiKey, // Use the key from the environment variable
  dangerouslyAllowBrowser: true,
});

// Main function for testing
export async function main() {
  const query = "<html>Your product HTML goes here</html>"; // Replace with actual HTML
  const chatCompletion = await getGroqChatCompletion(query);
  console.log(chatCompletion.choices[0]?.message?.content || "");
}

// Refined prompt and example for Groq API
const preMessage = `Given HTML of a product, tell me the name and the **discounted price** at which I can buy the product. If the product has a discount, ignore the MRP and focus on the actual price I will pay. 

For example:
- If the HTML is of Flipkart, the discounted price will often be found inside a div with class "discounted-price" or "price final-price". Please check for any classes containing the word 'discount' or 'final'.

The response should be:
Name: [name of the product]
Price: [discounted price]
`;

const exampleRes = `
Here is an example of the kind of response I want:

Input HTML:
<span class="VU-ZEz">ASUS Zenbook S 13 OLED 1 cm Thin &amp; 1 kg Light, Intel EVO Intel Core i5 13th Gen 1335U - (16 GB/512 GB SSD/Windows 11 Home) UX5304VA-NQ541WS Thin and Light Laptop&nbsp;&nbsp;(13.3 Inch, Ponder Blue, 1.00 kg, With MS Office)</span>
<div class="hl05eU"><div class="Nx9bqj CxhGGd">₹89,990</div><div class="yRaY8j A6+E6v">₹1,28,990</div><div class="UkUFwK WW8yVX"><span>30% off</span></div></div>

Expected Response:
Name: ASUS Zenbook S 13 OLED
Price: ₹89,990

Now, process the following HTML:
`;

// Function to get chat completion from Groq API
export default async function getGroqChatCompletion(query) {
  const refinedPrompt = `${exampleRes} ${query} ${preMessage}`;

  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: refinedPrompt,
      },
    ],
    model: "llama3-8b-8192", // Use the model available in Groq
  });
}
