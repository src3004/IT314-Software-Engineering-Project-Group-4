import React, { useState } from "react";
import "./CreateListing.css";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase.js';

const CreateListing = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  console.log(formData);
  
  const handleImageSubmit = (e) => {
    if (files.length>0 && files.length+formData.imageUrls.length <7)
    {
      setUploading(true);
      setImageUploadError(false);
      const promises =[];
      for(let i=0; i<files.length; i++)
      {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises).then((urls) => {
        setFormData({...formData, imageUrls: formData.imageUrls.concat(urls),
        });
        setImageUploadError(false);
        setUploading(false);
      }).catch((err)=>{
        setImageUploadError('Image Upload Failed (2MB max per image)');
        setUploading(false);
      });
    }
    else
    {
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = `RealEstate/${new Date().getTime()}_${file.name}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
          console.log(`Upload is ${progress}% done`);
        },
        (error)=>{
          reject(error);
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i!==index),
    });
  };

  return (
    <div className={`add-property`}>
    <div className="add-property-page">
      <main className="form-container">
        <h2 className="text-lg"><strong>Add Property</strong></h2>
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
            <input
            type="text"
            name="city"
            placeholder="City"
            id = 'city'
            required
            />
            <input
            type="number"
            name="pincode"
            placeholder="Pin-Code"
            id = 'pincode'
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
              onChange={(e)=>setFiles(e.target.files)}
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button type='button' disabled={uploading} onClick={handleImageSubmit} className="upload-button self-center">
              {uploading ? 'Uploading...': 'Upload'}
            </button>
            </div>
          </div>
            <p className='text-red-700'>{imageUploadError && imageUploadError}</p>
            {
              formData.imageUrls.length>0 && formData.imageUrls.map((url, index)=>(
                <div key={url} className="flex justify-between p-3 border items-center mt-1">
                  <img src={url} alt="listing image" className='w-20 h-20 object-contain rounded-lg' />
                  <button type='button' onClick={()=>handleRemoveImage(index)} className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75">Delete</button>
                </div>
              ))
            }
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
            Add Property
          </button>
            </div>
        </form>
      </main>
    </div>
    </div>
  );
};

export default CreateListing;
