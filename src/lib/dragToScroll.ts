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

let mouseMoveHandlerWrapper: (event: MouseEvent) => void;
let mouseUpHandlerWrapper: (event: MouseEvent) => void;

// ----------------
// mouseDownHandler
// ----------------

export const mouseDownHandler = (
  e: React.MouseEvent<HTMLElement>,
  ele: React.RefObject<HTMLDivElement>,
  posAndFlag: IPosAndFlag
) => {
  if (ele.current) {
    posAndFlag.pos.left = ele.current.scrollLeft; // The current scroll
    posAndFlag.pos.x = e.clientX; // Get the current mouse pos

    mouseMoveHandlerWrapper = (event) => mouseMoveHandler(event, ele, posAndFlag);
    ele.current.addEventListener("mousemove", mouseMoveHandlerWrapper);

    mouseUpHandlerWrapper = (event) => mouseUpHandler(event, ele, posAndFlag);
    window.addEventListener("mouseup", mouseUpHandlerWrapper);

    // Change the cursor and prevent user from selecting the text
    ele.current.style.cursor = "grabbing";
    ele.current.style.userSelect = "none";
  }
};

// ----------------
// mouseMoveHandler
// ----------------

const mouseMoveHandler = (
  e: MouseEvent,
  ele: React.RefObject<HTMLDivElement>,
  posAndFlag: IPosAndFlag
) => {
  // How far the mouse has been moved
  const dx = e.clientX - posAndFlag.pos.x;

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
// mouseUpHandler
// --------------

const mouseUpHandler = (
  e: MouseEvent,
  ele: React.RefObject<HTMLDivElement>,
  posAndFlag: IPosAndFlag
) => {
  if (ele.current) {
    ele.current.removeEventListener("mousemove", mouseMoveHandlerWrapper);
    window.removeEventListener("mouseup", mouseUpHandlerWrapper);
    ele.current.style.removeProperty("cursor");
    ele.current.style.removeProperty("user-select");
  }
  // delay off dragging for prevent triggering handleClick
  setTimeout(() => {
    posAndFlag.isDragging = false;
  }, 100);
};
