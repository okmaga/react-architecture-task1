import classes from "./Charicon.module.css";
import { Card } from "@mantine/core";

const CharIcon = ({ char, onClick }) => {
  return (
    <Card
      shadow="sm"
      radius="md"
      withBorder
      className={classes.icon}
      onClick={onClick}
    >
      <div
        className={classes.image}
        style={{ backgroundImage: `url(${char.image})` }}
      ></div>
      <div>{char.name}</div>
    </Card>
  );
};

export default CharIcon;
