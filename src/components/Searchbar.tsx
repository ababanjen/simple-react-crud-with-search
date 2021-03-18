import React, { useRef, useState } from "react";
import { ClearSearchIcon } from "./Icons";
import { capitalize, matchSearches } from "../utils/strings";
import { retriveSearchHistory, setSearchHistory } from "../utils/storage";
import { useOutsideClick } from "../hooks";

export default function Searchbar({
  setGames,
  games,
  searchValue,
  setSearchValue
}) {
  const [recentSearches, setRecentSearches] = useState(null);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState(0);
  const [isKeyDown, setIsKeyDown] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const ref = useRef();

  useOutsideClick(ref, () => {
    if (!isFocused) setRecentSearches(null);
  });

  function saveSearchHistory(value) {
    let dataHistory = retriveSearchHistory() || [];
    dataHistory.unshift(value.toLowerCase());
    dataHistory = [...new Set(dataHistory)];
    setSearchHistory(dataHistory);
  }

  function clearSearchField() {
    setRecentSearches(null);
    setSelectedOptionIdx(0);
    setIsKeyDown(false);
    setSearchValue("");
    if (games) {
      setGames(
        games.map((game) => {
          game.isMatched = true;
          return game;
        })
      );
    }
  }

  function handleChangeSearch(value, isEntered) {
    const res = games?.map((game) => {
      game.isMatched = matchSearches(game.title, value);
      return game;
    });
    setSearchValue(value);
    if (!games) setGames(res);
    if (isEntered) saveSearchHistory(value);
  }

  function handleKeyDown({ key, target: { value } }) {
    switch (key) {
      case "Enter": {
        if (value) {
          const searchString = isKeyDown
            ? recentSearches[selectedOptionIdx]
            : value;
          saveSearchHistory(searchString);
          handleChangeSearch(searchString, true);
          setRecentSearches(null);
          setSelectedOptionIdx(0);
          setIsKeyDown(false);
        } else if (isKeyDown && !value) {
          handleChangeSearch(recentSearches[selectedOptionIdx], true);
          setRecentSearches(null);
        }
        break;
      }
      case "ArrowDown": {
        if (recentSearches) {
          if (selectedOptionIdx + 1 < recentSearches.length)
            setSelectedOptionIdx(
              recentSearches.length === 0 ? 0 : selectedOptionIdx + 1
            );
          setIsKeyDown(true);
        }
        break;
      }
      case "ArrowUp": {
        if (recentSearches) {
          setIsKeyDown(true);
          if (selectedOptionIdx > 0)
            setSelectedOptionIdx(selectedOptionIdx - 1);
        }
        break;
      }
    }
  }

  function handleChange({ target: { value } }) {
    if (games) {
      if (value) {
        const history = retriveSearchHistory() || [];
        const res =
          history?.filter((data) => matchSearches(data, value)) || null;
        if (res.length >= 1) res.length = 10;
        setRecentSearches(res.length ? res : null);
        setIsKeyDown(res.length >= 1);
        if (res.length <= 0) setSelectedOptionIdx(0);
        handleChangeSearch(value, false);
      } else {
        setGames(
          games.map((game) => {
            game.isMatched = true;
            return game;
          })
        );
        setRecentSearches(null);
        setSelectedOptionIdx(0);
        setIsKeyDown(false);
      }
    }
    setIsKeyDown(false);
    setSearchValue(value);
  }

  function onSelectSuggetion(event, value) {
    handleChange({ ...event, target: { ...event.target, value } });
    setRecentSearches(null);
    saveSearchHistory(value);
    handleChangeSearch(value);
  }

  function handleInputFocus() {
    const history = retriveSearchHistory() || [];
    if (history.length >= 1) history.length = 10;
    setRecentSearches(history);
    setIsFocused(true);
  }

  function handleInputOnBlur() {
    setIsFocused(false);
  }

  return (
    <div className="searchbarContainer flexContainer column">
      <input
        value={capitalize(searchValue)}
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="searchbarInput"
        placeholder="Search games"
        onFocus={handleInputFocus}
        onBlur={handleInputOnBlur}
      />
      {searchValue && (
        <ClearSearchIcon
          height="20px"
          width="20px"
          className="searchIcon"
          onClick={clearSearchField}
        />
      )}
      {recentSearches && (
        <div className={"suggestionContainer flexContainer column"} ref={ref}>
          {recentSearches.length ? (
            recentSearches?.map((history, idx) => (
              <span
                key={`${history}-${idx}`}
                onClick={(e) => onSelectSuggetion(e, history)}
                className="suggestionItem"
                style={
                  selectedOptionIdx === idx
                    ? { background: "#9ab3da", color: "white" }
                    : {}
                }
              >
                {capitalize(history)}
              </span>
            ))
          ) : (
            <span>No match searches.</span>
          )}
        </div>
      )}
    </div>
  );
}
