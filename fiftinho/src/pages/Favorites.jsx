import { useEffect, useState } from "react";
import { getFavorites } from "../utils/favorite";
import { getMovieDetail } from "../services/tmdb";
import MovieCard from "../components/MovieCard";

export default function Favorites()
{
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const ids = getFavorites();
        Promise.all(ids.map(getMovieDetail)).then(setMovies);
    }, []);


    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-4">Favorites</h1>
            {movies.length === 0 ? (
                <p>No Favorites</p>
            ): (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">{movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie}></MovieCard>
                ))}</div>
            )}
        </div>
    )
}