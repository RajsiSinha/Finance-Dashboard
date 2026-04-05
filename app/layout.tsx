import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[var(--bg)] text-[var(--text)]">

        
          <div className="flex h-screen">

            <Sidebar />

            <div className="flex-1 flex flex-col">
              <Navbar />

              <main className="p-6 overflow-y-auto h-full">
                {children}
              </main>
            </div>

          </div>
        

      </body>
    </html>
  );
}