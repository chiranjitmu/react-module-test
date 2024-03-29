import React, { useRef, useState } from "react";
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

const Group = ({ handleGroupClickinterval }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [group, setGroup] = useState({
    groupname: "",
    groupcolor: "",
    groupletter: "",
  });
  const groupData = useRef(JSON.parse(localStorage.getItem("Group")) || []);
  const [presentGroupIndex, setPresentGroupIndex] = useState(null);

  const closeModal = () => {
    setGroup({
      groupname: "",
      groupcolor: "",
      groupletter: "",
    });
    setModalIsOpen(false);
  };

  const handleChange = (e) => {
    setGroup((prevGroup) => ({
      ...prevGroup,
      [e.target.name]: e.target.value,
    }));
  };

  const createGroup = () => {
    if (group.groupname === "" || group.groupcolor === "") {
      alert("Should enter name and color");
      return;
    }

    let capitalizedWords = "";
    let firstLetters = "";
    let wordsArray1 = group.groupname.split(" ");

    // words capital
    wordsArray1.forEach(function (word) {
      capitalizedWords += word.charAt(0).toUpperCase() + word.slice(1) + " ";
    });

    // split capitalized words
    let wordsArray2 = capitalizedWords.split(" ");

    // extract first letters
    wordsArray2.forEach(function (word) {
      firstLetters += word.charAt(0);
    });

    // Check if groupname already exists
    const existingGroup = groupData.current.find(
      (item) =>
        item.groupname.trim().toLowerCase() ===
        capitalizedWords.trim().toLowerCase()
    );
    if (existingGroup) {
      alert("Group with this name already exists!");
      return;
    }

    groupData.current = [
      ...groupData.current,
      {
        groupname: capitalizedWords.trim(),
        groupletter: firstLetters.slice(0, 2),
        groupcolor: group.groupcolor,
      },
    ];

    localStorage.setItem("Group", JSON.stringify(groupData.current));
    closeModal();
  };

  const handleGroupClick = (index) => {
    setPresentGroupIndex(index);
    localStorage.setItem(
      "PresentGroup",
      JSON.stringify(groupData.current[index])
    );
    handleGroupClickinterval(index);
  };

  return (
    <div className="group-container">
      <h1 className="group-header">Pocket Notes</h1>
      <div className="group-name">
        {groupData.current.map((group, index) => (
          <div
            key={index}
            className="group-name-data"
            onClick={() => handleGroupClick(index)}
            style={{
              backgroundColor: presentGroupIndex === index ? "#D3D3D3" : "",
              borderRadius: presentGroupIndex === index ? "10px" : "",
              padding: presentGroupIndex === index ? "0.3rem" : "",
            }}
          >
            <span
              style={{
                backgroundColor: group.groupcolor,
                width: "3rem",
                height: "3rem",
                display: "grid",
                placeItems: "center",
                borderRadius: "100%",
                color: "white",
              }}
            >
              {group.groupletter}
            </span>
            <p>{group.groupname}</p>
          </div>
        ))}
      </div>
      <div className="plus-button" onClick={() => setModalIsOpen(true)}>
        <FaPlusCircle />
      </div>

      <Modal
        isOpen={modalIsOpen}
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
            value={group.groupname}
            onChange={handleChange}
            name="groupname"
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
                  cursor: "pointer",
                  border:
                    group.groupcolor === color ? "2px solid black" : "none",
                }}
                onClick={() =>
                  setGroup((prevGroup) => ({
                    ...prevGroup,
                    groupcolor: color,
                  }))
                }
              />
            ))}
          </div>
        </div>
        <div className="create-button-main">
          <button className="create-button" onClick={createGroup}>
            Create
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Group;
