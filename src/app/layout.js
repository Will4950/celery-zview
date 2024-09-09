import "@/styles/styles.scss";
import background from "./celery.jpg";
import { Lato } from "next/font/google";
const lato = Lato({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Celery ZView",
  description: "The future is now.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body
        className={`${lato.className} background`}
        style={{
          backgroundImage: `url(${background.src})`,
        }}
      >
        {children}
      </body>
    </html>
  );
}
