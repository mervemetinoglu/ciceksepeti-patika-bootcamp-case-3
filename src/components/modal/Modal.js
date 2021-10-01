import React, { useState } from "react";
import "./modal.scss";
import { AiOutlineEdit, AiOutlineCheck } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";

const Modal = ({ data, setModalIsOpen, cardMovie }) => {
  const [movieItem, setMovieItem] = useState(cardMovie);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(movieItem.title);
  const [year, setYear] = useState(movieItem.year);
  const [desc, setDesc] = useState(movieItem.desc);

  // edits movie info and updates cards
  const handleEdit = (movie) => {
    const updated = [...data].map((item) => {
      if (item.id === movie.id) {
        item.title = title.length > 0 ? title : movie.title;
        item.year = year.length > 0 ? year : movie.year;
        item.desc = desc.length > 0 ? desc : movie.desc;
        setMovieItem(item);
      }
      return item;
    });
    setIsEditing(false);
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="modal__header">
          <button onClick={() => setIsEditing(true)}>
            <AiOutlineEdit />
          </button>
          <button onClick={() => setModalIsOpen(false)}>
            <IoMdClose />
          </button>
        </div>
        <div className="modal__container">
          <div className="modal__img">
            <img src={movieItem.image} alt="" />
          </div>
          {isEditing ? (
            <div className="modal__input">
              <input
                type="text"
                defaultValue={movieItem.title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                maxLength="4"
                defaultValue={movieItem.year}
                onChange={(e) => setYear(e.target.value)}
              />
              <textarea
                defaultValue={movieItem.desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              <div className="edit_buttons">
                <button>
                  <AiOutlineCheck onClick={() => handleEdit(movieItem)} />
                </button>
                <button>
                  <IoMdClose onClick={() => setIsEditing(false)} />
                </button>
              </div>
            </div>
          ) : (
            <div className="modal__content">
              <h2>{movieItem.title}</h2>
              <span>{movieItem.year}</span>
              <p>{movieItem.desc}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
