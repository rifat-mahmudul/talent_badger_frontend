// import React from "react";

// interface HeaderProps {
//   isCollapsed: boolean;
// }

// export const Header = ({ isCollapsed }: HeaderProps) => {
//   return (
//     <header
//       className={`
//         fixed top-0
//         h-[80px]
//         bg-white
//         shadow-md
//         z-50
//         flex items-center px-6
//         transition-all duration-300
//         ${isCollapsed ? "lg:ml-[80px]" : "lg:ml-[380px]"}
//         md:ml-[300px]
//         w-[calc(100%-var(--sidebar-width))]
//       `}
//       style={{
//         "--sidebar-width": isCollapsed ? "80px" : "380px",
//       } as React.CSSProperties}
//     >
//       <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
    
//     </header>
//   );
// };

"use client";

import React, { useMemo } from "react";
import { usePathname } from "next/navigation";

interface HeaderProps {
  isCollapsed: boolean;
}

export const Header = ({ isCollapsed }: HeaderProps) => {
  const pathname = usePathname();

  // Map path segments to readable titles
  const title = useMemo(() => {
    if (!pathname) return "";

    // Split pathname and filter empty strings
    const segments = pathname.split("/").filter(Boolean);

    // Capitalize each segment
    const formatted = segments.map(
      (seg) =>
        seg
          .split("-")
          .map((s) => s[0].toUpperCase() + s.slice(1))
          .join(" ")
    );

    return formatted.join(" > "); // e.g., Settings > Personal Info
  }, [pathname]);

  return (
    <header
      className={`
        fixed top-0
        h-[80px]
        bg-white
        shadow-md
        z-50
        flex items-center px-6
        transition-all duration-300
        ${isCollapsed ? "lg:ml-[80px]" : "lg:ml-[260px]"}
        md:ml-[300px]
        w-[calc(100%-var(--sidebar-width))]
      `}
      style={{
        "--sidebar-width": isCollapsed ? "80px" : "260px",
      } as React.CSSProperties}
    >
      <div className="py-6 px-6">
        <h4 className="text-2xl  font-semibold text-[#147575]">{title || "Dashboard"}</h4>
      </div>
    </header>
  );
};
