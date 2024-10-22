import { fetchMovies, fetchMovieDetails } from './api.js';
import { renderMovies, renderMovieDetails } from './ui.js';

// 영화 목록 페이지
const popularEndpoint = '/movie/popular';
const nowPlayingEndpoint = '/movie/now_playing';
const topRatedEndpoint = '/movie/top_rated';
const currentPage = window.location.pathname.split('/').pop();

// index.html에서 영화 목록 가져오기
if (currentPage === 'index.html') {
    const popularContainer = document.getElementById('popular-movies');
    const nowPlayingContainer = document.getElementById('now-playing');
    const topRatedContainer = document.getElementById('top-rated');

    // 영화 목록을 비동기로 로드
    async function loadMovies() {
        const popularMovies = await fetchMovies(popularEndpoint);
        const nowPlayingMovies = await fetchMovies(nowPlayingEndpoint);
        const topRatedMovies = await fetchMovies(topRatedEndpoint);

        // UI에 영화 목록 표시
        renderMovies(popularMovies, popularContainer);
        renderMovies(nowPlayingMovies, nowPlayingContainer);
        renderMovies(topRatedMovies, topRatedContainer);
    }

    loadMovies();

    // 영화 카드에 대한 이벤트 위임 설정
    document.addEventListener('click', function (e) {
        if (e.target.closest('.movie')) {
            const movieEl = e.target.closest('.movie');
            const movieId = movieEl.getAttribute('data-id');
            window.location.href = `details.html?id=${movieId}`;
        }
    });
}

// 영화 상세 페이지
const searchParams = new URLSearchParams(window.location.search);
const movieId = searchParams.get('id');
if (currentPage === 'details.html' && movieId) {
    const movieDetailsContainer = document.getElementById('movie-details');

    // 영화 상세 정보 로드
    async function loadMovieDetails() {
        const movie = await fetchMovieDetails(movieId);

        // UI에 영화 상세 정보 표시
        renderMovieDetails(movie, movieDetailsContainer);
    }

    loadMovieDetails();
}

// 검색 기능 처리
const form = document.getElementById('form');
if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const searchTerm = document.getElementById('search_var').value;
        if (searchTerm) {
            window.location.href = `search.html?query=${searchTerm}`;
        }
    });
}
