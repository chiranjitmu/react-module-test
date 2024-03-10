import React, { useState } from "react";
import "./Group.css";
import Modal from "react-modal";
import { FaPlusCircle } from "react-icons/fa";

Modal.setAppElement("#root");

const colorNames = [
  "#B38BFA",
  "#FF79F2",
  "#43E6FC",
  "#F19576",
  "#0047FF",
  "#6691FF",
];

const Group = () => {
  const [modal, setModal] = useState(false);

  const closeModal = () => {
    setModal(false);
  };

  const createGroup = () => {
    setModal(false);
  };

  return (
    <div className="group-container">
      <h1 className="group-header">Pocket Notes</h1>
      <div className="group-name"></div>
      <div className="plus-button" onClick={() => setModal(true)}>
        <FaPlusCircle />
      </div>

      {/* modal */}
      <Modal
        isOpen={modal}
        onRequestClose={closeModal}
        contentLabel="Group Create"
        className="modal-main"
      >
        <h2 className="modal-header">Create New group</h2>
        <div className="groupname-main">
          <label htmlFor="group-name" className="groupname-label">
            Group Name
          </label>
          <input
            type="text"
            placeholder="Enter group name"
            id="group-name"
            className="groupname-input"
          />
        </div>

        <div className="groupcolor-main">
          <label htmlFor="group-color" className="groupcolor-label">
            Choose colour
          </label>
          <div className="groupcolor-input">
            {colorNames.map((color, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: color,
                  borderRadius: "100%",
                  height: "1.5rem",
                  width: "1.5rem",
                }}
              />
            ))}
          </div>
        </div>
        <div style={{ textAlign: "end" }}>
          <button className="create-button" onClick={createGroup}>
            Create
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Group;
