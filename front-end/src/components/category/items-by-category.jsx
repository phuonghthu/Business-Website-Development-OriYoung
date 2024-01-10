import { Link } from "react-router-dom";
import { useProductsByCategory } from "../../hooks/use-products-by-category";
import CardItem from "../card/card-item";
import { Button } from "antd";

const ItemByCategory = () => {
  const { data: skincareProducts } =
    useProductsByCategory({
      category: "SkinCare",
      pageSize: 5,
    });
  const { data: bodycareProducts } =
    useProductsByCategory({
      category: "Bodycare",
      pageSize: 5,
    });
  const { data: haircareProducts } =
    useProductsByCategory({
      category: "Haircare",
      pageSize: 5,
    });

  return (
    <div className="flex flex-col items-center gap-10 mb-10 mt-8 w-full">
      <div className="container">
        <h2 className="text-center text-3xl md:text-5xl font-bold text-t-red mb-8">
          <Link
            to={
              "/products?category=SkinCare&page=1"
            }
          >
            Skincare
          </Link>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-4 mx-5">
          {(
            skincareProducts?.data ?? []
          ).map((item, index) => {
            return (
              <CardItem
                index={index}
                key={item._id}
                item={item}
              />
            );
          })}
        </div>
        <div className="w-full flex justify-center">
          <Button
            className="my-5 rounded-lg"
            shape="round"
          >
            <Link
              to={
                "/products?category=SkinCare&page=1"
              }
            >
              Xem tất cả
            </Link>
          </Button>
        </div>
      </div>
      <div className="container">
        <h2 className="text-center text-3xl md:text-5xl font-bold text-primary-color mb-8">
          <Link
            to={
              "/products?category=Bodycare&page=1"
            }
          >
            Bodycare
          </Link>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-4 mx-5">
          {(
            bodycareProducts?.data ?? []
          ).map((item, index) => {
            return (
              <CardItem
                index={index}
                key={item._id}
                item={item}
              />
            );
          })}
        </div>
        <div className="w-full flex justify-center">
          <Button
            className="my-5 rounded-lg"
            shape="round"
          >
            <Link
              to={
                "/products?category=Bodycare&page=1"
              }
            >
              Xem tất cả
            </Link>
          </Button>
        </div>
      </div>
      <div className="container">
        <h2 className="text-center text-3xl md:text-5xl font-bold text-t-red mb-8">
          <Link
            to={
              "products?category=Haircare&page=1"
            }
          >
            Haircare
          </Link>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-4 mx-5">
          {(
            haircareProducts?.data ?? []
          ).map((item, index) => {
            return (
              <CardItem
                index={index}
                key={item._id}
                item={item}
              />
            );
          })}
        </div>
        <div className="w-full flex justify-center">
          <Button
            className="my-5 rounded-lg"
            shape="round"
          >
            <Link
              to={
                "products?category=Haircare&page=1"
              }
            >
              Xem tất cả
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ItemByCategory;
