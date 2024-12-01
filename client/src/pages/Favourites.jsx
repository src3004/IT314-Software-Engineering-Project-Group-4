import React from "react";
import "./Favourites.css";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import bedroomIcon from '../assets/furnished-icon.png';
import parkingIcon from '../assets/parking-icon.png';
import noParkingIcon from '../assets/noparking-icon.png';
import locationIcon from '../assets/location-icon.png';

export default function Favourites()
{
  const { currentUser } = useSelector((state) => state.user);
  const [userFav, setUserFav] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const fetchFav = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(`/api/favourite/get/${currentUser._id}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          return;
        }
        setError(false);
        setUserFav(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchFav();
  }, [currentUser]);

  const handleFavDelete = async (listingId) => {
    try {
      setDeleteLoading(true);
      setDeleteError(false);
      const res = await fetch(`/api/favourite/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false)
      {
        setDeleteError(data.message);
        setDeleteLoading(false);
        return;
      }
      setDeleteLoading(false);
      setUserFav((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      setDeleteError(error);
      setDeleteLoading(false);
    }
  };

  const properties = userFav;
  return (
    <div className="Saved_Property">
      <h2 className="font-semibold text-2xl text-center mb-4" style={{color: '#2d9c2d'}}>Favourites</h2>
      {loading && <p className='text-center my-7 text-2xl font-semibold text-gray-700'>Loading...</p>}
      {error && <p className='text-center my-7 text-2xl font-semibold text-gray-700'>Error showing Favourites!</p>}
      {properties && properties.length === 0 && (
        <div className='text-gray-700 text-center font-semibold' style={{padding: 225}}>No Favourite Properties!</div>
      )}
      {deleteError && <p className='text-center text-red-700 mb-3'>{deleteError}</p>}
      {properties && !loading && !error && (
        <div className="properties-grid">
        {properties.slice().reverse().map((property, index) => (
          <div key={index} className="property-card">
            <Link to={`/listing/${property.listingId}`}><div
              className="property-image"
              style={{
                backgroundImage: `url(${property.image})`,
              }}
              ></div></Link>
            <h3>{property.name}</h3>
            <div className='flex justify-center gap-12'>
              <p className="price">₹ {property.price}</p>
              <p className='price'>For {((property.type)=='sale'?'Sale':'Rent')}</p>
            </div>
            <div className="location details">
              <span>
                <img
                  src={locationIcon}
                  alt="Location"
                  className="icon"
                />
                {property.city}
              </span>
            </div>
            <div className="details">
              <span>
                <img
                  src={bedroomIcon}
                  alt="Bedroom"
                  className="icon bedroom"
                  />
                {property.bedrooms}
              </span>
              <span>
                <img
                  src={property.parking ? parkingIcon : noParkingIcon}
                  alt="Parking"
                  className="icon"
                  />
              </span>
            </div>
            <button disabled={deleteLoading} className="remove-btn" onClick={() => handleFavDelete(property._id)}> Remove</button>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};