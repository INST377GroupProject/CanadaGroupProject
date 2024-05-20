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
    document.querySelectorAll(".block1, .block2, .block3").forEach((block) => {
      block.style.backgroundColor = theme.backgroundColor;
    })
  }
}

// Function to fetch data for a specific province or territory
function fetchDataForProvince(province) {
  console.log(`Fetching data for ${province}...`);
  fetch(`https://api.covid19tracker.ca/summary`)
    .then((response) => {
      console.log("Response received for province data");
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Data fetched successfully for province data:", data);
      const provinceData = data.data.find((region) => region.province === province);
      if (provinceData) {
        document.getElementById("province-latest-date").innerText = provinceData.date;
        document.getElementById("province-total-cases").innerText = provinceData.total_cases;
        document.getElementById("province-total-fatalities").innerText = provinceData.total_fatalities;
        document.getElementById("province-total-tests").innerText = provinceData.total_tests;
        document.getElementById("province-total-hospitalizations").innerText = provinceData.total_hospitalizations;
        document.getElementById("province-total-criticals").innerText = provinceData.total_criticals;
        document.getElementById("province-total-recoveries").innerText = provinceData.total_recoveries;
        document.getElementById("province-total-vaccinations").innerText = provinceData.total_vaccinations;
      } else {
        console.error(`No data found for ${province}`);
      }
    })
    .catch((error) => {
      console.error(`Error fetching data for ${province}:`, error);
    });
}

// Ensure the theme is applied on page load
document.addEventListener("DOMContentLoaded", () => {
  console.log("Document loaded");

  // Call the function to load home page stats and fetch province data
  fetchCovidData();
  loadHomePageStats();

  // If there's a theme set in local storage, apply it
  if (localStorage.getItem("theme")) {
    applyTheme();
  }
});

// Fetch and display COVID-19 data and store in Supabase
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

          // Assuming the data contains regional breakdowns
          data.data.forEach((region) => {
              const { region_name, lat, long, total_cases } = region;
              L.circle([lat, long], {
                  color: "red",
                  fillColor: "#f03",
                  fillOpacity: 0.5,
                  radius: total_cases * 10, // Scale the radius by the number of cases
              })
              .addTo(map)
              .bindPopup(`<b>${region_name}</b><br>Total cases: ${total_cases}`);
          });

          // Insert data into Supabase
          return supabase.from('covid_data').insert([stats]);
      })
      .then((response) => {
          console.log('Data inserted successfully:', response);
      })
      .catch((error) => {
          console.error("Error fetching data:", error);
      });
}


// Ensure the theme is applied on page load
document.addEventListener("DOMContentLoaded", () => {
  console.log("Document loaded");

  // Call the function to load home page stats and fetch province data
  fetchCovidData();

  // If there's a theme set in local storage, apply it
  if (localStorage.getItem("theme")) {
      applyTheme();
  }
});

// Update home page "Good", "Bad", and "Ugly" numbers
function loadHomePageStats() {
  console.log("Fetching home page stats...");
  fetch("https://api.covid19tracker.ca/summary")
    .then((response) => {
      console.log("Response received for home page stats");
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Data fetched successfully for home page stats:", data);
      const stats = data.data[0];
      document.getElementById("administered-value").innerText = stats.total_vaccinations;
      document.getElementById("recoveries-value").innerText = stats.total_recoveries;
      document.getElementById("cases-value").innerText = stats.total_cases;
      document.getElementById("tests-value").innerText = stats.total_tests;
      document.getElementById("hospitalizations-value").innerText = stats.total_hospitalizations;
      document.getElementById("deaths-value").innerText = stats.total_fatalities;
    })
    .catch((error) => {
      console.error("Error fetching home page stats:", error);
    });
}

// Ensure the theme is applied on page load
document.addEventListener("DOMContentLoaded", () => {
  console.log("Document loaded");

  // Call the function to load home page stats
  loadHomePageStats();
  // Transition on homepage
  const transitionScreen = document.querySelector(".transition-screen");
  setTimeout(() => {
   transitionScreen.classList.add("show");
  }, 100); // Delay to ensure the CSS transition applies
});

// Initialize the map
const map = L.map("map").setView([51.0447, -114.0719], 4); // Set initial view to Canada

// Add tile layer from OpenStreetMap or any other provider
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Fetch and display COVID-19 data
fetchCovidData();
loadHomePageStats();

// If there's a theme set in local storage, apply it
if (localStorage.getItem("theme")) {
  applyTheme();
}

// Define the clickable regions on the map corresponding to each province or territory
const clickableRegions = {
  Alberta: [51.0447, -114.0719],
  "British Columbia": [53.7267, -127.6476],
  Manitoba: [49.8951, -97.1384],
  "New Brunswick": [46.5653, -66.4619],
  "Newfoundland and Labrador": [53.1355, -57.6604],
  "Northwest Territories": [64.8255, -124.8457],
  "Nova Scotia": [44.6819, -63.7443],
  Nunavut: [70.2998, -83.1076],
  Ontario: [51.2538, -85.3232],
  "Prince Edward Island": [46.5107, -63.4168],
  Quebec: [52.9399, -73.5491],
  Saskatchewan: [52.9399, -106.4509],
  Yukon: [64.2823, -135.0],
};

// Add event listeners to each region
Object.keys(clickableRegions).forEach((region) => {
  const coordinates = clickableRegions[region];
  const marker = L.marker(coordinates).addTo(map);

  marker.on("click", () => {
    // When a region is clicked, retrieve the data for that specific province or territory and display it
    fetchDataForRegion(region);
  });
});

const supabaseUrl = 'https://uehsglhvwupcczhhuuxh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlaHNnbGh2d3VwY2N6aGh1dXhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYxNjQxNDEsImV4cCI6MjAzMTc0MDE0MX0.du1d-NNG59q9KbJFi4E-2dDYfnJpDxBWAjEsVkHYsE8';
const supabase = createClient(supabaseUrl, supabaseKey);

// Listen for connection state changes
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Auth event:', event);
  console.log('Auth session:', session);
});

supabase.onOpen(() => {
  console.log('Connection to Supabase established.');
});

supabase.onClose(() => {
  console.log('Connection to Supabase closed.');
});

supabase.onFailure((error) => {
  console.error('Connection to Supabase failed:', error.message);
});


