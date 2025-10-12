"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Menu,
  X,
  User,
  LogOut,
  Settings,
  BarChart3,
  ChevronDown,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useSession, signOut } from "next-auth/react";

interface SiteHeaderProps {
  currentPage: string;
  onNavigate?: (page: string) => void;
}

export function Navbar({ currentPage, onNavigate }: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { data: session, status } = useSession();

  const navigationItems = [
    { id: "home", label: "Home", href: "/" },
    { id: "features", label: "Features", href: "/features" },
    { id: "pricing", label: "Pricing", href: "/pricing" },
    { id: "about", label: "About", href: "/about" },
    { id: "contact", label: "Contact", href: "/contact" },
  ];

  const handleNavigation = (page: string) => {
    if (typeof onNavigate === "function") {
      onNavigate(page);
    } else {
      const path = page === "home" ? "/" : `/${page}`;
      router.push(path);
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      setIsDropdownOpen(false);
      await signOut({
        callbackUrl: "/login",
        redirect: true,
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleDashboardNavigation = () => {
    setIsDropdownOpen(false);
    router.push("/dashboard");
  };

  const handleProfileNavigation = () => {
    setIsDropdownOpen(false);
    router.push("/(After-Login)/profile");
  };

  const handleSettingsNavigation = () => {
    setIsDropdownOpen(false);
    router.push("/profile/setup");
  };

  // Helper function untuk generate user initials
  const getUserInitials = () => {
    if (session?.user?.name) {
      const nameParts = session.user.name.split(" ");
      if (nameParts.length >= 2) {
        return (nameParts[0].charAt(0) + nameParts[1].charAt(0)).toUpperCase();
      }
      return session.user.name.charAt(0).toUpperCase();
    }
    if (session?.user?.email) {
      return session.user.email.charAt(0).toUpperCase();
    }
    return "U";
  };

  const getUserDisplayName = () => {
    if (session?.user?.name) {
      // Jika nama panjang, ambil nama depan saja
      const firstName = session.user.name.split(" ")[0];
      return firstName.length > 10
        ? firstName.substring(0, 10) + "..."
        : firstName;
    }
    if (session?.user?.email) {
      const emailName = session.user.email.split("@")[0];
      return emailName.length > 10
        ? emailName.substring(0, 10) + "..."
        : emailName;
    }
    return "User";
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled
          ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-lg shadow-slate-900/5"
          : "bg-transparent border-none shadow-none"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Enhanced Logo dengan Gambar Asli */}
          <div
            className="flex items-center space-x-4 cursor-pointer group"
            onClick={() => handleNavigation("home")}
          >
            <div className="relative">
              {/* Logo Container dengan Enhanced Design */}
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110 relative overflow-hidden p-2">
                {/* Floating Decorative Elements */}
                <div className="absolute top-1 right-1 w-3 h-3 bg-orange-400 rounded-full shadow-lg"></div>
                <div className="absolute bottom-1 left-1 w-2 h-2 bg-pink-400 rounded-full shadow-md"></div>

                {/* Logo Asli */}
                <img
                  src="/civilalogo.png"
                  alt="Civila Logo"
                  className="w-8 h-8 relative z-10 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg"
                />

                {/* Enhanced Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-2xl"></div>
              </div>

              {/* Status Indicator */}
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-900">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              </div>
            </div>

            {/* Brand Text dengan Logo Font */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                {/* Logo Font Asli */}
                <img
                  src="/civilafontLM.png"
                  alt="Civila"
                  className="h-6 group-hover:scale-105 transition-transform duration-300 filter drop-shadow-sm brightness-0 saturate-100 dark:hue-rotate-[280deg] hue-rotate-[220deg] dark:brightness-100"
                />
                <Badge
                  variant="secondary"
                  className="text-xs px-2 py-0.5 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/50 dark:to-blue-900/50 text-purple-700 dark:text-purple-300 border-0 font-semibold"
                >
                  v2.0
                </Badge>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5 ml-1">
                Career Intelligence Platform
              </p>
            </div>
          </div>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navigationItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 group ${
                  currentPage === item.id
                    ? "text-white bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/25"
                    : "text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {item.label}
                {currentPage === item.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl opacity-10" />
                )}
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 group-hover:w-full group-hover:left-0" />
              </Link>
            ))}
          </nav>

          {/* Enhanced Right Section */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <div className="hidden md:block">
              <ThemeToggle />
            </div>

            {/* Enhanced Auth Section - Custom Dropdown */}
            {session?.user ? (
              <div className="flex items-center space-x-3">
                {/* Online Status Badge */}
                <div className="hidden md:flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Online
                  </span>
                </div>

                {/* Custom User Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-3 h-12 px-4 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                    onClick={() => {
                      console.log(
                        "Button clicked! Current state:",
                        isDropdownOpen
                      );
                      setIsDropdownOpen(!isDropdownOpen);
                    }}
                  >
                    {/* Avatar dengan Initials */}
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-sm">
                        {getUserInitials()}
                      </span>
                    </div>

                    {/* User Name - Hidden di mobile */}
                    <div className="hidden md:flex flex-col items-start">
                      <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {getUserDisplayName()}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        Premium
                      </span>
                    </div>

                    {/* Dropdown Arrow */}
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 dark:text-slate-400 transition-transform duration-200 ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </Button>

                  {/* Custom Dropdown Content */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl rounded-2xl p-2 z-[100]">
                      {/* User Info Header */}
                      <div className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-lg">
                              {getUserInitials()}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-slate-900 dark:text-slate-100 text-base">
                              {session.user.name || "User"}
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400 truncate">
                              {session.user.email}
                            </div>
                            <Badge variant="secondary" className="text-xs mt-2">
                              Premium User
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <hr className="border-slate-200 dark:border-slate-700 my-2" />

                      {/* Dashboard Link */}
                      <div
                        onClick={handleDashboardNavigation}
                        className="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 cursor-pointer group"
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                          <BarChart3 className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-slate-900 dark:text-slate-100">
                            Dashboard
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            Kelola profil dan progress
                          </div>
                        </div>
                      </div>

                      {/* Profile Link */}
                      <div
                        onClick={handleProfileNavigation}
                        className="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 cursor-pointer group"
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-slate-900 dark:text-slate-100">
                            Profile
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            Lihat progress dan hasil
                          </div>
                        </div>
                      </div>

                      {/* Settings Link */}
                      <div
                        onClick={handleSettingsNavigation}
                        className="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 cursor-pointer group"
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                          <Settings className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-slate-900 dark:text-slate-100">
                            Settings
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            Atur preferensi akun
                          </div>
                        </div>
                      </div>

                      <hr className="border-slate-200 dark:border-slate-700 my-2" />

                      {/* Logout Button */}
                      <div
                        onClick={handleLogout}
                        className="flex items-center space-x-3 p-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-700 dark:hover:text-red-400 transition-colors duration-200 cursor-pointer group"
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                          <LogOut className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">Keluar</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            Logout dari akun
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/login"
                  className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium px-4 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
                >
                  Masuk
                </Link>
                <Button
                  asChild
                  className="relative overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white border-0 rounded-xl px-6 py-2.5 font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 hover:scale-105"
                >
                  <Link href="/register" className="relative z-10">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl" />
                    Mulai Gratis
                  </Link>
                </Button>
              </div>
            )}

            {/* Enhanced Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden relative w-10 h-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="relative">
                {isMenuOpen ? (
                  <X className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                ) : (
                  <Menu className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                )}
              </div>
            </Button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-b-2xl shadow-xl">
            {/* Mobile Navigation Links */}
            <nav className="px-4 space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    currentPage === item.id
                      ? "text-white bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <span>{item.label}</span>
                  {currentPage === item.id && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Mobile Auth Section - Simplified */}
            {session?.user && (
              <div className="px-4 pt-6 border-t border-slate-200 dark:border-slate-700 mt-6">
                <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">
                      {getUserInitials()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-slate-900 dark:text-slate-100">
                      {getUserDisplayName()}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {session.user.email}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={handleDashboardNavigation}
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <BarChart3 className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={handleLogout}
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      <LogOut className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Theme Toggle */}
            <div className="px-4 pt-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Theme
                </span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
