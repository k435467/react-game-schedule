import "./GameSchedule.css";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import IGameDate from "../lib/IGameDate";
import GameDateBlocks from "./GameDateBlocks";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GameInfoBlocks from "./GameInfoBlocks";

export default function GameSchedule() {
  const [gameDates, setGameDates] = useState<IGameDate[]>([]);

  // ----------------
  // Fetch game dates
  // ----------------

  useEffect(() => {
    if (process.env.API_URL) {
      const axios = require("axios").default;
      const url: string = process.env.API_URL;
      axios.get(url + "/api/gameDates").then((res: AxiosResponse) => {
        setGameDates(res.data as IGameDate[]);
      });
    }
  }, []);

  // ------
  // Render
  // ------

  return (
    <div>
      <div className="title-container">
        <div style={{ color: "white", fontSize: "30px" }}>賽程表</div>
        <div style={{ color: "#b9babb", display: "flex" }}>
          聯盟戰況
          <div className="arrow-container">&gt;</div>
        </div>
      </div>
      <Router>
        <div style={{ paddingTop: "5px", paddingBottom: "10px" }}>
          <GameDateBlocks dates={gameDates} />
        </div>
        <Switch>
          <Route path="/:gameDateStr" component={GameInfoBlocks} />
        </Switch>
      </Router>
    </div>
  );
}
