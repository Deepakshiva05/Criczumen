import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CricScore = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch('https://api.cricapi.com/v1/currentMatches?apikey=8818c305-dba8-4141-a7a9-ed760f0266cb&offset=0');
        const data = await response.json();
        setMatches(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  const handleMatchClick = (matchId) => {
    navigate(`/scorecard/${matchId}`);
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {matches.map((match) => (
        <div
          key={match.id}
          className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300"
          onClick={() => handleMatchClick(match.id)}
        >
          <h2 className="text-xl font-bold mb-2">{match.status}</h2>
          <p className="text-gray-700"><strong>Match Type:</strong> {match.matchType}</p>
          <p className="text-gray-700"><strong>Date & Time:</strong> {new Date(match.dateTimeGMT).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default CricScore;

