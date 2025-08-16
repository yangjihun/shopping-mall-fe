import { Navbar, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const handleSelectMenu = (url) => {
    navigate(url);
  };

  const NavbarContent = () => {
    return (
      <div className="bg-black h-[100vh]">
        <Link to="/">
          <img width={280} src="/image/musinsa-logo.png" alt="hm-logo.png" />
        </Link>
        <ul className="sidebar-area">
          <li
            className="sidebar-item text-white"
            onClick={() => handleSelectMenu("/admin/product?page=1")}
          >
            product
          </li>
          <li
            className="sidebar-item text-white"
            onClick={() => handleSelectMenu("/admin/order?page=1")}
          >
            order
          </li>
        </ul>
      </div>
    );
  };
  return (
    <>
      <div className="sidebar-toggle">{NavbarContent()}</div>

      <Navbar bg="black" expand={false} className="mobile-sidebar-toggle flex items-center justify">
        <Link to="/">
          <img src="/image/musinsa-logo.png" alt="hm-logo.png" />
        </Link>
        <Container fluid className="p-0">
          <Navbar.Brand href="#"></Navbar.Brand>
          
        </Container>
          <ul className="sidebar-area flex items-center justify-center p-0 m-0">
            <li
              className="sidebar-item text-white"
              onClick={() => handleSelectMenu("/admin/product?page=1")}
            >
              product
            </li>
            <li
              className="sidebar-item text-white"
              onClick={() => handleSelectMenu("/admin/order?page=1")}
            >
              order
            </li>
          </ul>
      </Navbar>
    </>
  );
};

export default Sidebar;
