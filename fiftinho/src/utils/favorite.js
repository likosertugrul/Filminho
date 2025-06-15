const favoritesKey = "favorite_movies";

export function getFavorites()
{
    return JSON.parse(localStorage.getItem(favoritesKey)) || [];
}

export function isFavorite(id) 
{
    return getFavorites().includes(id);
}

export function toggleFavorite(id)
{
    const current = getFavorites();
    const updated = current.includes(id) ? current.filter((movieID) => movieID !== id) : [...current, id];
    
    localStorage.setItem(favoritesKey, JSON.stringify(updated)); 
}