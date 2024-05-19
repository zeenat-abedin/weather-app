import React, { useState } from 'react'
import './Favorites.css'

function Favorites({ getWeather }) { 
   const [favorites, setFavorites] = useState([]);
   const [newLocationName, setNewLocationName] = useState('');

   function addFavoriteLocation(name) {
  // Assuming you have a way to convert the name to latitude and longitude
          
    getWeather(name).then(({ lat, lon }) => {
      setFavorites([...favorites, { name: newLocationName, lat, lon }]);
      setNewLocationName('');
    });
   }
    
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
