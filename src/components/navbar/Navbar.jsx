"use client";

import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React, { useRef, useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { FaRegUser, FaTimes, FaBars } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";
import { RiShoppingCart2Line } from "react-icons/ri";
import { VscSettings } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "@/redux/feature/auth/authApi";
import { logout as authLogout } from "@/redux/feature/auth/authSlice";
import { clearCartLocal } from "@/redux/feature/cart/cartSlice";

export default function Navbar() {
  const products = useSelector((state) => state.cart);
  const authUser = useSelector((state) => state?.auth?.user);
  const totalProduct = products?.products?.length ?? 0;
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const dropdownRef = useRef(null);
  const debounceRef = useRef(null);
  const navigate = useRouter();
  const pathname = usePathname();
  
  // Highlight the current active page in navbar
  const isLinkActive = (path) => {
    if (path === '/') {
      return pathname === path; 
    }
    return pathname.startsWith(path);
  };

  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const [logoutApi, { isLoading: isLoggingOut }] = useLogoutMutation();

  const handleSearchChange = (e) => {
    const v = e.target.value;
    setSearchText(v);
    if (v.trim() === '') {
      navigate.push(`/product`);
    }
  };

  const performSearch = async () => {
    const q = (searchText || "").trim();
    if (!q) {
      navigate.push(`/product`);
      return;
    }
    navigate.push(`/product?search=${encodeURIComponent(q)}`);
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  };

  // Debounced search effect
  useEffect(() => {
    const q = (searchText || '').trim();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (q) {
        navigate.push(`/product?search=${encodeURIComponent(q)}`);
      }
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchText, navigate]);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Close mobile menu when switching to desktop
      if (!mobile && isMenuOpen) {
        setIsMenuOpen(false);
      }
      
      // Close search when switching to mobile if menu is open
      if (mobile && isSearchOpen && isMenuOpen) {
        setIsSearchOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen, isSearchOpen]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Clear cart on success pages
  useEffect(() => {
    if (!pathname) return;
    const isSuccess = pathname.startsWith('/checkout/success') || pathname === '/congratulations';
    if (isSuccess) {
      try { dispatch(clearCartLocal()); } catch {}
    }
    const oid = searchParams?.get?.('orderId');
    if (oid) {
      try { dispatch(clearCartLocal()); } catch {}
    }
  }, [pathname, searchParams, dispatch]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen && isMobile) {
      setIsSearchOpen(false);
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen && isMobile) {
      setIsMenuOpen(false);
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        !event.target.closest(".mobile-menu-container") &&
        !event.target.closest(".menu-button")
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
    } catch (e) {}
    dispatch(authLogout());
    dispatch(clearCartLocal());
    navigate.push("/sign_in");
  };

  return (
    <nav className="bg-[#171716] text-white px-2 sm:px-4 md:px-6 py-3 sticky top-0 z-50">
      <div className="container mx-auto relative">
        {/* Main Header */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center justify-center flex-shrink-0">
            <img
              src="/logo.svg"
              alt="company logo"
              className="h-8 w-auto sm:h-10 md:h-12 lg:h-14 transition-all duration-200"
            />
          </Link>

          {/* Desktop Navigation - Center */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 mx-4 flex-1 justify-center">
            <Link
              href="/"
              className={`px-2 py-1 ${isLinkActive('/') ? 'text-[#136BFB] font-medium' : 'text-white hover:text-gray-300'} transition-colors duration-200 text-sm xl:text-base`}
            >
              Home
            </Link>
         
            <Link
              href="/product"
              className={`px-2 py-1 ${isLinkActive('/product') ? 'text-[#136BFB] font-medium' : 'text-white hover:text-gray-300'} transition-colors duration-200 text-sm xl:text-base`}
            >
              Dental Products Shop
            </Link>
          
            <Link
              href="/procedure_guide"
              className={`px-2 py-1 ${isLinkActive('/procedure_guide') ? 'text-[#136BFB] font-medium' : 'text-white hover:text-gray-300'} transition-colors duration-200 text-sm xl:text-base`}
            >
              Dental Procedure
            </Link>
         
            <Link
              href="/about_us"
              className={`px-2 py-1 ${isLinkActive('/about_us') ? 'text-[#136BFB] font-medium' : 'text-white hover:text-gray-300'} transition-colors duration-200 text-sm xl:text-base`}
            >
              About Us
            </Link>
            
            <Link
              href="/contact_us"
              className={`px-2 py-1 ${isLinkActive('/contact_us') ? 'text-[#136BFB] font-medium' : 'text-white hover:text-gray-300'} transition-colors duration-200 text-sm xl:text-base`}
            >
              Contact Us
            </Link>
            
            <Link
              href="/pharmaceuticals"
              className={`px-2 py-1 ${isLinkActive('/pharmaceuticals') ? 'text-[#136BFB] font-medium' : 'text-white hover:text-gray-300'} transition-colors duration-200 text-sm xl:text-base`}
            >
              Pharmaceuticals
            </Link>
            
            <Link
              href="/blog"
              className={`px-2 py-1 ${isLinkActive('/blog') ? 'text-[#136BFB] font-medium' : 'text-white hover:text-gray-300'} transition-colors duration-200 text-sm xl:text-base`}
            >
              Blog
            </Link>
          </div>

          {/* Desktop Actions - Right Side */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4 flex-shrink-0">
            {/* Search Bar - Visible on md and above */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CiSearch className="h-4 w-4 text-[#136BFB]" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={handleSearchChange}
                onKeyDown={(e) => { 
                  if (e.key === 'Enter') { 
                    e.preventDefault(); 
                    performSearch(); 
                  } 
                }}
                className="bg-black border border-[#136BFB] rounded-xl pl-10 pr-3 py-2 text-white placeholder-[#136BFB] focus:outline-none focus:ring-2 focus:ring-[#136BFB] focus:border-transparent w-40 sm:w-48 md:w-56 lg:w-64 transition-all duration-200 text-sm"
              />
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-2 lg:space-x-3">
              {authUser ? (
                <>
                  {/* Cart with badge */}
                  <div className="relative">
                    <Link
                      href="/my_cart"
                      className="flex items-center justify-center p-2 border border-[#136BFB] text-[#136BFB] rounded-lg hover:bg-[#136BFB] hover:text-white transition-colors duration-200"
                    >
                      <RiShoppingCart2Line className="h-5 w-5 lg:h-6 lg:w-6" />
                    </Link>
                    {mounted && totalProduct > 0 && (
                      <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                        {totalProduct > 99 ? '99+' : totalProduct}
                      </div>
                    )}
                  </div>

                  {/* User Dropdown */}
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={toggleDropdown}
                      className="flex items-center focus:outline-none"
                    >
                      <img
                        src="https://i.ibb.co.com/RvFgZC8/aman.png"
                        alt="profile"
                        className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border-2 border-[#136BFB] hover:border-white transition-colors duration-200"
                      />
                    </button>
                    
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-200">
                        <Link
                          href="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#136BFB] transition-colors duration-200"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          My Profile
                        </Link>
                        <Link
                          href="/my_order"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#136BFB] transition-colors duration-200"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          My Orders
                        </Link>
                        <Link
                          href="/favourite"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#136BFB] transition-colors duration-200"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Favourite
                        </Link>
                        <Link
                          href="/ai_support"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#136BFB] transition-colors duration-200"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Support
                        </Link>
                        <div className="border-t border-gray-100 my-1"></div>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                          onClick={handleLogout}
                          disabled={isLoggingOut}
                        >
                          {isLoggingOut ? "Logging out..." : "Logout"}
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                /* Login/Signup Buttons */
                <div className="flex items-center space-x-2 lg:space-x-3">
                  <button 
                    onClick={() => navigate.push('/sign_in')} 
                    className="px-3 py-2 lg:px-4 lg:py-2 border border-[#136BFB] text-[#136BFB] rounded-lg hover:bg-[#136BFB] hover:text-white transition-colors duration-200 text-sm lg:text-base"
                  >
                    Log in
                  </button>
                  <button 
                    onClick={() => navigate.push('/signup')} 
                    className="px-3 py-2 lg:px-4 lg:py-2 bg-[#136BFB] text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm lg:text-base"
                  >
                    Sign up
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center space-x-3 md:hidden">
            {/* Search Icon - Mobile */}
            <button 
              onClick={toggleSearch} 
              className="text-white p-2 hover:text-[#136BFB] transition-colors duration-200"
              aria-label="Search"
            >
              <CiSearch className="h-5 w-5" />
            </button>

            {/* Cart - Mobile (only for logged in users) */}
            {authUser && (
              <div className="relative">
                <Link 
                  href="/my_cart" 
                  className="text-white p-2 hover:text-[#136BFB] transition-colors duration-200 block"
                >
                  <RiShoppingCart2Line className="h-5 w-5" />
                </Link>
                {mounted && totalProduct > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                    {totalProduct > 9 ? '9+' : totalProduct}
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="menu-button text-white p-2 hover:text-[#136BFB] transition-colors duration-200 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FaTimes className="h-5 w-5" />
              ) : (
                <FaBars className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="mt-3 md:hidden animate-fadeIn">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CiSearch className="h-4 w-4 text-[#136BFB]" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchText}
                onChange={handleSearchChange}
                onKeyDown={(e) => { 
                  if (e.key === 'Enter') { 
                    e.preventDefault(); 
                    performSearch(); 
                  } 
                }}
                className="w-full bg-black border border-[#136BFB] rounded-xl pl-10 pr-10 py-3 text-white placeholder-[#136BFB] focus:outline-none focus:ring-2 focus:ring-[#136BFB] focus:border-transparent text-base"
              />
              <button 
                className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-white transition-colors duration-200" 
                onClick={performSearch}
              >
                <VscSettings className="h-5 w-5 text-[#136BFB]" />
              </button>
            </div>
          </div>
        )}

        {/* Tablet Navigation - Below header */}
        <div className="hidden md:flex lg:hidden justify-center mt-3">
          <div className="flex items-center space-x-4 overflow-x-auto py-2 scrollbar-hide">
            <Link
              href="/"
              className={`whitespace-nowrap px-3 py-1 rounded-lg ${isLinkActive('/') ? 'text-[#136BFB] font-medium bg-blue-50 bg-opacity-10' : 'text-white hover:text-gray-300'} transition-colors duration-200 text-sm`}
            >
              Home
            </Link>
            <Link
              href="/product"
              className={`whitespace-nowrap px-3 py-1 rounded-lg ${isLinkActive('/product') ? 'text-[#136BFB] font-medium bg-blue-50 bg-opacity-10' : 'text-white hover:text-gray-300'} transition-colors duration-200 text-sm`}
            >
              Products
            </Link>
            <Link
              href="/procedure_guide"
              className={`whitespace-nowrap px-3 py-1 rounded-lg ${isLinkActive('/procedure_guide') ? 'text-[#136BFB] font-medium bg-blue-50 bg-opacity-10' : 'text-white hover:text-gray-300'} transition-colors duration-200 text-sm`}
            >
              Procedures
            </Link>
            <Link
              href="/about_us"
              className={`whitespace-nowrap px-3 py-1 rounded-lg ${isLinkActive('/about_us') ? 'text-[#136BFB] font-medium bg-blue-50 bg-opacity-10' : 'text-white hover:text-gray-300'} transition-colors duration-200 text-sm`}
            >
              About
            </Link>
            <Link
              href="/contact_us"
              className={`whitespace-nowrap px-3 py-1 rounded-lg ${isLinkActive('/contact_us') ? 'text-[#136BFB] font-medium bg-blue-50 bg-opacity-10' : 'text-white hover:text-gray-300'} transition-colors duration-200 text-sm`}
            >
              Contact
            </Link>
            <Link
              href="/pharmaceuticals"
              className={`whitespace-nowrap px-3 py-1 rounded-lg ${isLinkActive('/pharmaceuticals') ? 'text-[#136BFB] font-medium bg-blue-50 bg-opacity-10' : 'text-white hover:text-gray-300'} transition-colors duration-200 text-sm`}
            >
              Pharma
            </Link>
            <Link
              href="/blog"
              className={`whitespace-nowrap px-3 py-1 rounded-lg ${isLinkActive('/blog') ? 'text-[#136BFB] font-medium bg-blue-50 bg-opacity-10' : 'text-white hover:text-gray-300'} transition-colors duration-200 text-sm`}
            >
              Blog
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } md:hidden`}
        onClick={toggleMenu}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Mobile Menu Sidebar */}
      <div
        className={`mobile-menu-container fixed top-0 left-0 h-full w-4/5 max-w-xs bg-[#171716] z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Menu Header */}
          <div className="flex justify-between items-center mb-8">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              <img
                src="/logo.svg"
                alt="company logo"
                className="w-24 h-auto"
              />
            </Link>
            <button
              onClick={toggleMenu}
              className="text-white p-2 -mr-2 hover:text-[#136BFB] transition-colors duration-200"
              aria-label="Close menu"
            >
              <FaTimes className="h-6 w-6" />
            </button>
          </div>

          {/* Menu Navigation */}
          <nav className="flex-1 overflow-y-auto">
            <div className="flex flex-col space-y-1">
              <Link
                href="/"
                className={`block py-3 px-4 rounded-lg ${isLinkActive('/') ? 'text-[#136BFB] font-medium bg-blue-50 bg-opacity-10' : 'text-white hover:bg-gray-800'} transition-colors duration-200`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              
              <Link
                href="/product"
                className={`block py-3 px-4 rounded-lg ${isLinkActive('/product') ? 'text-[#136BFB] font-medium bg-blue-50 bg-opacity-10' : 'text-white hover:bg-gray-800'} transition-colors duration-200`}
                onClick={() => setIsMenuOpen(false)}
              >
                Dental Products Shop
              </Link>
              
              <Link
                href="/procedure_guide"
                className={`block py-3 px-4 rounded-lg ${isLinkActive('/procedure_guide') ? 'text-[#136BFB] font-medium bg-blue-50 bg-opacity-10' : 'text-white hover:bg-gray-800'} transition-colors duration-200`}
                onClick={() => setIsMenuOpen(false)}
              >
                Dental Procedure
              </Link>
              
              <Link
                href="/about_us"
                className={`block py-3 px-4 rounded-lg ${isLinkActive('/about_us') ? 'text-[#136BFB] font-medium bg-blue-50 bg-opacity-10' : 'text-white hover:bg-gray-800'} transition-colors duration-200`}
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              
              <Link
                href="/contact_us"
                className={`block py-3 px-4 rounded-lg ${isLinkActive('/contact_us') ? 'text-[#136BFB] font-medium bg-blue-50 bg-opacity-10' : 'text-white hover:bg-gray-800'} transition-colors duration-200`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
              
              <Link
                href="/pharmaceuticals"
                className={`block py-3 px-4 rounded-lg ${isLinkActive('/pharmaceuticals') ? 'text-[#136BFB] font-medium bg-blue-50 bg-opacity-10' : 'text-white hover:bg-gray-800'} transition-colors duration-200`}
                onClick={() => setIsMenuOpen(false)}
              >
                Pharmaceuticals
              </Link>
              
              <Link
                href="/blog"
                className={`block py-3 px-4 rounded-lg ${isLinkActive('/blog') ? 'text-[#136BFB] font-medium bg-blue-50 bg-opacity-10' : 'text-white hover:bg-gray-800'} transition-colors duration-200`}
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
            </div>

            {/* User Actions in Mobile Menu */}
            <div className="mt-8 pt-6 border-t border-gray-700">
              <div className="flex flex-col space-y-3">
                {authUser ? (
                  <>
                    <Link
                      href="/profile"
                      className="flex items-center space-x-3 px-4 py-3 text-white hover:bg-gray-800 rounded-lg transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FaRegUser className="h-4 w-4" />
                      <span>My Profile</span>
                    </Link>
                    <Link
                      href="/my_order"
                      className="flex items-center space-x-3 px-4 py-3 text-white hover:bg-gray-800 rounded-lg transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>My Orders</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="flex items-center space-x-3 px-4 py-3 text-red-500 hover:bg-red-50 hover:bg-opacity-10 rounded-lg transition-colors duration-200 text-left"
                    >
                      <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        navigate("/sign_in");
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center justify-center space-x-2 px-4 py-3 border border-[#136BFB] text-[#136BFB] rounded-lg hover:bg-[#136BFB] hover:text-white transition-colors duration-200"
                    >
                      <FaRegUser className="h-4 w-4" />
                      <span>Log in</span>
                    </button>
                    <button
                      onClick={() => {
                        navigate("/signup");
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center justify-center space-x-2 px-4 py-3 bg-[#136BFB] text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      <FiUserPlus className="h-4 w-4" />
                      <span>Sign up</span>
                    </button>
                  </>
                )}
                
                <Link
                  href="/my_cart"
                  className="flex items-center justify-center space-x-2 px-4 py-3 border border-[#136BFB] text-[#136BFB] rounded-lg hover:bg-[#136BFB] hover:text-white transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <RiShoppingCart2Line className="h-5 w-5" />
                  <span>Cart {mounted && totalProduct > 0 ? `(${totalProduct})` : ''}</span>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </nav>
  );
}