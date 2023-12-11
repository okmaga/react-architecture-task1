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
import { SideBar } from "../components/NavBar/SideBar";

const RootLayout = () => {
  const [opened, { toggle }] = useDisclosure();

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
        <SideBar toggle={toggle} />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default RootLayout;
