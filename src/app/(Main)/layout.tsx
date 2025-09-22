import { cookies } from "next/headers";
import Navbar from "@/components/Navbar";

const FetchProfile = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  if (!accessToken) {
    return null;
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  const data = await res.json();
  if (data?.success) {
    return data?.data;
  } else {
    return null;
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await FetchProfile();
  return (
    <div lang="en">
      <Navbar profile={profile} />
      {children}
    </div>
  );
}
