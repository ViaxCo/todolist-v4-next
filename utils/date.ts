const today = new Date();
export const getDate = () => {
  const options = {
    weekday: "long" as const,
    day: "numeric" as const,
    month: "long" as const,
  };
  return today.toLocaleDateString("en-US", options); //"en-US" can be replaced for undefined
};
export const getDay = () => {
  const options = {
    weekday: "long" as const,
  };
  return today.toLocaleDateString("en-US", options); //"en-US" can be replaced for undefined
};
