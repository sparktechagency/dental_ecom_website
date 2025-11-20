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
  const [searchText, setSearchText] = useState("");
  const menuRef = useRef(null);
  const debounceRef = useRef(null);
  const navigate = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const [logoutApi, { isLoading: isLoggingOut }] = useLogoutMutation();

  // Active link checker
  const isLinkActive = (path) => {
    if (path === "/") return pathname === path;
    return pathname.startsWith(path);
  };

  const handleSearchChange = (e) => {
    const v = e.target.value;
    setSearchText(v);
  };

  const performSearch = () => {
    const q = searchText.trim();
    if (!q) {
      navigate.push(`/product`);
    } else {
      navigate.push(`/product?search=${encodeURIComponent(q)}`);
    }
    setIsMenuOpen(false);
  };

  // Debounced live search
  useEffect(() => {
    const q = searchText.trim();
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      if (q) {
        navigate.push(`/product?search=${encodeURIComponent(q)}`);
      }
    }, 300);

    return () => clearTimeout(debounceRef.current);
  }, [searchText, navigate]);

  // Clear cart on success pages
  useEffect(() => {
    if (!pathname) return;
    const isSuccess = pathname.startsWith("/checkout/success") || pathname === "/congratulations";
    const oid = searchParams?.get?.("orderId");
    if (isSuccess || oid) {
      dispatch(clearCartLocal());
    }
  }, [pathname, searchParams, dispatch]);

  useEffect(() => setMounted(true), []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
    } catch (e) {}
    dispatch(authLogout());
    dispatch(clearCartLocal());
    navigate.push("/sign_in");
    setIsMenuOpen(false);
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="bg-white text-black px-4 sm:px-6 py-3 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <img
            src="/logo.svg"
            alt="company logo"
            className="h-9 w-auto sm:h-10 md:h-12"
          />
        </Link>

        {/* Search Bar - Always visible */}
        <div className="flex-1 max-w-xl mx-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CiSearch className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchText}
              onChange={handleSearchChange}
              onKeyDown={(e) => e.key === "Enter" && performSearch()}
              className="w-full bg-white border border-gray-300 rounded-sm pl-10 pr-10 py-2.5 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#136BFB] text-sm md:text-base"
            />
            <button
              onClick={performSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-white"
            >
              <VscSettings className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Cart */}
          <div className="relative">
            <Link
              href="/my_cart"
              className="p-2  border border-gray-300 rounded-sm hover:bg-green-600 hover:text-white transition-colors block"
            >
              <RiShoppingCart2Line className=" w-4 " />
            </Link>
            {mounted && totalProduct > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                {totalProduct > 99 ? "99+" : totalProduct}
              </span>
            )}
          </div>

          {/* Menu Dropdown Trigger */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={toggleMenu}
              className="p-1 px-4 border border-gray-300 rounded-sm hover:bg-green-600 text-gray-700 hover:text-white transition-colors"
            >
              {isMenuOpen ? (
                <><FaTimes className="h-5 w-5 sm:h-6 sm:w-6" /></>
              ) : (
                
                <><div className="flex items-center gap-2 ">
                  <FaBars className="w-4 " /> <h1>Menu</h1></div></>
              )}
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 overflow-hidden">
                <div className="py-2">
                  {/* Navigation Links */}
                  {[
                    { href: "/", label: "Home" },
                    { href: "/product", label: "Dental Products Shop" },
                    { href: "/procedure_guide", label: "Dental Procedure" },
                    { href: "/about_us", label: "About Us" },
                    { href: "/contact_us", label: "Contact Us" },
                    { href: "/pharmaceuticals", label: "Pharmaceuticals" },
                    { href: "/blog", label: "Blog" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMenu}
                      className={`block px-4 py-3 text-sm transition-colors ${
                        isLinkActive(item.href)
                          ? "text-[#136BFB] font-medium bg-blue-50"
                          : "text-gray-700 hover:bg-gray-50 hover:text-[#136BFB]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}

                  <div className="border-t border-gray-200 my-2"></div>

                  {/* Authenticated User Links */}
                  {authUser ? (
                    <>
                      <Link
                        href="/profile"
                        onClick={closeMenu}
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#136BFB]"
                      >
                        My Profile
                      </Link>
                      <Link
                        href="/my_order"
                        onClick={closeMenu}
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#136BFB]"
                      >
                        My Orders
                      </Link>
                      <Link
                        href="/ai_support"
                        onClick={closeMenu}
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#136BFB]"
                      >
                        Support
                      </Link>
                      <div className="border-t border-gray-200 my-2"></div>
                      <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        {isLoggingOut ? "Logging out..." : "Logout"}
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          navigate.push("/sign_in");
                          closeMenu();
                        }}
                        className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#136BFB] flex items-center gap-2"
                      >
                        <FaRegUser className="h-4 w-4" />
                        Log in
                      </button>
                      <button
                        onClick={() => {
                          navigate.push("/signup");
                          closeMenu();
                        }}
                        className="w-full text-left px-4 py-3 text-sm text-[#136BFB] hover:bg-blue-50 flex items-center gap-2 font-medium"
                      >
                        <FiUserPlus className="h-4 w-4" />
                        Sign up
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Profile Icon (only if logged in) */}
          {authUser && (
            <Link href="/profile">
              <img
                src="https://i.ibb.co.com/RvFgZC8/aman.png"
                alt="profile"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-[#136BFB] object-cover"
              />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}