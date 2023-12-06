import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";

export const useInfinityLoader = (
  endpoint,
  pageNumber,
  setPageNumber,
  query = ""
) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setItems([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    let cancel;
    axios({
      method: "get",
      url: `https://rickandmortyapi.com/api/${endpoint}`,
      params: { q: query, page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c))
    })
      .then((res) => {
        setItems((prev) => {
          return [...new Set([...prev, ...res.data.results])];
        });
        setHasMore(res.data.results.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) {
          return;
        }
        setLoading(false);
        if (e.response.status === 404) {
          setError("limit reached");
        } else {
          setError(e.message);
        }
      });
    return () => cancel();
  }, [query, pageNumber, setPageNumber, endpoint]);

  const observer = useRef();

  const lastNodeRef = useCallback(
    (node) => {
      if (error === "limit reached") {
        return;
      }
      if (loading) return;
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prev) => prev + 1);
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore, error, setPageNumber]
  );

  return {
    loading,
    error,
    items,
    hasMore,
    lastNodeRef
  };
};
