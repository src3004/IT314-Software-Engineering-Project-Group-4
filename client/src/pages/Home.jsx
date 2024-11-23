import React from 'react'

export default function Home() {
  return (
      <div>
          <div style={{ position: 'relative', height: '500px', width: '208vh', backgroundColor: '#ccc', backgroundImage: 'url(https://eycrk5cno2n.exactdn.com/wp-content/uploads/2022/02/The-Importance-of-High-Quality-Real-Estate-Photos-v3.jpg?strip=all&lossy=1&ssl=1)', backgroundSize: 'cover', backgroundPosition: 'center', marginTop: '0px' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ textAlign: 'center', color: 'white' }}>
                      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Find Your Dream Home</h1>
                      <div>
                          <input type="text" placeholder="Enter an address, city, or ZIP code" style={{ padding: '0.5rem', width: '300px', marginRight: '0.5rem' }} />
                          <button style={{ padding: '0.5rem 1rem', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}>Search</button>
                      </div>
                  </div>
              </div>
          </div>

          {/* Property Listings */}
          <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem' }}>
              <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Featured Properties</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                  {[
                      { image: 'https://d1ja9tyo8nbkbc.cloudfront.net/54211581_S0439/S0439/S0439-R0100/1077232389/1077232389-1.jpg?version=1720582849&width=640', title: 'Nirma', address: 'Gandhinagar, Gujarat', price: 'Rs 150 rupyaa dega' },
                      { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuGXnjgjKDyb2NfYx60qN3PZsjtv9sFwb5a7UuQLwFpWGA9Aa-eIvpvMpcOa7JWz4Oc-o&usqp=CAU', title: 'DAIICT', address: 'Gandhinagar, Gujarat', price: 'Rs 150 rupyaa dega' },
                      { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7l7ShCsMStw1aUrP74tliSTZh6adfi0oFGjdgjJDHO6x5kxL6pL-wHBGEv-KMJezTAMw&usqp=CAU', title: 'DAIICT', address: 'Gandhinagar, Gujarat', price: 'Rs 150 rupyaa dega' },
                  ].map(property => (
                      <div key={property.title} style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', marginBottom: '1rem' }}>
                          <img src={property.image} alt={property.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                          <div style={{ padding: '1rem' }}>
                              <h3 style={{ marginTop: 0 }}>{property.title}</h3>
                              <p>{property.address}</p>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                                  <span style={{ fontWeight: 'bold', color: '#28a745' }}>{property.price}</span>
                                  <button style={{ padding: '0.5rem 1rem', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}>View Details</button>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>
  );
}