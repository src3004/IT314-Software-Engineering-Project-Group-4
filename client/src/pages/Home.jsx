import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [properties, setProperties] = useState([]);
  const fetchProperties = async (query) => {
    try {
      let url = 'http://localhost:5001/api/properties';
      if (query) {
        url += `?searchQuery=${encodeURIComponent(query)}`; 
      }
      const response = await axios.get(url);
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };
  useEffect(() => {
    fetchProperties(searchQuery);
  }, [searchQuery]);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Featured Properties</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          {properties.length > 0 ? (
            properties.map((property) => (
              <div
                key={property._id}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  marginBottom: '1rem',
                }}
              >
                <img
                  src={property.image}
                  alt={property.title || 'Property'}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
                <div style={{ padding: '1rem' }}>
                  <h3>{property.name}</h3>
                  <p>{property.City}</p>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: '1rem',
                    }}
                  >
                    <span style={{ fontWeight: 'bold', color: '#28a745' }}>
                      {property.price}
                    </span>
                    <button
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center' }}>
              No properties found. Please try searching again.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
