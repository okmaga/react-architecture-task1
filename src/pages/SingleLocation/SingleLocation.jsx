import locations from "../../data/location.json";
import { useParams, useLocation } from "react-router-dom";

export const SingleLocation = () => {
  const { id } = useParams();
  const location = useLocation();
  const loc =
    location?.state?.loc ??
    locations.find((l) => l.id.toString() === id.toString());
  const renderContent = (key, value) => {
    if ((key === "residents") | (key === "url")) return;
    if (key === "created") {
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
      <h1>Location</h1>
      {Object.entries(loc).map(([key, value]) => {
        return (
          <div key={key}>
            {key}: {renderContent(key, value)}
          </div>
        );
      })}
    </div>
  );
};
