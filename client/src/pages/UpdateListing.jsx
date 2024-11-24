import React, { useState } from "react";
import "./CreateListing.css";

const Temp = () => {

  return (
    <div className={`add-property`}>
    <div className="add-property-page">
      <main className="form-container">
        <h2 className="text-lg"><strong>Update Property</strong></h2>
        <form className="flex flex-col sm:flex-row justify-between">
            <div className={`first`}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            id = 'name'
            maxLength='62'
            minLength='10'
            required
            />
          <textarea
            name="description"
            placeholder="Description"
            id = 'description'
            required
            ></textarea>
          <input
            type="text"
            name="address"
            placeholder="Address"
            id = 'address'
            required
            />
            <div className="checkbox-group flex flex-wrap gap-3">
            <label>
            <input
            type="checkbox"
                id="sale"
              />
              Sale
            </label>
            <label>
              <input
                type="checkbox"
                id="rent"
              />
              Rent
            </label>
            <label>
              <input
                type="checkbox"
                id="parking"
              />
              Parking
            </label>
            <label>
              <input
                type="checkbox"
                id="furnished"
              />
              Furnished
            </label>
            <label>
            <input
            type="checkbox"
                id="gym"
              />
              Gym
            </label>
            <label>
            <input
            type="checkbox"
                id="garden"
              />
              Garden
            </label>
          </div>
          <div className="beds-baths">
            <input
              type="number"
              id="beds"
              min="1"
              required
            />
            <label>Beds</label>
          </div>
          <div className="price-input">
            <input
              type="number"
              id="price"
              min="0"
              required
            />
            <label>Regular Price (in ₹)</label>
          </div>
            </div>
            <div className={`second`}>
            <div className="file-upload flex flex-col">
            <span>Images: The first image will be the cover (max 6)</span>
            <div className="flex gap-4">
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button type="button" className="upload-button self-center">Upload</button>
            </div>
          </div>
          <div className="time-slot">
            <select
              multiple
              style={{ height: "350px" }} // Optional: Adjust height to show more options
              id="visitSlots"
            >
              <option id="ts1">6:00 AM - 7:00 AM</option>
              <option id="ts2">7:00 AM - 8:00 AM</option>
              <option id="ts3">8:00 AM - 9:00 AM</option>
              <option id="ts4">9:00 AM - 10:00 AM</option>
              <option id="ts5">10:00 AM - 11:00 AM</option>
              <option id="ts6">11:00 AM - 12:00 PM</option>
              <option id="ts7">12:00 PM - 1:00 PM</option>
              <option id="ts8">1:00 PM - 2:00 PM</option>
              <option id="ts9">2:00 PM - 3:00 PM</option>
              <option id="ts10">3:00 PM - 4:00 PM</option>
              <option id="ts11">4:00 PM - 5:00 PM</option>
              <option id="ts12">5:00 PM - 6:00 PM</option>
              <option id="ts13">6:00 PM - 7:00 PM</option>
              <option id="ts14">7:00 PM - 8:00 PM</option>
            </select>
          </div>
          <button type="submit" className="submit-button">
            Update Property
          </button>
            </div>
        </form>
      </main>
    </div>
    </div>
  );
};

export default Temp;
