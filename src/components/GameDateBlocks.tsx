import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import IGameDate from "../lib/IGameDate";

interface GameDateBlocksProps {
  dates: IGameDate[];
}

export default function GameDateBlocks(props: GameDateBlocksProps) {
  const { dates } = props;

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

  // ---------------------
  // Handle click to route
  // ---------------------

  const [curId, setCurId] = useState(-1);
  let curPath = "/";
  let history = useHistory();
  const handleClick = (date: IGameDate) => {
    if (!isDragging) {
      let nextPath = "/" + date.year.toString() + date.month.toString();
      if (nextPath !== curPath) {
        history.push(nextPath);
        curPath = nextPath;
        setCurId(date.id!);
      }
    }
  };

  // ------
  // Render
  // ------

  return (
    <div className="blocks-container" ref={containerEle} onMouseDown={mouseDownHandler}>
      {dates.map((date) => {
        return (
          <div
            className={`date-block ${date.id === curId ? "active-bg" : ""}`}
            key={date!.id}
            onClick={() => {
              handleClick(date);
            }}
          >
            {date.year}年{date.month}月
          </div>
        );
      })}
    </div>
  );
}
