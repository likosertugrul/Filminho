const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
    const response = await fetch(`${baseUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=1`);
    const data = await response.json();
    return data.results;
}

export const getMovieDetail = async (id) => {
    const res = await fetch(`${baseUrl}/movie/${id}?api_key=${apiKey}&language=en-US`);
    const data = await res.json();
    return data;
  }
  

  export const getMovieCredits = async (id) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`);
    const data = await response.json();
    return data;
  }

  export const searchMovies = async (query) => {
    const res = await fetch(
      `${baseUrl}/search/movie?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(
        query
      )}`
    );
    const data = await res.json();
    return data.results;
  }
  