import { Link } from "react-router-dom";
import "./Board.css";

const Board = (props) => {
  return (
    <>
      <li className="boards__list-item" key={props.boardId}>
        <h1>
          <Link to={`/${props.boardId}`} className="board__item-link">{props.title}</Link>
        </h1>
      </li>
    </>
  );
};

export default Board;