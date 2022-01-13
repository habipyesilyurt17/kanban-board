import Card from "./Card/Card";

const CardList = (props) => {
  const cards = props.list.map((list) => {
    return <Card key={list._id} card={list} />;
  });

  return cards.length > 0 && (
    <div className="cards">{cards}</div>
  ) 
};

export default CardList;
