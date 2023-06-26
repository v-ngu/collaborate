import { useState, useEffect } from "react";
import makeFetchRequest from "../utils/make-fetch-request";
import useHeaders from "./useHeaders";

const useFetch = (api, otherParams, wait = false, initialValue = {}) => {
  // the parameter wait is used when dependant on another state

  // states
  const [state, setState] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(true);
  const [headers, isLoadingHeaders] = useHeaders();

  useEffect(() => {
    (async () => {
      if (!isLoadingHeaders && !wait) {
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