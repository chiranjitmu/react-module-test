import React from "react";
import "./Notes.css";
import Notesimg from "../assets/notes-page.png";
import { IoMdLock } from "react-icons/io";

const Notes = () => {
  return (
    <div className="notes-container">
      <div className="notes-center">
        <img src={Notesimg} alt="notes-pageimage" className="notes-image" />
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
  );
};

export default Notes;
