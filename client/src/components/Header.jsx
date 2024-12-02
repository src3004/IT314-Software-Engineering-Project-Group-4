import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-green-600 text-white p-3 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link to="/" className="hover:text-gray-200">
            <h1 className="flex flex-wrap">
              <span className="text-white">Estate</span>
              <span className="text-slate-200">Sphere</span>
            </h1>
          </Link>
        </div>

        {/* Hamburger Menu Button (Visible on Mobile) */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>

        {/* Navigation Links */}
        <ul
          className={`md:flex md:items-center md:space-x-7 absolute md:static top-16 left-0 w-full md:w-auto bg-green-600 md:bg-transparent ${
            isMenuOpen ? 'block' : 'hidden'
          }`}
        >
          <li className="text-center md:text-left">
            <Link
              to="/about-us"
              className="block md:inline-block text-white font-semibold text-md hover:text-gray-200 py-2"
            >
              About Us
            </Link>
          </li>
          {currentUser && (
            <li className="text-center md:text-left">
              <Link
                to="/transactions"
                className="block md:inline-block text-white font-semibold text-md hover:text-gray-200 py-2"
              >
                Transactions
              </Link>
            </li>
          )}
          {currentUser && (
            <li className="text-center md:text-left">
              <Link
                to="/favourites"
                className="block md:inline-block text-white font-semibold text-md hover:text-gray-200 py-2"
              >
                Favourites
              </Link>
            </li>
          )}
          {currentUser && (
            <li className="text-center md:text-left">
              <Link
                to="/pending-visitors"
                className="block md:inline-block text-white font-semibold text-md hover:text-gray-200 py-2"
              >
                Pending Visitors
              </Link>
            </li>
          )}
          {currentUser && (
            <li className="text-center md:text-left">
              <Link
                to="/visit-slots"
                className="block md:inline-block text-white font-semibold text-md hover:text-gray-200 py-2"
              >
                Booked Slots
              </Link>
            </li>
          )}
          {currentUser && (
            <li className="text-center md:text-left">
              <Link
                to="/my-listings"
                className="block md:inline-block text-white font-semibold text-md hover:text-gray-200 py-2"
              >
                My Properties
              </Link>
            </li>
          )}
          <li className="text-center md:text-left">
            <Link to="/profile">
              {currentUser ? (
                <img
                  className="rounded-full h-7 w-7 object-cover mx-auto md:mx-0"
                  referrerPolicy="no-referrer"
                  src={currentUser.avatar}
                  alt="profile"
                />
              ) : (
                <div className="bg-green-500 text-white px-3 py-2 rounded-full text-sm hover:bg-green-400">
                  Sign in
                </div>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
