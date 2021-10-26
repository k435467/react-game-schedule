import "./GameDateBlocks.css";
import { useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import IGameDate from "../lib/IGameDate";
import BreathingLight from "./BreathingLight";
import { IPosAndFlag, mouseDownHandler } from "../lib/dragToScroll";

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
  const posAndFlag: IPosAndFlag = {
    pos: {
      left: 0,
      x: 0,
    },
    isDragging: false,
  };
  // let pos = { left: 0, x: 0 };
  // let isDragging = false; // distinguish drag and click

  // const mouseDownHandler = (e: React.MouseEvent<HTMLElement>) => {
  //   if (containerEle.current) {
  //     pos = {
  //       // The current scroll
  //       left: containerEle.current.scrollLeft,
  //       // Get the current mouse pos
  //       x: e.clientX,
  //     };
  //     containerEle.current.addEventListener("mousemove", mouseMoveHandler);
  //     // containerEle.current.addEventListener("mouseup", mouseUpHandler);
  //     window.addEventListener("mouseup", mouseUpHandler);
  //     // Change the cursor and prevent user from selecting the text
  //     containerEle.current.style.cursor = "grabbing";
  //     containerEle.current.style.userSelect = "none";
  //   }
  // };
  // const mouseMoveHandler = (e: MouseEvent) => {
  //   // How far the mouse has been moved
  //   const dx = e.clientX - pos.x;
  //   // If moved enough distance then dragging
  //   if (Math.abs(dx) > 10) {
  //     isDragging = true;
  //   }
  //   // Scroll the element
  //   if (containerEle.current && isDragging) {
  //     containerEle.current.scrollLeft = pos.left - dx;
  //   }
  // };
  // const mouseUpHandler = (e: MouseEvent) => {
  //   if (containerEle.current) {
  //     containerEle.current.removeEventListener("mousemove", mouseMoveHandler);
  //     // containerEle.current.removeEventListener("mouseup", mouseUpHandler);
  //     window.removeEventListener("mouseup", mouseUpHandler);
  //     containerEle.current.style.removeProperty("cursor");
  //     containerEle.current.style.removeProperty("user-select");
  //   }
  //   // delay off dragging for prevent triggering handleClick
  //   setTimeout(() => {
  //     isDragging = false;
  //   }, 100);
  // };

  // // -----------
  // // Touch Event
  // // -----------

  // const touchStartHandler = (e: React.TouchEvent<HTMLElement>) => {
  //   if (containerEle.current) {
  //     pos = {
  //       // The current scroll
  //       left: containerEle.current.scrollLeft,
  //       // Get the current mouse pos
  //       x: e.touches[0].clientX,
  //     };
  //     containerEle.current.addEventListener("touchmove", touchMoveHandler);
  //     // containerEle.current.addEventListener("touchend", touchEndHandler);
  //     window.addEventListener("touchend", touchEndHandler);
  //     // Change the cursor and prevent user from selecting the text
  //     containerEle.current.style.cursor = "grabbing";
  //     containerEle.current.style.userSelect = "none";
  //   }
  // };
  // const touchMoveHandler = (e: TouchEvent) => {
  //   // How far the mouse has been moved
  //   const dx = e.touches[0].clientX - pos.x;
  //   // If moved enough distance then dragging
  //   if (Math.abs(dx) > 10) {
  //     isDragging = true;
  //   }
  //   // Scroll the element
  //   if (containerEle.current && isDragging) {
  //     containerEle.current.scrollLeft = pos.left - dx;
  //   }
  // };
  // const touchEndHandler = (e: TouchEvent) => {
  //   if (containerEle.current) {
  //     containerEle.current.removeEventListener("touchmove", touchMoveHandler);
  //     // containerEle.current.removeEventListener("touchend", touchEndHandler);
  //     window.removeEventListener("touchend", touchEndHandler);
  //     containerEle.current.style.removeProperty("cursor");
  //     containerEle.current.style.removeProperty("user-select");
  //   }
  //   // delay off dragging for prevent triggering handleClick
  //   setTimeout(() => {
  //     isDragging = false;
  //   }, 100);
  // };

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
      // onTouchStart={touchStartHandler}
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
