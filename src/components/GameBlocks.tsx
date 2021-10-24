import { AxiosResponse } from "axios";
import React, { useEffect, useRef, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import IGameInfo from "../lib/IGameInfo";

export default function GameBlocks(props: RouteComponentProps<{ gameDateStr: string }>) {
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
      containerEle.current.addEventListener("mouseup", mouseUpHandler);
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
      containerEle.current.removeEventListener("mouseup", mouseUpHandler);
      containerEle.current.style.removeProperty("cursor");
      containerEle.current.style.removeProperty("user-select");
    }
    // delay off dragging for prevent triggering handleClick
    setTimeout(() => {
      isDragging = false;
    }, 100);
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
