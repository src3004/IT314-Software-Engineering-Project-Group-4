import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import furnishedIcon from '../assets/furnished-icon.png';
import parkingIcon from '../assets/parking-icon.png';
import locationIcon from '../assets/location-icon.png';
import gardenIcon from '../assets/garden-icon.png';
import gymIcon from '../assets/gym-icon.png';

const Listing = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [bookSlotError, setBookSlotError] = useState(null);
  const [bookSlotLoading, setBookSlotLoading] = useState(false);
  const [isFavLoad,setFavLoad] = useState(false);
  const [isFavError,setFavError] = useState(false);
  const [favouriteError, setFavouriteError] = useState(false);
  const [favouriteLoading, setFavouriteLoading] = useState(false);
  const [fav,setFav] = useState(null);
  const { currentUser }  = useSelector((state) => state.user);
  const params = useParams();
  useEffect(() => {
    const fetchListing = async() => {
      try {
        setError(false);
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false)
        {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setError(false);
        setLoading(false);
      } catch(error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.listingId]);

  const [formData, setFormData] = useState({
    listingId: params.listingId,
    date: "",
    visitSlot: "",
    status: "pending"
  });
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = new useNavigate();
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const generateDates = () => {
      const today = new Date();
      const nextDates = [];
      for (let i = 1; i < 8; i++) {
        const nextDate = new Date();
        nextDate.setDate(today.getDate() + i);

        // Format date as DD/MM/YYYY
        const formattedDate = `${String(nextDate.getDate()).padStart(2, "0")}/${
          String(nextDate.getMonth() + 1).padStart(2, "0")
        }/${nextDate.getFullYear()}`;

        nextDates.push(formattedDate);
      }
      setDates(nextDates);
    };

    generateDates();
  }, []);

  useEffect(()=>
  {
    const checkfav = async()=> {
      try {
        setFavError(false);
        setFavLoad(true);
        const res = await fetch(`/api/favourite/check/${params.listingId}`);
        if(res.success===false)
        {
          setFavError(true);
          setFavLoad(false);
          return;
        }
        setFavError(false);
        setFavLoad(false);
        if(res.status!==204)
        {
          const data = await res.json();
          setIsWishlisted(true);
          setFav(data._id);
        }
      } catch (error) {
        setFavError(true);
        setFavLoad(false);
      };
     }
    checkfav();
  }, [params.listingId])
 

  const addfav = async () => {
    if(!isWishlisted)
    {
      const form1 = {
        userId: currentUser._id,
        listingId: listing._id,
        name: listing.name,
        price: listing.price,
        type: listing.type,
        city: listing.city,
        bedrooms: listing.bedrooms,
        image:listing.imageUrls[0],
        parking:listing.parking,
      };
      setFavouriteError(false);
      setFavouriteLoading(true);
      try {
        const res = await fetch('/api/favourite/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({form1}),
        });
        const data = await res.json();
        if (data.success === false)
        {
          setFavouriteError(data.message);
          setFavouriteLoading(false);
          return;
        }
        setFavouriteError(false);
        setFavouriteLoading(false);
        setFav(data._id);
        setIsWishlisted(true);
      } catch (error) {
        setFavouriteError(error);
        setFavouriteLoading(false);
      };
    }
    else
    {
      setFavouriteError(false);
      setFavouriteLoading(true);
      try {
        const res = await fetch(`/api/favourite/delete/${fav}`, {
          method: 'DELETE',
        });
        const data = await res.json();
        if (data.success === false)
        {
          setFavouriteError(data.message);
          setFavouriteLoading(false);
          return;
        }
        setFavouriteError(false);
        setFavouriteLoading(false);
        setIsWishlisted(false);
      } catch (error) {
        setFavouriteError(error);
        setFavouriteLoading(false);
      }
    }
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (listing ? (prevIndex === 0 ? listing.imageUrls.length - 1 : prevIndex - 1): 0));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (listing ? (prevIndex === listing.imageUrls.length - 1 ? 0 : prevIndex + 1): 0));
  };
  

  const styles = {
    container: {
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
    },
    heroSection: {
      width: '100%',
      height: '500px',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      // alignItems: 'center',
      overflow: 'hidden',
    },
    heroImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    navigationButton: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      cursor: 'pointer',
      zIndex: 2,
    },
    prevButton: {
      left: '10px',
    },
    nextButton: {
      right: '10px',
    },
    navigationDots: {
      position: 'absolute',
      bottom: '10px',
      display: 'flex',
      justifyContent: 'center',
      gap: '8px',
    },
    dot: {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      backgroundColor: '#16a34a',
      opacity: 0.5,
      cursor: 'pointer',
    },
    activeDot: {
      opacity: 1,
    },
    contentSection: {
      padding: '32px',
    },
    contentWrapper: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    headerSection: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '24px',
    },
    title: {
      fontSize: '36px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '8px',
      marginTop: '0',
    },
    address: {
      fontSize: '18px',
      color: '#666',
      marginBottom: '8px',
    },
    wishlistButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '12px 24px',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      backgroundColor: isWishlisted ? '#16a34a' : 'white',
      color: isWishlisted ? 'white' : '#16a34a',
      border: isWishlisted ? 'none' : '2px solid #16a34a',
    },
    statsContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '24px',
      marginBottom: '32px',
    },
    statCard: {
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    statLabel: {
      color: '#666',
      marginBottom: '4px',
      fontSize: '16px',
    },
    statValue: {
      color: '#16a34a',
      fontSize: '24px',
      fontWeight: 'bold',
      margin: '0',
    },
    descriptionCard: {
      backgroundColor: 'white',
      padding: '32px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      marginBottom: '32px',
    },
    descriptionTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '16px',
    },
    formSection: {
      marginRight: '0',  // Adjust margin for smaller screens
    },
    descriptionText: {
      color: '#666',
      lineHeight: '1.6',
      marginBottom: '24px',
    },
    paymentSection: {
      backgroundColor: 'white',
      padding: '32px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      marginBottom: '32px',
      width: '100%',
      maxWidth: '500px', // Limits the width on larger screens to avoid it stretching too far
      boxSizing: 'border-box', // Ensures padding doesn't affect width calculation
      textAlign: 'center',
      '@media (max-width: 768px)': {
        width: '100%', // Make sure it takes up the full width on mobile
    maxWidth: '100%',
      }
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '16px',
      marginTop: '24px',
    },
    featureItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    featureDot1: {
      width: '12px',
      height: '12px',
      backgroundColor: (listing ? (listing.furnished ? '#16a34a': 'Red') : 'Gray'), 
      borderRadius: '50%',
    },
       featureDot2: {
      width: '12px',
      height: '12px',
      backgroundColor:(listing ? (listing.gym ? '#16a34a': 'Red') : 'Gray'),
      borderRadius: '50%',
    },
       featureDot3: {
      width: '12px',
      height: '12px',
      backgroundColor:(listing ? (listing.parking ? '#16a34a': 'Red') : 'Gray'),
      borderRadius: '50%',
    },
       featureDot4: {
      width: '12px',
      height: '12px',
      backgroundColor:(listing ? (listing.garden ? '#16a34a': 'Red') : 'Gray'),
      borderRadius: '50%',
    },

    featureText: {
      color: '#666',
    },
    carouselContainer: {
    overflow: 'hidden',
    width: '100%',
    position: 'relative',
  },
  carouselImages: {
      display: 'flex',
      transition: 'transform 0.5s ease-in-out',
      transform: `translateX(-${currentIndex * 100}%)`,
      width: `${(listing? listing.imageUrls.length: 1) * 100}%`,
  },
  carouselImage: {
          width: '100%',
          height: '500px',
          objectFit: 'cover',
          flexShrink: 0,
        },
        paymentWrapper: {
          display: 'flex',
          justifyContent: 'center', // This centers the content horizontally
          alignItems: 'center', // This ensures the content is vertically centered
          width: '100%',
          padding: '20px', // Optional, just to give some spacing
          '@media (max-width: 768px)': {
            flexDirection: 'column', // Stack vertically on smaller screens
            padding: '10px',
          }
        },
  };

  const handleLogin = () => {
    alert('Sign In to access further features!');
    navigate('/login');
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleBookVisitSlot = async (e) => {
    e.preventDefault();
    setBookSlotLoading(true);
    setBookSlotError(null);

    try {
      const response = await fetch(`/api/property/book-visit-slot/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          buyerId: currentUser._id,
          sellerId: listing.userRef,
          buyerName: currentUser.username,
          buyerContact: currentUser.mobile,
          sellerContact: listing.contact,
          name: listing.name,
          image: listing.imageUrls[0]
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setBookSlotLoading(false);
        alert("Slot booked successfully!");
        setFormData({ buyerId: currentUser._id, sellerId: listing.userRef, buyerName: currentUser.username, buyerContact: currentUser.mobile, sellerContact: listing.contact, listingId: params.listingId, date: "", visitSlot: "", status: "pending" });
      } else {
        setBookSlotLoading(false);
        setBookSlotError(result.message || "An error occurred while booking the slot.");
      }
    } catch (err) {
      setBookSlotLoading(false);
      setBookSlotError("Failed to book the slot. Please try again.");
    }
  };

  return (
    <main>
      {loading && <p className='text-center my-7 text-2xl font-semibold text-gray-700'>Loading...</p>}
      {error && <p className='text-center my-7 text-2xl font-semibold text-gray-700'>Something went Wrong!</p>}
      {listing && !loading && !error && (
        <div style={styles.container}>
      <div style={styles.heroSection}>
  {listing.imageUrls.length > 1 && <button
    style={{ ...styles.navigationButton, ...styles.prevButton }}
    onClick={goToPrevious}
  >
    &#10094;
  </button>}

  <div style={styles.carouselImages}>
    {listing.imageUrls.map((url, index) => (
      <img
      className='h-[50px]'
        key={index}
        src={url}
        alt={`Slide ${index + 1}`}
        style={styles.carouselImage}
      />
    ))}
  </div>
  {listing.imageUrls.length>1 && <button
    style={{ ...styles.navigationButton, ...styles.nextButton }}
    onClick={goToNext}
  >
    &#10095;
  </button>}
  <div style={styles.navigationDots}>
    {listing.imageUrls.map((_, index) => (
      <div
        key={index}
        style={{
          ...styles.dot,
          ...(index === currentIndex ? styles.activeDot : {}),
        }}
        onClick={() => setCurrentIndex(index)}
        ></div>
      ))}
  </div>
</div>



      <div style={styles.contentSection}>
        <div style={styles.contentWrapper}>

          <div style={styles.headerSection}>
            <div>
              <h1 style={styles.title}>{listing.name}</h1>
              <div className='flex gap-1'>
                <img src={locationIcon} className='h-5' alt="location icon" />
                <p style={styles.address}>{listing.address}</p>
              </div>
            </div>
            <div className='flex flex-col gap-4'>
            {(currentUser && (listing.userRef !== currentUser._id)) ? (
            <button
              disabled={isFavLoad || favouriteLoading}
              onClick={() => addfav()}
              style={styles.wishlistButton}
            >
              <Heart
                color={isWishlisted ? 'white' : '#16a34a'}
                fill={isWishlisted ? 'white' : 'none'}
                size={20}
                />
              {isWishlisted ? 'Favorited' : 'Add to Favourites'}
            </button>): (!currentUser)? (
                <button
                disabled={isFavLoad || favouriteLoading}
                onClick={handleLogin}
                style={styles.wishlistButton}
              >
                <Heart
                  color={isWishlisted ? 'white' : '#16a34a'}
                  fill={isWishlisted ? 'white' : 'none'}
                  size={20}
                  />
                {isWishlisted ? 'Favorited' : 'Add to Favourites'}
              </button>):(
                <div></div>
              )}
              {isFavError && <p className='text-red-700'>{isFavError}</p>}
              {favouriteError && <p className='text-red-700'>{favouriteError}</p>}
              </div>
          </div>


          <div style={styles.statsContainer}>
            <div style={styles.statCard}>
              <p style={styles.statLabel}>Price</p>
              <p style={styles.statValue}>₹ {listing.price} {listing.type==='rent'? '/month': ''}</p>
            </div>
            <div style={styles.statCard}>
              <p style={styles.statLabel}>Bedrooms</p>
              <p style={styles.statValue}>{listing.bedrooms}</p>
            </div>
            <div style={styles.statCard}>
              <p style={styles.statLabel}>For</p>
              <p style={styles.statValue}>{listing.type==='sale' ? 'Sale': 'Rent'}</p>
            </div>
          </div>


          <div style={styles.descriptionCard}>
            <h2 style={styles.descriptionTitle}>Property Description</h2>
            <p style={styles.descriptionText}>{listing.description}</p>
            <div style={styles.featuresGrid}>
              <div style={styles.featureItem}>
                <div style={styles.featureDot1}></div>
                <img src={furnishedIcon} className='h-5' alt="furnished icon" />
                <span style={styles.featureText}>Furnished</span>
              </div>
              <div style={styles.featureItem}>
                <div style={styles.featureDot2}></div>
                <img src={gymIcon} className='h-6' alt="gym icon" />
                <span style={styles.featureText}>Gym</span>
              </div>
              <div style={styles.featureItem}>
                <div style={styles.featureDot3}></div>
                <img src={parkingIcon} className='h-6' alt="parking icon" />
                <span style={styles.featureText}>Parking</span>
              </div>
              <div style={styles.featureItem}>
                <div style={styles.featureDot4}></div>
                <img src={gardenIcon} className='h-6' alt="garden icon" />
                <span style={styles.featureText}>Garden</span>
              </div>
            </div>
          </div>
          
          {(currentUser && (listing.userRef !== currentUser._id)) ? (
  <div style={styles.descriptionCard} className='flex flex-col md:flex-row'>
    <form onSubmit={handleBookVisitSlot} style={styles.formContainer}>
      <div style={styles.formSection}>
        <h2 style={styles.descriptionTitle}>Book Visit Slots</h2>
        <div className='mb-6'>
          <label htmlFor="date" className="block mb-1 font-semibold">Select Date:</label>
          <select
            id="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="p-2 border rounded"
            style={styles.input}
          >
            <option value="">Choose a date</option>
            {dates.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
        </div>
        <div className='mb-6'>
          <label htmlFor="visitSlot" className="block mb-1 font-semibold">Select Visit Slot:</label>
          <select
            id="visitSlot"
            value={formData.visitSlot}
            onChange={handleChange}
            required
            className="p-2 border rounded"
            style={styles.input}
          >
            <option value="">Choose visit slot</option>
            {listing.visitSlots.map((visitSlot) => (
              <option key={visitSlot} value={visitSlot}>
                {visitSlot}
              </option>
            ))}
          </select>
        </div>
        <button
          disabled={bookSlotLoading}
          type="submit"
          className='btn bg-green-600 p-2 text-md text-white font-semibold rounded-md mb-3'
        >
          {bookSlotLoading ? 'Booking...': 'Book Visit Slot'}
        </button>
        {bookSlotError && <p className="text-red-700">{bookSlotError}</p>}
      </div>
    </form>
    <div style={styles.paymentWrapper}>
    <div style={styles.paymentSection}>
      <h2 style={styles.descriptionTitle}>Pay Token Amount</h2>
      <p className='font-semibold text-xl mb-6'>Token Amount: ₹ {listing.tokenAmount}</p>
      <Link to={`/transaction/${currentUser._id}/${listing.userRef}/${listing._id}`}
        className='btn bg-green-600 p-2 text-md text-white font-semibold rounded-md mb-3'>
        Pay Token Amount
      </Link>
    </div>
    </div>
  </div>
) : (!currentUser) ? (
  <div className='flex gap-4'>
    <button onClick={handleLogin} className='btn bg-green-600 p-2 text-lg text-white font-semibold rounded-md'>Book Visit Slots</button>
    <button onClick={handleLogin} className='btn bg-green-600 p-2 text-lg text-white font-semibold rounded-md'>Pay Token Amount</button>
  </div>
) : (
  <div></div>
)}

        </div>
      </div>
      </div>
      )}
    </main>
  );
};

export default Listing;
