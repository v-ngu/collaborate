import { useState, useEffect } from "react";
import makeFetchRequest from "../utils/make-fetch-request";
import useHeaders from "./useHeaders";

const useFetch = (api, otherParams, wait) => {
  // states
  const [state, setState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [headers, isLoadingHeaders] = useHeaders();

  useEffect(() => {
    (async () => {
      if (!isLoadingHeaders && wait !== null && !wait) {
        const data = await makeFetchRequest(() => api(headers, otherParams));
        setState(data);
        setIsLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingHeaders, wait]);

  return ([state, isLoading, setState]);
};

export default useFetch;