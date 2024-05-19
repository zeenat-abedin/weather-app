import React, { useState } from 'react'
import { getWeather } from "../utils/helpers";
import './Favorites.css'

function Favorites() { 
   const [favorites, setFavorites] = useState([]);
   const [newLocationName, setNewLocationName] = useState('');

   function addFavoriteLocation(name) {          
    getWeather(name).then(({ lat, lon }) => {
      setFavorites([...favorites, { name: newLocationName, lat, lon }]);
      setNewLocationName('');
    });
   }
    
    console.log(favorites)
  return (
    <div className="favorites">
        <form onSubmit={(e) => e.preventDefault()}>
            <input
                type="text"
                value={newLocationName}
                onChange={(e) => setNewLocationName(e.target.value)}
                placeholder="Enter location name"
            />
            <button onClick={addFavoriteLocation}>Add as Favorite</button>
        </form>
        <ul>
          {favorites.map((favorite, index) => (
            <li key={index}>
            <h4>{favorite.name}</h4>
                {/* Display weather for this favorite location */}
            </li>
            ))}
        </ul>
    </div>
  )
}

export default Favorites
