import "./styles/styles.css";
import "./styles/icons.css";
import {
  Searchbar,
  ListContainer,
  CreateGameDialog,
  WarningDialog
} from "./components";
import { useEffect, useState } from "react";
import { endpoint } from "./utils/endpoints";
import { withFLoatingAddBtn, withDialog } from "./wrappers";
import axios from "axios";

export default withDialog(
  withFLoatingAddBtn(function App({ showIconButton, showDialog, ...props }) {
    const [games, setGames] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    const [isListReversed, setIsListReversed] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
      fetchGameList();
      showIconButton({
        onClick: onClickAddBtn
      });
    }, []);

    useEffect(() => {
      onShowCreateDialog({});
    }, [title, description, isFavorite]);

    function onShowCreateDialog({ show, isSubmitting }) {
      showDialog({
        show,
        header: CreateGameDialog.Header,
        content: CreateGameDialog.Content({
          onChangeField,
          createFields: returnFieldValues()
        }),
        footer: CreateGameDialog.Footer({
          handleSave: onCreateGame,
          isSubmitting
        })
      });
    }

    function onShowWarningDialog({
      title,
      show,
      isSubmitting,
      handleRemoveItem,
      id
    }) {
      showDialog({
        show: show,
        header: WarningDialog.Header({
          title: `You are about to remove ${title}`
        }),
        content: WarningDialog.Content({
          message: `Are you sure you want to remove ${title}?`
        }),
        footer: WarningDialog.Footer({
          label: "Remove",
          isSubmitting,
          handleRemoveItem,
          title,
          id
        })
      });
    }

    function onClickAddBtn() {
      onShowCreateDialog({ show: true });
    }

    function returnFieldValues() {
      return {
        title,
        description,
        isFavorite
      };
    }

    function onChangeField({ target: { name, value } }) {
      switch (name) {
        case "title": {
          setTitle(value);
          break;
        }
        case "description": {
          setDescription(value);
          break;
        }
        default: {
          setIsFavorite(!(value === "true"));
          break;
        }
      }
    }

    function prepopulateGames(data) {
      setGames(
        data.map((game) => {
          game.isMatched = true;
          return game;
        })
      );
    }

    function onCreateGame(event) {
      onShowCreateDialog({ isSubmitting: true });
      axios
        .post(`${endpoint.createGame}`, {
          title,
          description,
          isFavorite
        })
        .then((res) => {
          fetchGameList();
          onShowCreateDialog({ isSubmitting: false, show: false });
          ["title", "description", "isFavorite"].forEach((name) => {
            onChangeField({
              target: { name, value: name === "isFavorite" ? false : "" }
            });
          });
        })
        .catch((err) => {
          onShowCreateDialog({ isSubmitting: false });
        });
    }

    function fetchGameList() {
      axios
        .get(endpoint.getGameList)
        .then((res) => prepopulateGames(res.data.length ? res.data : null))
        .catch((err) => setGames(null));
    }

    function updateFavorite(id) {
      const updatedGame = (arr, hasError) => {
        let updatedData = arr.map((game) => {
          if (game.id === id) {
            const data = hasError ? game.isFavorite : !game.isFavorite;
            game.isFavorite = data;
          }
          return game;
        });
        updatedData = isListReversed ? updatedData.reverse() : updatedData;
        return updatedData;
      };
      setGames(updatedGame(games));
      axios
        .put(`${endpoint.updateGameFavorite}${id}`)
        .then((res) => {})
        .catch((err) => setGames(updatedGame(games, true)));
    }

    function handleRemoveItem({ title, id }) {
      onShowWarningDialog({
        title,
        show: true,
        isSubmitting: true,
        id
      });
      axios
        .delete(`${endpoint.removeGame}${id}`)
        .then((res) => {
          onShowWarningDialog({
            show: false,
            isSubmitting: false
          });
          fetchGameList();
        })
        .catch((err) => console.log({ err }));
    }
    function onDeleteItem({ id, title }) {
      onShowWarningDialog({
        title,
        show: true,
        isSubmitting: false,
        handleRemoveItem,
        id
      });
    }

    return (
      <div className="root flexContainer column">
        <Searchbar
          setGames={setGames}
          games={games}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <div className="flexContainer w100 mt40">
          <div className="listContainer">
            <ListContainer
              games={games}
              searchValue={searchValue}
              fetchGameList={fetchGameList}
              updateFavorite={updateFavorite}
              isListReversed={isListReversed}
              setIsListReversed={setIsListReversed}
              onDeleteItem={onDeleteItem}
            />
          </div>
        </div>
      </div>
    );
  })
);
