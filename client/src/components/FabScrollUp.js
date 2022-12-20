import React from 'react';
import '../style/fab.style.css';
import Up from '../Images/icon/up.png';

const FabScrollUp = () => {

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <ul className="fab-container">
            <li className="fab-button-scroll" onClick={scrollUp}>
                <img src={Up} alt="up" title="Scroll up" style={{ width: "30px" }} />
            </li>
        </ul>
  );
};

export default FabScrollUp;