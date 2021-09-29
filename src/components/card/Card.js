import React, { useState } from "react";
import Modal from "../modal/Modal";
import RateStar from "../stars/RateStar";
import "./card.scss";
import { BsTrash, BsThreeDots } from "react-icons/bs";

const Card = ({ data, setData }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [movies, setMovies] = useState({});

  const deleteItem = (movieID) => {
    const newPosts = data.filter((item) => item.id !== movieID);
    setData(newPosts);
  };

  const handleOpen = (movieItem) => {
    setModalIsOpen(true);
    setMovies(movieItem);
  };

  return (
    <div className="card">
      {data.map((item) => (
        <div className="card__item" key={item.id}>
          <div className="card__buttons">
            <button onClick={() => deleteItem(item.id)}>
              <BsTrash />
            </button>
            <button onClick={() => handleOpen(item)}>
              <BsThreeDots />
            </button>
          </div>
          <div className="card__container">
            <div className="card__item-img">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="card__item-body">
              <h2>{item.title}</h2>
              <span>{item.year} | </span>
              <span>{item.director}</span>
              <RateStar />
            </div>
          </div>
        </div>
      ))}

      {modalIsOpen && (
        <Modal
          data={data}
          setData={setData}
          setModalIsOpen={setModalIsOpen}
          modalIsOpen={modalIsOpen}
          movies={movies}
        />
      )}
    </div>
  );
};

export default Card;
