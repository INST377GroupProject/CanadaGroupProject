console.log("Script loaded");

function toggleTheme() {
  const body = document.body;
  const isLightTheme = body.classList.toggle("light-theme");

  // Update the theme in local storage based on the toggle
  localStorage.setItem("theme", isLightTheme ? "light" : "dark");

  applyTheme(); // Apply the current theme settings
}

function applyTheme() {
  const body = document.body;
  const currentTheme = localStorage.getItem("theme") || "dark"; // Use local storage or default to 'dark'
  const isLightTheme = currentTheme === "light";

  // Define the themes
  const lightTheme = {
    backgroundColor: "#FFF", // Light background for the body
    textColor: "#333", // Dark text for better readability on light background
    linkColor: "#1a237e", // Deep blue for links
    buttonBackgroundColor: "#e8eaf6", // Light grey for button background
  };

  const darkTheme = {
    backgroundColor: "#121212",
    textColor: "#e0e0e0",
    linkColor: "#9fa8da",
    buttonBackgroundColor: "#616161",
  };

  // Apply the current theme based on whether 'light-theme' is active
  const theme = isLightTheme ? lightTheme : darkTheme;
  if (body) {
    body.style.backgroundColor = theme.backgroundColor;
    body.style.color = theme.textColor;
    document.querySelectorAll("a").forEach((link) => {
      link.style.color = theme.linkColor;
    });
    const button = document.querySelector("button");
    if (button) {
      button.style.backgroundColor = theme.buttonBackgroundColor;
    }
  }
}

function fetchCovidData() {
  console.log("Fetching COVID data...");
  fetch("https://api.covid19tracker.ca/summary")
    .then((response) => {
      console.log("Response received");
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Data fetched successfully:", data);
      const stats = data.data[0];
      document.getElementById("latest-date").innerText = stats.latest_date;
      document.getElementById("total-cases").innerText = stats.total_cases;
      document.getElementById("total-fatalities").innerText = stats.total_fatalities;
      document.getElementById("total-tests").innerText = stats.total_tests;
      document.getElementById("total-hospitalizations").innerText = stats.total_hospitalizations;
      document.getElementById("total-criticals").innerText = stats.total_criticals;
      document.getElementById("total-recoveries").innerText = stats.total_recoveries;
      document.getElementById("total-vaccinations").innerText = stats.total_vaccinations;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// Update home page "Good", "Bad", and "Ugly" numbers
function loadHomePageStats() {
  fetch("https://api.covid19tracker.ca/summary")
    .then((response) => {
      console.log("Response received");
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      const stats = data.data[0];
      document.getElementById("admitted-value").innerText = stats.total_vaccinations;
      document.getElementById("recoveries-value").innerText = stats.total_recoveries;
      document.getElementById("cases-value").innerText = stats.total_cases;
      document.getElementById("tests-value").innerText = stats.total_tests;
      document.getElementById("hospitalizations-value").innerText = stats.total_hospitalizations;
      document.getElementById("deaths-value").innerText = stats.total_fatalities;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// Ensure the theme is applied on page load
document.addEventListener("DOMContentLoaded", () => {
  console.log("Document loaded");
  // If there's a theme set in local storage, apply it
  if (localStorage.getItem("theme")) {
    applyTheme();
  }
  fetchCovidData();
  loadHomePageStats();
});
