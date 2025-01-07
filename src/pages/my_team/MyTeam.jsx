import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
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
            <span className="name">{player.name}</span>
            <span className="phone">{player.phone}</span>
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
                    <PlayerCard key={player.id} player={player} />
                ))
            ) : (
                <div className="empty-slot">No players assigned</div>
            )}
        </div>
    );
};

const MyTeam = () => {
    const [friendsList, setFriendsList] = useState([
        { id: 1, name: "Prashanna Shah", phone: "9843011181" },
        { id: 2, name: "Prashant Basel", phone: "9843011182" },
        { id: 3, name: "Ankit Thapa", phone: "9843011183" },
        { id: 4, name: "Sujan Shrestha", phone: "9843011184" },
    ]);

    const [goalKeeper, setGoalKeeper] = useState([]);
    const [defender, setDefender] = useState([]);
    const [winger, setWinger] = useState([]);
    const [forward, setForward] = useState([]);

    const handleDrop = (role, player) => {
        const removeFromPrevious = (list, setList) => {
            setList((prev) => prev.filter((p) => p.id !== player.id));
        };

        // Remove player from all containers
        removeFromPrevious(friendsList, setFriendsList);
        removeFromPrevious(goalKeeper, setGoalKeeper);
        removeFromPrevious(defender, setDefender);
        removeFromPrevious(winger, setWinger);
        removeFromPrevious(forward, setForward);

        // Add player to the target container
        if (role === "friends") {
            setFriendsList((prev) => [...prev, player]);
        } else if (role === "goalkeeper") {
            setGoalKeeper((prev) => [...prev, player]);
        } else if (role === "defender") {
            setDefender((prev) => [...prev, player]);
        } else if (role === "winger") {
            setWinger((prev) => [...prev, player]);
        } else if (role === "forward") {
            setForward((prev) => [...prev, player]);
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="my-team-container">
                <Navbar />
                <h1 className="title">My Team</h1>
                <div className="team-sections">
                    <Container
                        title="Friends"
                        players={friendsList}
                        onDrop={(player) => handleDrop("friends", player)}
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
