import { useState, useEffect } from "react";
import { MantineTable } from "../../components/MantineTable";
import _ from "lodash";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useInfinityLoader } from "../../hooks/useInfinityLoader";

const endpoint = "location";

export const Locations = () => {
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const navigate = useNavigate();
  const handleClick = (loc) => {
    navigate(`/locations/${loc.id}`, { state: { loc } });
  };

  const {
    loading,
    error,
    items: locations,
    lastNodeRef
  } = useInfinityLoader(endpoint, pageNumber, setPageNumber);

  const [sortBy, setSortBy] = useSearchParams({
    sortBy: "created",
    order: "asc"
  });

  useEffect(() => {
    if (locations.length) {
      setInitialDataLoaded(true);
    }
  }, [locations]);
  const handleSort = (sortRule) => {
    setSortBy(sortRule);
  };

  const sortedLocations = _.orderBy(
    locations,
    [sortBy.get("sortBy")],
    [sortBy.get("order")]
  );

  return (
    <div className="locations">
      <h2>Locations</h2>
      {initialDataLoaded && (
        <MantineTable
          data={sortedLocations}
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
