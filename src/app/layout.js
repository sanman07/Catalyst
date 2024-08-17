import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./components/Navigation";
import { Container } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./global.css";



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SimplyShop",
  description: "Description here...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <Container style={{backgroundColor:'#f4f6f8'}}>
          {children}
        </Container>
      </body>
    </html >
  );
}
