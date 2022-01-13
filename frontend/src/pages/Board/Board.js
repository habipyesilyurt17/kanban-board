import { useRef, useState, useEffect } from "react";
import Modal from "../../components/Modal/Modal";
import Backdrop from "../../components/Backdrop/Backdrop";
import BoardList from "../../components/BoardList/BoardList";
import Spinner from "../../components/Spinner/Spinner";
import axios from "axios";

import "./Board.css";

const BoardPage = () => {
  const [creating, setCreating] = useState(false);
  const [boards, setBoards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const nameInput = useRef(null);

  const startCreateEventHandler = () => {
    setCreating(true);
  };

  const modalCancelHandler = () => {
    setCreating(false);
  };

  const modalConfirmHandler = () => {
    setCreating(false);
    setIsLoading(true);
    const name = nameInput.current.value;
    if (name.trim().length === 0) {
      return;
    }
    const requestBody = {
      query: `
        mutation CreateBoard($name: String!) {
          createBoard(boardInput: { name: $name }) {
            _id
            name
          }
        }
      `,
      variables: {
        name,
      },
    };

    axios
      .post("http://localhost:8000/graphql", requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const updatedBoards = [...boards];
        const newBoard = {
          _id: response.data.data.createBoard._id,
          name: response.data.data.createBoard.name,
        };
        updatedBoards.push(newBoard);
        setBoards(updatedBoards);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const fetchBoards = () => {
    setIsLoading(true);
    const requestBody = {
      query: `
        query {
          boards {
            _id
            name
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
        setBoards(response.data.data.boards);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  return (
    <>
      {creating && <Backdrop />}
      {creating && (
        <Modal
          title="Add Board"
          canCancel
          canConfirm
          onCancel={modalCancelHandler}
          onConfirm={modalConfirmHandler}
          confirmText="Confirm"
        >
          <form>
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <input type="text " id="name" ref={nameInput}></input>
            </div>
          </form>
        </Modal>
      )}

      <div className="boards-control">
        <p>Kanban Boards List</p>
        <button className="default-btn" onClick={startCreateEventHandler}>
          Create Board
        </button>
      </div>

      {isLoading ? <Spinner /> : <BoardList boards={boards} />}
    </>
  );
};

export default BoardPage;
