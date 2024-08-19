import Navbar from "@/components/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar main_page={false} />
      {children}
    </>
  );
}
