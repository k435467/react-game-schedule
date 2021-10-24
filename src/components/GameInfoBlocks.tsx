import "./GameInfoBlocks.css";
import { AxiosResponse } from "axios";
import React, { useEffect, useRef, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import IGameInfo from "../lib/IGameInfo";

export default function GameInfoBlocks(
  props: RouteComponentProps<{ gameDateStr: string }>
) {
  const gameDateStr = props.match.params.gameDateStr;

  const [games, setGames] = useState<IGameInfo[]>([]);

  useEffect(() => {
    // ----------
    // Fetch data
    // ----------
    const axios = require("axios").default;
    axios.get(`/api/${gameDateStr}`).then((res: AxiosResponse) => {
      setGames(res.data as IGameInfo[]);
    });
  }, [gameDateStr]);

  // ----------------------------
  // Drag to scroll the container
  //
  // https://htmldom.dev/drag-to-scroll/
  // ----------------------------

  const containerEle = useRef<HTMLDivElement>(null);
  let pos = { left: 0, x: 0 };
  let isDragging = false; // distinguish drag and click
  const mouseDownHandler = (e: React.MouseEvent<HTMLElement>) => {
    if (containerEle.current) {
      pos = {
        // The current scroll
        left: containerEle.current.scrollLeft,
        // Get the current mouse pos
        x: e.clientX,
      };
      containerEle.current.addEventListener("mousemove", mouseMoveHandler);
      // containerEle.current.addEventListener("mouseup", mouseUpHandler);
      window.addEventListener("mouseup", mouseUpHandler);
      // Change the cursor and prevent user from selecting the text
      containerEle.current.style.cursor = "grabbing";
      containerEle.current.style.userSelect = "none";
    }
  };
  const mouseMoveHandler = (e: MouseEvent) => {
    // How far the mouse has been moved
    const dx = e.clientX - pos.x;
    // If moved enough distance then dragging
    if (Math.abs(dx) > 10) {
      isDragging = true;
    }
    // Scroll the element
    if (containerEle.current && isDragging) {
      containerEle.current.scrollLeft = pos.left - dx;
    }
  };
  const mouseUpHandler = (e: MouseEvent) => {
    if (containerEle.current) {
      containerEle.current.removeEventListener("mousemove", mouseMoveHandler);
      // containerEle.current.removeEventListener("mouseup", mouseUpHandler);
      window.removeEventListener("mouseup", mouseUpHandler);
      containerEle.current.style.removeProperty("cursor");
      containerEle.current.style.removeProperty("user-select");
    }
    // delay off dragging for prevent triggering handleClick
    setTimeout(() => {
      isDragging = false;
    }, 100);
  };

  // -----------
  // Touch Event
  // -----------

  const touchStartHandler = (e: React.TouchEvent<HTMLElement>) => {
    if (containerEle.current) {
      pos = {
        // The current scroll
        left: containerEle.current.scrollLeft,
        // Get the current mouse pos
        x: e.touches[0].clientX,
      };
      containerEle.current.addEventListener("touchmove", touchMoveHandler);
      // containerEle.current.addEventListener("touchend", touchEndHandler);
      window.addEventListener("touchend", touchEndHandler);
      // Change the cursor and prevent user from selecting the text
      containerEle.current.style.cursor = "grabbing";
      containerEle.current.style.userSelect = "none";
    }
  };
  const touchMoveHandler = (e: TouchEvent) => {
    // How far the mouse has been moved
    const dx = e.touches[0].clientX - pos.x;
    // If moved enough distance then dragging
    if (Math.abs(dx) > 10) {
      isDragging = true;
    }
    // Scroll the element
    if (containerEle.current && isDragging) {
      containerEle.current.scrollLeft = pos.left - dx;
    }
  };
  const touchEndHandler = (e: TouchEvent) => {
    if (containerEle.current) {
      containerEle.current.removeEventListener("touchmove", touchMoveHandler);
      // containerEle.current.removeEventListener("touchend", touchEndHandler);
      window.removeEventListener("touchend", touchEndHandler);
      containerEle.current.style.removeProperty("cursor");
      containerEle.current.style.removeProperty("user-select");
    }
    // delay off dragging for prevent triggering handleClick
    setTimeout(() => {
      isDragging = false;
    }, 100);
  };

  // ----------------
  // Handle click buy
  // ----------------

  const handleClickBuy = (
    gameId: number,
    gameTime: string,
    e: React.MouseEvent<HTMLElement>
  ) => {
    let strArr = gameTime.split(" ");
    let out = {
      gameId: gameId,
      date: strArr[0],
      time: strArr[2],
    };
    alert(JSON.stringify(out));
  };

  // ------
  // Render
  // ------

  return (
    <div
      className="blocks-container"
      ref={containerEle}
      onMouseDown={mouseDownHandler}
      onTouchStart={touchStartHandler}
    >
      {games.map((game) => {
        return (
          <div key={game.id} className="game-block">
            <div className="flex-space-between">
              <span>{game.time}</span>
              <span className="secondary-text">{game.gameType}</span>
            </div>
            <span className="secondary-text">{game.location}</span>

            {/* Teams */}

            <div className="padding-y">
              <div className="flex-space-between">
                <div style={{ display: "flex" }}>
                  <div className="team-img-container">
                    <img
                      src={game.team1LogoUrl}
                      alt="logo"
                      height={"100%"}
                      draggable="false"
                    />
                  </div>
                  <div className="vertical-center-container bold-text">{game.team1}</div>
                </div>
                <div className="vertical-center-container bold-text">{game.team1Num}</div>
              </div>
              <div className="flex-space-between">
                <div style={{ display: "flex" }}>
                  <div className="team-img-container">
                    <img
                      src={game.team2LogoUrl}
                      alt="logo"
                      height={"100%"}
                      draggable="false"
                    />
                  </div>
                  <div className="vertical-center-container bold-text">{game.team2}</div>
                </div>
                <div className="vertical-center-container bold-text">{game.team2Num}</div>
              </div>
            </div>

            {/* Bottom buttons */}

            <div style={{ display: "flex", width: "100%" }}>
              <div
                className="game-btn grey-bg"
                onClick={() => {
                  alert("click 查看詳情");
                }}
              >
                查看詳情
              </div>
              <div
                className="game-btn red-bg"
                onClick={(event) => {
                  handleClickBuy(game.id!, game.time, event);
                }}
              >
                購票
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
