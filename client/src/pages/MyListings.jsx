import React from "react";
import "./MyListings.css";

// Import images from src/assets folder
import bedroomIcon from '../assets/bed-icon.png';
import parkingIcon from '../assets/parking-icon.png';
import noParkingIcon from '../assets/noparking-icon.png';
import locationIcon from '../assets/location-icon.png';

// Import property images
import modernFamilyHomeImg from '../assets/1.jpg';
import parshwaLuxuriaImg from '../assets/2.jpg';
import maitriElevateImg from '../assets/3.jpg';
import aadhyaArambhImg from '../assets/4.jpg';
import venusDeshnaImg from '../assets/5.jpg';
import theSovereignImg from '../assets/6.jpg';

const MyListings = () => {
  const properties = [
    {
      name: "Serenity Heights",
      price: "$750000",
      location: "Gandhinagar",
      bedrooms: 5,
      parking: true,
      image: modernFamilyHomeImg,
    },
    {
      name: "Golden Acres Townhomes",
      price: "$700000",
      location: "Rajkot",
      bedrooms: 3,
      parking: false,
      image: parshwaLuxuriaImg,
    },
    {
      name: "Maplewood Residences",
      price: "$600000",
      location: "Ahmedabad",
      bedrooms: 1,
      parking: false,
      image: maitriElevateImg,
    },
    {
      name: "Evergreen Villas",
      price: "$550000",
      location: "Anand",
      bedrooms: 2,
      parking: true,
      image: aadhyaArambhImg,
    },
    {
      name: "Cedar Ridge Estates",
      price: "$600000",
      location: "Surat",
      bedrooms: 2,
      parking: true,
      image: venusDeshnaImg,
    },
    {
      name: "Blue Horizon Apartments",
      price: "$575000",
      location: "Jamnagar",
      bedrooms: 3,
      parking: false,
      image: theSovereignImg,
    },
  ];

  return (
    <div className="Manage_Listings">
      <h2 className="font-semibold text-2xl">Manage Your Listings</h2>
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
            <div className="buttons">
              <button className="edit-btn">Edit</button>
              <hr className="button-separator" />
              <button className="delete-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyListings;
