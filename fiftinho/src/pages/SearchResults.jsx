import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchMovies } from "../services/tmdb";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResults() {
  const query = useQuery().get("q");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      searchMovies(query).then(setResults);
    }
  }, [query]);

  if (!query) return <div className="p-4">Arama sorgusu yok.</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">"{query}" için sonuçlar</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {results.map((movie) => (
          <Link
            to={`/movie/${movie.id}`}
            key={movie.id}
            className="bg-white shadow rounded-3xl overflow-hidden hover:scale-105 transition"
          >
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://via.placeholder.com/500x750?text=No+Image"
              }
              alt={movie.title}
              className="w-full h-72 object-cover"
            />
            <div className="p-2">
              <h2 className="text-sm font-medium">{movie.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
