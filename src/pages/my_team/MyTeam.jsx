import React, { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import axios from "axios";
import Navbar from "../../components/Navbar";
import "./MyTeam.css";

const PlayerCard = ({ player }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "PLAYER",
        item: player,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            className={`card ${isDragging ? "dragging" : ""}`}
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            <span className="name">{player.name || "No Name"}</span>
            <span className="phone">{player.phone || "No Phone"}</span>
        </div>
    );
};

const Container = ({ title, players, onDrop }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "PLAYER",
        drop: (item) => onDrop(item),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    return (
        <div
            ref={drop}
            className={`container ${isOver ? "hover" : ""}`}
            style={{
                backgroundColor: isOver ? "#e6ffee" : "#fff",
            }}
        >
            <div className="section-header">{title}</div>
            {players.length > 0 ? (
                players.map((player) => (
                    <PlayerCard key={player.id || player._id} player={player} />
                ))
            ) : (
                <div className="empty-slot">No players assigned</div>
            )}
        </div>
    );
};

const MyTeam = () => {
    const [friendsList, setFriendsList] = useState([]);
    const [goalKeeper, setGoalKeeper] = useState([]);
    const [defender, setDefender] = useState([]);
    const [winger, setWinger] = useState([]);
    const [forward, setForward] = useState([]);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/user/friends",
                    {
                        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                    }
                );
                setFriendsList(response.data.friends);
            } catch (error) {
                console.error("Error fetching friends:", error);
            }
        };

        fetchFriends();
    }, []);

    const handleDrop = (role, player) => {
        // Add the player to the target role
        if (role === "goalkeeper" && !goalKeeper.some((p) => p.id === player.id)) {
            setGoalKeeper([player]);
        } else if (role === "defender" && !defender.some((p) => p.id === player.id)) {
            setDefender([player]);
        } else if (role === "winger" && !winger.some((p) => p.id === player.id)) {
            setWinger([player]);
        } else if (role === "forward" && !forward.some((p) => p.id === player.id)) {
            setForward([player]);
        }

        // Remove the player from other role boxes
        if (role !== "goalkeeper") setGoalKeeper((prev) => prev.filter((p) => p.id !== player.id));
        if (role !== "defender") setDefender((prev) => prev.filter((p) => p.id !== player.id));
        if (role !== "winger") setWinger((prev) => prev.filter((p) => p.id !== player.id));
        if (role !== "forward") setForward((prev) => prev.filter((p) => p.id !== player.id));
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="my-team-container">
                <Navbar />
                <h1 className="title">My Team</h1>
                <div className="team-sections">
                    <Container
                        title="Friends"
                        players={friendsList.filter(
                            (friend) =>
                                !goalKeeper.some((p) => p.id === friend.id) &&
                                !defender.some((p) => p.id === friend.id) &&
                                !winger.some((p) => p.id === friend.id) &&
                                !forward.some((p) => p.id === friend.id)
                        )}
                        onDrop={() => {}}
                    />
                    <div className="role-grid">
                        <Container
                            title="Goalkeeper"
                            players={goalKeeper}
                            onDrop={(player) => handleDrop("goalkeeper", player)}
                        />
                        <Container
                            title="Defender"
                            players={defender}
                            onDrop={(player) => handleDrop("defender", player)}
                        />
                        <Container
                            title="Winger"
                            players={winger}
                            onDrop={(player) => handleDrop("winger", player)}
                        />
                        <Container
                            title="Forward"
                            players={forward}
                            onDrop={(player) => handleDrop("forward", player)}
                        />
                    </div>
                </div>
            </div>
        </DndProvider>
    );
};

export default MyTeam;
