import { Link, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function NavBar()
{
    const location = useLocation();

    const isActive = (path) =>
    location.pathname === path
      ? "text-blue-500 font-semibold"
      : "text-gray-700 hover:text-blue-500";

    return (
      <nav className="bg-gradient-to-r from-blue-300 to-slate-300 shadow-2xl px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-3xl m-4">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <Link to="/" className="text-2xl font-bold text-blue-700">
          🎬 Filminho
        </Link>
        <div className="flex space-x-4">
          <Link to="/" className={isActive("/")}>
            Home
          </Link>
          <Link to="/favorites" className={isActive("/favorites")}>
            Favorites
          </Link>
        </div>
      </div>

      {/* SearchBar */}
      <div className="w-full md:w-auto">
        <SearchBar />
      </div>
    </nav>
    )
}