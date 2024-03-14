import React, { useState } from "react";
import "./Notes.css";
import Notesimg from "../assets/notes-page.png";
import { IoMdLock } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";

const Notes = ({ handleBack }) => {
  const [notesTrue, setNotesTrue] = useState(false);
  const presentgroup = JSON.parse(localStorage.getItem("PresentGroup"));

  const handleChange = () => {
    handleBack();
    setNotesTrue(false)
  };

  return (
    <>
      {notesTrue ? (
        <main style={{ height: "100vh" }}>
          <header className="header">
            <span className="back-icon" onClick={handleChange}>
              <IoArrowBack />
            </span>
            <span
              style={{
                backgroundColor: presentgroup.groupcolor,
                width: "3rem",
                height: "3rem",
                display: "grid",
                placeItems: "center",
                borderRadius: "100%",
                color: "white",
                fontSize: "medium",
              }}
            >
              {presentgroup.groupletter}
            </span>
            <h1>{presentgroup.groupname}</h1>
          </header>
          <section className="notes-section">notes</section>
          <footer className="footer-section">
            <textarea
              type="text"
              placeholder="Enter your text here..........."
              className="notes-input"
            />
          </footer>
        </main>
      ) : (
        <>
          <div className="notes-container">
            <div className="notes-center">
              <img
                src={Notesimg}
                alt="notes-pageimage"
                className="notes-image"
              />
              <h3 className="notes-header">Pocket Notes</h3>
              <p className="notes-para">
                Send and receive messages without keeping your phone online. Use
                Pocket Notes on up to 4 linked devices and 1 mobile phone
              </p>
            </div>
            <div className="notes-footer">
              <IoMdLock />
              <p>end-to-end encrypted</p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Notes;
