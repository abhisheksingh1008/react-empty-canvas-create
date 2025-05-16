import Link from "next/link";
import "../styles/mainMenu.css";

/**
 * MainMenu component representing the application features
 * Provides navigation, user information, and key application sections/features
 *
 * @component
 * @returns {JSX.Element} Rendered main menu with hero section and navigation items
 */
export const MainMenu = () => {
  return (
    <>
      <div className="hero-section">
        <div className="hero-text-section">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-6 bg-linear-90 from-[#1e40af] to-[#10b981] bg-clip-text text-transparent">
            The Smartest Mind in Cricket—Now in Your Pocket
          </h1>
          <p className="hero-description text-xl text-gray-700">
            Cricket Brain digests every ball from the last decade of pro cricket
            to drop real-time insights, fantasy edges and match-winning
            predictions.
          </p>
        </div>
      </div>
      {/* Main menu container with navigation links */}
      <div id="menu-container" className="menu-container">
        <div className="m-5 flex justify-center items-center gap-4 flex-wrap">
          <Link href="/nlp-chart-generator">
            <div className="menu-item chart-generator">
              <div className="gradient-container">
                <h3>Chart Generator</h3>
                <div className="description-container">
                  <p>
                    Generate insightful charts on IPL stats using natural
                    language queries.
                  </p>
                  <span>View More</span>
                </div>
              </div>
            </div>
          </Link>
          <Link href="/fantasy-cricket">
            <div className="menu-item fantasy">
              <div className="gradient-container">
                <h3>Fantasy Cricket</h3>
                <div className="description-container">
                  <p>
                    Explore in-depth fantasy points for each match using
                    advanced filters for precise insights
                  </p>
                  <span>View More</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MainMenu;
