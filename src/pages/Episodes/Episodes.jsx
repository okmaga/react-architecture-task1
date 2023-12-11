import { useState, useEffect } from "react";
import { MantineTable } from "../../components/MantineTable";
import { useNavigate, useSearchParams } from "react-router-dom";
import _ from "lodash";
import { useInfinityLoader } from "../../hooks/useInfinityLoader";
import {
  Card,
  Text,
  Badge,
  Group,
  Loader,
  SimpleGrid,
  Notification,
  rem,
  Flex
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

const endpoint = "episode";

export const Episodes = () => {
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 480);
  const [pageNumber, setPageNumber] = useState(1);
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useSearchParams({
    sortBy: "created",
    order: "asc"
  });

  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;

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

  const renderDate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  return (
    <div className="episodes">
      <h2>Episodes</h2>
      {isMobile && initialDataLoaded && (
        <SimpleGrid verticalSpacing="lg">
          {sortedEpisodes.map((ep) => (
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              key={ep.name}
              onClick={() => handleClick(ep)}
            >
              <Text fw={500}>{ep.name}</Text>
              <Group justify="space-between" mt="md" mb="xs">
                <Badge color="red">{renderDate(ep.air_date)}</Badge>
                <Text>{ep.episode}</Text>
              </Group>
            </Card>
          ))}
        </SimpleGrid>
      )}
      {!isMobile && initialDataLoaded && (
        <MantineTable
          data={sortedEpisodes}
          onClick={handleClick}
          sortBy={sortBy}
          onSort={handleSort}
        />
      )}
      <div ref={lastNodeRef} style={{ height: "1rem" }}></div>
      {loading && (
        <Flex align="center" justify="center">
          <Loader color="gray" type="dots" />
        </Flex>
      )}
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
