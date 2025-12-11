// Header.tsx (Server Component)
import React from "react";
import MobileMenuButton from "./MobileMenuButton"; // Assuming you put the client component in the same directory

// 1. Define the TypeScript interface for our navigation items
interface NavItem {
  title: string;
  english_title: string;
  href: string;
}

// 2. The JSON data for the Persian Silver Shop Menu
// This data is static and can live on the server
const navItems: NavItem[] = [
  { title: "نقره‌جات", english_title: "Silverware", href: "/silverware" },
  { title: "جواهرات", english_title: "Jewelry", href: "/jewelry" },
  { title: "کلکسیون‌ها", english_title: "Collections", href: "/collections" },
  { title: "درباره ما", english_title: "About Us", href: "/about" },
  { title: "تماس با ما", english_title: "Contact Us", href: "/contact" },
];

// Header is now a Server Component
const Header: React.FC = () => {
  return (
    // Set the direction to Right-to-Left (RTL) for Persian
    // The 'relative' class is important here to correctly position the absolute mobile menu
    <header className="bg-white shadow-xl sticky top-0 z-40 relative" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop/Main Navigation Bar */}
        <div className="flex justify-between items-center h-20">
          {/* 1. Logo and Shop Name (Right Side in RTL) */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center space-x-2 space-x-reverse">
              <span className="text-3xl font-extrabold text-gray-800">
                نقره‌فروشی دُرّ
              </span>
              <span className="text-xs text-gray-500 mr-2 border-r pr-2 hidden sm:inline">
                اصالت و زیبایی
              </span>
            </a>
          </div>

          {/* 2. Primary Navigation (Center) - Hidden on Mobile */}
          <nav className="hidden md:block">
            <div className="flex space-x-6 space-x-reverse text-lg font-medium">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-900 pb-1 transition duration-150"
                >
                  {item.title}
                </a>
              ))}
            </div>
          </nav>

          {/* 3. Utility/Action Buttons (Left Side in RTL) */}
          <div className="flex items-center space-x-4 space-x-reverse">
            {/* Utility Icons: Search, Account, Cart (Static part) */}
            <button className="p-2 text-gray-700 hover:text-gray-900 rounded-full hover:bg-gray-100 transition duration-150">
              <span className="sr-only">جستجو</span>
              <span className="text-xl">🔍</span>
            </button>

            <a
              href="/account"
              className="p-2 text-gray-700 hover:text-gray-900 rounded-full hover:bg-gray-100 transition duration-150"
            >
              <span className="sr-only">ورود / ثبت‌نام</span>
              <span className="text-xl">👤</span>
            </a>

            <a
              href="/cart"
              className="relative p-2 text-gray-700 hover:text-gray-900 rounded-full hover:bg-gray-100 transition duration-150"
            >
              <span className="sr-only">سبد خرید</span>
              <span className="text-xl">🛒</span>
              <span className="absolute top-0 left-0 -mt-1 -mr-1 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full leading-none">
                3
              </span>
            </a>

            {/* Mobile Menu Button/Menu - RENDERED AS A CLIENT COMPONENT */}
            <MobileMenuButton navItems={navItems} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
