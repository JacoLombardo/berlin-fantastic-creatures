import React, { useState } from 'react';
import cn from "classnames";
import Menu from '../Images/logo/menu.png';
import '../style/fab.style.css';
import { useNavigate } from 'react-router-dom';

const FabGroup = ({ actions }) => {

  const [open, setOpen] = useState(false);
  const redirectTo = useNavigate();

  const mouseEnter = () => setOpen(true);
  const mouseLeave = () => setOpen(false);

  return (
    <ul
      className="fab-container"
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      <li className="fab-button">
        <img src={Menu} alt="menu" title="Menu" style={{width: "30px"}} />
      </li>
      {actions.map((action, index) => (
        <li
          style={{ transitionDelay: `${index * 25}ms` }}
          className={cn("fab-action", { open })}
          key={action.label}
          onClick={() => {
            redirectTo(action.onClick);
          }}
        >
          {action.icon}
        </li>
      ))}
    </ul>
  );
};

export default FabGroup;