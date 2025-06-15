import { useEffect, useState } from "react";
import { Link, useFetcher } from "react-router-dom";
import { isFavorite, toggleFavorite } from "../utils/favorite";

export default function MovieCard({movie})
{
    const [isFav, setIsFav] = useState(false);

    useEffect(() => {
        setIsFav(isFavorite(movie.id));
    }, [movie.id]);

    const handleFavorite = (event) => {
        event.preventDefault();
        toggleFavorite(movie.id);
        setIsFav(!isFav);
    }

    return (
        <Link to={`/movie/${movie.id}`} className="relative group bg-white shadow-2xl rounded-3xl overflow-hidden hover:scale-105 transition duration-200">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full object-cover"></img>

            <div className="p-2">
                <h2 className="text-lg font-semibold">{movie.title}</h2>
                <p className="text-md text-gray-5-600">{movie.release_date}</p>
            </div>
            <button className="absolute top-2 right-2 text-2xl hover:scale-125 transition duration-300" onClick={handleFavorite} title={isFav ? "Remove from favorites" : "Add to favorites"}>{isFav ? "❤️" : "🤍"}</button>
        </Link>
    )
}