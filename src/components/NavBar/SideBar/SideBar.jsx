import { useState } from "react";
import { Group, NavLink as MantineNavLink, Avatar, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import {
  IconHome,
  IconDeviceTv,
  IconPlanet,
  IconUsers,
  IconLogout,
  IconLogin
} from "@tabler/icons-react";
import classes from "./SideBar.module.css";
import { useAuth } from "../../../context/AuthProvider";

const data = [
  { link: "/", label: "Home", icon: IconHome },
  { link: "/characters", label: "Characters", icon: IconUsers },
  { link: "/episodes", label: "Episodes", icon: IconDeviceTv },
  { link: "/locations", label: "Locations", icon: IconPlanet }
];

export function SideBar({ toggle }) {
  const [active, setActive] = useState("Home");
  const { user, logout } = useAuth();

  const links = data.map((item) => (
    <MantineNavLink
      className={classes.link}
      active={item.label === active || undefined}
      label={item.label}
      to={item.link}
      key={item.label}
      component={Link}
      color="red"
      variant="filled"
      leftSection={<item.icon />}
      onClick={() => {
        setActive(item.label);
        toggle();
      }}
    />
  ));

  return (
    <nav className={classes.sidebar}>
      <div className={classes.sidebarMain}>
        <Group className={classes.header} justify="space-between">
          <h3>R&M</h3>
        </Group>
        {links}
      </div>
      <div className={classes.footer}>
        {user ? (
          <>
            <Group gap={7}>
              <Avatar src={user.image} alt={user.name} radius="xl" size={50} />
              <Text fw={500} size="sm" lh={1} mr={3}>
                {user.name}
              </Text>
            </Group>
            <MantineNavLink
              className={classes.link}
              label="Log out"
              component={Link}
              onClick={() => logout()}
              leftSection={<IconLogout stroke={1.5} />}
            />
          </>
        ) : (
          <MantineNavLink
            className={classes.control}
            component={Link}
            label="Login"
            to="/login"
            onClick={toggle}
            leftSection={<IconLogin stroke={1.5} />}
          />
        )}
      </div>
    </nav>
  );
}
