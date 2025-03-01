const DEEPSEEK_API_KEY = "YOUR_DEEPSEEK_API_KEY"; // Replace with your DeepSeek API key

document.addEventListener("DOMContentLoaded", () => {
  const appList = document.getElementById("app-list");
  const recommendedList = document.getElementById("recommended-list");
  const searchList = document.getElementById("search-list");
  const searchInput = document.getElementById("search");
  const tabs = document.querySelectorAll(".tab-link");
  const tabContents = document.querySelectorAll(".tab-content");

  // Fetch app data from the server
  fetch("/api/apps")
    .then((response) => response.json())
    .then((data) => {
      displayApps(data, appList);
      displayDeepSeekRecommendations("I want apps for photo editing and social media");
    });

  // Display apps in a given container
  function displayApps(apps, container) {
    container.innerHTML = apps
      .map(
        (app) => `
        <div class="app-card">
          <img src="${app.icon}" alt="${app.name}">
          <h3>${app.name}</h3>
          <p>${app.description}</p>
        </div>
      `
      )
      .join("");
  }

  // Get DeepSeek recommendations
  async function getDeepSeekRecommendations(userQuery) {
    const url = "https://api.deepseek.com/v1/recommendations"; // Example DeepSeek endpoint
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        query: userQuery,
        context: "app_recommendations", // Context for recommendations
      }),
    });
    return response.json();
  }

  // Display DeepSeek recommendations
  async function displayDeepSeekRecommendations(userQuery) {
    const recommendations = await getDeepSeekRecommendations(userQuery);
    displayApps(recommendations, recommendedList);
  }

  // Search with DeepSeek AI
  async function searchWithDeepSeek(query) {
    const url = "https://api.deepseek.com/v1/search"; // Example DeepSeek endpoint
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        query: query,
        context: "app_search", // Context for search
      }),
    });
    return response.json();
  }

  // Handle search input
  searchInput.addEventListener("input", async () => {
    const query = searchInput.value;
    if (query.length > 2) {
      const results = await searchWithDeepSeek(query);
      displayApps(results, searchList);
    } else {
      searchList.innerHTML = ""; // Clear search results
    }
  });

  // Tab functionality
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      tabContents.forEach((content) => content.classList.remove("active"));
      document.getElementById(tab.dataset.tab).classList.add("active");
    });
  });
});