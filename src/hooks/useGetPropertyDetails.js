import { useEffect, useState } from "react";
import { resolveProperty } from "../service/propertyService";

const useGetPropertyDetails = (identifier) => {
  const [data, setData] = useState(null);
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchdata = async () => {
      if (!identifier) return;

      try {
        setLoading(true);
        setError(null);
        const response = await resolveProperty(identifier);
        if (!cancelled) {
          setData(response);
          setFetched(true);
        }
      } catch (err) {
        if (!cancelled) {
          console.log("error while property details", err);
          setError(err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchdata();

    return () => {
      cancelled = true;
    };
  }, [identifier]);

  return { fetched, loading, error, data };
};

export default useGetPropertyDetails;
