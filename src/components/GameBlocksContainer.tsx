import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
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

  return (
    <div>
      <div>
        <span>{}</span>
        <span>2</span>
      </div>
      <div>
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
              <div style={{ display: "flex", width: "100%" }}>
                <span className="game-btn grey-bg">查看詳情</span>
                <span className="game-btn red-bg">購票</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
