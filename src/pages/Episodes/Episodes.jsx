import { useState, useEffect } from "react";
import Table from "../../components/Table/Table";
import { useNavigate, useSearchParams } from "react-router-dom";
import _ from "lodash";
import { useInfinityLoader } from "../../hooks/useInfinityLoader";

const endpoint = "episode";

export const Episodes = () => {
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useSearchParams({
    sortBy: "created",
    order: "asc"
  });

  const {
    loading,
    error,
    items: episodes,
    lastNodeRef
  } = useInfinityLoader(endpoint, pageNumber, setPageNumber);

  const handleClick = (episode) => {
    navigate(`/episodes/${episode.id}`, { state: { episode } });
  };

  useEffect(() => {
    if (episodes.length) {
      setInitialDataLoaded(true);
    }
  }, [episodes]);

  const handleSort = (sortRule) => {
    setSortBy(sortRule);
  };

  const sortedEpisodes = _.orderBy(
    episodes,
    [sortBy.get("sortBy")],
    [sortBy.get("order")]
  );

  return (
    <div className="episodes">
      <h2>Episodes</h2>
      {initialDataLoaded && (
        <Table
          data={sortedEpisodes}
          onClick={handleClick}
          sortBy={sortBy}
          onSort={handleSort}
        />
      )}
      <div ref={lastNodeRef} style={{ height: "1rem" }}></div>
      {loading && (
        <div style={{ fontSize: "1.2rem" }} className="loading">
          Loading...
        </div>
      )}
      {error && (
        <div style={{ margin: "2rem", fontSize: "1rem" }} className="error">
          {error === "limit reached" ? "Nothing left to show!" : error}
        </div>
      )}
    </div>
  );
};
