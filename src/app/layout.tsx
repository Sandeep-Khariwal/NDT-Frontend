"use client";
import "./globals.css";
import { MantineProvider } from "@mantine/core";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import '@mantine/core/styles.css';


// const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  useEffect(() => {
    const accessToken = localStorage.getItem("ndtToken");
    console.log("token : ",accessToken);
    
    if (!accessToken) router.push("/auth");
  }, []);
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link rel="icon" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body>
        <MantineProvider >{children}</MantineProvider>
      </body>
    </html>
  );
}
