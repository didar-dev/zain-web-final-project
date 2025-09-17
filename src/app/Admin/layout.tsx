import Link from "next/link";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-row items-start gap-2">
      <div className="bg-gray-100 flex flex-col gap-2 w-1/4 h-screen p-2">
        {Pages.map((page, index) => (
          <Link
            className="p-2 bg-white rounded shadow hover:bg-gray-200"
            key={index}
            href={`/Admin/${page.href}`}
          >
            {page?.name}
          </Link>
        ))}
      </div>
      <div className="w-3/4">{children}</div>
    </div>
  );
}

const Pages = [
  {
    name: "Dashboard",
    href: "/",
  },
  {
    name: "Courses",
    href: "/courses",
  },
  {
    name: "Students",
    href: "/students",
  },
];
