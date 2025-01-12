import React from "react";
import Navbar from "../../components/Navbar"; // Adjust the import path as per your project structure
import "./BookingDetails.css";

const BookingDetails = () => {
  const bookings = [
    {
      id: 1,
      name: "Prashantbasel",
      contact: "9843011181",
      bookingDate: "12/22/2024",
      bookingTime: "8am-9am",
      bookingState: "Cancel Booking",
    },
    {
      id: 2,
      name: "Prashantbasel",
      contact: "9843011181",
      bookingDate: "8/4/2024",
      bookingTime: "8am-9am",
      bookingState: "Played",
    },
  ];

  return (
    <div className="booking-details">
      <Navbar />
      <div className="booking-details__content">
        <h1 className="booking-details__title">Booking View</h1>
        <table className="booking-details__table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact Number</th>
              <th>Booking Date</th>
              <th>Booking Time</th>
              <th>Booking State</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.name}</td>
                <td>{booking.contact}</td>
                <td>{booking.bookingDate}</td>
                <td>{booking.bookingTime}</td>
                <td>
                  {booking.bookingState === "Cancel Booking" ? (
                    <button className="btn btn--cancel">
                      {booking.bookingState}
                    </button>
                  ) : (
                    <button className="btn btn--played">
                      {booking.bookingState}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingDetails;
