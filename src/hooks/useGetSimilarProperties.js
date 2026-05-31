import React, { useEffect, useState } from "react";
import api from "../service/apiGateway";

const useGetSimilarProperties = ( id ) => {
  const [data, setData] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchdata = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/property/similar/${id}`);
      console.log("reviews", response?.data);
      setData(response?.data?.data);
      console.log("similar properties->",data)
      setFetched(true);
    } catch (error) {
      console.log("error while fetching similar properties", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchdata();
  }, [id]);

  return { fetched, loading, error, data };
};

export default useGetSimilarProperties;
