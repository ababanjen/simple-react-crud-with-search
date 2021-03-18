const retriveSearchHistory = () => {
  return JSON.parse(window.localStorage.getItem("search_history"));
};

const setSearchHistory = (data) => {
  window.localStorage.setItem("search_history", JSON.stringify(data));
};

export { retriveSearchHistory, setSearchHistory };
