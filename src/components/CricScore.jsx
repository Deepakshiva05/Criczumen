import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loadingAnimation from '../assets/loading.json';
import Lottie from 'lottie-react';


const CricScore = () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await fetch('https://api.cricapi.com/v1/currentMatches?apikey=bac71b56-e2b2-4838-a713-5971921eae15&offset=0');
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
        <div className="container mx-auto mt-5 px-4">
            <h1 className="text-3xl font-bold text-center mb-8">Cricket Matches</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {matches.length > 0 ? (
                    matches.map((match, index) => (
                        <div
                            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer"
                            key={index}
                            onClick={() => handleMatchClick(match.id)}
                        >
                            <div className="p-6">
                                <h5 className="text-xl font-bold mb-4">{match.name}</h5>
                                <p className="text-gray-600 mb-4">{match.status}</p>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <img
                                            src={match.teamInfo[0].img}
                                            alt={match.teamInfo[0].name}
                                            className="w-12 h-12 rounded-full"
                                        />
                                        <span className="ml-3 font-semibold">{match.teamInfo[0].name}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <img
                                            src={match.teamInfo[1].img}
                                            alt={match.teamInfo[1].name}
                                            className="w-12 h-12 rounded-full"
                                        />
                                        <span className="ml-3 font-semibold">{match.teamInfo[1].name}</span>
                                    </div>
                                </div>
                                <p className="mt-4 text-gray-700"><strong>Match Type:</strong> {match.matchType}</p>
                                <p className="mt-1 text-gray-700"><strong>Date & Time:</strong> {new Date(match.dateTimeGMT).toLocaleString()}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-3 text-center text-lg">No match data available.</div>
                )}
            </div>
        </div>
    );
};

export default CricScore;


