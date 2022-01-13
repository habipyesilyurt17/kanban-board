import Board from "./Board/Board";
import "./BoardList.css";

const BoardList = (props) => {
  const boards = props.boards.map((board) => {
    return <Board key={board._id} boardId={board._id} title={board.name} />;
  });

  return boards.length > 0 ? (
    <ul className="board__list">{boards}</ul>
  ) : (
    <p className="board__list-desc">You don't have a board yet !!</p>
  );
};

export default BoardList;
