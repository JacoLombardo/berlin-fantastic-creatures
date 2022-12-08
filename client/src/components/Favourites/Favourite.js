import React from 'react';
import { HashLink } from 'react-router-hash-link';

function Favourite({favourite}) {
  return (
      <>
      {favourite[0].category === "ubahn" ?
        < HashLink to={`/ubahn/#${favourite[0]._id}`}>
          <div className="personalPostDiv">
            <img src={favourite[0].img} alt="post-pic" className="personalPostImg" />
            <p className="personalPostDate">{favourite[0].date}</p>
          </div>
        </HashLink>
        :
        <HashLink to={`/city/#${favourite[0]._id}`}>
          <div className="personalPostDiv">
            <img src={favourite[0].img} alt="post-pic" className="personalPostImg" />
            <p className="personalPostDate">{favourite[0].date}</p>
          </div>
        </HashLink>
      }
      </>
  )
}

export default Favourite