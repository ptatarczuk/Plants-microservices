import { useLocation } from "react-router-dom";

const useUrlQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export default useUrlQuery;
