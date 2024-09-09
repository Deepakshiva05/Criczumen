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
                        {/* First Column - Match Details */}
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

                        {/* Second Column - Match Score */}
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



// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const Scorecard = () => {
//     const { matchId } = useParams();
//     const [matchDetails, setMatchDetails] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchMatchDetails = async () => {
//             try {
//                 const response = await fetch('https://api.cricapi.com/v1/currentMatches?apikey=8818c305-dba8-4141-a7a9-ed760f0266cb&offset=0');
//                 const data = await response.json();
//                 const match = data.data.find((m) => m.id === matchId);
//                 setMatchDetails(match);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchMatchDetails();
//     }, [matchId]);

//     if (loading) return <div>Loading scorecard...</div>;
//     if (error) return <div>Error: {error}</div>;

//     return (
//         <div className="container mt-5">
//             {matchDetails ? (
//                 <>
//                     <h2 className="mb-4 text-center">{matchDetails.name}</h2>
//                     <div className="row">
//                         {/* First Column - Match Details */}
//                         <div className="col-md-6">
//                         <div className="cards">

//                         {matchDetails.teamInfo.map((team, index) => (
//                                     <div className="card shadow d-flex justify-center align-items-center mt-2">
//                                         <img src={team.img} alt={team.name} className='img fluid rounded-circle ms-3 mt-3' style={{width:"48px",height:"48px"}}></img>
//                                         <span><strong>{team.name}</strong>({team.shortname})</span>
//                                         <div className="card-body">

//                                         </div>
//                                     </div>
//                                 ))}
//                         </div>
//                             <table className="table table-bordered mt-3 shadow">
//                                 <tbody>
//                                     <tr>
//                                         <th>Match Type</th>
//                                         <td>{matchDetails.matchType}</td>
//                                     </tr>
//                                     <tr>
//                                         <th>Status</th>
//                                         <td>{matchDetails.status}</td>
//                                     </tr>
//                                     <tr>
//                                         <th>Venue</th>
//                                         <td>{matchDetails.venue}</td>
//                                     </tr>
//                                     <tr>
//                                         <th>Date & Time</th>
//                                         <td>{new Date(matchDetails.dateTimeGMT).toLocaleString()}</td>
//                                     </tr>
//                                 </tbody>
//                             </table>
//                             <div className="row" style={{marginTop:"3cm"}}>
                                
//                             </div>
//                         </div>

//                         {/* Second Column - Match Score */}
//                         <div className="col-md-6">
//                             <h4 className="mb-3 mt-4">ScoreCard</h4>
//                             {matchDetails.score && matchDetails.score.length > 0 ? (
//                                 matchDetails.score.map((inning, index) => (
//                                     <table className="table table-striped mb-3 shadow" key={index}>
//                                         <thead>
//                                             <tr>
//                                                 <th colSpan="2">{inning.inning}</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             <tr>
//                                                 <th>Runs</th>
//                                                 <td>{inning.r}</td>
//                                             </tr>
//                                             <tr>
//                                                 <th>Wickets</th>
//                                                 <td>{inning.w}</td>
//                                             </tr>
//                                             <tr>
//                                                 <th>Overs</th>
//                                                 <td>{inning.o}</td>
//                                             </tr>
//                                         </tbody>
//                                     </table>
//                                 ))
//                             ) : (
//                                 <p>No score data available.</p>
//                             )}
//                         </div>
//                     </div>
//                 </>
//             ) : (
//                 <div>No match details available.</div>
//             )}
//         </div>
//     );
// };

// export default Scorecard;


// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const Scorecard = () => {
//     const { matchId } = useParams();
//     const [matchDetails, setMatchDetails] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchMatchDetails = async () => {
//             try {
//                 const response = await fetch('https://api.cricapi.com/v1/currentMatches?apikey=8818c305-dba8-4141-a7a9-ed760f0266cb&offset=0');
//                 const data = await response.json();
//                 const match = data.data.find((m) => m.id === matchId);
//                 setMatchDetails(match);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchMatchDetails();
//     }, [matchId]);

//     if (loading) return <div>Loading scorecard...</div>;
//     if (error) return <div>Error: {error}</div>;

//     return (
//         <div className="container mt-5">
//             {matchDetails ? (
//                 <>
//                     <h2 className="mb-4 text-center">{matchDetails.name}</h2>
//                     <div className="row">
//                         {/* First Column - Match Details */}
//                         <div className="col-md-6">
//                             <table className="table table-bordered">
//                                 <tbody>
//                                     <tr>
//                                         <th>Match Type</th>
//                                         <td>{matchDetails.matchType}</td>
//                                     </tr>
//                                     <tr>
//                                         <th>Status</th>
//                                         <td>{matchDetails.status}</td>
//                                     </tr>
//                                     <tr>
//                                         <th>Venue</th>
//                                         <td>{matchDetails.venue}</td>
//                                     </tr>
//                                     <tr>
//                                         <th>Date & Time</th>
//                                         <td>{new Date(matchDetails.dateTimeGMT).toLocaleString()}</td>
//                                     </tr>
//                                 </tbody>
//                             </table>
//                             <div className="row" style={{marginTop:"3cm"}}>
//                                 {matchDetails.teamInfo.map((team, index) => (
//                                     <div className="col-md-6 d-flex align-items-center mb-3" key={index}>
//                                         <img src={team.img} alt={team.name} className="img-fluid rounded-circle" style={{ width: '48px', height: '48px' }} />
//                                         <span className="ml-3"><strong>{team.name}</strong> ({team.shortname})</span>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Second Column - Match Score */}
//                         <div className="col-md-6">
//                             <h4 className="mb-3">Score</h4>
//                             {matchDetails.score && matchDetails.score.length > 0 ? (
//                                 matchDetails.score.map((inning, index) => (
//                                     <table className="table table-striped mb-3" key={index}>
//                                         <thead>
//                                             <tr>
//                                                 <th colSpan="2">{inning.inning}</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             <tr>
//                                                 <th>Runs</th>
//                                                 <td>{inning.r}</td>
//                                             </tr>
//                                             <tr>
//                                                 <th>Wickets</th>
//                                                 <td>{inning.w}</td>
//                                             </tr>
//                                             <tr>
//                                                 <th>Overs</th>
//                                                 <td>{inning.o}</td>
//                                             </tr>
//                                         </tbody>
//                                     </table>
//                                 ))
//                             ) : (
//                                 <p>No score data available.</p>
//                             )}
//                         </div>
//                     </div>
//                 </>
//             ) : (
//                 <div>No match details available.</div>
//             )}
//         </div>
//     );
// };

// export default Scorecard;

///////////////////////////////////////////////////////////////////////
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const Scorecard = () => {
//     const { matchId } = useParams();
//     const [matchDetails, setMatchDetails] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchMatchDetails = async () => {
//             try {
//                 const response = await fetch('https://api.cricapi.com/v1/currentMatches?apikey=8818c305-dba8-4141-a7a9-ed760f0266cb&offset=0');
//                 const data = await response.json();
//                 const match = data.data.find((m) => m.id === matchId);
//                 setMatchDetails(match);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchMatchDetails();
//     }, [matchId]);

//     if (loading) return <div>Loading scorecard...</div>;
//     if (error) return <div>Error: {error}</div>;

//     return (
//         <div className="container mt-5">
//             {matchDetails ? (
//                 <>
//                     <h1 className="mb-4">{matchDetails.name}</h1>
//                     <p><strong>Match Type:</strong> {matchDetails.matchType}</p>
//                     <p><strong>Status:</strong> {matchDetails.status}</p>
//                     <p><strong>Venue:</strong> {matchDetails.venue}</p>
//                     <p><strong>Date & Time:</strong> {new Date(matchDetails.dateTimeGMT).toLocaleString()}</p>

//                     <div className="row mb-4">
//                         {matchDetails.teamInfo.map((team, index) => (
//                             <div className="col-md-6 d-flex align-items-center" key={index}>
//                                 <img src={team.img} alt={team.name} className="img-fluid rounded-circle" style={{ width: '48px', height: '48px' }} />
//                                 <span className="ml-3"><strong>{team.name}</strong> ({team.shortname})</span>
//                             </div>
//                         ))}
//                     </div>

//                     <h3>Score</h3>
//                     {matchDetails.score && matchDetails.score.length > 0 ? (
//                         <table className="table table-striped">
//                             <thead>
//                                 <tr>
//                                     <th>Inning</th>
//                                     <th>Runs</th>
//                                     <th>Wickets</th>
//                                     <th>Overs</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {matchDetails.score.map((inning, index) => (
//                                     <tr key={index}>
//                                         <td>{inning.inning}</td>
//                                         <td>{inning.r}</td>
//                                         <td>{inning.w}</td>
//                                         <td>{inning.o}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     ) : (
//                         <p>No score data available.</p>
//                     )}
//                 </>
//             ) : (
//                 <div>No match details available.</div>
//             )}
//         </div>
//     );
// };

// export default Scorecard;
