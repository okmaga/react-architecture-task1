import { useState, useEffect } from "react";
import { MantineTable } from "../../components/MantineTable";
import _ from "lodash";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useInfinityLoader } from "../../hooks/useInfinityLoader";
import { IconCheck } from "@tabler/icons-react";
import {
  SimpleGrid,
  Card,
  Text,
  Badge,
  Group,
  Loader,
  Notification,
  rem
} from "@mantine/core";

const endpoint = "location";

export const Locations = () => {
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 480);
  const [pageNumber, setPageNumber] = useState(1);
  const navigate = useNavigate();

  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;

  const handleClick = (loc) => {
    navigate(`/locations/${loc.id}`, { state: { loc } });
  };

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 480);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      {isMobile && initialDataLoaded && (
        <SimpleGrid verticalSpacing="lg">
          {locations.map((loc) => (
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              key={loc.name}
              onClick={() => handleClick(loc)}
            >
              <Text fw={500}>{loc.name}</Text>
              <Group justify="space-between" mt="md" mb="xs">
                <Badge color="red">{loc.type}</Badge>
                <Text>{loc.dimension}</Text>
              </Group>
            </Card>
          ))}
        </SimpleGrid>
      )}
      {!isMobile && initialDataLoaded && (
        <MantineTable
          data={sortedLocations}
          onClick={handleClick}
          sortBy={sortBy}
          onSort={handleSort}
        />
      )}
      <div ref={lastNodeRef} style={{ height: "1rem" }}></div>
      {loading && <Loader color="gray" type="dots" />}
      {error && (
        <div style={{ margin: "2rem", fontSize: "1rem" }} className="error">
          {error === "limit reached" ? (
            <Notification
              icon={checkIcon}
              color="teal"
              mt="md"
              withCloseButton={false}
            >
              Nothing left to show!
            </Notification>
          ) : (
            error
          )}
        </div>
      )}
    </div>
  );
};
