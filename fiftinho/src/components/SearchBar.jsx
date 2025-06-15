import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 bg-white border border-gray-300 shadow-lg rounded-full px-4 py-2 max-w-md mx-auto"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Movie ..."
        className="flex-1 outline-none px-3 py-2 rounded-full text-sm text-gray-800 placeholder-gray-400 focus:ring-3 focus:ring-blue-600 transition "
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-full transition duration-200"
      >
        Search
      </button>
    </form>
  );
}
