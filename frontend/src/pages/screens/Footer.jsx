import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaCarSide } from "react-icons/fa";

function Footer() {
  return (
    <footer className='bg-gray-900 text-gray-300 py-10 mt-16'>
      <div className='max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8'>
        {/* Logo & About */}
        <div>
          <div className='flex items-center mb-4'>
            <FaCarSide className='text-yellow-400 text-3xl mr-2' />
            <h2 className='text-white text-2xl font-bold'>CarRental</h2>
          </div>
          <p className='text-gray-400 text-sm'>
            CarRental offers premium and affordable car rentals worldwide. Your
            journey, our priority.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className='text-white font-semibold mb-4'>Quick Links</h3>
          <ul className='space-y-2'>
            <li>
              <a href='/' className='hover:text-yellow-400'>
                Home
              </a>
            </li>
            <li>
              <a href='/cars' className='hover:text-yellow-400'>
                Browse Cars
              </a>
            </li>
            <li>
              <a href='/about' className='hover:text-yellow-400'>
                About Us
              </a>
            </li>
            <li>
              <a href='/contact' className='hover:text-yellow-400'>
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className='text-white font-semibold mb-4'>Support</h3>
          <ul className='space-y-2'>
            <li>
              <a href='#' className='hover:text-yellow-400'>
                FAQ
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-yellow-400'>
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-yellow-400'>
                Privacy Policy
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-yellow-400'>
                Customer Support
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className='text-white font-semibold mb-4'>Contact Us</h3>
          <p className='text-gray-400 text-sm'>
            📍 123 Birmingham street, Birmingham, Uk
          </p>
          <p className='text-gray-400 text-sm'>📞 +1 234 567 890</p>
          <p className='text-gray-400 text-sm'>✉️ support@carRental.com</p>

          {/* Social Media */}
          <div className='flex space-x-4 mt-4'>
            <a
              href='#'
              className='bg-gray-700 hover:bg-yellow-400 text-white p-2 rounded-full'
            >
              <FaFacebookF />
            </a>
            <a
              href='#'
              className='bg-gray-700 hover:bg-yellow-400 text-white p-2 rounded-full'
            >
              <FaTwitter />
            </a>
            <a
              href='#'
              className='bg-gray-700 hover:bg-yellow-400 text-white p-2 rounded-full'
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className='border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm'>
        © {new Date().getFullYear()} CarRental. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
