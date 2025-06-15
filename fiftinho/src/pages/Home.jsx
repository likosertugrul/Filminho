import { useEffect, useState } from "react"
import { getPopularMovies } from "../services/tmdb";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";




function Home()
{
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getPopularMovies().then(setMovies);
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-3xl font-semibold mb-6">Populer Movies</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    )
}

export default Home