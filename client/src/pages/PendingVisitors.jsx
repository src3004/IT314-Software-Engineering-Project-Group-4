import React from 'react';
import './VisitSlots.css';

const PendingVisitors = () => {

  return (
    <div className="bookedslots">
      <h2 className="font-semibold text-2xl text-center mb-4" style={{color: '#2d9c2d'}}>Pending Visitors</h2>
        <div className="bookedslots-container">
          {visits.map((visit) => (
            <div key={visit._id} className="bookedslots-card">
              <img src={visit.image} alt={visit.name} className="bookedslots-image" />
              <div className="bookedslots-details">
                <h2>{visit.name}</h2>
                <p>Buyer: {visit.buyerName}</p>
                <p>Date: {visit.date}</p>
                <p>Time: {visit.visitSlot}</p>
              </div>
              <div className="bookedslots-actions">
                <span
                  className={`bookedslots-status ${
                    visit.status
                  }`}
                >
                  {((visit.status==='visited')?('Visited'):((visit.status==='pending')?('Pending'):('Cancelled')))}
                </span>
                {visit.status === 'pending' && (
                  <button
                    className="bookedslots-visited-button"
                  >
                    Mark as Visited
                  </button>
                )}
                {visit.status === 'pending' && (
                  <button
                    className="bookedslots-cancel-button"
                  >
                    Cancel Appointment
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
    </div>
  );
};

export default PendingVisitors;
