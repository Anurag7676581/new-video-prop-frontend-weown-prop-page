import { useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";

const DEFAULT_PROPERTY_ID =
  process.env.REACT_APP_DEFAULT_PROPERTY_ID || "69c1d4bb5321fbfdc87676a9";

export default function usePropertyIdentifier() {
  const { id: routeId } = useParams();
  const [searchParams] = useSearchParams();
  const queryProperty = searchParams.get("property");

  const identifier = useMemo(() => {
    if (routeId) return routeId;
    if (queryProperty) return queryProperty;
    return DEFAULT_PROPERTY_ID;
  }, [routeId, queryProperty]);

  return { identifier };
}
