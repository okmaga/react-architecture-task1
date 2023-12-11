import classes from "./Charicon.module.css";
import { Card, Badge } from "@mantine/core";

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
      <Badge color="gray">{char.name}</Badge>
    </Card>
  );
};

export default CharIcon;
