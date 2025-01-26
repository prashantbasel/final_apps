import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar"; // Adjust the path as needed
import "./BookingDetails.css";

const BookingDetails = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch("http://localhost:5000/booking/all");
      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }
      const data = await response.json();
      setBookings(data.bookings);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleOpenModal = (id) => {
    setBookingToCancel(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setBookingToCancel(null);
  };

  const handleCancelBooking = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `http://localhost:5000/booking/delete/${bookingToCancel}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to cancel booking");
      }

      setBookings(bookings.filter((booking) => booking._id !== bookingToCancel));
      handleCloseModal();
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const isPlayed = (bookingDate, bookingTime) => {
    const [startTime] = bookingTime.split("-");
    const bookingDateTime = new Date(bookingDate);
    const hours = parseInt(startTime.match(/\d+/)[0], 10);
    const isPM = startTime.includes("pm");

    bookingDateTime.setHours(isPM ? hours + 12 : hours, 0, 0);
    return new Date() > bookingDateTime;
  };

  return (
    <div className="booking-details">
      <Navbar />
      <div className="booking-details__content">
        <h1 className="booking-details__title">Booking View</h1>
        {error && <p className="error-message">{error}</p>}
        <table className="booking-details__table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Booking Date</th>
              <th>Booking Time</th>
              <th>Booking State</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.contactNumber || "N/A"}</td>
                <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                <td>{booking.bookingTime}</td>
                <td>
                  {isPlayed(booking.bookingDate, booking.bookingTime) ? (
                    <span className="badge badge--played">Played</span>
                  ) : (
                    <button
                      className="btn btn--cancel"
                      onClick={() => handleOpenModal(booking._id)}
                    >
                      Cancel Booking
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Custom Modal */}
      {isModalOpen && (
        <div className="custom-modal">
          <div className="modal-content">
            <h2>Are you sure you want to cancel?</h2>
            <div className="modal-buttons">
              <button className="btn btn--no" onClick={handleCloseModal}>
                No
              </button>
              <button className="btn btn--yes" onClick={handleCancelBooking}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingDetails;
