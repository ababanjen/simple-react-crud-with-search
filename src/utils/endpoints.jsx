const baseUrl = "https://9v67c.sse.codesandbox.io/";
const endpoint = {
  getGameList: `${baseUrl}api/games/list`,
  updateGameFavorite: `${baseUrl}api/update/game/favorite/`,
  createGame: `${baseUrl}api/create/game`,
  removeGame: `${baseUrl}api/remove/game/`
};

export { endpoint };
