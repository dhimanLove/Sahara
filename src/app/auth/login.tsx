"use client";

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";

import {
  Heart,
  Building2,
  ArrowRight,
  Eye,
  EyeOff,
  Mail,
  Lock,
  Phone,
  Shield,
  Globe,
  ChevronDown,
  Search,
  Check,
  AlertCircle,
  X,
  Fingerprint,
  BadgeCheck,
  Landmark,
  Users,
  Award,
  MessageSquare,
} from "lucide-react";

const countries = [
  {
    code: "+1",
    name: "United States",
    flag: "🇺🇸",
    placeholder: "555 123 4567",
  },
  {
    code: "+44",
    name: "United Kingdom",
    flag: "🇬🇧",
    placeholder: "7412 345678",
  },
  { code: "+91", name: "India", flag: "🇮🇳", placeholder: "98765 43210" },
  { code: "+61", name: "Australia", flag: "🇦🇺", placeholder: "412 345 678" },
  { code: "+49", name: "Germany", flag: "🇩🇪", placeholder: "151 23456789" },
  {
    code: "+33",
    name: "New Zealand",
    flag: "🇳🇿",
    placeholder: "6 12 34 56 78",
  },
  { code: "+81", name: "Japan", flag: "🇯🇵", placeholder: "090 1234 5678" },
  { code: "+86", name: "China", flag: "🇨🇳", placeholder: "138 1234 5678" },
  { code: "+55", name: "Brazil", flag: "🇧🇷", placeholder: "11 91234-5678" },
  { code: "+234", name: "Nigeria", flag: "🇳🇬", placeholder: "0803 123 4567" },
  { code: "+254", name: "Kenya", flag: "🇰🇪", placeholder: "712 345678" },
  { code: "+27", name: "South Africa", flag: "🇿🇦", placeholder: "82 123 4567" },
  { code: "+971", name: "UAE", flag: "🇦🇪", placeholder: "50 123 4567" },
  { code: "+92", name: "Pakistan", flag: "🇵🇰", placeholder: "312 3456789" },
  { code: "+880", name: "Bangladesh", flag: "🇧🇩", placeholder: "1712 345678" },
  { code: "+977", name: "Nepal", flag: "🇳🇵", placeholder: "984 1234567" },
];

type LoginMode = "widow" | "ngo";
type OTPMethod = "sms" | "whatsapp" | "voice";

export default function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<LoginMode>("widow");

  // Widow states
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpMethod, setOtpMethod] = useState<OTPMethod>("sms");
  const [cooldown, setCooldown] = useState(0);
  const [countrySearch, setCountrySearch] = useState("");
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);

  // NGO states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Shared
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const selectedCountry = countries.find((c) => c.code === countryCode);
  const filteredCountries = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.code.includes(countrySearch),
  );

  useEffect(() => {
    if (cooldown > 0) {
      const t = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [cooldown]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(e.target as Node)
      ) {
        setCountryDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      const pasted = value.replace(/\D/g, "").slice(0, 6);
      const newOtp = [...otp];
      pasted.split("").forEach((char, i) => {
        if (i < 6) newOtp[i] = char;
      });
      setOtp(newOtp);
      otpInputRefs.current[Math.min(pasted.length, 5)]?.focus();
      return;
    }
    const newOtp = [...otp];
    newOtp[index] = value.replace(/\D/g, "");
    setOtp(newOtp);
    if (value && index < 5) otpInputRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleSendOtp = async () => {
    if (!phoneNumber || cooldown > 0) return;
    setError("");
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setOtpSent(true);
    setCooldown(30);
    setIsLoading(false);
  };

  const handleWidowLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.join("").length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }
    setError("");
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setIsLoading(false);
    navigate({ to: "/dashboard" });
  };

  const handleNGOLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setError("");
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setIsLoading(false);
    navigate({ to: "/ngo/dashboard" });
  };

  const handleResendOtp = (method: OTPMethod) => {
    setOtpMethod(method);
    setCooldown(30);
    setOtp(["", "", "", "", "", ""]);
  };

  const isWidow = mode === "widow";
  const accent = isWidow ? "amber" : "blue";

  // Shared input class base
  const inputBase =
    "w-full h-[52px] bg-neutral-900/60 border rounded-[14px] text-[15px] text-white placeholder-neutral-600 " +
    "focus:outline-none transition-all duration-200 ";

  const inputFocus = isWidow
    ? "border-neutral-800 focus:border-amber-500/60 focus:bg-neutral-900 focus:ring-[3px] focus:ring-amber-500/10"
    : "border-neutral-800 focus:border-blue-500/60 focus:bg-neutral-900 focus:ring-[3px] focus:ring-blue-500/10";

  return (
    <div className="flex min-h-screen font-sans bg-[#0a0a0a]">
      {/* ─── Left Brand Panel ─── */}
      <aside className="hidden lg:flex w-[44%] relative overflow-hidden flex-col justify-between p-14 xl:p-20">
        {/* Subtle noise / texture */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(180,130,60,0.07) 0%, transparent 70%), radial-gradient(ellipse 60% 80% at 100% 100%, rgba(100,80,180,0.05) 0%, transparent 70%)",
          }}
        />
        {/* Fine grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 flex flex-col h-full justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <div>
                <p
                  className="text-white font-semibold text-xl tracking-[0.15em] uppercase leading-none"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Sahara
                </p>
                <p className="text-[10px] text-neutral-500 tracking-[0.3em] uppercase mt-0.5">
                  Global Initiative
                </p>
              </div>
            </div>
          </motion.div>

          {/* Hero text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="my-auto py-16"
          >
            <div className="w-8 h-px bg-amber-500/60 mb-10" />
            <h1
              className="text-5xl xl:text-[3.5rem] leading-[1.1] text-white font-light tracking-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Dignity.
              <br />
              <em className="text-amber-400 not-italic">Rights.</em>
              <br />
              Support.
              <br />
              <span className="text-neutral-500">Worldwide.</span>
            </h1>
            <p className="mt-8 text-neutral-400 text-[15px] leading-relaxed max-w-xs">
              A trusted platform connecting widows to care, support, and legal
              protection across 40+ countries.
            </p>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { icon: Globe, label: "40+ Countries" },
                { icon: Users, label: "1M+ Supported" },
                { icon: Shield, label: "ISO 27001" },
                { icon: Award, label: "UN Recognized" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-white/[0.05] bg-white/[0.025]"
                >
                  <item.icon className="w-3.5 h-3.5 text-amber-500/60 flex-shrink-0" />
                  <span className="text-[11px] text-neutral-500 tracking-wide">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[11px] text-neutral-700 tracking-[0.15em] uppercase">
              UN SDG 5 Aligned · GDPR Compliant
            </p>
          </motion.div>
        </div>
      </aside>

      {/* ─── Right Form Panel ─── */}
      <main className="flex-1 flex items-center justify-center p-6 md:p-10 bg-[#0c0c0c] lg:border-l lg:border-white/[0.04]">
        <div className="w-full max-w-[420px]">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2.5 mb-10 justify-center">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
              <Heart className="w-4 h-4 text-white fill-white" />
            </div>
            <span
              className="text-white font-semibold tracking-widest uppercase text-sm"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Sahara
            </span>
          </div>

          {/* Mode Toggle */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex p-1 bg-neutral-900 rounded-[18px] border border-white/[0.05] mb-10">
              {(["widow", "ngo"] as LoginMode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => {
                    setMode(m);
                    setError("");
                    setOtpSent(false);
                    setOtp(["", "", "", "", "", ""]);
                  }}
                  className={`relative flex-1 flex items-center justify-center gap-2 h-11 rounded-[14px] text-[13px] font-medium transition-all duration-250 ${
                    mode === m
                      ? m === "widow"
                        ? "bg-amber-500/15 text-amber-400"
                        : "bg-blue-500/15 text-blue-400"
                      : "text-neutral-600 hover:text-neutral-400"
                  }`}
                >
                  {m === "widow" ? (
                    <Heart className="w-3.5 h-3.5" />
                  ) : (
                    <Building2 className="w-3.5 h-3.5" />
                  )}
                  {m === "widow" ? "Widow Login" : "NGO Login"}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Header */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`hdr-${mode}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="mb-8"
            >
              <h2
                className="text-[1.6rem] text-white font-light leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {isWidow ? "Welcome back" : "Organization access"}
              </h2>
              <p className="mt-1.5 text-[13px] text-neutral-500 leading-relaxed">
                {isWidow
                  ? "Sign in with your registered phone number"
                  : "Access your partner management dashboard"}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: "auto", marginBottom: 24 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="overflow-hidden"
              >
                <div className="flex items-center gap-3 px-4 py-3 bg-red-500/8 border border-red-500/15 rounded-[14px] text-red-400 text-[13px]">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span className="flex-1">{error}</span>
                  <button
                    type="button"
                    onClick={() => setError("")}
                    className="hover:text-red-300 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Forms ── */}
          <AnimatePresence mode="wait">
            {isWidow ? (
              <motion.form
                key="widow"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.25 }}
                onSubmit={handleWidowLogin}
              >
                <AnimatePresence mode="wait">
                  {!otpSent ? (
                    <motion.div
                      key="phone-step"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-5"
                    >
                      {/* Phone label */}
                      <div>
                        <label className="block text-[11px] font-medium text-neutral-500 tracking-[0.12em] uppercase mb-3">
                          Phone Number
                        </label>
                        <div className="flex gap-2.5">
                          {/* Country picker */}
                          <div
                            className="relative flex-shrink-0"
                            ref={countryDropdownRef}
                          >
                            <button
                              type="button"
                              onClick={() =>
                                setCountryDropdownOpen(!countryDropdownOpen)
                              }
                              className="flex items-center gap-2 h-[52px] px-3.5 bg-neutral-900/60 border border-neutral-800 rounded-[14px] text-white hover:border-neutral-700 hover:bg-neutral-900 transition-all duration-200 focus:outline-none focus:border-amber-500/60 focus:ring-[3px] focus:ring-amber-500/10"
                            >
                              <span className="text-base leading-none">
                                {selectedCountry?.flag}
                              </span>
                              <span className="text-[13px] font-medium text-neutral-300 tabular-nums">
                                {selectedCountry?.code}
                              </span>
                              <ChevronDown
                                className={`w-3.5 h-3.5 text-neutral-600 transition-transform duration-200 ${countryDropdownOpen ? "rotate-180" : ""}`}
                              />
                            </button>

                            <AnimatePresence>
                              {countryDropdownOpen && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.97, y: -4 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  exit={{ opacity: 0, scale: 0.97, y: -4 }}
                                  transition={{ duration: 0.12 }}
                                  className="absolute top-full mt-2 w-72 bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl shadow-black/60 z-50 overflow-hidden"
                                >
                                  {/* Search */}
                                  <div className="p-2.5 border-b border-neutral-900">
                                    <div className="relative">
                                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-600" />
                                      <input
                                        type="text"
                                        placeholder="Search country…"
                                        value={countrySearch}
                                        onChange={(e) =>
                                          setCountrySearch(e.target.value)
                                        }
                                        className="w-full h-9 pl-9 pr-3 bg-neutral-900 border border-neutral-800 rounded-xl text-[13px] text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-700"
                                      />
                                    </div>
                                  </div>
                                  {/* List */}
                                  <div className="max-h-60 overflow-y-auto">
                                    {filteredCountries.map((country) => (
                                      <button
                                        key={country.code}
                                        type="button"
                                        onClick={() => {
                                          setCountryCode(country.code);
                                          setCountryDropdownOpen(false);
                                          setCountrySearch("");
                                        }}
                                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-[13px] hover:bg-white/[0.04] transition-colors text-left ${countryCode === country.code ? "text-amber-400 bg-amber-500/5" : "text-neutral-300"}`}
                                      >
                                        <span className="text-base">
                                          {country.flag}
                                        </span>
                                        <span className="flex-1">
                                          {country.name}
                                        </span>
                                        <span className="text-neutral-600 tabular-nums">
                                          {country.code}
                                        </span>
                                        {countryCode === country.code && (
                                          <Check className="w-3.5 h-3.5 text-amber-500" />
                                        )}
                                      </button>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          {/* Phone input */}
                          <div className="flex-1 relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600 pointer-events-none" />
                            <input
                              type="tel"
                              value={phoneNumber}
                              onChange={(e) =>
                                setPhoneNumber(
                                  e.target.value
                                    .replace(/\D/g, "")
                                    .slice(0, 15),
                                )
                              }
                              placeholder={
                                selectedCountry?.placeholder || "Phone number"
                              }
                              className={`${inputBase} ${inputFocus} pl-11 pr-4`}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Send OTP */}
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={!phoneNumber || isLoading}
                        className="w-full h-[52px] flex items-center justify-center gap-2.5 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-[#0a0a0a] text-[14px] font-semibold rounded-[14px] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <svg
                            className="animate-spin w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="3"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                          </svg>
                        ) : (
                          <>
                            <span>Send Verification Code</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="otp-step"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      {/* OTP header */}
                      <div className="text-center pb-2">
                        <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-amber-500/10 border border-amber-500/15 flex items-center justify-center">
                          <Fingerprint className="w-7 h-7 text-amber-500" />
                        </div>
                        <h3 className="text-white text-[17px] font-medium mb-1.5">
                          Verify your identity
                        </h3>
                        <p className="text-[13px] text-neutral-500 leading-relaxed">
                          6-digit code sent to{" "}
                          <span className="text-neutral-300 font-medium">
                            {selectedCountry?.code} {phoneNumber}
                          </span>
                        </p>
                      </div>

                      {/* Delivery method pills */}
                      <div className="flex justify-center gap-1.5">
                        {(["sms", "whatsapp", "voice"] as OTPMethod[]).map(
                          (m) => (
                            <button
                              key={m}
                              type="button"
                              onClick={() => handleResendOtp(m)}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-[11px] font-medium tracking-wide transition-all border ${
                                otpMethod === m
                                  ? "bg-amber-500/12 border-amber-500/25 text-amber-400"
                                  : "bg-transparent border-neutral-800 text-neutral-600 hover:text-neutral-400 hover:border-neutral-700"
                              }`}
                            >
                              {m === "sms" && (
                                <MessageSquare className="w-3 h-3" />
                              )}
                              {m === "whatsapp" && (
                                <span className="text-xs">📱</span>
                              )}
                              {m === "voice" && <Phone className="w-3 h-3" />}
                              {m === "sms"
                                ? "SMS"
                                : m === "whatsapp"
                                  ? "WhatsApp"
                                  : "Call"}
                            </button>
                          ),
                        )}
                      </div>

                      {/* OTP Boxes */}
                      <div className="flex justify-center gap-2.5">
                        {otp.map((digit, index) => (
                          <input
                            key={index}
                            ref={(el) => {
                              otpInputRefs.current[index] = el;
                            }}
                            type="text"
                            inputMode="numeric"
                            maxLength={6}
                            value={digit}
                            onChange={(e) =>
                              handleOtpChange(index, e.target.value)
                            }
                            onKeyDown={(e) => handleOtpKeyDown(index, e)}
                            className={`w-11 h-14 text-center text-[20px] font-semibold bg-neutral-900/60 border rounded-[14px] text-white focus:outline-none transition-all duration-200 caret-amber-500 ${
                              digit
                                ? "border-amber-500/50 bg-amber-500/5 ring-[3px] ring-amber-500/10"
                                : "border-neutral-800 hover:border-neutral-700 focus:border-amber-500/60 focus:ring-[3px] focus:ring-amber-500/10"
                            }`}
                          />
                        ))}
                      </div>

                      {/* Resend timer */}
                      <p className="text-center text-[12px] text-neutral-600">
                        {cooldown > 0 ? (
                          <>
                            Resend in{" "}
                            <span className="text-amber-500 tabular-nums">
                              {cooldown}s
                            </span>
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleResendOtp(otpMethod)}
                            className="text-amber-500 hover:text-amber-400 transition-colors font-medium"
                          >
                            Resend code
                          </button>
                        )}
                      </p>

                      {/* Verify button */}
                      <button
                        type="submit"
                        disabled={otp.join("").length !== 6 || isLoading}
                        className="w-full h-[52px] flex items-center justify-center gap-2.5 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-[#0a0a0a] text-[14px] font-semibold rounded-[14px] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <svg
                            className="animate-spin w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="3"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                          </svg>
                        ) : (
                          <>
                            <Shield className="w-4 h-4" />
                            <span>Sign in securely</span>
                          </>
                        )}
                      </button>

                      {/* Back */}
                      <button
                        type="button"
                        onClick={() => {
                          setOtpSent(false);
                          setOtp(["", "", "", "", "", ""]);
                        }}
                        className="w-full text-center text-[12px] text-neutral-600 hover:text-neutral-400 transition-colors mt-1"
                      >
                        ← Change phone number
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.form>
            ) : (
              <motion.form
                key="ngo"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
                onSubmit={handleNGOLogin}
                className="space-y-5"
              >
                {/* Email */}
                <div>
                  <label className="block text-[11px] font-medium text-neutral-500 tracking-[0.12em] uppercase mb-3">
                    Organization Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600 pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="partner@organization.org"
                      className={`${inputBase} border-neutral-800 focus:border-blue-500/60 focus:bg-neutral-900 focus:ring-[3px] focus:ring-blue-500/10 pl-11 pr-4`}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-[11px] font-medium text-neutral-500 tracking-[0.12em] uppercase">
                      Password
                    </label>
                    <a
                      href="/forgot-password"
                      className="text-[11px] text-blue-400/80 hover:text-blue-300 transition-colors"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600 pointer-events-none" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className={`${inputBase} border-neutral-800 focus:border-blue-500/60 focus:bg-neutral-900 focus:ring-[3px] focus:ring-blue-500/10 pl-11 pr-12`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-neutral-400 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember me */}
                <label className="flex items-center gap-3 cursor-pointer select-none group">
                  <div
                    onClick={() => setRememberMe(!rememberMe)}
                    className={`w-[18px] h-[18px] rounded-[5px] border flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                      rememberMe
                        ? "bg-blue-500 border-blue-500"
                        : "bg-transparent border-neutral-700 group-hover:border-neutral-500"
                    }`}
                  >
                    {rememberMe && (
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    )}
                  </div>
                  <span className="text-[13px] text-neutral-500 group-hover:text-neutral-400 transition-colors">
                    Remember for 30 days
                  </span>
                </label>

                {/* Login button */}
                <button
                  type="submit"
                  disabled={!email || !password || isLoading}
                  className="w-full h-[52px] flex items-center justify-center gap-2.5 bg-blue-500 hover:bg-blue-400 active:bg-blue-600 text-white text-[14px] font-semibold rounded-[14px] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed mt-2"
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="3"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                  ) : (
                    <>
                      <span>Access Dashboard</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Divider */}
          <div className="my-8 border-t border-white/[0.04]" />

          {/* Security badges */}
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {[
              { icon: BadgeCheck, label: "SSL Secured" },
              { icon: Lock, label: "AES-256" },
              { icon: Landmark, label: "ISO 27001" },
            ].map((b) => (
              <div
                key={b.label}
                className="flex items-center gap-1.5 text-[11px] text-neutral-700"
              >
                <b.icon className="w-3.5 h-3.5 text-neutral-700" />
                <span>{b.label}</span>
              </div>
            ))}
          </div>

          {/* Register link */}
          <p className="text-center mt-6 text-[13px] text-neutral-600">
            {isWidow ? (
              <>
                New to Sahara?{" "}
                <a
                  href="/register?type=widow"
                  className="text-amber-500 hover:text-amber-400 transition-colors font-medium"
                >
                  Create an account
                </a>
              </>
            ) : (
              <>
                Register your NGO?{" "}
                <a
                  href="/register?type=ngo"
                  className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                >
                  Partner with us
                </a>
              </>
            )}
          </p>
        </div>
      </main>
    </div>
  );
}
