const API_KEY = "ebc795444944ae46fa639cc55b79ded3";

const imageBase = "https://image.tmdb.org/t/p/w500";
const imageLargeBase = "https://image.tmdb.org/t/p/w1280";

const requests = {
  searchQuery: `/search/multi?api_key=${API_KEY}&language=en-US&page=1&include_adult=false`,
  fetchGenres: `/genre/movie/list?api_key=${API_KEY}&language=en-US`,
  fetchPopularMovies: `/movie/popular?api_key=${API_KEY}&language=en-US`,
  fetchTopRatedMovies: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchTrendingMovies: `/trending/movie/week?api_key=${API_KEY}`,
  fetchTrendingTV: `/trending/tv/week?api_key=${API_KEY}`,
};
const fetchMovie = (id) => {
  return `/movie/${id}?api_key=${API_KEY}&append_to_response=videos,release_dates`
}
const fetchTV = (id) => {
  return `/tv/${id}?api_key=${API_KEY}&append_to_response=videos,content_ratings`
}
const fetchSearchString = (query) => {
  let queryString = encodeURIComponent(query);
  return `/search/multi?api_key=${API_KEY}&language=en-US&query=${queryString}&page=1&include_adult=false`
}
const fetchRecommendedMovies = (id) => {
  return `/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`
}
const fetchRecommendedTV = (id) => {
  return `/tv/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`
}
const fetchSimilarMovies = (id) => {
  return `/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`
}
const fetchSimilarTV = (id) => {
  return `/tv/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`
}

export { imageLargeBase, imageBase, fetchMovie, fetchTV, fetchSearchString, fetchRecommendedMovies, fetchRecommendedTV, fetchSimilarMovies, fetchSimilarTV };
export default requests;