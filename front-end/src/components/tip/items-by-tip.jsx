import { Link } from "react-router-dom";

import CardTipList from "../card/card-tip-list";

const ItemsByTip = () => {
  return (
    <section className="mb-10 bg-[#FC86670D] py-12 px-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          <Link
            to="/tips"
            className="text-center text-3xl md:text-5xl font-bold text-t-red mb-8"
          >
            Beauty Tips
          </Link>
        </div>

        <CardTipList />
      </div>
    </section>
  );
};

export default ItemsByTip;
