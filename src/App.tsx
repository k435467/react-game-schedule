import "./App.css";
import About from "./components/About";
import Profile from "./components/Profile";
import DateBlcok from "./components/DateBlock";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    // TODO: delete class app
    <div className="App">
      <Router>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/123">Profile 123</Link>
          </li>
          <li>
            <Link to="/profile/456">Profile 456</Link>
          </li>
        </ul>
        <DateBlcok year={2018} month={3} />
        <hr />
        <Switch>
          <Route path="/about" exact component={About} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/:id" component={Profile} />
          <Route path="/profile/:id" exact component={Profile} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
