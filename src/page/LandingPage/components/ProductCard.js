import { useNavigate } from "react-router-dom";
import { currencyFormat } from "../../../utils/number";

const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const showProduct = (id) => {
    navigate(`/product/${id}`);
  };
  return (
    <div className="w-80 hover:fill-neutral-500 cursor-pointer hover:bg-gray-200" onClick={() => showProduct(item._id)}>
      <img src={item?.image} alt={item?.image} className='h-80 w-80' />
      <div>{item?.name}</div>
      <div>₩ {currencyFormat(item?.price)}</div>
    </div>
  );
};

export default ProductCard;
