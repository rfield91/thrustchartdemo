export const numberWithSuffix = (number: number) => {
  let suffix = "";

  const remainder = number % 10;

  if (remainder === 1) suffix = "st";
  else if (remainder === 2) suffix = "nd";
  else if (remainder === 3) suffix = "rd";
  else suffix = "th";

  return `${number}${suffix}`;
};
