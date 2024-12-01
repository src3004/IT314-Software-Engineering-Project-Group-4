import React, { useEffect, useState } from "react";
import "./Transactions.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Transactions = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userTransactions, setUserTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`/api/transaction/get/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setError(true);
        return;
      }
      setUserTransactions(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

    fetchTransactions();
  }, [currentUser]);

  return (
    <div className="bookedslots">
      <h2 className="font-semibold text-2xl text-center mb-4" style={{color: '#2d9c2d'}}>Transactions</h2>
      {loading && <p className='text-center my-7 text-2xl font-semibold text-gray-700'>Loading...</p>}
      {error && <p className='text-center my-7 text-2xl font-semibold text-gray-700'>Error showing Transactions</p>}
      {userTransactions && userTransactions.length === 0 && (
        <div className='text-gray-700 text-center font-semibold' style={{padding: 225}}>No Transactions Found</div>
      )}
      {userTransactions && !loading && !error && (

        <div className="bookedslots-container">
        {userTransactions.map((transaction) => (
          <div className="transactions-card" key={transaction._id}>
            <Link to={`/listing/${transaction.listingId}`}><img
              src={transaction.image}
              alt={transaction.name}
              className="bookedslots-image"
              /></Link>
            <div className="bookedslots-details">
              <h2>{transaction.name}</h2>
              <p>
                <strong>Date:</strong> {transaction.date}
              </p>
              <p style={{color: `${transaction.type==='received'?'#2d572c':'#d32f2f'}`}}>
                <strong>{(transaction.type==='received')?'Received':'Sent'}: ₹ {transaction.tokenAmount}</strong>
              </p>
            </div>
            <button type="button" className={`transactions-button ${transaction.type}`}>
              Transaction ID: {transaction.transactionId}
            </button>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default Transactions;
