import "./card.scss";
import { BsTrash, BsThreeDots } from "react-icons/bs";
import React, { useState } from "react";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../modal/Modal";
import RateStar from "../stars/RateStar";
import { deleteMessages } from "./toastifyMessages";

const Card = ({ data, setData }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [movie, setMovie] = useState({});

  // deletes movie and updates data
  const deleteItem = (movieID) => {
    const newPosts = data.filter((item) => item.id !== movieID);
    setData(newPosts);

    // displays toast message randomly
    let random = Math.floor(Math.random() * 9);
    toast(deleteMessages[random]);
  };

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
          setData={setData}
          setModalIsOpen={setModalIsOpen}
          cardMovie={movie}
        />
      )}

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        transition={Flip}
        theme="dark"
      />
    </div>
  );
};

export default Card;
