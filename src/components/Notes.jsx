import React, { useEffect, useRef, useState } from "react";
import "./Notes.css";
import Notesimg from "../assets/notes-page.png";
import { IoMdLock, IoMdSend } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";

const Notes = ({ handleBack, selectedGroup }) => {
  const [notesTrue, setNotesTrue] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [notesData, setNotesData] = useState("");
  const presentgroup = JSON.parse(localStorage.getItem("PresentGroup")) || {};
  const [notesList, setNotesList] = useState([]);
  const notesContainerRef = useRef();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

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

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("GroupNotes")) || [];
    const filteredNotes = storedNotes.filter(
      (note) => note.groupName === presentgroup.groupname
    );
    setNotesList(filteredNotes);
    setNotesTrue(filteredNotes.length > 0);
    if (filteredNotes.length <= 0) {
      setTimeout(() => {
        setNotesTrue(true);
      }, 1000);
    }
  }, [selectedGroup]);

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
      .toLocaleDateString("en-IN", options)
      .replace(",", "");
    const formattedTime = now.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    const newNote = {
      notesData,
      date: formattedDate,
      time: formattedTime.toUpperCase(),
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
                  <p className="notes-timestamp">
                    {data.date}
                    <span className="time-dot"></span>
                    {data.time}
                  </p>
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
                if (e.target.value === "") {
                  setIsDisabled(true);
                }
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
          {!isSmallScreen ? (
            <div className="notes-container">
              <div className="notes-center">
                <img
                  src={Notesimg}
                  alt="notes-pageimage"
                  className="notes-image"
                />
                <h3 className="notes-header">Pocket Notes</h3>
                <p className="notes-para">
                  Send and receive messages without keeping your phone online.
                  Use Pocket Notes on up to 4 linked devices and 1 mobile phone
                </p>
              </div>
              <div className="notes-footer">
                <IoMdLock />
                <p>end-to-end encrypted</p>
              </div>
            </div>
          ) : (
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
                      <p className="notes-timestamp">
                        {data.date}
                        <span className="time-dot"></span>
                        {data.time}
                      </p>
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
                    if (e.target.value === "") {
                      setIsDisabled(true);
                    }
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
          )}
        </>
      )}
    </>
  );
};

export default Notes;
