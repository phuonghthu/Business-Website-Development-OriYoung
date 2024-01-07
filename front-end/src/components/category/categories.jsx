import { useNavigate } from "react-router-dom";

const options = [
  {
    label: "Skin Care",
    value: "SkinCare",
    imageUrl: " /images/bodycare.jpg",
  },
  {
    label: "Body Care",
    value: "SkinCare",
    imageUrl: "/images/skincare.jpg",
  },
  {
    label: "Hair Care",
    value: "SkinCare",
    imageUrl: "/images/haircare.jpg",
  },
];

const Categories = () => {
  const navigate = useNavigate();
  return (
    <div className="container flex flex-col items-center mx-auto bg-secondary-color mt-4 ">
      <div className="p-6">
        <h2 className="text-primary-color text-5xl text-center mb-6">
          Young Beauty - Young Society
        </h2>
        <div className="flex items-center gap-8 justify-between ">
          {options.map((item) => {
            return (
              <div
                key={item.value}
                className="flex flex-col items-center gap-2"
                onClick={() => navigate(`/products?category=${item.value}`)}
              >
                <div className="h-[10rem] w-[10rem] min-h-[10rem] min-w-[10rem] bg-gray-300 rounded-full">
                  <img
                    className="rounded-full"
                    src={item.imageUrl}
                    alt={item.label}
                  />
                </div>
                <p className="font-bold text-2xl text-primary-color">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
