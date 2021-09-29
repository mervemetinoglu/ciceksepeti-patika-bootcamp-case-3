import React, { useState, useEffect } from "react";
import "./modal.scss";
import { AiOutlineEdit, AiOutlineCheck } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";

const Modal = ({ data, setData, setModalIsOpen, modalIsOpen, movies }) => {
  const [movie, setMovie] = useState(movies);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(movie.title);
  const [year, setYear] = useState(movie.year);
  const [desc, setDesc] = useState(movie.desc);

  const handleEdit = (movie) => {
    const updated = [...data].map((item) => {
      if (item.id === movie.id) {
        item.title = title.length > 0 ? title : movie.title;
        item.year = year.length > 0 ? year : movie.year;
        item.desc = desc.length > 0 ? desc : movie.desc;
        setMovie(item);
      }
      return item;
    });
    setData(updated);
    setIsEditing(false);
  };


  return (
    <>
      {modalIsOpen && (
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
                <img src={movie.image} alt="" />
              </div>
              {isEditing ? (
                <div className="modal__input">
                  <form action="">
                    <input
                      type="text"
                      defaultValue={movie.title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                      type="text"
                      defaultValue={movie.year}
                      onChange={(e) => setYear(e.target.value)}
                    />
                    <textarea
                      defaultValue={movie.desc}
                      onChange={(e) => setDesc(e.target.value)}
                    />
                  </form>
                  <div className="edit_buttons">
                    <button onClick={() => handleEdit(movie)}>
                      <AiOutlineCheck />
                    </button>
                    <button onClick={() => setIsEditing(false)}>
                      <IoMdClose />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="modal__content">
                  <h2>{movie.title}</h2>
                  <span>{movie.year}</span>
                  <p>{movie.desc}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
