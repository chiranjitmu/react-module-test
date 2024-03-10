import React from "react";
import Group from "../components/Group";
import Notes from "../components/Notes";
import "./Home.css";

const Home = () => {
  return (
    <main className="home-page">
      <aside className="group-main">
        <Group />
      </aside>

      <section className="notes-main">
        <Notes />
      </section>
    </main>
  );
};

export default Home;
