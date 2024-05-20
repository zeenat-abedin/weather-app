import React, { useEffect, useState } from 'react'
import { getWeather } from "../utils/helpers";
import './Favorites.css'

function Favorites() { 
   const [favorites, setFavorites] = useState([]);
   const [newLocationName, setNewLocationName] = useState('');
   const [isLoading, setIsLoading] = useState(false);
    
   useEffect(() => {
    console.log(favorites);
  }, [favorites]);

   function addFavoriteLocation(name) {          
    getWeather(name).then(data => {
      const { lat, lon } = data;
      setFavorites([...favorites, { name: newLocationName, lat, lon }]);
      setNewLocationName('');
      setIsLoading(false); 
    }).catch(error => {
    console.error("Failed to add location:", error);
    setIsLoading(false); 
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
            <button onClick={() => addFavoriteLocation(newLocationName)}>Add as Favorite</button>
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
