import React, { useEffect, useState } from "react";
import api from "../service/apiGateway";

const useGetFaqbyPropertyid = ( id ) => {
  const [data, setData] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchdata = async () => {
    try {
      
      setLoading(true);
      const response = await api.get(`/faq/${id}`);
      console.log("reviews", response?.data);
      setData(response?.data);
      setFetched(true);
      console.log("response", response);
    } catch (error) {
      console.log("error while fetching FAQs", error);
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

export default useGetFaqbyPropertyid;
