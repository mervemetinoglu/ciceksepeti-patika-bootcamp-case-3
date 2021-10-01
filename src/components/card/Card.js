import "./card.scss";
import { BsTrash, BsThreeDots } from "react-icons/bs";
import React, { useState } from "react";
import Modal from "../modal/Modal";
import RateStar from "../stars/RateStar";

const Card = ({ data, setData, deleteItem }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [movie, setMovie] = useState({});

  // when the dots buttons are clicked modalIsOpen is turned true
  // and the selected movie is displayed
  const handleModelOpen = (movieItem) => {
    setModalIsOpen(true);
    setMovie(movieItem);
  };

  return (
    <div className="card">
      {data.map((item) => (
        <div className="card__item" key={item.id}>
          <div className="card__buttons">
            <button onClick={() => deleteItem(item.id)}>
              <BsTrash />
            </button>
            <button onClick={() => handleModelOpen(item)}>
              <BsThreeDots />
            </button>
          </div>
          <div className="card__container">
            <div className="card__item-img">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="card__item-body">
              <h2>{item.title}</h2>
              <span>
                {item.year} | {item.director}
              </span>
              <RateStar />
            </div>
          </div>
        </div>
      ))}
      {modalIsOpen && (
        <Modal
          data={data}
          setModalIsOpen={setModalIsOpen}
          cardMovie={movie}
        />
      )}
    </div>
  );
};

export default Card;
