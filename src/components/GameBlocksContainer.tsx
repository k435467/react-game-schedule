import { AxiosResponse } from "axios";
import { addListener } from "process";
import React, { useEffect, useRef, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import IGameInfo from "../lib/IGameInfo";

export default function GameBlocksContainer(
  props: RouteComponentProps<{ gameDateStr: string }>
) {
  const gameDateStr = props.match.params.gameDateStr;

  const [games, setGames] = useState<IGameInfo[]>([]);

  useEffect(() => {
    const axios = require("axios").default;
    axios.get(`/api/${gameDateStr}`).then((res: AxiosResponse) => {
      setGames(res.data as IGameInfo[]);
    });
  }, [gameDateStr]);

  // ----------------------------
  // Drag to scroll the container
  //
  // https://htmldom.dev/drag-to-scroll/
  //
  // TODO: remove y
  // ----------------------------

  const containerEle = useRef<HTMLDivElement>(null);
  let pos = { top: 0, left: 0, x: 0, y: 0 };
  const mouseDownHandler = (e: React.MouseEvent<HTMLElement>) => {
    if (containerEle.current) {
      pos = {
        // The current scroll
        left: containerEle.current.scrollLeft,
        top: containerEle.current.scrollTop,
        // Get the current mouse pos
        x: e.clientX,
        y: e.clientY,
      };
      containerEle.current.addEventListener("mousemove", mouseMoveHandler);
      containerEle.current.addEventListener("mouseup", mouseUpHandler);
      // Change the cursor and prevent user from selecting the text
      containerEle.current.style.cursor = "grabbing";
      containerEle.current.style.userSelect = "none";
    }
  };
  const mouseMoveHandler = (e: MouseEvent) => {
    // How far the mouse has been moved
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;
    // Scroll the element
    if (containerEle.current) {
      containerEle.current.scrollLeft = pos.left - dx;
      containerEle.current.scrollTop = pos.top - dy;
    }
  };
  const mouseUpHandler = (e: MouseEvent) => {
    if (containerEle.current) {
      containerEle.current.removeEventListener("mousemove", mouseMoveHandler);
      containerEle.current.removeEventListener("mouseup", mouseUpHandler);
      containerEle.current.style.cursor = "default";
      containerEle.current.style.removeProperty("user-select");
    }
  };

  // ------
  // Render
  // ------

  return (
    <div className="blocks-container" ref={containerEle} onMouseDown={mouseDownHandler}>
      {games.map((game) => {
        return (
          <div key={game.id} className="game-block">
            <div className="flex-space-between">
              <span>{game.time}</span>
              <span>{game.gameType}</span>
            </div>
            <span>{game.location}</span>
            <div className="flex-space-between">
              <p>{game.team1}</p>
              <p>{game.team1num}</p>
            </div>
            <div className="flex-space-between">
              <p>{game.team2}</p>
              <p>{game.team2num}</p>
            </div>

            {/* Bottom buttons */}

            <div style={{ display: "flex", width: "100%" }}>
              <span
                className="game-btn grey-bg"
                onClick={() => {
                  alert("click 查看詳情");
                }}
              >
                查看詳情
              </span>
              <span
                className="game-btn red-bg"
                onClick={() => {
                  alert("click 購票");
                }}
              >
                購票
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
