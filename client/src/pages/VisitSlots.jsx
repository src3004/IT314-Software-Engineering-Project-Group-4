import React, { useState } from 'react';
import './VisitSlots.css';

const VisitSlots = () => {
  const [slots, setSlots] = useState([
    {
      id: 1,
      name: 'Sunrise Haven',
      date: '07/12/2024',
      time: '11.00 am to 12.00 pm',
      status: 'Pending',
    },
    {
      id: 2,
      name: 'Oakwood Gardens',
      date: '08/11/2024',
      time: '4.00 pm to 5.00 pm',
      status: 'Pending',
    },
    {
      id: 3,
      name: 'Haven Heights',
      date: '14/10/2024',
      time: '2.00 pm to 3.00 pm',
      status: 'Visited Successfully',
    },
  ]);

 

  return (
    <div className="bookedslots">
      <h1 className="bookedslots-title">Booked Slots</h1>
      <div className="bookedslots-container">
        {slots.map((slot) => (
          <div key={slot.id} className="bookedslots-card">
            <img src={slot.image} alt={slot.name} className="bookedslots-image" />
            <div className="bookedslots-details">
              <h2>{slot.name}</h2>
              <p>Date: {slot.date}</p>
              <p>Time: {slot.time}</p>
            </div>
            <div className="bookedslots-actions">
              <span
                className={`bookedslots-status ${
                  slot.status === 'Pending' ? 'pending' : 'visited'
                }`}
              >
                {slot.status}
              </span>
              {slot.status === 'Pending' && (
                <button
                  className="bookedslots-cancel-button"
                >
                  Cancel Appointment
                </button>
              )}
            </div>
          </div>
        ))}
        {slots.length === 0 && (
          <p className="bookedslots-no-appointments">No appointments booked.</p>
        )}
      </div>
    </div>
  );
};

export default VisitSlots;
