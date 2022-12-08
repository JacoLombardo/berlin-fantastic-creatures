import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Favourite from './Favourite';

function Favourites() {

  const [favourites, setFavourites] = useState(null);
  const { user } = useContext(AuthContext);

  const getFavourites = async (myFav) => {
    try {
      const favouritesArray = await Promise.all(
        myFav.map(async (id) => {
          const responses = await fetch(`http://localhost:5000/posts/personal?_id=${id}`);
          const results = await responses.json();
          return results;
        })
      );
      setFavourites(favouritesArray);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  useEffect(() => {
    if (user.favourites) {
      getFavourites(user.favourites);
    }
  }, [user]);

  return (
      <>
        <div className="personalPostsDiv">
        {favourites && user.favourites.length > 0 ?
          favourites.map((favourite, index) => {
            return <Favourite key={index} favourite={favourite} />
          })
          :<p style={{fontStyle: "italic"}}>No favourites yet</p>}
        </div>
      </>
  )
}

export default Favourites