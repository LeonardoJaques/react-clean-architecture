import moviesApis from "../api/http";

export const getMovies = async () => {
    const response = await moviesApis.get('/movie/popular');
    return response.data;
}
export const getMovieById = async (id: string) => {
    const response = await moviesApis.get(`/movie/${id}`);
    return response.data;
}