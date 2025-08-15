import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faBox, faShoppingBag, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link, createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/user/userSlice";
import { getCartQty } from "../../features/cart/cartSlice";

const Navbar = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "";
  const menuList = ["All", "Top", "Dress", "Pants"];

  const goToWithQuery = (params = {}) => {
    navigate({
      pathname: "/",
      search: `?${createSearchParams(params)}`,
    });
  };

  const onCheckEnter = (event) => {
    if (event.key === "Enter") {
      const value = event.target.value.trim();
      if (!value) return navigate("/");
      goToWithQuery({ name: value });
    }
  };

  useEffect(() => {
    dispatch(getCartQty());
  }, [dispatch]);

  const { cartItemCount } = useSelector((state) => state.cart);
  const [width, setWidth] = useState(0);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="bg-black md:mb-10">
      <div className="block bg-black md:flex justify-between">
        <div className="nav-logo md:pt-4 pl-8 mb-0">
          <Link to="/">
            <img width={200} src="/image/musinsa-logo.png" alt="hm-logo.png" />
          </Link>
        </div>

        <ul className="flex gap-4 items-center justify-center md:pt-12">
          {menuList.map((menu, index) => {
            const isSelected =
              (menu === "All" && !selectedCategory) ||
              selectedCategory.toLowerCase() === menu.toLowerCase();
            return (
              <li key={index}>
                <button
                  type="button"
                  className={`no-underline hover:underline ${
                    isSelected ? "text-yellow-400 font-bold" : "text-white"
                  }`}
                  onClick={() => {
                    if (menu === "All") return navigate("/");
                    goToWithQuery({ category: menu.toLowerCase() });
                  }}
                >
                  {menu}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="side-menu" style={{ width: width }}>
          <button className="closebtn" onClick={() => setWidth(0)}>
            &times;
          </button>
        </div>

        {user && user.level === "admin" && (
          <Link
            to="/admin/product?page=1"
            className="link-area text-white absolute top-0 left-4 md:right-2"
          >
            Admin page
          </Link>
        )}

        <div className="nav-header mt-0 md:pt-8">
          <div>
            <div className="flex justify-center align-middle md:mt-4">
              {user ? (
                <div onClick={handleLogout} className="nav-icon text-white">
                  <FontAwesomeIcon icon={faUser} />
                  <span style={{ cursor: "pointer" }}>로그아웃</span>
                </div>
              ) : (
                <div
                  onClick={() => navigate("/login")}
                  className="nav-icon text-white"
                >
                  <FontAwesomeIcon icon={faUser} />
                  <span style={{ cursor: "pointer" }}>로그인</span>
                </div>
              )}
              <div
                onClick={() => navigate("/cart")}
                className="nav-icon text-white"
              >
                <FontAwesomeIcon icon={faShoppingBag} />
                <span style={{ cursor: "pointer" }}>
                  {`쇼핑백(${cartItemCount || 0})`}
                </span>
              </div>
              <div
                onClick={() => navigate("/account/purchase")}
                className="nav-icon text-white"
              >
                <FontAwesomeIcon icon={faBox} />
                <span style={{ cursor: "pointer" }}>내 주문</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-full bg-black">
        <div className="flex items-center gap-2 landing-search-box w-80 md:w-[560px] border-white bg-white border-2 rounded-xl my-4 px-3 py-2">
          <FontAwesomeIcon icon={faSearch} />
          <input
            type="text"
            placeholder="제품검색"
            onKeyPress={onCheckEnter}
            className="w-full outline-none bg-white"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
