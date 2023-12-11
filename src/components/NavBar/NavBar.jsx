import { useState } from "react";
import classes from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
import { Group } from "@mantine/core";
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
      <Group justify="space-between">
        <nav className={classes.navbar}>{links}</nav>
        <NavProfile />
      </Group>
    </>
  );
};

export default NavBar;
