import Link from "next/link";
import "./page.css"; // Assuming you are using a separate CSS file for styling

export default function Home() {
  return (
    <div className="home-container">
      <div className="welcome-content">
        <h1>Welcome Students </h1>
        <div className="navigation-links">
          <Link href="/addproduct" className="nav-link">
            Go to Add Details
          </Link>
          <Link href="/products" className="nav-link">
            Go to Details List
          </Link>
        </div>
      </div>
    </div>
  );
}
