import React from 'react';
import '../style/fab.style.css';
import { Link } from 'react-router-dom';
import Ubahn from '../Images/logo/ubahn.png';
import City from '../Images/logo/favicon.png';

function FabGroupHome() {

    return (
        <div className="fab-container-home">
            <div className="fab-button-home">
                <Link to="/city"><img src={City} alt="city" title="City" style={{ width: "70px", marginBottom: "15px" }} /></Link>
            </div>
            <div className="fab-button-home">
                <Link to="/city"><img src={Ubahn} alt="ubahn" title="Ubahn" style={{ width: "70px" }} /></Link>
            </div>
        </div>
  );
};
export default FabGroupHome