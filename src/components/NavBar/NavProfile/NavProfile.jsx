import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";
import classes from "./NavProfile.module.css";
import { useAuth } from "../../../context/AuthProvider";

const NavProfile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <span className="nav-profile">
      {!user && (
        <>
          <NavLink className={classes.link} to={"/login"}>
            Log in
          </NavLink>
        </>
      )}

      {user && (
        <>
          {user}
          <Button
            className={classes.button}
            variant="outline"
            onClick={() => logout(() => navigate("/", { replace: true }))}
          >
            Log out
          </Button>
        </>
      )}
    </span>
  );
};

export default NavProfile;
