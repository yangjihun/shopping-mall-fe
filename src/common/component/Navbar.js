import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faBars,
  faBox,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/user/userSlice";

const Navbar = ({ user }) => {
  const dispatch = useDispatch();
  const { cartItemCount } = useSelector((state) => state.cart);
  const menuList = [
    "여성",
    "Divided",
    "남성",
    "신생아/유아",
    "아동",
    "H&M HOME",
    "Sale",
    "지속가능성",
  ];
  let [width, setWidth] = useState(0);
  let navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div>
      <div className="block md:flex justify-between">
        {/* logo */}
        <div className="nav-logo pt-4 pl-8">
          <Link to="/">
            <img width={100} src="/image/hm-logo.png" alt="hm-logo.png" />
          </Link>
        </div>

        <div className="side-menu" style={{ width: width }}>
          <button className="closebtn" onClick={() => setWidth(0)}>
            &times;
          </button>

          {/* 모바일 카테고리 */}
          <div className="side-menu-list" id="menu-list">
            {menuList.map((menu, index) => (
              <button key={index}>{menu}</button>
            ))}
          </div>
        </div>
        {/* 어드민 */}
        {user && user.level === "admin" && (
          <Link to="/admin/product?page=1" className="link-area text-black absolute top-0 left-4 md:right-2">
            Admin page
          </Link>
        )}

        <div className="pt-8">
          <ul className="menu">
            {menuList.map((menu, index) => (
              <li key={index}>
                <a href="#">{menu}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* 로그인 쇼핑백 내주문 */}
        <div className="nav-header mt-0 md:pt-8">
          <div>
            <div className="flex justify-center align-middle md:mt-4">
              {user ? (
                <div onClick={handleLogout} className="nav-icon">
                  <FontAwesomeIcon icon={faUser} />
                  <span style={{ cursor: "pointer" }}>로그아웃</span>
                </div>
              ) : (
                <div onClick={() => navigate("/login")} className="nav-icon">
                  <FontAwesomeIcon icon={faUser} />
                  <span style={{ cursor: "pointer" }}>로그인</span>
                </div>
              )}
              <div onClick={() => navigate("/cart")} className="nav-icon">
                <FontAwesomeIcon icon={faShoppingBag} />
                  <span style={{ cursor: "pointer" }}>{`쇼핑백(${
                    cartItemCount || 0
                  })`}</span>
              </div>
              <div
                onClick={() => navigate("/account/purchase")}
                className="nav-icon"
              >
                <FontAwesomeIcon icon={faBox} />
                <span style={{ cursor: "pointer" }}>내 주문</span>
              </div>
            </div>
          </div>
          
          <div className="burger-menu block absolute top-5 right-4 md:hidden">
            <FontAwesomeIcon icon={faBars} onClick={() => setWidth(250)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
