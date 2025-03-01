
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample app data
let apps = [
  {
    id: 1,
    name: "WhatsApp",
    icon: "https://via.placeholder.com/100",
    description: "Messaging app for communication.",
    category: "social",
  },
  {
    id: 2,
    name: "Instagram",
    icon: "https://via.placeholder.com/100",
    description: "Share photos and videos with friends.",
    category: "social",
  },
  {
    id: 3,
    name: "YouTube",
    icon: "https://via.placeholder.com/100",
    description: "Watch and share videos.",
    category: "entertainment",
  },
  {
    id: 4,
    name: "Snapseed",
    icon: "https://via.placeholder.com/100",
    description: "Photo editing app by Google.",
    category: "photo",
  },
];

// API endpoint to fetch all apps
app.get("/api/apps", (req, res) => {
  res.json(apps);
});

// API endpoint to fetch recommendations (using DeepSeek AI)
app.post("/api/recommendations", async (req, res) => {
  const { query } = req.body;

  // Simulate DeepSeek API call (replace with actual API call)
  const recommendations = apps.filter((app) =>
    app.category.includes(query.toLowerCase())
  );

  res.json(recommendations);
});

// API endpoint to handle search (using DeepSeek AI)
app.post("/api/search", async (req, res) => {
  const { query } = req.body;

  // Simulate DeepSeek API call (replace with actual API call)
  const searchResults = apps.filter((app) =>
    app.name.toLowerCase().includes(query.toLowerCase())
  );

  res.json(searchResults);
});

// API endpoint to publish a new app
app.post("/api/publish", (req, res) => {
  const { name, description, category, icon } = req.body;

  const newApp = {
    id: apps.length + 1,
    name,
    description,
    category,
    icon,
  };

  apps.push(newApp);
  res.status(201).json(newApp);
});

// Serve static files (frontend)
app.use(express.static("public"));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});