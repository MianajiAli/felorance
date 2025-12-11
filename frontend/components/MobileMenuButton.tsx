// MobileMenuButton.tsx (Client Component)
"use client";
import React, { useState } from "react";

// 1. Define the TypeScript interface for our navigation items
interface NavItem {
  title: string;
  english_title: string;
  href: string;
}

// Props interface for the mobile menu button and content
interface MobileMenuProps {
  navItems: NavItem[];
}

const MobileMenuButton: React.FC<MobileMenuProps> = ({ navItems }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Button (Hamburger) */}
      <button
        type="button"
        className="md:hidden p-2 text-gray-700 hover:text-gray-900 rounded-full hover:bg-gray-100 transition duration-150"
        aria-controls="mobile-menu"
        aria-expanded={isMobileMenuOpen}
        onClick={toggleMobileMenu}
      >
        <span className="sr-only">باز کردن منوی اصلی</span>
        {isMobileMenuOpen ? (
          <span className="text-xl">❌</span> // Placeholder for Close Icon
        ) : (
          <span className="text-xl">☰</span> // Placeholder for Hamburger Icon
        )}
      </button>

      {/* Mobile Menu Content - Toggled based on state */}
      <div
        className={`absolute top-20 left-0 w-full md:hidden ${
          isMobileMenuOpen ? "block" : "hidden"
        }`}
        id="mobile-menu"
      >
        <div className="px-4 pt-2 pb-3 space-y-1 border-t bg-white shadow-lg">
          {navItems.map((item) => (
            <a
              key={`mobile-${item.href}`}
              href={item.href}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-200 text-right"
              onClick={toggleMobileMenu} // Close menu on click
            >
              {item.title}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default MobileMenuButton;
