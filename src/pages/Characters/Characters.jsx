import { useEffect, useState } from "react";
import { CharIcon } from "../../components/CharIcon";
import { useNavigate } from "react-router-dom";
import { useInfinityLoader } from "../../hooks/useInfinityLoader";
import classes from "./Characters.module.css";
import { Loader, Flex } from "@mantine/core";

const endpoint = "character";

export const Characters = () => {
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const navigate = useNavigate();

  const {
    loading,
    error,
    items: characters,
    lastNodeRef
  } = useInfinityLoader(endpoint, pageNumber, setPageNumber);

  const handleClick = (char) => {
    navigate(`/characters/${char.id}`, { state: { char } });
  };

  useEffect(() => {
    if (characters.length) {
      setInitialDataLoaded(true);
    }
  }, [characters]);

  return (
    <div className={classes.characters}>
      <div className={classes.cgrid}>
        {initialDataLoaded &&
          characters.map((char) => {
            return (
              <CharIcon
                onClick={() => handleClick(char)}
                key={char.id + char.name}
                char={char}
              />
            );
          })}
      </div>
      <div ref={lastNodeRef}></div>
      {loading && (
        <Flex align="center" justify="center">
          <Loader color="gray" type="dots" />
        </Flex>
      )}
      {error && (
        <div style={{ margin: "2rem", fontSize: "1rem" }} className="error">
          {error === "limit reached" ? "Nothing left to show!" : error}
        </div>
      )}
    </div>
  );
};
