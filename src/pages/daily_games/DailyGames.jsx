import React, { useState } from "react";
import Navbar from "../../components/Navbar"; // Ensure the path to Navbar.jsx is correct
import "./DailyGames.css";

const DailyGames = () => {
    const [searchValue, setSearchValue] = useState("");
    const [availableTeams, setAvailableTeams] = useState(["TEAM ELECTRO"]);
    const [myTeam, setMyTeam] = useState("MY TEAM");

    const handleSearch = () => {
        alert(`Search functionality not implemented for "${searchValue}"`);
    };

    const handleSetMatch = (team) => {
        alert(`Match set for ${team}`);
    };

    const handleRemove = (team) => {
        setAvailableTeams(availableTeams.filter((t) => t !== team));
    };

    const handleAddToMyTeam = () => {
        setMyTeam("TEAM ELECTRO");
    };

    return (
        <div>
            {/* Include Navbar */}
            <Navbar />

            {/* Main Daily Games Container */}
            <div className="daily-games-container">
                {/* Search Team Section */}
                <div className="section" id="search-team">
                    <div className="box">
                        <div className="section-header">SEARCH TEAM</div>
                        <input
                            type="text"
                            placeholder="#"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="input-box"
                        />
                        <button className="button search-button" onClick={handleSearch}>
                            Search
                        </button>
                    </div>
                </div>

                {/* Available Teams Section */}
                <div className="section" id="available-teams">
                    <div className="box">
                        <div className="section-header">AVAILABLE TEAMS</div>
                        {availableTeams.map((team, index) => (
                            <div key={index} className="team-item">
                                <div className="team-name">{team}</div>
                                <button
                                    className="button set-match-button"
                                    onClick={() => handleSetMatch(team)}
                                >
                                    Set Match
                                </button>
                                <button
                                    className="button remove-button"
                                    onClick={() => handleRemove(team)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Add or Remove Section */}
                <div className="section" id="add-remove">
                    <div className="box">
                        <div className="section-header">ADD OR REMOVE</div>
                        <div className="team-item">
                            <div className="team-name">{myTeam}</div>
                        </div>
                        <button className="button add-button" onClick={handleAddToMyTeam}>
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DailyGames;
