import React, { useEffect, useRef, useState } from "react";
import "./Notes.css";
import Notesimg from "../assets/notes-page.png";
import { IoMdLock, IoMdSend } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";

const Notes = ({ handleBack }) => {
  const [notesTrue, setNotesTrue] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [notesData, setNotesData] = useState("");
  const presentgroup = JSON.parse(localStorage.getItem("PresentGroup")) || {};
  const [notesList, setNotesList] = useState([]);
  const notesContainerRef = useRef();

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("GroupNotes")) || [];
    const filteredNotes = storedNotes.filter(
      (note) => note.groupName === presentgroup.groupname
    );
    setNotesList(filteredNotes);
  }, []);

  const scrollToBottom = () => {
    setTimeout(() => {
      notesContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 200);
  };

  useEffect(() => {
    scrollToBottom();
  }, [notesList]);

  const handleChangeBack = () => {
    handleBack();
    setNotesTrue(false);
  };

  const handleSubmit = () => {
    const now = new Date();
    const options = { day: "numeric", month: "short", year: "numeric" };
    const formattedDate = now
      .toLocaleDateString("en-US", options)
      .replace(",", "");
    const formattedTime = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    const formattedDateTime = `${formattedDate}, ${formattedTime}`;

    const newNote = {
      notesData,
      timeStamp: formattedDateTime,
      groupName: presentgroup.groupname || "",
    };
    const storedNotes = JSON.parse(localStorage.getItem("GroupNotes")) || [];
    const updatedNotes = [...storedNotes, newNote];
    localStorage.setItem("GroupNotes", JSON.stringify(updatedNotes));
    setNotesData("");
    const filteredNotes = updatedNotes.filter(
      (note) => note.groupName === presentgroup.groupname
    );
    setNotesList(filteredNotes);
    setIsDisabled(true);
  };

  return (
    <>
      {notesTrue ? (
        <main style={{ height: "100vh" }}>
          <header className="header">
            <span className="back-icon" onClick={handleChangeBack}>
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
          <section className="notes-section">
            {notesList.map((data, index) => (
              <div
                key={index}
                className="notes-data-section"
                ref={notesContainerRef}
              >
                <div className="notes-datastore">
                  <p className="notes-data">{data.notesData}</p>
                  <p className="notes-timestamp">{data.timeStamp}</p>
                </div>
              </div>
            ))}
          </section>
          <footer className="footer-section">
            <textarea
              type="text"
              placeholder="Enter your text here..........."
              className="notes-input"
              value={notesData}
              onChange={(e) => {
                setNotesData(e.target.value);
                setIsDisabled(false);
              }}
            />
            <button
              disabled={isDisabled}
              className="send-icon"
              onClick={handleSubmit}
              style={{ color: isDisabled ? "#ABABAB" : "#001f8b" }}
            >
              <IoMdSend />
            </button>
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
