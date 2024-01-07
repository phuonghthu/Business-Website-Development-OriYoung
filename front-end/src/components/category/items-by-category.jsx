import { useProductsByCategory } from "../../hooks/use-products-by-category";
import CardItem from "../card/card-item";

const ItemByCategory = () => {
  const { data: skincareProducts } = useProductsByCategory({
    category: "SkinCare",
    pageSize: 5,
  });
  const { data: bodycareProducts } = useProductsByCategory({
    category: "Bodycare",
    pageSize: 5,
  });
  const { data: haircareProducts } = useProductsByCategory({
    category: "Haircare",
    pageSize: 5,
  });

  return (
    <div className="flex flex-col gap-10 mb-10 mt-8">
      <div>
        <h2 className="text-center text-5xl font-bold text-t-red mb-8">
          Skincare
        </h2>
        <div className="flex items-center justify-center gap-12 md:gap-4">
          {(skincareProducts?.data ?? []).map((item) => {
            return <CardItem key={item._id} item={item} />;
          })}
        </div>
      </div>
      <div>
        <h2 className="text-center text-5xl font-bold text-primary-color mb-8">
          Bodycare
        </h2>
        <div className="flex items-center justify-center gap-12 md:gap-4">
          {(bodycareProducts?.data ?? []).map((item) => {
            return <CardItem key={item._id} item={item} />;
          })}
        </div>
      </div>
      <div>
        <h2 className="text-center text-5xl font-bold text-t-red mb-8">
          Haircare
        </h2>
        <div className="flex items-center justify-center gap-12 md:gap-4">
          {(haircareProducts?.data ?? []).map((item) => {
            return <CardItem key={item._id} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ItemByCategory;
