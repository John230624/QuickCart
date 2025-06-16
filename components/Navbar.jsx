// components/Navbar.jsx
"use client";
import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Link from "next/link";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import { usePathname, useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  FaSearch,
  FaUser,
  FaHome,
  FaShoppingBag,
  FaGift,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaShoppingCart,
  FaBoxOpen,
} from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";

const Navbar = () => {
  const { isSeller, cartItems } = useAppContext();
  const router = useRouter();
  const pathname = usePathname();
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopSearchInputVisible, setIsDesktopSearchInputVisible] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [showLogoutOverlay, setShowLogoutOverlay] = useState(false);

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      setCartItemsCount(cartItems.reduce((total, item) => total + item.quantity, 0));
    } else {
      setCartItemsCount(0);
    }
  }, [cartItems]);

  const getLinkClassName = (href) => {
    const baseClasses = "hover:text-gray-900 transition";
    const activeClasses = "text-blue-600 font-semibold";

    if (href === "/" && pathname === "/") {
      return `${baseClasses} ${activeClasses}`;
    }
    if (href !== "/" && pathname.startsWith(href)) {
      return `${baseClasses} ${activeClasses}`;
    }
    return baseClasses;
  };

  const getMobileMenuItemClassName = (href) => {
    const baseClasses = "flex items-center gap-3 text-lg w-full py-2 px-3 rounded-md transition duration-200 ease-in-out";
    const activeClasses = "bg-zinc-200 border text-zinc-950 font-semibold";
    const hoverClasses = "hover:bg-zinc-950 hover:text-zinc-50";

    if (href === "/" && pathname === "/") {
      return `${baseClasses} ${activeClasses}`;
    }
    if (href !== "/" && pathname.startsWith(href)) {
      return `${baseClasses} ${activeClasses}`;
    }
    return `${baseClasses} ${hoverClasses}`;
  };

  const handleAuthAction = async () => {
    if (isSignedIn) {
      setShowLogoutOverlay(true);
      setIsAuthLoading(true);
      await new Promise(resolve => setTimeout(resolve, 20));
      await signOut(() => {
        window.location.href = "/";
      });
    } else {
      setIsAuthLoading(true);
      router.push("/sign-in");
      setIsAuthLoading(false);
    }
    setShowProfileDropdown(false);
  };

  return (
    <>
      {showLogoutOverlay && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-md"></div>
          <div className="relative z-10 bg-white bg-opacity-90 p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4 mx-auto"></div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Déconnexion en cours</h3>
          </div>
        </div>
      )}

      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b bg-zinc-100 text-zinc-950 relative">
        <Image
          className="cursor-pointer w-28 md:w-32"
          onClick={() => router.push("/")}
          src={assets.logo}
          alt="logo"
          width={128}
          height={40}
        />

        <div className="hidden md:flex items-center gap-4 lg:gap-8 text-zinc-950">
          <div className="hover p-2 hover:bg-zinc-200 rounded-3xl hover:scale-105 transition-transform hover:font-semibold">
            <Link href="/" className={getLinkClassName("/")}>
              Accueil
            </Link>
          </div>
          <div className="hover p-2 hover:bg-zinc-200 rounded-3xl hover:scale-105 transition-transform hover:font-semibold">
            <Link href="/all-products" className={getLinkClassName("/all-products")}>
              Boutique
            </Link>
          </div>
          <div className="hover p-2 hover:bg-zinc-200 rounded-3xl hover:scale-105 transition-transform hover:font-semibold">
            <Link href="/offer" className={getLinkClassName("/offer")}>
              Offres
            </Link>
          </div>
          <div className="hover p-2 hover:bg-zinc-200 rounded-3xl hover:scale-105 transition-transform hover:font-semibold">
            <Link href="/contact" className={getLinkClassName("/contact")}>
              Contact
            </Link>
          </div>

          {isSeller && (
            <button
              onClick={() => router.push("/seller")}
              className="text-xs border px-4 py-1.5 rounded-full hover:text-semibold hover:scale-105 transition-transform border-zinc-950 text-zinc-950 hover:bg-zinc-950 hover:text-zinc-50"
            >
              Tableau de bord
            </button>
          )}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="relative">
            <FaSearch
              className="w-5 h-5 cursor-pointer text-blue-700 hover:scale-105 hover:text-semibold transition-transform"
              onClick={() => setIsDesktopSearchInputVisible(!isDesktopSearchInputVisible)}
            />
            {isDesktopSearchInputVisible && (
              <input
                type="text"
                placeholder="Rechercher..."
                className="absolute right-0 top-full mt-2 p-2 border border-gray-300 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 z-10 bg-white text-zinc-950"
                onBlur={() => setIsDesktopSearchInputVisible(false)}
                autoFocus
              />
            )}
          </div>

          {isSignedIn && (
            <div className="relative">
              <button
                onClick={() => router.push("/cart")}
                className="p-2 rounded-full hover:bg-zinc-200 transition-colors relative"
                aria-label="Panier"
              >
                <FaShoppingCart className="w-5 h-5 text-blue-700" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount > 9 ? "9+" : cartItemsCount}
                  </span>
                )}
              </button>
            </div>
          )}

          <div className="relative">
            <button
              onClick={isSignedIn ? () => setShowProfileDropdown(!showProfileDropdown) : handleAuthAction}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                isSignedIn 
                  ? "bg-zinc-100 hover:bg-zinc-200 text-zinc-950"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
              } ${isAuthLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={isAuthLoading}
            >
              {isAuthLoading ? (
                <div className="spinner w-5 h-5 border-2 border-t-2 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
              ) : isSignedIn && user?.imageUrl ? (
                <img
                  src={user.imageUrl}
                  alt="Profile"
                  className="w-6 h-6 rounded-full"
                />
              ) : (
                <FaUser className="w-5 h-5" />
              )}
              {!isSignedIn && (
                <span className="font-medium">Connexion</span>
              )}
            </button>

            {showProfileDropdown && isSignedIn && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                <Link
                  href="/my-orders"
                  className=" px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  onClick={() => setShowProfileDropdown(false)}
                >
                  <FaBoxOpen className="text-blue-500" />
                  Mes commandes
                </Link>
                <button
                  onClick={handleAuthAction}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <FaSignOutAlt className="text-red-500" />
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="md:hidden flex items-center gap-3">
          {isSignedIn && (
            <button
              onClick={() => {
                router.push("/cart");
                setIsMobileMenuOpen(false);
              }}
              className="p-2 rounded-full hover:bg-zinc-200 transition-colors relative"
              aria-label="Panier"
            >
              <FaShoppingCart className="w-5 h-5 text-blue-700" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount > 9 ? "9+" : cartItemsCount}
                </span>
              )}
            </button>
          )}

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="w-7 h-7 text-zinc-950" />
            ) : (
              <FaBars className="w-7 h-7 text-zinc-950" />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-zinc-100 border-b shadow-lg z-20 flex flex-col items-start px-6 py-4 space-y-2 animate-fade-in-down">
            <div className="w-full mb-4">
              <div className="relative">
                <FaSearch className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full hover:bg-zinc-200 p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-zinc-950"
                />
              </div>
            </div>

            <Link
              href="/"
              className={getMobileMenuItemClassName("/")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaHome className="w-5 h-5" />
              Accueil
            </Link>
            <Link
              href="/all-products"
              className={getMobileMenuItemClassName("/all-products")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaShoppingBag className="w-5 h-5" />
              Boutique
            </Link>
            <Link
              href="/offer"
              className={getMobileMenuItemClassName("/offer")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaGift className="w-5 h-5" />
              Offres
            </Link>
            <Link
              href="/contact"
              className={getMobileMenuItemClassName("/contact")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaEnvelope className="w-5 h-5" />
              Contact
            </Link>

            {isSeller && (
              <button
                onClick={() => {
                  router.push("/seller");
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 text-lg w-full py-2 px-3 rounded-md transition duration-200 ease-in-out bg-zinc-50 hover:bg-zinc-950 hover:text-zinc-50 text-zinc-950 font-semibold"
              >
                <MdOutlineDashboard className="w-5 h-5" />
                Tableau de bord
              </button>
            )}

            {isSignedIn && (
              <Link
                href="/my-orders"
                className={getMobileMenuItemClassName("/my-orders")}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaBoxOpen className="w-5 h-5" />
                Mes commandes
              </Link>
            )}

            <button
              onClick={() => {
                handleAuthAction();
                setIsMobileMenuOpen(false);
              }}
              className={getMobileMenuItemClassName("/account")}
            >
              {isAuthLoading ? (
                <div className="spinner w-5 h-5 border-2 border-t-2 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
              ) : isSignedIn ? (
                <>
                  <FaSignOutAlt className="w-5 h-5" />
                  Déconnexion
                </>
              ) : (
                <>
                  <FaUser className="w-5 h-5" />
                  Connexion
                </>
              )}
            </button>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;