// app/auth/register.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Check,
  Upload,
  X,
  ChevronDown,
  Phone,
  User,
  Calendar,
  Building2,
  CreditCard,
  MoonIcon,
  SunMediumIcon,
  Loader2,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

type RegisterMode = "widow" | "ngo";

const countries = [
  { code: "+91", name: "India", flag: "🇮🇳" },
  { code: "+1", name: "United States", flag: "🇺🇸" },
  { code: "+44", name: "United Kingdom", flag: "🇬🇧" },
  { code: "+61", name: "Australia", flag: "🇦🇺" },
  { code: "+880", name: "Bangladesh", flag: "🇧🇩" },
  { code: "+94", name: "Sri Lanka", flag: "🇱🇰" },
  { code: "+977", name: "Nepal", flag: "🇳🇵" },
];

function FileUpload({
  label,
  file,
  preview,
  onFileSelect,
  onRemove,
}: {
  label: string;
  file: File | null;
  preview: string | null;
  onFileSelect: (f: File) => void;
  onRemove: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  if (file && preview) {
    return (
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative aspect-square rounded-xl border-2 overflow-hidden group cursor-pointer"
        style={{ borderColor: "#22c55e30" }}
        onClick={onRemove}
      >
        <img
          src={preview}
          alt="Preview"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <X className="w-6 h-6 text-white" />
        </div>
        <div className="absolute bottom-2 left-2 right-2 bg-black/60 rounded-lg px-2 py-1">
          <p className="text-white text-[10px] truncate">{file.name}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const f = e.dataTransfer.files[0];
        if (f) onFileSelect(f);
      }}
      className="aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer transition-all hover:bg-muted/50"
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*,.pdf"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFileSelect(f);
        }}
        className="hidden"
      />
      <Upload className="w-6 h-6 text-muted-foreground" />
      <p className="text-xs font-medium text-center px-2 text-muted-foreground">
        {label}
      </p>
      <p className="text-[10px] text-muted-foreground">JPG, PNG, PDF</p>
    </div>
  );
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as any;
  const [mode, setMode] = useState<RegisterMode>(search?.type || "widow");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const countryRef = useRef<HTMLDivElement>(null);

  const [widow, setWidow] = useState({
    fullName: "",
    age: "",
    countryCode: "+91",
    phone: "",
  });
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [idDoc, setIdDoc] = useState<File | null>(null);
  const [deathDoc, setDeathDoc] = useState<File | null>(null);
  const [idPreview, setIdPreview] = useState<string | null>(null);
  const [deathPreview, setDeathPreview] = useState<string | null>(null);

  const [ngo, setNgo] = useState({
    orgName: "",
    email: "",
    password: "",
    license: "",
    location: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [ngoDoc, setNgoDoc] = useState<File | null>(null);
  const [ngoPreview, setNgoPreview] = useState<string | null>(null);

  useEffect(() => {
    if (cooldown > 0) {
      const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [cooldown]);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (countryRef.current && !countryRef.current.contains(e.target as Node))
        setCountryOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const selectedCountry = countries.find((c) => c.code === widow.countryCode);

  const handleFile = (
    file: File,
    setFile: (f: File | null) => void,
    setPreview: (p: string | null) => void,
  ) => {
    if (file.size > 5 * 1024 * 1024) {
      setError("File too large (max 5MB)");
      return;
    }
    setFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      const digits = value.replace(/\D/g, "").slice(0, 6).split("");
      const newOtp = [...otp];
      digits.forEach((d, i) => {
        if (i < 6) newOtp[i] = d;
      });
      setOtp(newOtp);
      otpRefs.current[Math.min(digits.length, 5)]?.focus();
      return;
    }
    const newOtp = [...otp];
    newOtp[index] = value.replace(/\D/g, "");
    setOtp(newOtp);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleSubmit = async () => {
    if (!accepted) {
      setError("Please accept the terms to continue");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setLoading(false);
    setSuccess(
      mode === "widow"
        ? "Registration submitted! We'll verify your details within 3-5 days."
        : "NGO registration submitted! We'll review your application within 5-7 days.",
    );
    setTimeout(() => navigate({ to: "/login", search: { type: mode } }), 2500);
  };

  const sendOtp = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setOtpSent(true);
    setCooldown(30);
    setLoading(false);
  };

  const isWidowStep1Valid =
    widow.fullName.trim() &&
    widow.age &&
    widow.phone.trim() &&
    idDoc &&
    deathDoc;
  const isWidowStep2Valid = otp.join("").length === 6;
  const isNgoStep1Valid =
    ngo.orgName.trim() && ngo.license.trim() && ngo.location.trim() && ngoDoc;
  const isNgoStep2Valid = ngo.email.trim() && ngo.password.length >= 8;

  return (
    <div className="min-h-screen bg-background">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* ═══ LEFT — form ═══ */}
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="order-2 lg:order-1 flex items-center justify-center px-5 py-10 sm:px-10"
        >
          <div className="w-full max-w-[520px]">
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="w-11 h-11 rounded-2xl overflow-hidden border border-border shadow-sm flex-shrink-0">
                  <img
                    src="https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-ZeYYce1tWi91YU7Z0rerVmNRCWyCkX.png&w=500&q=75"
                    alt="Sahara"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm leading-none">
                    Sahara Foundation
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Registration Portal
                  </p>
                </div>
              </motion.div>

              {/* Heading */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
                className="mb-7"
              >
                <p className="text-primary text-xs font-bold tracking-widest uppercase mb-3">
                  Join the community
                </p>
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-[1.12] mb-3">
                  Create your account
                </h1>
                <p className="text-muted-foreground text-base">
                  {mode === "widow"
                    ? "Register to access legal protection and financial support"
                    : "Partner with us to support widows worldwide"}
                </p>
              </motion.div>

              {/* Mode Toggle Card */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.36 }}
                className="mb-8 p-4 bg-card border border-border rounded-2xl"
              >
                <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider mb-3">
                  I am registering as
                </p>
                <div className="flex gap-2">
                  {(["widow", "ngo"] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => {
                        setMode(m);
                        setStep(1);
                        setError("");
                        setOtpSent(false);
                        setOtp(["", "", "", "", "", ""]);
                      }}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2.5 rounded-xl border transition-all text-xs font-medium flex-1 justify-center",
                        mode === m
                          ? "bg-primary/10 border-primary/30 text-primary"
                          : "bg-muted hover:bg-primary/10 hover:border-primary/30 border-border text-foreground",
                      )}
                    >
                      <span className="w-5 h-5 rounded-lg bg-primary/10 text-primary font-bold text-[10px] flex items-center justify-center flex-shrink-0">
                        {m === "widow" ? "W" : "N"}
                      </span>
                      {m === "widow" ? "I am a Widow" : "NGO Partner"}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Progress Indicator */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-8"
              >
                <div className="flex items-center gap-2 mb-2">
                  {["Details", "Verify", "Complete"].map((label, i) => (
                    <div key={label} className="flex items-center gap-2 flex-1">
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                          i + 1 <= step
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground",
                        )}
                      >
                        {i + 1 < step ? <Check className="w-4 h-4" /> : i + 1}
                      </div>
                      <span
                        className={cn(
                          "text-xs font-medium",
                          i + 1 <= step
                            ? "text-foreground"
                            : "text-muted-foreground",
                        )}
                      >
                        {label}
                      </span>
                      {i < 2 && (
                        <div
                          className={cn(
                            "flex-1 h-0.5 rounded-full",
                            i + 1 < step ? "bg-primary" : "bg-border",
                          )}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Error / Success */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2.5 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3 mb-6"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-destructive flex-shrink-0" />
                    {error}
                  </motion.div>
                )}
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2.5 text-sm text-green-600 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3 mb-6"
                  >
                    <Check className="w-4 h-4 flex-shrink-0" />
                    {success}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              <AnimatePresence mode="wait">
                {mode === "widow" ? (
                  <motion.div
                    key={`widow-${step}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ delay: 0.44, duration: 0.3 }}
                  >
                    {step === 1 && (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (isWidowStep1Valid) setStep(2);
                        }}
                        className="space-y-6"
                      >
                        {/* Full Name */}
                        <div className="space-y-2">
                          <label
                            htmlFor="fullName"
                            className="text-sm font-medium text-foreground"
                          >
                            Full Name
                          </label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                            <input
                              id="fullName"
                              type="text"
                              value={widow.fullName}
                              onChange={(e) =>
                                setWidow({ ...widow, fullName: e.target.value })
                              }
                              placeholder="As per government ID"
                              className="h-[52px] pl-11 rounded-xl bg-background border-border focus-visible:ring-primary/30 text-sm w-full border outline-none"
                              required
                            />
                          </div>
                        </div>

                        {/* Age + Country */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label
                              htmlFor="age"
                              className="text-sm font-medium text-foreground"
                            >
                              Age
                            </label>
                            <div className="relative">
                              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                              <input
                                id="age"
                                type="number"
                                value={widow.age}
                                onChange={(e) =>
                                  setWidow({ ...widow, age: e.target.value })
                                }
                                placeholder="Years"
                                min={18}
                                max={120}
                                className="h-[52px] pl-11 rounded-xl bg-background border-border focus-visible:ring-primary/30 text-sm w-full border outline-none"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">
                              Country
                            </label>
                            <div className="relative" ref={countryRef}>
                              <button
                                type="button"
                                onClick={() => setCountryOpen(!countryOpen)}
                                className="h-[52px] px-4 rounded-xl bg-background border border-border text-sm flex items-center gap-2 w-full"
                              >
                                <span className="text-lg">
                                  {selectedCountry?.flag}
                                </span>
                                <span>{selectedCountry?.code}</span>
                                <ChevronDown className="w-3.5 h-3.5 ml-auto text-muted-foreground" />
                              </button>
                              <AnimatePresence>
                                {countryOpen && (
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: -8 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: -8 }}
                                    className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-border shadow-lg z-50 overflow-hidden bg-card"
                                  >
                                    <div className="max-h-48 overflow-y-auto">
                                      {countries.map((c) => (
                                        <button
                                          key={c.code}
                                          type="button"
                                          onClick={() => {
                                            setWidow({
                                              ...widow,
                                              countryCode: c.code,
                                            });
                                            setCountryOpen(false);
                                          }}
                                          className="w-full px-4 py-2.5 text-sm text-left flex items-center gap-2 hover:bg-muted transition-colors"
                                        >
                                          <span className="text-lg">
                                            {c.flag}
                                          </span>
                                          <span>{c.name}</span>
                                          <span className="text-xs ml-auto text-muted-foreground">
                                            {c.code}
                                          </span>
                                        </button>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                          <label
                            htmlFor="phone"
                            className="text-sm font-medium text-foreground"
                          >
                            Phone Number
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                            <input
                              id="phone"
                              type="tel"
                              value={widow.phone}
                              onChange={(e) =>
                                setWidow({
                                  ...widow,
                                  phone: e.target.value
                                    .replace(/\D/g, "")
                                    .slice(0, 15),
                                })
                              }
                              placeholder="Your phone number"
                              className="h-[52px] pl-11 rounded-xl bg-background border-border focus-visible:ring-primary/30 text-sm w-full border outline-none"
                              required
                            />
                          </div>
                        </div>

                        {/* Documents */}
                        <div className="grid grid-cols-2 gap-4">
                          <FileUpload
                            label="ID Document"
                            file={idDoc}
                            preview={idPreview}
                            onFileSelect={(f) =>
                              handleFile(f, setIdDoc, setIdPreview)
                            }
                            onRemove={() => {
                              setIdDoc(null);
                              setIdPreview(null);
                            }}
                          />
                          <FileUpload
                            label="Death Certificate"
                            file={deathDoc}
                            preview={deathPreview}
                            onFileSelect={(f) =>
                              handleFile(f, setDeathDoc, setDeathPreview)
                            }
                            onRemove={() => {
                              setDeathDoc(null);
                              setDeathPreview(null);
                            }}
                          />
                        </div>

                        {/* Submit */}
                        <button
                          type="submit"
                          disabled={!isWidowStep1Valid}
                          className={cn(
                            "w-full rounded-xl font-semibold text-sm text-primary-foreground flex items-center justify-center gap-2",
                            "h-[52px] bg-primary hover:opacity-90 active:scale-[0.98] transition-all",
                            !isWidowStep1Valid &&
                              "opacity-70 cursor-not-allowed",
                          )}
                        >
                          Continue <ArrowRight className="w-4 h-4" />
                        </button>
                      </form>
                    )}

                    {step === 2 && (
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.44 }}
                        className="space-y-6"
                      >
                        <p className="text-sm text-muted-foreground">
                          Enter the 6-digit code sent to{" "}
                          <span className="font-semibold text-foreground">
                            {selectedCountry?.code} {widow.phone.slice(-4)}
                          </span>
                        </p>

                        {!otpSent ? (
                          <button
                            onClick={sendOtp}
                            disabled={loading}
                            className="w-full h-[52px] rounded-xl font-semibold text-sm text-primary-foreground bg-primary hover:opacity-90 flex items-center justify-center gap-2 transition-all"
                          >
                            {loading ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              "Send Verification Code"
                            )}
                          </button>
                        ) : (
                          <>
                            <div className="flex justify-center gap-3">
                              {otp.map((digit, idx) => (
                                <input
                                  key={idx}
                                  ref={(el) => {
                                    otpRefs.current[idx] = el;
                                  }}
                                  type="text"
                                  inputMode="numeric"
                                  maxLength={6}
                                  value={digit}
                                  onChange={(e) =>
                                    handleOtpChange(idx, e.target.value)
                                  }
                                  onKeyDown={(e) => {
                                    if (
                                      e.key === "Backspace" &&
                                      !otp[idx] &&
                                      idx > 0
                                    )
                                      otpRefs.current[idx - 1]?.focus();
                                  }}
                                  className="w-14 h-16 text-center text-xl font-semibold rounded-xl border border-border bg-background outline-none transition-all focus:ring-2 focus:ring-primary/20"
                                />
                              ))}
                            </div>
                            <p className="text-center text-sm text-muted-foreground">
                              {cooldown > 0 ? (
                                `Resend code in ${cooldown}s`
                              ) : (
                                <button
                                  onClick={sendOtp}
                                  className="text-primary hover:underline font-semibold"
                                >
                                  Resend Code
                                </button>
                              )}
                            </p>
                          </>
                        )}

                        <div className="flex gap-3">
                          <button
                            onClick={() => setStep(1)}
                            className="flex-1 h-[52px] rounded-xl font-medium text-sm border border-border flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                          >
                            <ArrowLeft className="w-4 h-4" /> Back
                          </button>
                          <button
                            onClick={() => {
                              if (otpSent && isWidowStep2Valid) setStep(3);
                            }}
                            disabled={!otpSent || !isWidowStep2Valid}
                            className={cn(
                              "flex-1 h-[52px] rounded-xl font-semibold text-sm text-primary-foreground flex items-center justify-center gap-2 transition-all active:scale-[0.98]",
                              "bg-primary hover:opacity-90",
                              (!otpSent || !isWidowStep2Valid) &&
                                "opacity-40 cursor-not-allowed",
                            )}
                          >
                            Verify <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.44 }}
                        className="space-y-6"
                      >
                        <div className="rounded-xl p-5 space-y-3 bg-muted border border-border">
                          {[
                            ["Full Name", widow.fullName],
                            ["Age", widow.age],
                            [
                              "Phone",
                              `${selectedCountry?.code} ${widow.phone}`,
                            ],
                            ["ID Document", idDoc ? "✓ Uploaded" : "✗ Missing"],
                            [
                              "Death Certificate",
                              deathDoc ? "✓ Uploaded" : "✗ Missing",
                            ],
                          ].map(([label, value]) => (
                            <div
                              key={label}
                              className="flex justify-between items-center"
                            >
                              <span className="text-xs text-muted-foreground">
                                {label}
                              </span>
                              <span className="text-sm font-medium text-foreground">
                                {value}
                              </span>
                            </div>
                          ))}
                        </div>

                        <label className="flex items-start gap-3 text-sm text-muted-foreground cursor-pointer">
                          <input
                            type="checkbox"
                            checked={accepted}
                            onChange={(e) => setAccepted(e.target.checked)}
                            className="mt-0.5 accent-primary"
                          />
                          I accept the{" "}
                          <span className="text-primary hover:underline cursor-pointer">
                            Terms of Service
                          </span>{" "}
                          and{" "}
                          <span className="text-primary hover:underline cursor-pointer">
                            Privacy Policy
                          </span>
                        </label>

                        <div className="flex gap-3">
                          <button
                            onClick={() => setStep(2)}
                            className="flex-1 h-[52px] rounded-xl font-medium text-sm border border-border flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                          >
                            <ArrowLeft className="w-4 h-4" /> Back
                          </button>
                          <button
                            onClick={handleSubmit}
                            disabled={!accepted || loading}
                            className={cn(
                              "flex-1 rounded-xl font-semibold text-sm text-primary-foreground flex items-center justify-center gap-2",
                              "h-[52px] bg-primary hover:opacity-90 active:scale-[0.98] transition-all",
                              (!accepted || loading) &&
                                "opacity-70 cursor-not-allowed",
                            )}
                          >
                            {loading ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <>
                                <ArrowRight className="w-4 h-4" /> Create
                                Account
                              </>
                            )}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  /* NGO FORM */
                  <motion.div
                    key={`ngo-${step}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ delay: 0.44, duration: 0.3 }}
                  >
                    {step === 1 && (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (isNgoStep1Valid) setStep(2);
                        }}
                        className="space-y-6"
                      >
                        <div className="space-y-2">
                          <label
                            htmlFor="orgName"
                            className="text-sm font-medium text-foreground"
                          >
                            Organization Name
                          </label>
                          <div className="relative">
                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                            <input
                              id="orgName"
                              type="text"
                              value={ngo.orgName}
                              onChange={(e) =>
                                setNgo({ ...ngo, orgName: e.target.value })
                              }
                              placeholder="Registered legal name"
                              className="h-[52px] pl-11 rounded-xl bg-background border-border focus-visible:ring-primary/30 text-sm w-full border outline-none"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor="license"
                            className="text-sm font-medium text-foreground"
                          >
                            License Number
                          </label>
                          <div className="relative">
                            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                            <input
                              id="license"
                              type="text"
                              value={ngo.license}
                              onChange={(e) =>
                                setNgo({ ...ngo, license: e.target.value })
                              }
                              placeholder="Government-issued license"
                              className="h-[52px] pl-11 rounded-xl bg-background border-border focus-visible:ring-primary/30 text-sm w-full border outline-none"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor="location"
                            className="text-sm font-medium text-foreground"
                          >
                            Location
                          </label>
                          <div className="relative">
                            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                            <input
                              id="location"
                              type="text"
                              value={ngo.location}
                              onChange={(e) =>
                                setNgo({ ...ngo, location: e.target.value })
                              }
                              placeholder="City, Country"
                              className="h-[52px] pl-11 rounded-xl bg-background border-border focus-visible:ring-primary/30 text-sm w-full border outline-none"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">
                            Registration Certificate
                          </label>
                          <FileUpload
                            label="Upload certificate"
                            file={ngoDoc}
                            preview={ngoPreview}
                            onFileSelect={(f) =>
                              handleFile(f, setNgoDoc, setNgoPreview)
                            }
                            onRemove={() => {
                              setNgoDoc(null);
                              setNgoPreview(null);
                            }}
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={!isNgoStep1Valid}
                          className={cn(
                            "w-full rounded-xl font-semibold text-sm text-primary-foreground flex items-center justify-center gap-2",
                            "h-[52px] bg-primary hover:opacity-90 active:scale-[0.98] transition-all",
                            !isNgoStep1Valid && "opacity-70 cursor-not-allowed",
                          )}
                        >
                          Continue <ArrowRight className="w-4 h-4" />
                        </button>
                      </form>
                    )}

                    {step === 2 && (
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.44 }}
                        className="space-y-6"
                      >
                        <div className="space-y-2">
                          <label
                            htmlFor="ngoEmail"
                            className="text-sm font-medium text-foreground"
                          >
                            Email Address
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                            <input
                              id="ngoEmail"
                              type="email"
                              value={ngo.email}
                              onChange={(e) =>
                                setNgo({ ...ngo, email: e.target.value })
                              }
                              placeholder="org@email.com"
                              className="h-[52px] pl-11 rounded-xl bg-background border-border focus-visible:ring-primary/30 text-sm w-full border outline-none"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor="ngoPassword"
                            className="text-sm font-medium text-foreground"
                          >
                            Password
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                            <input
                              id="ngoPassword"
                              type={showPassword ? "text" : "password"}
                              value={ngo.password}
                              onChange={(e) =>
                                setNgo({ ...ngo, password: e.target.value })
                              }
                              placeholder="Min 8 characters"
                              className="h-[52px] pl-11 pr-12 rounded-xl bg-background border-border focus-visible:ring-primary/30 text-sm w-full border outline-none"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                              {showPassword ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                          <button
                            onClick={() => setStep(1)}
                            className="flex-1 h-[52px] rounded-xl font-medium text-sm border border-border flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                          >
                            <ArrowLeft className="w-4 h-4" /> Back
                          </button>
                          <button
                            onClick={() => {
                              if (isNgoStep2Valid) setStep(3);
                            }}
                            disabled={!isNgoStep2Valid}
                            className={cn(
                              "flex-1 h-[52px] rounded-xl font-semibold text-sm text-primary-foreground flex items-center justify-center gap-2 transition-all active:scale-[0.98]",
                              "bg-primary hover:opacity-90",
                              !isNgoStep2Valid &&
                                "opacity-40 cursor-not-allowed",
                            )}
                          >
                            Continue <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.44 }}
                        className="space-y-6"
                      >
                        <div className="rounded-xl p-5 space-y-3 bg-muted border border-border">
                          {[
                            ["Organization", ngo.orgName],
                            ["License #", ngo.license],
                            ["Location", ngo.location],
                            ["Email", ngo.email],
                            [
                              "Certificate",
                              ngoDoc ? "✓ Uploaded" : "✗ Missing",
                            ],
                          ].map(([label, value]) => (
                            <div
                              key={label}
                              className="flex justify-between items-center"
                            >
                              <span className="text-xs text-muted-foreground">
                                {label}
                              </span>
                              <span className="text-sm font-medium text-foreground">
                                {value}
                              </span>
                            </div>
                          ))}
                        </div>

                        <label className="flex items-start gap-3 text-sm text-muted-foreground cursor-pointer">
                          <input
                            type="checkbox"
                            checked={accepted}
                            onChange={(e) => setAccepted(e.target.checked)}
                            className="mt-0.5 accent-primary"
                          />
                          Our organization agrees to the{" "}
                          <span className="text-primary hover:underline cursor-pointer">
                            partner terms
                          </span>{" "}
                          and data protection policies.
                        </label>

                        <div className="flex gap-3">
                          <button
                            onClick={() => setStep(2)}
                            className="flex-1 h-[52px] rounded-xl font-medium text-sm border border-border flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                          >
                            <ArrowLeft className="w-4 h-4" /> Back
                          </button>
                          <button
                            onClick={handleSubmit}
                            disabled={!accepted || loading}
                            className={cn(
                              "flex-1 rounded-xl font-semibold text-sm text-primary-foreground flex items-center justify-center gap-2",
                              "h-[52px] bg-primary hover:opacity-90 active:scale-[0.98] transition-all",
                              (!accepted || loading) &&
                                "opacity-70 cursor-not-allowed",
                            )}
                          >
                            {loading ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <>
                                <ArrowRight className="w-4 h-4" /> Create
                                Account
                              </>
                            )}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <p className="text-xs text-muted-foreground text-center mt-8">
              Already have an account?{" "}
              <a
                href={`/login?type=${mode}`}
                className="text-primary hover:underline font-semibold"
              >
                Sign in
              </a>
            </p>
            <p className="text-xs text-muted-foreground text-center mt-3">
              © 2025 Sahara Foundation · All rights reserved
            </p>
          </div>
        </motion.div>

        {/* ═══ RIGHT — image (hero on mobile, split on desktop) ═══ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="order-1 lg:order-2 relative overflow-hidden min-h-[220px] sm:min-h-[280px] lg:min-h-screen"
        >
          <div className="absolute inset-0 bg-muted" />
          <div className="absolute inset-0 flex items-center justify-center p-5 sm:p-8 lg:p-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
              className="relative w-full max-w-xl h-[200px] sm:h-[260px] lg:h-auto lg:aspect-3/4 rounded-3xl overflow-hidden border border-white/70 shadow-lg"
            >
              <img
                src="https://i.pinimg.com/1200x/cb/fa/2e/cbfa2e0b657bdedb368f5789232a8efa.jpg"
                alt="Women empowerment"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
