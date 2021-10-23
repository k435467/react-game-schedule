import "./App.css";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import IGameDate from "./lib/IGameDate";
import GameDateBlock from "./components/GameDateBlock";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import GameBlocksContainer from "./components/GameBlocksContainer";

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
        {gameDates.map((gDate) => {
          return (
            <div key={gDate!.id}>
              <Link to={`/${gDate.year}${gDate.month}`}>
                <GameDateBlock year={gDate.year} month={gDate.month} />
              </Link>
            </div>
          );
        })}
        <Switch>
          <Route path="/:gameDateStr" component={GameBlocksContainer} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
