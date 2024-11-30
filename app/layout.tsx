import ClientProvider from "./ClientProvider";
import "@/app/ui/global.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import { inter } from "@/app/ui/fonts";
import Navbar from "./ui/navbar";
import { ToastContainer, toast } from "react-toastify";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientProvider>
      <html lang="en">
        <body className={`${inter.className} antialiased`}>
          {" "}
          <div>
            <Navbar />
            <main>{children}</main>
            <ToastContainer />
          </div>
        </body>
      </html>
    </ClientProvider>
  );
}
