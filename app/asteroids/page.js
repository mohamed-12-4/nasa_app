'use client';
import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


function Page() {
    const [asteroids, setAsteroids] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [startDate, setStartDate] = useState(new Date().toJSON().slice(0, 10));
    const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 7)).toJSON().slice(0, 10)); // Default to 7 days from startDate
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const router = useRouter();

    useEffect(() => {
        const fetchAsteroids = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await axios.get(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}`);
                const fetchedAsteroids = Object.values(res.data.near_earth_objects).flat();
                setAsteroids(fetchedAsteroids);
            } catch (error) {
                console.error('Error fetching asteroids:', error);
                setError('Failed to fetch asteroids. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchAsteroids();
    }, [startDate, endDate]);

    if (loading) {
        return <div className="text-white text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-white text-center">{error}</div>;
    }

    // Calculate total pages
    const totalPages = Math.ceil(asteroids.length / itemsPerPage);

    // Get current asteroids to display
    const indexOfLastAsteroid = currentPage * itemsPerPage;
    const indexOfFirstAsteroid = indexOfLastAsteroid - itemsPerPage;
    const currentAsteroids = asteroids.slice(indexOfFirstAsteroid, indexOfLastAsteroid);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Handle chat button click
    const handleChatClick = (id, name) => {
        router.push(`/chat?id=${id}&name=${name}`);
    };

    return (
        <>
        <div className="min-h-screen bg-black text-white p-10">
            <h1 className="text-4xl mb-8 text-center">Asteroids Close to Earth</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentAsteroids.map((asteroid) => (
                    <div key={asteroid.id} className="bg-gray-800 rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl mb-2">{asteroid.name}</h2>
                        <p>
                            <strong>Estimated Diameter (km):</strong>{' '}
                            {asteroid.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} -{' '}
                            {asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)}
                        </p>
                        <p>
                            <strong>Absolute Magnitude:</strong> {asteroid.absolute_magnitude_h}
                        </p>
                        <p>
                            <strong>Close Approach Date:</strong> {asteroid.close_approach_data[0].close_approach_date}
                        </p>
                        <p>
                            <strong>Miss Distance (km):</strong> {asteroid.close_approach_data[0].miss_distance.kilometers}
                        </p>
                        <p>
                            <strong>Relative Velocity (km/h):</strong> {asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour}
                        </p>
                        <a
                            href={asteroid.nasa_jpl_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-yellow-400 hover:underline mt-4 block"
                        >
                            More Info
                        </a>
                        <button
                            onClick={() => handleChatClick(asteroid.neo_reference_id, asteroid.name)}
                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                        >
                            Chat with Asteroid
                        </button>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-6">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`bg-gray-600 text-white py-2 px-4 rounded-l ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`bg-gray-600 text-white py-2 px-4 ${currentPage === index + 1 ? 'bg-yellow-400' : ''}`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`bg-gray-600 text-white py-2 px-4 rounded-r ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Next
                </button>
            </div>
        </div>
        </>
    );
}

export default Page;