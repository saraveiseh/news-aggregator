export const DateFormatter = (dateString: string): string => {
  const date = new Date(dateString);
  const userLocale = navigator.language || "en-US";
  const day = date.getDate();
  const month = date.toLocaleString(userLocale, { month: "short" });
  const year = date.getFullYear();

  return `${day}, ${month} ${year}`;
};
