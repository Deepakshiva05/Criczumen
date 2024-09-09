import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/loading.json';

const UpcomingMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get('https://api.cricapi.com/v1/matches', {
          params: {
            apikey: 'bac71b56-e2b2-4838-a713-5971921eae15',
            offset: 0,
          },
        });
        setMatches(response.data.data); 
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch matches.');
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Lottie animationData={loadingAnimation} style={{ height: 200 }} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Upcoming Matches</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((match) => (
          <div key={match.unique_id} className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">{match.name}</h3>
            <p className="text-gray-700"><strong>Match Type:</strong> {match.type}</p>
            <p className="text-gray-700"><strong>Teams:</strong> {match['team-1']} vs {match['team-2']}</p>
            <p className="text-gray-700"><strong>Date:</strong> {new Date(match.dateTimeGMT).toLocaleString()}</p>
            <p className="text-gray-700"><strong>Venue:</strong> {match.venue}</p>
          
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingMatches;
