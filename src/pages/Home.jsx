import React, { useState, useEffect } from "react";
import Group from "../components/Group";
import Notes from "../components/Notes";
import "./Home.css";

const Home = () => {
  const [notes, setNotes] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const handleBack = () => {
    setNotes(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 800);
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <main className="home-page">
      <aside
        className="group-main"
        style={isSmallScreen ? { display: notes ? "none" : "block" } : {}}
      >
        <Group />
      </aside>

      <section
        className="notes-main"
        style={isSmallScreen ? { display: notes ? "block" : "none" } : {}}
      >
        <Notes handleBack={handleBack} />
      </section>
    </main>
  );
};

export default Home;
