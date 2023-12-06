import episodes from "../../data/episode.json";
import { useParams, useLocation } from "react-router-dom";

export const SingleEpisode = () => {
  const { id } = useParams();
  const location = useLocation();
  const episode =
    location?.state?.episode ??
    episodes.find((e) => e.id.toString() === id.toString());

  const renderContent = (key, value) => {
    if ((key === "characters") | (key === "url")) return;
    if (key === "created" || key === "air_date") {
      const date = new Date(value);
      return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
    } else {
      return value;
    }
  };
  return (
    <div>
      <h1>Episode</h1>
      {Object.entries(episode).map(([key, value]) => {
        return (
          <div key={key}>
            {key}: {renderContent(key, value)}
          </div>
        );
      })}
    </div>
  );
};
