const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return `${s.charAt(0).toUpperCase()}${s.slice(1)}`;
};
const matchSearches = (s1, s2) => {
  return s1.toLowerCase().includes(s2.toLowerCase()) || false;
};

export { capitalize, matchSearches };
