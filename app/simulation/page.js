'use client'
import React, { useState, useEffect } from 'react';
import Orrery from '../components/orrery';

function Page() {
  const [NEOData, setNEOData] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = '/data.json';

  // Fetch the NEO data
  useEffect(() => {
    const fetchNEOData = async () => {
      try {
        const response = await fetch(API_URL);  // Fetching NEO data from API
        const data = await response.json();     // Parse the JSON data

        // Log the raw response data for debugging
        console.log('Raw NEO API response:', data);

        // Assuming `data` contains a list of NEO objects
        if (data && data.data) {
            console.log('NEO data:', data.data);
          // Format data for the Orrery component
          const formattedNEOData = data.data.map(neo => ({
            name: neo[1],
            e: neo[4],
            a: neo[5],
            i: neo[6],
            node: neo[7],
            peri: neo[8],
            M: neo[9],
            epoch: neo[3],
            radius: 0.01

          }));
          console.log('Formatted NEO data:', formattedNEOData);

          setNEOData(formattedNEOData);         // Store formatted data in state
        } else {
          console.error('Unexpected data structure:', data);
        }

        setLoading(false);                      // Stop loading once data is fetched
      } catch (error) {
        console.error('Error fetching NEO data:', error);
        setLoading(false);
      }
    };

    fetchNEOData();  // Call the function to fetch data when component mounts
  }, []);

  if (loading) {
    return <p>Loading NEO data...</p>;
  }

  if (!NEOData.length) {
    return <p>No NEO data available.</p>;
  }

  return (
    <div>
      <h1>NEO Orbit Simulation</h1>
      <Orrery NEOData={NEOData} />
    </div>
  );
}

export default Page;
