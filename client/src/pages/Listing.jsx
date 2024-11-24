import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import pop from './photos';

const images = pop.images;

const Listing = () => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const styles = {
    container: {
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
    },
    heroSection: {
      width: '100%',
      height: '600px',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
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
      gap: '8px',
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
    },
    descriptionTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '16px',
    },
    descriptionText: {
      color: '#666',
      lineHeight: '1.6',
      marginBottom: '24px',
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
      backgroundColor:pop.furnish?'#16a34a':'Red',
      borderRadius: '50%',
    },
       featureDot2: {
      width: '12px',
      height: '12px',
      backgroundColor:pop.gym?'#16a34a':'Red',
      borderRadius: '50%',
    },
       featureDot3: {
      width: '12px',
      height: '12px',
      backgroundColor:pop.garden?'#16a34a':'Red',
      borderRadius: '50%',
    },
       featureDot4: {
      width: '12px',
      height: '12px',
      backgroundColor:pop.parki?'#16a34a':'Red',
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
      //width: `${images.length * 100}%`,
  },
  carouselImage: {
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          flexShrink: 0,
        },
  };

  return (
    <div style={styles.container}>
      {/* Hero Image Section */}
      <div style={styles.heroSection}>
  <button
    style={{ ...styles.navigationButton, ...styles.prevButton }}
    onClick={goToPrevious}
  >
    &#8592;
  </button>
  {/* Add a sliding wrapper for images */}
  <div
    style={styles.carouselImages}>
    {pop.images.map((image, index) => (
      <img
        key={index}
        src={image}
        alt={`Slide ${index + 1}`}
        style={styles.carouselImage}
      />
    ))}
  </div>
  <button
    style={{ ...styles.navigationButton, ...styles.nextButton }}
    onClick={goToNext}
  >
    &#8594;
  </button>
  <div style={styles.navigationDots}>
    {images.map((_, index) => (
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


      {/* Content Section */}
      <div style={styles.contentSection}>
        <div style={styles.contentWrapper}>
          {/* Header Section */}
          <div style={styles.headerSection}>
            <div>
              <h1 style={styles.title}>{pop.name}</h1>
              <p style={styles.address}>{pop.addr}</p>
            </div>
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              style={styles.wishlistButton}
            >
              <Heart
                color={isWishlisted ? 'white' : '#16a34a'}
                fill={isWishlisted ? 'white' : 'none'}
                size={20}
              />
              {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
            </button>
          </div>

          {/* Property Stats */}
          <div style={styles.statsContainer}>
            <div style={styles.statCard}>
              <p style={styles.statLabel}>Price</p>
              <p style={styles.statValue}>{pop.price}</p>
            </div>
            <div style={styles.statCard}>
              <p style={styles.statLabel}>Bedrooms</p>
              <p style={styles.statValue}>{pop.bed}</p>
            </div>
            <div style={styles.statCard}>
              <p style={styles.statLabel}>Type</p>
              <p style={styles.statValue}>{pop.type}</p>
            </div>
          </div>

          {/* Description */}
          <div style={styles.descriptionCard}>
            <h2 style={styles.descriptionTitle}>Property Description</h2>
            <p style={styles.descriptionText}>{pop.desc}</p>
            <div style={styles.featuresGrid}>
              <div style={styles.featureItem}>
                <div style={styles.featureDot1}></div>
                <span style={styles.featureText}>Furnished</span>
              </div>
              <div style={styles.featureItem}>
                <div style={styles.featureDot2}></div>
                <span style={styles.featureText}>Gym</span>
              </div>
              <div style={styles.featureItem}>
                <div style={styles.featureDot3}></div>
                <span style={styles.featureText}>Parking</span>
              </div>
              <div style={styles.featureItem}>
                <div style={styles.featureDot4}></div>
                <span style={styles.featureText}>Garden</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listing;