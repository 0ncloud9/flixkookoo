import { getMovies, getMovieDetails } from './api.js';
import { showMovies, displayMovieDetails } from './ui.js';

const searchBaseUrl = `https://api.themoviedb.org/3/search/movie?api_key=ade034bc79c85d587668c346b2fbcc23&language=en-US&query=`;
const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=ade034bc79c85d587668c346b2fbcc23&language=en-US&page=1`;
const nowUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=ade034bc79c85d587668c346b2fbcc23&language=en-US&page=1`;
const topUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=ade034bc79c85d587668c346b2fbcc23&language=en-US&page=1`;

// 현재 페이지 이름 가져오기
const currentPage = window.location.pathname.split('/').pop();

// index.html에서 영화 목록 불러오기
if (currentPage === 'index.html') {
    loadStoredMovies();  // 저장된 영화 목록 상태 복원
    getMovies(popularUrl).then(data => showMovies(data, document.getElementById('popular-movies')));
    getMovies(nowUrl).then(data => showMovies(data, document.getElementById('now-playing')));
    getMovies(topUrl).then(data => showMovies(data, document.getElementById('top-rated')));
}

// search.html에서 검색 결과 처리
const searchParams = new URLSearchParams(window.location.search);
const searchQuery = searchParams.get('query');
if (searchQuery) {
    document.getElementById('search-term').textContent = searchQuery;
    const searchUrl = `${searchBaseUrl}${encodeURIComponent(searchQuery)}`;
    getMovies(searchUrl).then(data => showMovies(data, document.getElementById('search-results')));
}

// details.html에서 영화 상세 정보 불러오기
const movieId = searchParams.get('id');
if (currentPage === 'details.html' && movieId) {
    const detailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=ade034bc79c85d587668c346b2fbcc23&language=en-US`;
    getMovieDetails(detailsUrl).then(movie => displayMovieDetails(movie, document.getElementById('movie-details')));
    addDismissButtonListener();  // 닫기 버튼에 이벤트 리스너 추가
}

// 닫기 버튼에 이벤트 리스너를 추가하는 함수
function addDismissButtonListener() {
    const dismissButton = document.getElementById('dismiss-btn');
    dismissButton.addEventListener('click', function () {
        window.history.back();  // 이전 페이지로 돌아가기
    });
}

// 현재 영화 목록을 sessionStorage에 저장하는 함수
function saveMoviesToStorage(movies, url) {
    const movieData = { movies, url };
    sessionStorage.setItem('movieList', JSON.stringify(movieData));
}

// sessionStorage에서 저장된 영화 목록을 불러오는 함수
function loadStoredMovies() {
    const movieData = JSON.parse(sessionStorage.getItem('movieList'));
    if (movieData) {
        const containerMap = {
            [popularUrl]: document.getElementById('popular-movies'),
            [nowUrl]: document.getElementById('now-playing'),
            [topUrl]: document.getElementById('top-rated'),
        };
        showMovies(movieData.movies, containerMap[movieData.url]);
    }
}

// 모든 페이지에서 검색 기능을 처리하는 함수
const form = document.getElementById('form');
if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();  // 페이지 새로고침 방지
        const searchTerm = document.getElementById('search_var').value;
        if (searchTerm) {
            window.location.href = `search.html?query=${searchTerm}`;  // 검색 결과 페이지로 이동
        }
    });
}

//준비중 알림
function alertComingSoon() {
    document.querySelectorAll('#a').forEach(function (element) {
        element.addEventListener('click', function (event) {
            event.preventDefault();
            alert("Coming Soon...!");
        });
    });
}
// DOM이 로드되면 함수 실행
document.addEventListener('DOMContentLoaded', alertComingSoon);
