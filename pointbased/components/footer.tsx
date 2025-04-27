"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-green-700 via-green-900 to-black text-white py-16 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-4">EcoRewards</h2>
          <p className="mb-6 max-w-sm">
            Join us in making the world greener. Earn points by recycling and redeem them for essential goods and services.
          </p>
          <div className="flex space-x-4">
            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-green-400">
              <Facebook size={24} />
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-green-400">
              <Twitter size={24} />
            </Link>
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-green-400">
              <Instagram size={24} />
            </Link>
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-green-400">
              <Linkedin size={24} />
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-green-400">Home</Link></li>
            <li><Link href="/recyclables" className="hover:text-green-400">Recyclables</Link></li>
            <li><Link href="/about" className="hover:text-green-400">About Us</Link></li>
            <li><Link href="/profile" className="hover:text-green-400">My Profile</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            <li><Link href="/contact" className="hover:text-green-400">Contact Us</Link></li>
            <li><Link href="/faq" className="hover:text-green-400">FAQ</Link></li>
            <li><Link href="/terms" className="hover:text-green-400">Terms of Service</Link></li>
            <li><Link href="/privacy" className="hover:text-green-400">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Subscribe to our newsletter</h3>
          <form className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-2 rounded bg-green-800 text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded transition"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-6 text-sm flex items-center space-x-2">
            <Mail size={16} />
            <span>support@ecorewards.com</span>
          </p>
        </div>
      </div>
      <div className="mt-12 border-t border-green-600 pt-6 text-center text-sm text-green-300">
        &copy; {new Date().getFullYear()} EcoRewards. All rights reserved.
      </div>
    </footer>
  )
}
