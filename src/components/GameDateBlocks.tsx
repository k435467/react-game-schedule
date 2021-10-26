import "./GameDateBlocks.css";
import { useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import IGameDate from "../lib/IGameDate";
import BreathingLight from "./BreathingLight";
import { IPosAndFlag, mouseDownHandler } from "../lib/dragToScroll";
import { touchStartHandler } from "../lib/swipeToScroll";

interface GameDateBlocksProps {
  dates: IGameDate[];
}

export default function GameDateBlocks(props: GameDateBlocksProps) {
  const { dates } = props;

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

  // --------------------------
  // useLocation to get curPath
  // --------------------------

  let location = useLocation();
  const [curPath, setCurPath] = useState("/");
  useEffect(() => {
    setCurPath(location.pathname);
  }, [location]);

  // ---------------------
  // Handle click to route
  // ---------------------

  let history = useHistory();
  const handleClick = (date: IGameDate) => {
    if (!posAndFlag.isDragging && curPath !== "/" + date.id!) {
      history.push("/" + date.id!);
    }
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
      {dates.map((date) => {
        return (
          <div
            className={`date-block ${"/" + date.id === curPath ? "active-bg" : ""}`}
            key={date!.id}
            onClick={() => {
              handleClick(date);
            }}
          >
            {"/" + date.id === curPath && (
              <div style={{ paddingRight: "10px" }}>
                <BreathingLight />
              </div>
            )}
            {date.text}
          </div>
        );
      })}
    </div>
  );
}
