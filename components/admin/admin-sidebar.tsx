"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  DashboardSquareEditIcon,
  GridViewIcon,
  MailIcon,
  LogoutSquareIcon,
  SquareArrowLeftIcon,
  SquareArrowRightIcon,
  SparklesIcon,
  CancelCircleHalfDotIcon,
} from "@hugeicons/core-free-icons";

const navItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: DashboardSquareEditIcon,
  },
  {
    label: "Sites",
    href: "/admin/sites",
    icon: GridViewIcon,
  },
  {
    label: "Invites",
    href: "/admin/invites",
    icon: MailIcon,
  },
];

export function AdminSidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  function isActive(item: (typeof navItems)[0]) {
    if (pathname === item.href) return true;
    // Site detail pages (/admin/[slug]) should highlight "Sites"
    if (
      item.href === "/admin/sites" &&
      pathname.startsWith("/admin/") &&
      !navItems.some((n) => pathname === n.href)
    ) {
      return true;
    }
    return false;
  }

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
    } catch {
      setLoggingOut(false);
    }
  }

  return (
    <aside
      className={cn(
        "h-full flex flex-col bg-white text-gray-700 transition-all duration-300 border-r border-gray-200",
        collapsed ? "w-[68px]" : "w-[260px]"
      )}
    >
      {/* Logo */}
      <div className="px-4 h-16 flex items-center justify-between border-b border-gray-200 shrink-0">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center shrink-0 shadow-lg shadow-violet-500/25">
            <HugeiconsIcon icon={SparklesIcon} size={16} color="white" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="text-[13px] font-bold text-gray-900 truncate font-heading">
                Website Builder
              </div>
              <div className="text-[10px] text-gray-400 font-medium">
                Admin Panel
              </div>
            </div>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <HugeiconsIcon icon={CancelCircleHalfDotIcon} size={16} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className={cn("mb-3 px-3 text-[10px] font-semibold uppercase tracking-widest text-gray-400/60", collapsed && "hidden")}>
          Menu
        </div>
        {navItems.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => onClose?.()}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 w-full",
                active
                  ? "bg-violet-50 text-violet-700"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/60"
              )}
            >
              <HugeiconsIcon
                icon={item.icon}
                size={18}
                color="currentColor"
                strokeWidth={active ? 2 : 1.5}
              />
              {!collapsed && <span className="truncate">{item.label}</span>}
              {active && !collapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-500" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-3 border-t border-gray-200 space-y-1 shrink-0">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] text-gray-500 hover:text-gray-900 hover:bg-gray-100/60 transition-all duration-200 w-full"
        >
          <HugeiconsIcon
            icon={collapsed ? SquareArrowRightIcon : SquareArrowLeftIcon}
            size={18}
            color="currentColor"
          />
          {!collapsed && <span className="truncate">Collapse</span>}
        </button>

        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200 w-full disabled:opacity-50"
        >
          <HugeiconsIcon icon={LogoutSquareIcon} size={18} color="currentColor" />
          {!collapsed && (
            <span className="truncate">
              {loggingOut ? "Signing out..." : "Sign out"}
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}
