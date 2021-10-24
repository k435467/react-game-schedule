import GameSchedule from "./components/GameSchedule";

function App() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "20px" }}>
        <div style={{ color: "white", flexGrow: 1, flexBasis: 0, fontSize: "24px" }}>
          &lt;
        </div>
        <div
          style={{ color: "white", flexGrow: 10, textAlign: "center", fontSize: "24px" }}
        >
          新竹街口攻城獅
        </div>
        <div style={{ flexGrow: 1 }}></div>
      </div>
      <GameSchedule />
    </div>
  );
}

export default App;
