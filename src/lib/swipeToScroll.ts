// https://htmldom.dev/drag-to-scroll/

// DOM 事件傳遞機制：捕獲與冒泡、事件代理
// https://hackmd.io/@Heidi-Liu/note-fe201-dom

// How do you remove an event listener that uses "this" in TypeScript?
// https://stackoverflow.com/questions/38023688/how-do-you-remove-an-event-listener-that-uses-this-in-typescript

export interface IPosAndFlag {
  pos: {
    left: number;
    x: number;
  };
  isDragging: boolean; // distinguish drag and click
}

let touchMoveHandlerWrapper: (event: TouchEvent) => void;
let touchEndHandlerWrapper: (event: TouchEvent) => void;

// ----------------
// touchStartHandler
// ----------------

export const touchStartHandler = (
  e: React.TouchEvent<HTMLElement>,
  ele: React.RefObject<HTMLDivElement>,
  posAndFlag: IPosAndFlag
) => {
  if (ele.current) {
    posAndFlag.pos.left = ele.current.scrollLeft; // The current scroll
    posAndFlag.pos.x = e.touches[0].clientX; // Get the current touch pos

    touchMoveHandlerWrapper = (event) => touchMoveHandler(event, ele, posAndFlag);
    ele.current.addEventListener("touchmove", touchMoveHandlerWrapper);

    touchEndHandlerWrapper = (event) => touchEndHandler(event, ele, posAndFlag);
    window.addEventListener("touchend", touchEndHandlerWrapper);

    // Change the cursor and prevent user from selecting the text
    ele.current.style.cursor = "grabbing";
    ele.current.style.userSelect = "none";
  }
};

// ----------------
// touchMoveHandler
// ----------------

const touchMoveHandler = (
  e: TouchEvent,
  ele: React.RefObject<HTMLDivElement>,
  posAndFlag: IPosAndFlag
) => {
  // How far the touch has been moved
  const dx = e.touches[0].clientX - posAndFlag.pos.x;

  // If moved enough distance then dragging
  if (Math.abs(dx) > 10) {
    posAndFlag.isDragging = true;
  }

  // Scroll the element
  if (ele.current && posAndFlag.isDragging) {
    ele.current.scrollLeft = posAndFlag.pos.left - dx;
  }
};

// --------------
// touchEndHandler
// --------------

const touchEndHandler = (
  e: TouchEvent,
  ele: React.RefObject<HTMLDivElement>,
  posAndFlag: IPosAndFlag
) => {
  if (ele.current) {
    ele.current.removeEventListener("touchmove", touchMoveHandlerWrapper);
    window.removeEventListener("touchend", touchEndHandlerWrapper);
    ele.current.style.removeProperty("cursor");
    ele.current.style.removeProperty("user-select");
  }
  // delay off dragging for prevent triggering handleClick
  setTimeout(() => {
    posAndFlag.isDragging = false;
  }, 100);
};
