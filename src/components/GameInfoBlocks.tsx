import "./GameInfoBlocks.css";
import { AxiosResponse } from "axios";
import React, { useEffect, useRef, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import IGameInfo from "../lib/IGameInfo";
import { IPosAndFlag, mouseDownHandler } from "../lib/dragToScroll";
import { touchStartHandler } from "../lib/swipeToScroll";

export default function GameInfoBlocks(
  props: RouteComponentProps<{ gameDateStr: string }>
) {
  let gameDateStr = props.match.params.gameDateStr;

  const [games, setGames] = useState<IGameInfo[]>([]);

  useEffect(() => {
    // ----------
    // Fetch data
    // ----------
    const axios = require("axios").default;
    axios.get(process.env.API_URL + "/api/" + gameDateStr).then((res: AxiosResponse) => {
      setGames(res.data as IGameInfo[]);
    });
  }, [gameDateStr]);

  // ----------------------------
  // Drag to scroll the container
  // ----------------------------

  const containerEle = useRef<HTMLDivElement>(null);
  const posAndFlag: IPosAndFlag = {
    pos: {
      left: 0,
      x: 0,
    },
    isDragging: false,
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
      onMouseDown={(e) => mouseDownHandler(e, containerEle, posAndFlag)}
      onTouchStart={(e) => touchStartHandler(e, containerEle, posAndFlag)}
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
