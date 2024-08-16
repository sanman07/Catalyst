import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./components/Navigation";
import { Container } from "react-bootstrap";



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
        <Container>
          {children}
        </Container>
      </body>
    </html >
  );
}
