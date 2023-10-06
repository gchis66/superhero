import axios from "axios";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export default async (req, res) => {
  const { name } = req.query;
  const apiKey = process.env.SUPERHERO_API_KEY; // Replace with your API key

  try {
    const response = await axios.get(
      `https://www.superheroapi.com/api/${apiKey}/search/${name}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
