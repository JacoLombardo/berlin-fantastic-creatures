import React, { useState } from 'react';
import cn from "classnames";
import Menu from '../Images/logo/menu.png';
import '../style/fab.style.css';
import { Link, useNavigate } from 'react-router-dom';
import Ubahn from '../Images/logo/ubahn.png';
import City from '../Images/logo/favicon.png';

function FabGroupHome({actions}) {

  const [open1, setOpen1] = useState(false);
  const redirectTo = useNavigate();

  const mouseEnter = () => setOpen1(true);
  const mouseLeave = () => setOpen1(false);

    return (
        <div className="fab-container-home">
            <div className="fab-button-home">
                <Link to="/city"><img src={City} alt="city" title="City" style={{ width: "70px", marginBottom: "15px" }} /></Link>
            </div>
            <div className="fab-button-home">
                <Link to="/city"><img src={Ubahn} alt="ubahn" title="Ubahn" style={{ width: "70px" }} /></Link>
            </div>
        </div>
    // <ul
    //   className="fab-container1"
    //   onMouseEnter={mouseEnter}
    //   onMouseLeave={mouseLeave}
    // >
    //   <li className="fab-button1">
    //     <img src={Menu} alt="menu" title="Menu" style={{width: "30px"}} />
    //   </li>
    //   <li className="fab-button1">
    //     <img src={Menu} alt="menu" title="Menu" style={{width: "30px"}} />
    //   </li>
    //   {/* {actions.map((action, index) => (
    //     <li
    //       style={{ transitionDelay: `${index * 25}ms` }}
    //       className={cn("fab-action1", { open1 })}
    //       key={action.label}
    //       onClick={() => {
    //         redirectTo(action.onClick);
    //       }}
    //     >
    //       {action.icon}
    //     </li>
    //   ))} */}
    // </ul>
  );
};
export default FabGroupHome