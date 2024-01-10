import CardItem from "./card-item";

// eslint-disable-next-line react/prop-types
const CardList = ({ items = [] }) => {
  if (items.length === 0)
    return (
      <div className="text-center h-full">
        Không có sản phẩm
      </div>
    );
  return (
    <div className="gap-4 container mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <CardItem
          key={item._id}
          item={item}
        />
      ))}
    </div>
  );
};

export default CardList;
