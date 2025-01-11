import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Friends.css";
import Navbar from "../../components/Navbar";

const Friends = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const friendRequestsResponse = await axios.get(
                    "http://localhost:5000/api/user/friend-requests",
                    {
                        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                    }
                );
                setFriendRequests(friendRequestsResponse.data.friendRequests);

                const friendsResponse = await axios.get(
                    "http://localhost:5000/api/user/friends",
                    {
                        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                    }
                );
                setFriends(friendsResponse.data.friends);

                // Save the friends list to localStorage
                localStorage.setItem("friends", JSON.stringify(friendsResponse.data.friends));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            alert("Please enter a search term.");
            return;
        }

        try {
            const response = await axios.get(
                `http://localhost:5000/api/user/search?query=${searchTerm}`,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
            );
            setSearchResults(response.data.users);
        } catch (error) {
            console.error("Error searching users:", error);
        }
    };

    const handleAddFriend = async (friendId) => {
        console.log("Friend ID being sent:", friendId);
        try {
            await axios.post(
                "http://localhost:5000/api/user/add-friend",
                { friendId },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
            );
            alert("Friend added successfully!");
            setSearchResults((prev) => prev.filter((user) => user._id !== friendId));
        } catch (error) {
            console.error("Error adding friend:", error);
        }
    };

    const handleAcceptRequest = async (requestId) => {
        try {
            await axios.post(
                "http://localhost:5000/api/user/accept-friend-request",
                { requestId },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
            );
            alert("Friend request accepted!");
            setFriendRequests((prev) => prev.filter((req) => req.id !== requestId));
            setFriends((prev) => [...prev, { id: requestId }]); // Add to friends list
        } catch (error) {
            console.error("Error accepting friend request:", error);
        }
    };

    const handleRejectRequest = async (requestId) => {
        try {
            await axios.post(
                "http://localhost:5000/api/user/reject-friend-request",
                { requestId },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
            );
            alert("Friend request rejected!");
            setFriendRequests((prev) => prev.filter((req) => req.id !== requestId));
        } catch (error) {
            console.error("Error rejecting friend request:", error);
        }
    };

    const handleRemoveFriend = async (friendId) => {
        try {
            await axios.post(
                "http://localhost:5000/api/user/remove-friend",
                { friendId },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
            );
            alert("Friend removed successfully!");
            setFriends((prev) => prev.filter((friend) => friend.id !== friendId && friend._id !== friendId));

            // Update localStorage after removing the friend
            // const updatedFriends = friends.filter((friend) => friend.id !== friendId && friend._id !== friendId);
            // localStorage.setItem("friends", JSON.stringify(updatedFriends));
        } catch (error) {
            console.error("Error removing friend:", error);
        }
    };

    return (
        <div className="friend-container">
            <Navbar />
            <div className="friend-title">Friends</div>
            <div className="friend-sections">
                {/* Search Player Section */}
                <div className="friend-card">
                    <div className="section-header">Search Player</div>
                    <input
                        type="text"
                        className="search-input"
                        id="search-player"
                        name="searchPlayer"
                        placeholder="Enter name or email"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="search-button" onClick={handleSearch}>
                        Search
                    </button>
                    <div className="search-results">
                        {searchResults.length > 0 ? (
                            searchResults.map((user) => (
                                <div key={user._id} className="search-result-item">
                                    <div className="search-details">
                                        <span className="search-name">{user.name}</span>
                                        <span className="search-email">{user.email}</span>
                                    </div>
                                    <button
                                        className="add-friend-button"
                                        onClick={() => handleAddFriend(user._id)}
                                    >
                                        Add
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="empty-message">No results found</div>
                        )}
                    </div>
                </div>

                {/* Friend Requests Section */}
                <div className="friend-card">
                    <div className="section-header">Friend Requests</div>
                    {friendRequests.length > 0 ? (
                        friendRequests.map((request) => (
                            <div key={request.id} className="request-card">
                                <span className="request-name">{request.name}</span>
                                <div>
                                    <button
                                        className="confirm-button"
                                        onClick={() => handleAcceptRequest(request.id)}
                                    >
                                        Confirm
                                    </button>
                                    <button
                                        className="delete-button"
                                        onClick={() => handleRejectRequest(request.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="empty-message">No friend requests</div>
                    )}
                </div>

                {/* Friends List Section */}
                <div className="friend-card">
                    <div className="section-header">Friends</div>
                    {friends.length > 0 ? (
                        friends.map((friend) => (
                            <div key={friend.id || friend._id} className="friend-card-item">
                                <span className="friend-name">{friend.name || friend.firstName || "No Name"}</span>
                                <span className="friend-phone">{friend.phone}</span>
                                <button
                                    className="remove-friend-button"
                                    onClick={() => handleRemoveFriend(friend.id || friend._id)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="empty-message">No friends</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Friends;
