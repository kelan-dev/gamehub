const slugMap: { [key: string]: string } = {
  Name: "name",
  "Release Date": "-released",
  "Average Rating": "-rating",
  Metacritic: "-metacritic",
};

const labelMap: { [key: string]: string } = {
  name: "Name",
  released: "Release Date",
  rating: "Average Rating",
  metacritic: "Metacritic",
};

const trim = (ordering: string = ""): string => {
  if (ordering.charAt(0) === "-") return ordering.slice(1);
  return ordering;
};

export const getSlug = (text: string): string => {
  return slugMap[text];
};

export const getLabel = (slug: string | undefined): string | undefined => {
  if (!slug) return;
  return labelMap[trim(slug)];
};

export const reverse = (ordering: string = ""): string => {
  if (ordering.charAt(0) === "-") return ordering.slice(1);
  return "-" + ordering;
};

export const slugsMatch = (a: string = "", b: string = ""): boolean => {
  if (trim(a) === trim(b)) return true;
  return false;
};
