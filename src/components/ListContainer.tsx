import React, { useState, useEffect } from "react";
import {
  StarIcon,
  StarIconOutlined,
  SortIcon,
  SeachNotFound,
  LoaderIcon,
  DeleteIcon
} from "./Icons";

export function Row({ cell1, cell2, Icon, iconProps, isHeader, handleDele }) {
  return (
    <>
      <div className="itemCell width100">
        <span>{cell1}</span>
      </div>
      <div className="itemCell w100">
        <span>{cell2}</span>
      </div>
      <div className="itemCell flex justify-content-end width100 align-item-center">
        <span>
          <Icon {...iconProps} />
          {!isHeader && (
            <span>
              <DeleteIcon
                height="20px"
                width="20px"
                className="cursor-pointer pl5"
                onClick={handleDele}
              />
            </span>
          )}
        </span>
      </div>
    </>
  );
}

export function Item({
  id,
  title,
  isFavorite,
  updateFavorite,
  description,
  onDeleteItem
}) {
  function handleChangeFav() {
    updateFavorite(id);
  }
  function handleDele() {
    onDeleteItem({ id, title });
  }
  const Icon = isFavorite ? StarIcon : StarIconOutlined;
  return (
    <Row
      cell1={title}
      cell2={description}
      Icon={Icon}
      iconProps={{
        onClick: handleChangeFav,
        className: "cursor-pointer",
        height: "20px",
        width: "20px"
      }}
      handleDele={handleDele}
      isHeader={false}
    />
  );
}

export default function ListContainer({
  games,
  fetchGameList,
  favorites,
  searchValue,
  isListReversed,
  setIsListReversed,
  ...props
}) {
  const [gameList, setGameList] = useState(games);
  const [hasMatched, setHasMatched] = useState(0);
  const disabledProperties = gameList
    ? {
        sortIcon: {
          className: "cursor-pointer",
          fill: isListReversed ? "#f68d88" : "white"
        }
      }
    : {
        sortIcon: {
          className: "cursor-not-allowed",
          fill: "#f68d88"
        }
      };

  useEffect(() => {
    if (games) {
      setGameList(games);
    }
  }, [games]);

  useEffect(() => {
    if (!searchValue && games) {
      setGameList(games);
    }
    if (games)
      setHasMatched(games?.filter((game) => game.isMatched).length || 0);
  }, [searchValue, games]);

  function handleSortList() {
    if (gameList) {
      const reversed = [...gameList].reverse();
      setGameList(reversed);
      setIsListReversed(!isListReversed);
    }
  }

  return (
    <div className="itemsContainer">
      <div className="tableHeader flexContainer row">
        <Row
          cell1="Title"
          cell2={"Details"}
          Icon={SortIcon}
          iconProps={{
            ...disabledProperties.sortIcon,
            onClick: handleSortList,
            height: "20px",
            width: "20px"
          }}
          handleDele={() => {}}
          isHeader
        />
      </div>
      {hasMatched ? (
        gameList?.map((game) => {
          return (
            game.isMatched && (
              <div key={game.id} className="itemContainer flexContainer row">
                <Item {...game} {...props} />
              </div>
            )
          );
        })
      ) : gameList && hasMatched <= 0 ? (
        <div className="notfoundicon">
          <SeachNotFound height="100px" width="100px" />
        </div>
      ) : (
        <LoaderIcon />
      )}
    </div>
  );
}
