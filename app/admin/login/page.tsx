"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HugeiconsIcon } from "@hugeicons/react";
import { LockedIcon, ArrowRight01Icon, SparklesIcon, GridViewIcon, LayersIcon, ZapIcon } from "@hugeicons/core-free-icons";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        setError("Invalid password. Please try again.");
        setPassword("");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* ── LEFT PANEL: Brand showcase ── */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden">
        {/* Gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED] via-[#9333EA] to-[#EC4899]" />

        {/* Mesh overlay for depth */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(ellipse at 20% 50%, rgba(255,255,255,0.15) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 20%, rgba(236,72,153,0.3) 0%, transparent 50%),
              radial-gradient(ellipse at 40% 80%, rgba(124,58,237,0.4) 0%, transparent 50%)
            `,
          }}
        />

        {/* Geometric grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating orbs */}
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.3), transparent 70%)",
            top: "-10%",
            right: "-10%",
            animation: "float-orb 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-15 blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(236,72,153,0.4), transparent 70%)",
            bottom: "-5%",
            left: "-5%",
            animation: "float-orb 10s ease-in-out infinite reverse",
          }}
        />

        {/* Decorative floating cards */}
        <div
          className={`absolute top-[15%] left-[10%] bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20 shadow-2xl transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <HugeiconsIcon icon={GridViewIcon} size={20} color="white" />
            </div>
            <div>
              <div className="text-white/90 text-sm font-semibold">5-Page Websites</div>
              <div className="text-white/50 text-xs">Generated in seconds</div>
            </div>
          </div>
        </div>

        <div
          className={`absolute top-[40%] right-[8%] bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20 shadow-2xl transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <HugeiconsIcon icon={LayersIcon} size={20} color="white" />
            </div>
            <div>
              <div className="text-white/90 text-sm font-semibold">3 Templates</div>
              <div className="text-white/50 text-xs">Starter, Bold, Classic</div>
            </div>
          </div>
        </div>

        <div
          className={`absolute bottom-[20%] left-[15%] bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20 shadow-2xl transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <HugeiconsIcon icon={ZapIcon} size={20} color="white" />
            </div>
            <div>
              <div className="text-white/90 text-sm font-semibold">AI-Powered</div>
              <div className="text-white/50 text-xs">Smart content generation</div>
            </div>
          </div>
        </div>

        {/* Main brand content */}
        <div className="relative z-10 flex flex-col justify-center px-16 xl:px-24 w-full">
          <div
            className={`transition-all duration-1000 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                <HugeiconsIcon icon={SparklesIcon} size={24} color="white" />
              </div>
              <span className="text-white/80 text-lg font-medium tracking-wide">
                Admin Portal
              </span>
            </div>

            <h1 className="text-5xl xl:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6">
              Website
              <br />
              <span className="text-white/70">Builder</span>
            </h1>

            <p className="text-xl text-white/60 font-normal max-w-md leading-relaxed mb-10">
              Build websites effortlessly. Create invites, manage clients, and
              generate stunning sites with AI.
            </p>

            <div className="flex items-center gap-2 text-white/40 text-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>System operational</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL: Login form ── */}
      <div className="flex-1 flex items-center justify-center px-6 sm:px-12 lg:px-16 bg-white relative">
        {/* Subtle background texture */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #7C3AED 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />

        <div
          className={`w-full max-w-[380px] relative z-10 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          {/* Mobile logo — shown only on small screens */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#EC4899] flex items-center justify-center shadow-lg shadow-violet-500/25">
              <HugeiconsIcon icon={SparklesIcon} size={20} color="white" />
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900">Website Builder</div>
              <div className="text-xs text-gray-400">Admin Portal</div>
            </div>
          </div>

          {/* Form header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
              Welcome back
            </h2>
            <p className="text-gray-500 text-[15px]">
              Enter your admin password to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </Label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"><HugeiconsIcon icon={LockedIcon} size={16} color="currentColor" /></span>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError("");
                  }}
                  className="pl-10 h-12 bg-gray-50/80 border-gray-200 rounded-xl text-[15px] placeholder:text-gray-400 focus:bg-white focus:border-violet-400 focus:ring-violet-400/20 transition-all"
                  required
                  autoFocus
                />
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading || !password}
              className="w-full h-12 bg-gradient-to-r from-[#7C3AED] to-[#9333EA] hover:from-[#6D28D9] hover:to-[#7C3AED] text-white rounded-xl text-[15px] font-semibold shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30 transition-all duration-300 disabled:opacity-50 disabled:shadow-none"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Sign in
                  <HugeiconsIcon icon={ArrowRight01Icon} size={16} color="currentColor" />
                </span>
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-10 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">
              Protected admin area. Unauthorized access is prohibited.
            </p>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes float-orb {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -20px) scale(1.05);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.95);
          }
        }
      `}</style>
    </div>
  );
}
