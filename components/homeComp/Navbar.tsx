"use client";
import { useState } from 'react';
import Image from 'next/image';
import logo from '@/public/Logo.jpeg'; // Adjust the path as necessary
import Link from 'next/link';

// Define the type for a navigation link
type NavbarLink = {
  label: string;
  href: string;
};

// Create an array of NavbarLink objects
const navItems: NavbarLink[] = [
  { label: 'Find blood', href: '/find-blood' },
  { label: 'Request blood', href: '/bloodRequestForm' },
  { label: 'Education', href: '/education' },
  { label: 'Sign In', href: '/sign-in' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Function to toggle the mobile menu
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav className="bg-white shadow-md relative z-10">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <div className="flex items-center">
          <Image src={logo} alt="Logo" width={40} height={40} />
          <span className="ml-2 text-2xl font-bold text-red-700">ASS</span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-6">
          {navItems.map(({ label, href }) => (
            <Link 
              href={href} 
              key={label} 
              className="nav-item hover:bg-red-700 hover:text-white h-full transition-colors px-4 py-3 rounded-none flex items-center"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-80 backdrop-blur-md z-20">
          <div className="flex flex-col items-center p-4">
            <button onClick={toggleMenu} className="self-end text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {navItems.map(({ label, href }) => (
              <Link 
                href={href} 
                key={label} 
                className="nav-item block w-full text-center py-2 hover:bg-red-700 hover:text-white transition-colors"
                onClick={() => setMenuOpen(false)} // Close menu on item click
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
