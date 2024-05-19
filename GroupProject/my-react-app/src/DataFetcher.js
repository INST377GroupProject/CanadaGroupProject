import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = () => {
    axios.get('https://api.covid19tracker.ca/summary')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
    const intervalId = setInterval(fetchData, 60000); // Fetch data every 60 seconds

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>COVID-19 Summary</h2>
      <ul>
        <li>Total Cases: {data.data[0].total_cases}</li>
        <li>Total Recoveries: {data.data[0].total_recoveries}</li>
        <li>Total Deaths: {data.data[0].total_fatalities}</li>
        <li>Active Cases: {data.data[0].total_cases - data.data[0].total_recoveries - data.data[0].total_fatalities}</li>
      </ul>
    </div>
  );
}

export default DataFetcher;

