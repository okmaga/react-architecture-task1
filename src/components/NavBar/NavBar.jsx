import { useState } from "react";
import classes from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
import { NavProfile } from "./NavProfile";

const data = [
  { link: "/", label: "Home" },
  { link: "/characters", label: "Characters" },
  { link: "/locations", label: "Locations" },
  { link: "/episodes", label: "Episodes" }
];

const NavBar = () => {
  const [active, setActive] = useState("Home");

  const links = data.map((item) => (
    <NavLink
      className={classes.link}
      to={item.link}
      data-active={item.label === active || undefined}
      onClick={() => {
        setActive(item.label);
      }}
      key={item.label}
    >
      <span>{item.label}</span>
    </NavLink>
  ));
  return (
    <>
      <nav className={classes.navbar}>
        <div className={classes.navbarMain}>
          {links} <NavProfile />
        </div>
      </nav>
    </>
  );
};

export default NavBar;
