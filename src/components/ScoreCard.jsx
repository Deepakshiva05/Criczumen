import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Scorecard = () => {
    const { matchId } = useParams();
    const [matchDetails, setMatchDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMatchDetails = async () => {
            try {
                const response = await fetch('https://api.cricapi.com/v1/currentMatches?apikey=bac71b56-e2b2-4838-a713-5971921eae15&offset=0');
                const data = await response.json();
                const match = data.data.find((m) => m.id === matchId);
                setMatchDetails(match);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMatchDetails();
    }, [matchId]);

    if (loading) return <div className="text-center text-lg font-semibold mt-5">Loading scorecard...</div>;
    if (error) return <div className="text-center text-red-500 mt-5">Error: {error}</div>;

    return (
        <div className="container mx-auto mt-5 px-4">
            {matchDetails ? (
                <>
                    <h2 className="text-2xl font-bold text-center mb-6">{matchDetails.name}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        <div className="space-y-4">
                            <div className="space-y-4">
                                {matchDetails.teamInfo.map((team, index) => (
                                    <div className="flex items-center p-4 bg-white shadow-lg rounded-lg" key={index}>
                                        <img src={team.img} alt={team.name} className="w-12 h-12 rounded-full mr-4" />
                                        <div>
                                            <span className="block font-semibold">{team.name}</span>
                                            <span className="text-gray-500">({team.shortname})</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <table className="table-auto w-full text-left bg-white shadow-lg rounded-lg mt-4">
                                <tbody>
                                    <tr className="border-b">
                                        <th className="p-4 font-semibold">Match Type</th>
                                        <td className="p-4">{matchDetails.matchType}</td>
                                    </tr>
                                    <tr className="border-b">
                                        <th className="p-4 font-semibold">Status</th>
                                        <td className="p-4">{matchDetails.status}</td>
                                    </tr>
                                    <tr className="border-b">
                                        <th className="p-4 font-semibold">Venue</th>
                                        <td className="p-4">{matchDetails.venue}</td>
                                    </tr>
                                    <tr>
                                        <th className="p-4 font-semibold">Date & Time</th>
                                        <td className="p-4">{new Date(matchDetails.dateTimeGMT).toLocaleString()}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    
                        <div className="space-y-6">
                            <h4 className="text-xl font-bold mb-3">ScoreCard</h4>
                            {matchDetails.score && matchDetails.score.length > 0 ? (
                                matchDetails.score.map((inning, index) => (
                                    <table className="table-auto w-full text-left bg-white shadow-lg rounded-lg" key={index}>
                                        <thead>
                                            <tr>
                                                <th className="p-4" colSpan="2">{inning.inning}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b">
                                                <th className="p-4 font-semibold">Runs</th>
                                                <td className="p-4">{inning.r}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <th className="p-4 font-semibold">Wickets</th>
                                                <td className="p-4">{inning.w}</td>
                                            </tr>
                                            <tr>
                                                <th className="p-4 font-semibold">Overs</th>
                                                <td className="p-4">{inning.o}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                ))
                            ) : (
                                <p className="text-gray-500">No score data available.</p>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <div className="text-center text-lg mt-5">No match details available.</div>
            )}
        </div>
    );
};

export default Scorecard;



