import axios from "axios";
import i18n from "../i18n/i18n";

const API_KEY = import.meta.env.MOVIES_API_KEY || import.meta.env.VITE_MOVIES_API_KEY;

// Map i18n language codes to TMDB language codes
const tmdbLang = (lng: string) => (lng === 'en-US' ? 'en-US' : 'pt-BR');

const moviesApis = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
    },
});

// Inject language dynamically from current i18n setting on every request
moviesApis.interceptors.request.use((config) => {
    config.params = { ...config.params, language: tmdbLang(i18n.language) };
    return config;
});

export default moviesApis;