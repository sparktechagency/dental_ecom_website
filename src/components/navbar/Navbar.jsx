"use client";

import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useMemo } from "react";
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

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
        {/* Mobile Header */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center justify-center">
            <img
              src="/logo.svg"
              alt="company logo"
              className="h-8 w-auto sm:h-10 md:h-12 lg:h-14"
            />
          </Link>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            {authUser ? (
              <Link href="/my_cart" className="text-white p-2">
                <RiShoppingCart2Line className="h-5 w-5" />
              </Link>
            ) : (
              <button onClick={() => navigate.push('/sign_in')} className="text-white px-3 py-1 border border-[#136BFB] rounded">
                Log in
              </button>
            )}
            <button onClick={toggleSearch} className="text-white p-2">
              <CiSearch className="h-5 w-5" />
            </button>
            <button
              onClick={toggleMenu}
              className="menu-button text-white p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FaTimes className="h-5 w-5" />
              ) : (
                <FaBars className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link
              href="/"
              className={`${isLinkActive('/') ? 'text-[#136BFB] font-medium' : 'text-white hover:text-gray-300'} transition-colors`}
            >
              Home
            </Link>
         
            <Link
              href="/product"
              className={`${isLinkActive('/product') ? 'text-[#136BFB] font-medium' : 'text-white hover:text-gray-300'} transition-colors`}
            >
              Product
            </Link>
            <Link
              href="/allcategory"
              className={`${isLinkActive('/allcategory') ? 'text-[#136BFB] font-medium' : 'text-white hover:text-gray-300'} transition-colors`}
            >
              Category
            </Link>
            <Link
              href="/procedure_guide"
              className={`${isLinkActive('/procedure_guide') ? 'text-[#136BFB] font-medium' : 'text-white hover:text-gray-300'} transition-colors`}
            >
              Procedure Guide
            </Link>
            <Link
              href="/pharmaceuticals"
              className={`${isLinkActive('/pharmaceuticals') ? 'text-[#136BFB] font-medium' : 'text-white hover:text-gray-300'} transition-colors`}
            >
              Pharmaceuticals
            </Link>
            <Link
              href="/blog"
              className={`${isLinkActive('/blog') ? 'text-[#136BFB] font-medium' : 'text-white hover:text-gray-300'} transition-colors`}
            >
              Blog
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center justify-end space-x-2">
              <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CiSearch className="h-4 w-4 text-[#136BFB]" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={handleSearchChange}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); performSearch(); } }}
                className="bg-black border border-[#136BFB] rounded-xl pl-10 pr-10 py-2 text-white placeholder-[#136BFB] focus:outline-none w-40 sm:w-48 md:w-64"
              />
              {/* <button className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={performSearch}>
                <VscSettings className="h-5 w-5 text-[#136BFB]" />
              </button> */}
            </div>
            <div className="flex-1 flex items-center justify-end space-x-2">
              {authUser ? (
                <>
                  <div className="w-full relative flex">
                    <Link
                      href="/my_cart"
                      className="w-full flex items-center justify-center px-3 py-2 border border-[#136BFB] text-[#136BFB] rounded-lg"
                    >
                      <RiShoppingCart2Line className="h-5 w-5" />
                    </Link>
                    <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      <p>{mounted ? totalProduct : 0}</p>
                    </div>
                  </div>
                  <div className="relative" ref={dropdownRef}>
                    <div
                      className="flex items-center cursor-pointer group"
                      onClick={toggleDropdown}
                    >
                      <img
                        src="https://i.ibb.co.com/RvFgZC8/aman.png"
                        alt="profile"
                        height={70}
                        width={70}
                        className=" rounded-full"
                      />
                    </div>
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                        <Link
                          href="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          My Profile
                        </Link>
                        <Link
                          href="/my_order"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          My Orders
                        </Link>
                        <Link
                          href="/favourite"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Favourite
                        </Link>
                        <Link
                          href="/ai_support"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Support
                        </Link>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
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
                <div className="flex items-center gap-2">
                  <button onClick={() => navigate.push('/sign_in')} className="px-4 py-2 border border-[#136BFB] text-[#136BFB] rounded-lg">Log in</button>
                  <button onClick={() => navigate.push('/signup')} className="px-4 py-2 bg-[#136BFB] text-white rounded-lg">Sign up</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="mt-3 md:hidden">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CiSearch className="h-4 w-4 text-[#136BFB]" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={handleSearchChange}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); performSearch(); } }}
                className="w-full bg-black border border-[#136BFB] rounded-xl pl-10 pr-10 py-2 text-white placeholder-[#136BFB] focus:outline-none"
              />
              <button className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={performSearch}>
                <VscSettings className="h-5 w-5 text-[#136BFB]" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu Overlay and Content */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu-container fixed top-0 left-0 h-full w-4/5 max-w-xs bg-[#171716] z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <div className="w-24">
              <img
                src="/logo.svg"
                alt="company logo"
                className="w-full h-auto"
              />
            </div>
            <button
              onClick={toggleMenu}
              className="text-white p-2 -mr-2"
              aria-label="Close menu"
            >
              <FaTimes className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto">
            <div className="flex flex-col space-y-5">
              <Link
                href="/"
                className={`block py-2 px-4 ${isLinkActive('/') ? 'text-[#136BFB] font-medium' : 'text-white hover:bg-gray-700'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about_us"
                className={`block py-2 px-4 ${isLinkActive('/about_us') ? 'text-[#136BFB] font-medium' : 'text-white hover:bg-gray-700'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/product"
                className="text-white hover:text-gray-300 transition-colors"
                onClick={toggleMenu}
              >
                Product
              </Link>
              <Link
                href="/allcategory"
                className="text-white hover:text-gray-300 transition-colors"
                onClick={toggleMenu}
              >
                Category
              </Link>
              <Link
                href="/procedure-guide"
                className="text-white hover:text-gray-300 transition-colors"
                onClick={toggleMenu}
              >
                Procedure Guide
              </Link>
              <Link
                href="/pharmaceuticals"
                className="text-white hover:text-gray-300 transition-colors"
                onClick={toggleMenu}
              >
                Pharmaceuticals
              </Link>
              <Link
                href="/blog"
                className={`block py-2 px-4 ${isLinkActive('/blog') ? 'text-[#136BFB] font-medium' : 'text-white hover:bg-gray-700'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-700">
              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => {
                    navigate("/sign_in");
                    toggleMenu();
                  }}
                  className="cursor-pointer w-full flex items-center justify-center space-x-2 px-4 py-3 border border-[#136BFB] text-[#136BFB] rounded-lg"
                >
                  <FaRegUser className="h-4 w-4" />
                  <span>Log in</span>
                </button>
                <button
                  onClick={() => {
                    navigate("/signup");
                    toggleMenu();
                  }}
                  className="cursor-pointer w-full flex items-center justify-center space-x-2 px-4 py-3 bg-[#136BFB] text-white rounded-lg"
                >
                  <FiUserPlus className="h-4 w-4" />
                  <span>Sign up</span>
                </button>
                <button
                  onClick={() => {
                    navigate("/shopping-cart");
                    toggleMenu();
                  }}
                  className="cursor-pointer w-full flex items-center justify-center space-x-2 px-4 py-3 border border-[#136BFB] text-[#136BFB] rounded-lg"
                >
                  <RiShoppingCart2Line className="h-5 w-5" />
                  <span>Cart</span>
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </nav>
  );
}
