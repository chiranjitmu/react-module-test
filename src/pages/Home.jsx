import React, { useState, useEffect } from "react";
import Group from "../components/Group";
import Notes from "../components/Notes";
import "./Home.css";

const Home = () => {
  const [notesTrue, setNotesTrue] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleGroupClickinterval = (clicked) => {
    setSelectedGroup(clicked);
    setNotesTrue(true)
  };

  const handleBack = () => {
    setNotesTrue(false);
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
        style={isSmallScreen ? { display: notesTrue ? "none" : "block" } : {}}
      >
        <Group handleGroupClickinterval={handleGroupClickinterval} />
      </aside>

      <section
        className="notes-main"
        style={isSmallScreen ? { display: notesTrue ? "block" : "none" } : {}}
      >
        <Notes handleBack={handleBack} selectedGroup={selectedGroup} />
      </section>
    </main>
  );
};

export default Home;
