import useSWR from "swr";

const useLists = <T>() => {
  return useSWR<T>("/api");
};

export default useLists;
