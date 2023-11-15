import {
  Logo,
  BrandContainer,
  Title,
  NavLinkContainer,
  NavbarContainer,
  NavbarWrapper,
  NavbarLink,
  UserInfo,
  NavbarMenuIcon,
  NavbarCollapse,
  NavDropdown2,
  LogoutButton,
  AdminWellcome,
  LinkAdmin,
  AdminContainer,
} from "./Navbar.style";
import LogoPic from "./../../media/logo/logo-no-background.png";
import UserInfoPic from "../../media/icons/user-icon-white.png";

import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import NavbarBackground from "./../../media/images/navbar-friends-chatting-pub.jpg";
import NavbarHome from "./../../media/images/navbar-happy-friends-with-beer-mugs.jpg";
import NavbarAbout from "./../../media/images/bar-drinks-bartender.jpg";
import NavbarMenu from "./../../media/images/main-course-fried-chicken-sauce-salad-plate.jpg";
import NavbarBookTable from "./../../media/images/pizza-table.jpg";
import NavbarMenuBurgers from "./../../media/images/burgers-three-mini.jpg";
import NavbarMenuPizzas from "./../../media/images/navbar-happy-friends-with-beer-mugs.jpg";
import NavbarOrderonline from "./../../media/images/navbar-happy-friends-with-beer-mugs.jpg";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

function NavbarBootstrap({ isAdmin, logo }) {
  const params = useParams();

  const location = useLocation();

  // // adaugat 12Nov
  const [displayadminname, displayadminnameupdate] = useState("");
  const [displayusername, displayusernameupdate] = useState("");
  const [showadminmenu, showadminmenuupdate] = useState(false);
  const [showguestmenu, showaguestmenuupdate] = useState(false);
  const usenavigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/signin" || location.pathname === "/register") {
      showadminmenuupdate(false);
    } else {
      showadminmenuupdate(true);
      showaguestmenuupdate(true);
      let username = sessionStorage.getItem("username");
      if (username === "" || username === null) {
        usenavigate("/signin");
      } else if (
        (username !== "admin1") &
        (username !== "admin2") &
        (username !== "admin3") &
        (username !== "") &
        (username !== null)
      ) {
        displayusernameupdate(username);
      } else {
        displayusernameupdate(username);
      }
    }
  }, [location]);

  const getImageForLocation = (pathname) => {
    switch (pathname) {
      case "/homepage":
        return NavbarHome;
      case "/about":
        return NavbarAbout;
      case "/menu":
        return NavbarMenu;
      case "/menus/Burgers":
        return NavbarMenuBurgers;
      case "/meals/Beef%20burger":
        return NavbarMenuBurgers;
      case "/meals/Chichen%20burger":
        return NavbarMenuBurgers;
      case "/meals/Vegan%20burger":
        return NavbarMenuBurgers;
      case "/menus/Pizzas":
        return "https://upload.wikimedia.org/wikipedia/commons/9/91/Pizza-3007395.jpg";
      case "/meals/Pizza%20beef":
        return "https://upload.wikimedia.org/wikipedia/commons/9/91/Pizza-3007395.jpg";
      case "/meals/Pizza%20chichen":
        return "https://upload.wikimedia.org/wikipedia/commons/9/91/Pizza-3007395.jpg";
      case "/meals/Pizza%20vegan":
        return "https://upload.wikimedia.org/wikipedia/commons/9/91/Pizza-3007395.jpg";
      case "/orderonline":
        return "https://media.timeout.com/images/105491872/image.jpg";
      case "/bookatable":
        return NavbarBookTable;
      // Add more cases as needed for different routes
      default:
        return NavbarHome;
    }
  };

  const backgroundImage = getImageForLocation(location.pathname);
  // console.log(location.pathname);

  return (
    <NavbarWrapper
      expand="lg"
      className={isAdmin ? "bg-body-tertiary" : "green-class"}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <NavbarContainer>
        <NavLinkContainer>
          <Navbar.Brand as={Link} to="/homepage">
            <BrandContainer>
              <Logo src={LogoPic} alt="Logo" />
              <Title>The Phoenix Pub</Title>
            </BrandContainer>
          </Navbar.Brand>
        </NavLinkContainer>

        <NavLinkContainer>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            style={{ NavbarMenuIcon }}
          />
          <NavbarCollapse id="basic-navbar-nav" style={{ NavbarMenuIcon }}>
            {showadminmenu && (
              <AdminContainer>
                <AdminWellcome>
                  Welcome <b>{displayusername}</b>
                </AdminWellcome>

                <LinkAdmin as={Link} to="/admin">
                  Menu Admin
                </LinkAdmin>
                <LinkAdmin as={Link} to="/admin/add">
                  Add
                </LinkAdmin>
                <Link
                  to={"/signin"}
                  // style={{ float: "right" }}
                >
                  <LogoutButton>Logout</LogoutButton>
                </Link>
              </AdminContainer>
            )}
            <NavbarLink as={Link} to="/homepage">
              Home
            </NavbarLink>
            <NavbarLink as={Link} to="/about">
              About
            </NavbarLink>
            <NavbarLink as={Link} to="/menu">
              Menu
            </NavbarLink>
            <NavbarLink as={Link} to="/orderonline">
              Order online
            </NavbarLink>
            <NavbarLink as={Link} to="/bookatable">
              Book a table
            </NavbarLink>

            <NavDropdown2
              title={
                <img
                  src="https://cdn0.iconfinder.com/data/icons/cryptocurrency-137/128/1_profile_user_avatar_account_person-132-512.png"
                  alt="User"
                  style={{
                    width: "28px",
                    marginRight: "5px",
                  }}
                />
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item as={Link} to="/signin">
                Sign in
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/register">
                Register
              </NavDropdown.Item>
            </NavDropdown2>
          </NavbarCollapse>
        </NavLinkContainer>
      </NavbarContainer>
    </NavbarWrapper>
  );
}

export default NavbarBootstrap;
