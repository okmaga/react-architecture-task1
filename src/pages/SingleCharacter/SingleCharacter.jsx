import { useLocation, useParams } from "react-router-dom";
import characters from "../../data/character.json";

export const SingleCharacter = () => {
  const { id } = useParams();
  const location = useLocation();
  const char =
    location?.state?.char ??
    characters.find((char) => {
      return char.id.toString() === id.toString();
    });
  return (
    <div>
      <h1>{char.name}</h1>
      <div>
        <img src={char.image} alt={char.name} loading="lazy" />
      </div>
      <div>Status: {char.status}</div>
      <div>Species: {char.species}</div>
      <div>Type: {char.type}</div>
      <div>Gender: {char.gender}</div>
    </div>
  );
};
