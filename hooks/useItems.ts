import useSWR from "swr";

const useItems = <T>(customListName: string | undefined) => {
  return useSWR<T>(customListName ? `/api/${customListName}` : null);
};

export default useItems;
