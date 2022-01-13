import { useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import Backdrop from "../../Backdrop/Backdrop";
import Modal from "../../Modal/Modal";
import Spinner from "../../Spinner/Spinner";
import axios from "axios";

import "./Card.css";

const Card = (props) => {
  const { card } = props;
  const [updating, setUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [color, setColor] = useState(card.color);


  const startUpdateColorHandler = () => {
    setUpdating(true);
  };

  const modalCancelHandler = () => {
    setUpdating(false);
  };

  const modalConfirmHandler = () => {
    setUpdating(false);
    setIsLoading(true);
    const requestBody = {
      query: `
          mutation UpdateCard($cardId: ID!, $boardId: ID!, $type: String, $color: String) {
            updateCard(cardId: $cardId, boardId: $boardId, type: $type, color: $color ) {
              _id
              type
              color
            }
          }
        `,
      variables: {
        cardId: card._id,
        type: card.type,
        color: color,
        boardId: card.board
      },
    };

    axios
      .post("http://localhost:8000/graphql", requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setColor(response.data.data.updateCard.color);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const handleChangeColor = (e) => {
    setColor(e.target.value);
  };

  return (
    <>
      {updating && <Backdrop />}
      {updating && (
        <Modal
          title="Update Color"
          canCancel
          canConfirm
          onCancel={modalCancelHandler}
          onConfirm={modalConfirmHandler}
          confirmText="Update"
        >
          <form>
            <div className="form-control">
              <label htmlFor="color">Color</label>
              <select id="color" onChange={handleChangeColor}>
                <option value="">Please choose an color</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
                <option value="red">Red</option>
                <option value="purple">Purple</option>
                <option value="pink">Pink</option>
              </select>
            </div>
          </form>
        </Modal>
      )}
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="card" style={{ background: color }}>
          <div className="card-control">
            <p className="card-title">{card.title}</p>
            <p className="card-icon" onClick={startUpdateColorHandler}>
              <HiDotsHorizontal />
            </p>
          </div>
          <p>{card.description}</p>
          <div className="tags">Formatting</div>
        </div>
      )}
    </>
  );
};

export default Card;
