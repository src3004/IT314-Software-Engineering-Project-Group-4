import React from "react";
import "./Favourites.css";


import bedroomIcon from '../assets/furnished-icon.png';
import parkingIcon from '../assets/parking-icon.png';
import noParkingIcon from '../assets/noparking-icon.png';
import locationIcon from '../assets/location-icon.png';

const Favourites = () => {
  const properties = [
    {
      name: "Modern Family Home",
      price: "$500000",
      location: "Gandhinagar",
      bedrooms: 3,
      parking: false,
    },
    {
      name: "Parshwa Luxuria",
      price: "$700000",
      location: "Rajkot",
      bedrooms: 2,
      parking: false,
    },
    {
      name: "Maitri Elevate",
      price: "$600000",
      location: "Ahmedabad",
      bedrooms: 1,
      parking: true,
    },
    {
      name: "Aadhya Arambh",
      price: "$550000",
      location: "Anand",
      bedrooms: 3,
      parking: true,
    },
    {
      name: "Venus Deshna",
      price: "$600000",
      location: "Surat",
      bedrooms: 3,
      parking: false,
    },
    {
      name: "The Sovereign",
      price: "$575000",
      location: "Jamnagar",
      bedrooms: 4,
      parking: true,
    },
  ];

  return (
    <div className="Saved_Property">
      <h2 className="font-semibold text-2xl text-center mb-4" style={{color: '#2d9c2d'}}>Favourites</h2>
      <div className="properties-grid">
        {properties.map((property, index) => (
          <div key={index} className="property-card">
            <div
              className="property-image"
              style={{
                backgroundImage: `url(${property.image})`,
              }}
            ></div>
            <h3>{property.name}</h3>
            <p className="price">{property.price}</p>
            <div className="location details">
              <span>
                <img
                  src={locationIcon}
                  alt="Location"
                  className="icon"
                />
                {property.location}
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
            <button className="remove-btn">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favourites;
