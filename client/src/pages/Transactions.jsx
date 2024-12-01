import React from "react";
import "./Transactions.css";

const Transactions = () => {
  const transactions = [
    {
      id: "4510241415",
      name: "Sunrise Haven",
      date: "07/12/2024",
      amount: "5000 ₹",
      // image: sunriseHaven,
    },
    {
      id: "4510241420",
      name: "Oakwood Gardens",
      date: "08/11/2024",
      amount: "15000 ₹",
      // image: oakwoodGardens,
    },
    {
      id: "4510241435",
      name: "Haven Heights",
      date: "14/10/2024",
      amount: "10000 ₹",
      // image: havenHeights,
    },
  ];

  return (
    <div className="bookedslots">
      <h2 className="font-semibold text-2xl text-center mb-4" style={{color: '#2d9c2d'}}>Transactions</h2>
      <div className="bookedslots-container">
        {transactions.map((transaction) => (
          <div className="transactions-card" key={transaction.id}>
            <img
              src={transaction.image}
              alt={transaction.name}
              className="bookedslots-image"
            />
            <div className="bookedslots-details">
              <h2>{transaction.name}</h2>
              <p>
                <strong>Date:</strong> {transaction.date}
              </p>
              <p>
                <strong>Token Amount:</strong> {transaction.amount}
              </p>
            </div>
            <button className="transactions-button">
              Transaction ID: {transaction.id}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;
