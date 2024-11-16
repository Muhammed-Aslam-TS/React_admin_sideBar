import { useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCog } from '@fortawesome/free-solid-svg-icons'; // Solid icons
import { faUser } from '@fortawesome/free-regular-svg-icons'; // Regular icon
import { faGithub } from '@fortawesome/free-brands-svg-icons'; // Brand icon

const items = [
  { name: "Home", icon: faHome },
  { name: "Settings", icon: faCog },
  { name: "Profile", icon: faUser },
  { name: "Github", icon: faGithub }
];

export const SideBar = () => {
  const [width, setWidth] = useState(260);
  const sidebarRef = useRef(null);

  const resize = (e) => {
    let newWidth = e.clientX - sidebarRef.current?.offsetLeft;
    if (newWidth < 60) newWidth = 60;
    if (newWidth > 260) newWidth = 260;
    setWidth(newWidth);
    document.body.style.cursor = "col-resize";
  };

  const stopResize = () => {
    document.body.style.cursor = "default";
    window.removeEventListener("mousemove", resize);
    window.removeEventListener("mouseup", stopResize);
  };

  const initResize = () => {
    document.body.style.cursor = "col-resize";
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResize);
  };

  return (
    <aside
      ref={sidebarRef}
      style={{ width: `${width}px` }}
      className="fixed top-0 left-0 bottom-0 bg-blue-950  overflow-hidden"
    >
      <div
        className="handle absolute top-0 right-0 bottom-0 w-2 cursor-col-resize bg-white bg-opacity-20 hover:bg-opacity-30"
        onMouseDown={initResize}
      />
      <div className="inner w-full h-full">
        <nav className="menu grid p-2">
          {items.map((item) => (
            <button
              key={item.name}
              className="flex items-center gap-4 h-14 w-full px-4 py-1 capitalize text-white hover:text-black opacity-90 rounded-lg hover:bg-white hover:bg-opacity-10 transition"
            >
              <FontAwesomeIcon icon={item.icon} className="text-2xl" />
              <p>{item.name}</p>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};
