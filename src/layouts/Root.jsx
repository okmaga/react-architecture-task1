import { Outlet, Link } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import {
  AppShell,
  Burger,
  Group,
  NavLink as MantineNavLink
} from "@mantine/core";
import classes from "./Root.module.css";
import NavBar from "../components/NavBar/NavBar";
import { NavProfile } from "../components/NavBar/NavProfile";
import { useAuth } from "../context/AuthProvider";

const RootLayout = () => {
  const [opened, { toggle }] = useDisclosure();
  const { user } = useAuth();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened }
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="center" style={{ flex: 1 }}>
            <Group ml="xl" gap={0} visibleFrom="sm">
              <NavBar />
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <MantineNavLink
          className={classes.control}
          component={Link}
          label="Home"
          to="/"
          onClick={toggle}
        />
        <MantineNavLink
          className={classes.control}
          component={Link}
          label="Characters"
          to="/characters"
          onClick={toggle}
        />
        <MantineNavLink
          className={classes.control}
          component={Link}
          label="Episodes"
          to="/episodes"
          onClick={toggle}
        />
        <MantineNavLink
          className={classes.control}
          component={Link}
          label="Locations"
          to="/locations"
          onClick={toggle}
        />
        {user ? (
          <NavProfile />
        ) : (
          <MantineNavLink
            className={classes.control}
            component={Link}
            label="Login"
            to="/login"
            onClick={toggle}
          />
        )}
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default RootLayout;
