import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS
import Navbar from "../../components/Navbar"; // Ensure the path to Navbar.jsx is correct
import "./DailyGames.css";

const TeamItem = ({ team, onSetMatch, onRemove }) => (
    <div className="team-item">
        <div className="team-name">{team}</div>
        <div className="button-container">
            <button
                className="button set-match-button"
                onClick={() => onSetMatch(team)}
            >
                Set Match
            </button>
            {onRemove && (
                <button
                    className="button remove-button"
                    onClick={() => onRemove(team)}
                >
                    Remove
                </button>
            )}
        </div>
    </div>
);

const DailyGames = () => {
    const [searchValue, setSearchValue] = useState("");
    const [availableTeams, setAvailableTeams] = useState(() => {
        // Load from localStorage or initialize with default teams
        const storedTeams = localStorage.getItem("availableTeams");
        return storedTeams ? JSON.parse(storedTeams) : ["TEAM ELECTRO", "TEAM BLAZE"];
    });
    const [filteredTeams, setFilteredTeams] = useState([]);
    const [myTeam, setMyTeam] = useState("MY TEAM");
    const [isMyTeamAdded, setIsMyTeamAdded] = useState(false);

    // Save `availableTeams` to localStorage whenever it updates
    useEffect(() => {
        localStorage.setItem("availableTeams", JSON.stringify(availableTeams));
    }, [availableTeams]);

    const handleSearch = () => {
        if (searchValue.trim() === "") {
            setFilteredTeams([]);
            return;
        }
        const results = availableTeams.filter((team) =>
            team.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredTeams(results);
    };

    const handleSetMatch = (team) => {
        toast.success(`Match set for ${team}`, {
            position: "top-center",
            autoClose: 2000, // Close after 2 seconds
        });
    };

    const handleRemove = (team) => {
        setAvailableTeams(availableTeams.filter((t) => t !== team));
        toast.success(`${team} removed successfully`, {
            position: "top-center",
            autoClose: 2000,
        });
    };

    const handleAddToAvailableTeams = () => {
        if (!myTeam.trim()) {
            toast.error("Team name cannot be empty.", {
                position: "top-center",
                autoClose: 2000,
            });
            return;
        }
        if (availableTeams.includes(myTeam)) {
            toast.error("Team already exists.", {
                position: "top-center",
                autoClose: 2000,
            });
            return;
        }
        setAvailableTeams([...availableTeams, myTeam]);
        setIsMyTeamAdded(true);
        toast.success(`${myTeam} added successfully`, {
            position: "top-center",
            autoClose: 2000,
        });
    };

    const handleRemoveMyTeam = () => {
        setAvailableTeams(availableTeams.filter((team) => team !== myTeam));
        setIsMyTeamAdded(false);
        toast.success(`${myTeam} removed successfully`, {
            position: "top-center",
            autoClose: 2000,
        });
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
                        <div className="search-results">
                            {filteredTeams.length > 0 ? (
                                filteredTeams.map((team, index) => (
                                    <TeamItem
                                        key={index}
                                        team={team}
                                        onSetMatch={handleSetMatch}
                                    />
                                ))
                            ) : searchValue ? (
                                <div className="empty-message">No teams found</div>
                            ) : null}
                        </div>
                    </div>
                </div>

                {/* Available Teams Section */}
                <div className="section" id="available-teams">
                    <div className="box">
                        <div className="section-header">AVAILABLE TEAMS</div>
                        {availableTeams.map((team, index) => (
                            <TeamItem
                                key={index}
                                team={team}
                                onSetMatch={handleSetMatch}
                                onRemove={handleRemove}
                            />
                        ))}
                    </div>
                </div>

                {/* Add or Remove Section */}
                <div className="section" id="add-remove">
                    <div className="box">
                        <div className="section-header">ADD OR REMOVE</div>
                        <div className="team-item">
                            <input
                                type="text"
                                value={myTeam}
                                onChange={(e) => setMyTeam(e.target.value)}
                                className="input-box"
                                placeholder="Edit team name"
                            />
                        </div>
                        {!isMyTeamAdded ? (
                            <button
                                className="button add-button"
                                onClick={handleAddToAvailableTeams}
                            >
                                Add
                            </button>
                        ) : (
                            <button
                                className="button remove-button"
                                onClick={handleRemoveMyTeam}
                            >
                                Remove
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Toast Container */}
            <ToastContainer />
        </div>
    );
};

export default DailyGames;
