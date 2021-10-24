import "./App.css";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import IGameDate from "./lib/IGameDate";
import GameDateBlocks from "./components/GameDateBlocks";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GameBlocks from "./components/GameBlocks";

function App() {
  const [gameDates, setGameDates] = useState<IGameDate[]>([]);

  useEffect(() => {
    const axios = require("axios").default;
    axios.get("/api/gameDates").then((res: AxiosResponse) => {
      setGameDates(res.data as IGameDate[]);
    });
  }, []);

  return (
    <div>
      <Router>
        <div className="blocks-container">
          <GameDateBlocks dates={gameDates} />
        </div>
        <Switch>
          <Route path="/:gameDateStr" component={GameBlocks} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
