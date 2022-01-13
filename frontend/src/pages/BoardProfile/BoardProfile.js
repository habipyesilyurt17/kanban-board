import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import CardList from "../../components/CardList/CardList";
import Modal from "../../components/Modal/Modal";
import Backdrop from "../../components/Backdrop/Backdrop";
import Spinner from "../../components/Spinner/Spinner";
import axios from "axios";

import "./BoardProfile.css";

const BoardProfilePage = () => {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [backlog, setBacklog] = useState([]);
  const [todo, setTodo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);

  const [creating, setCreating] = useState(false);
  const [typeTask, setType] = useState(null);
  const [colorTask, setColor] = useState(null);
  const titleInput = useRef(null);
  const descInput = useRef(null);

  const startCreateCardHandler = () => {
    setCreating(true);
  };

  const modalCancelHandler = () => {
    setCreating(false);
  };

  const handleChangeColor = (e) => {
    setColor(e.target.value);
  };

  const handleChangeType = (e) => {
    setType(e.target.value);
  };

  const updateCardList = (response, updateList) => {
    const updatedListData = [...updateList];
    const newCard = {
      _id: response.data.data.createCard._id,
      title: response.data.data.createCard.title,
      description: response.data.data.createCard.description,
      type: response.data.data.createCard.description.tye,
      color: response.data.data.createCard.color,
      board: response.data.data.createCard.board,
    };
    updatedListData.push(newCard);
    return updatedListData;
  };

  const modalConfirmHandler = () => {
    setCreating(false);
    setIsLoading(true);

    const title = titleInput.current.value;
    const description = descInput.current.value;
    const type = typeTask;
    const color = colorTask;
    const board = id;

    if (
      title.trim().length === 0 ||
      type.trim().length === 0 ||
      color.trim().length === 0 ||
      description.trim().length === 0
    ) {
      return;
    }

    const requestBody = {
      query: `
				mutation CreateCard($title: String!, $desc: String!, $type: String!, $color: String!, $board: String!) {
					createCard(cardInput: { title: $title, description: $desc, type: $type, color: $color, board: $board }) {
						_id
						title
						description
						type
						color
            board
					}
				}
			`,
      variables: {
        title,
        desc: description,
        type,
        color,
        board,
      },
    };

    axios
      .post("http://localhost:8000/graphql", requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const cardType = response.data.data.createCard.type;
        switch (cardType) {
          case "backlog":
            let newCardBacklog = updateCardList(response, backlog);
            setBacklog(newCardBacklog);
            setIsLoading(false);
            break;
          case "todo":
            let newCardTodo = updateCardList(response, todo);
            setTodo(newCardTodo);
            setIsLoading(false);
            break;
          case "inProgress":
            let newCardProgress = updateCardList(response, inProgress);
            setInProgress(newCardProgress);
            setIsLoading(false);
            break;
          case "done":
            let newCardDone = updateCardList(response, done);
            setDone(newCardDone);
            setIsLoading(false);
            break;
          default:
            break;
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const findBoard = (boardId) => {
    setIsLoading(true);
    const requestBody = {
      query: `
        query {
          board(id: "${boardId}") {
            _id
            name
            backlog {
              _id
              title
              description
              type
              color
              board
            }
            todo {
              _id
              title
              description
              type
              color
              board
            }
            inProgress {
              _id
              title
              description
              type
              color
              board
            }
            done {
              _id
              title
              description
              type
              color
              board
            }
          }
        }
      `,
    };

    axios
      .post("http://localhost:8000/graphql", requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setBoard(response.data.data.board);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    findBoard(id);
  }, []);

  useEffect(() => {
    if (board === null) return;
    setBacklog(board.backlog);
    setTodo(board.todo);
    setInProgress(board.inProgress);
    setDone(board.done);
  }, [board]);

  return (
    <>
      {creating && <Backdrop />}
      {creating && (
        <Modal
          title="Add Card"
          canCancel
          canConfirm
          onCancel={modalCancelHandler}
          onConfirm={modalConfirmHandler}
          confirmText="Confirm"
        >
          <form>
            <div className="form-control">
              <label htmlFor="title">Title</label>
              <input type="text " id="title" ref={titleInput}></input>
            </div>
            <div className="form-control">
              <label htmlFor="description">Description</label>
              <textarea id="description" rows="4" ref={descInput}></textarea>
            </div>
            <div className="form-control">
              <label htmlFor="type">Type</label>
              <select id="type" onChange={handleChangeType}>
                <option value="">Please choose an type</option>
                <option value="backlog">Backlog</option>
                <option value="todo">To Do</option>
                <option value="inProgress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
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

      <div className="board__list2">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {board && (
              <div className="board__list-control">
                <h1>{board.name}</h1>
                <button className="board-btn" onClick={startCreateCardHandler}>
                  Create Card
                </button>
              </div>
            )}

            {board ? (
              <div className="board__list-items">
                <div className="item">
                  <h1>Backlog</h1>
                  <CardList list={backlog} />
                </div>
                <div className="item">
                  <h1>To Do</h1>
                  <CardList list={todo} />
                </div>
                <div className="item">
                  <h1>In Progress</h1>
                  <CardList list={inProgress} />
                </div>
                <div className="item">
                  <h1>Done</h1>
                  <CardList list={done} />
                </div>
              </div>
            ) : (
              <Spinner />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default BoardProfilePage;
