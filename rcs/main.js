import { getMovies, getMovieDetails } from './api.js';
import { showMovies, displayMovieDetails } from './ui.js';

const searchBaseUrl = `https://api.themoviedb.org/3/search/movie?api_key=ade034bc79c85d587668c346b2fbcc23&language=en-US&query=`;
const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=ade034bc79c85d587668c346b2fbcc23&language=en-US&page=1`;
const nowUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=ade034bc79c85d587668c346b2fbcc23&language=en-US&page=1`;
const topUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=ade034bc79c85d587668c346b2fbcc23&language=en-US&page=1`;

const currentPage = window.location.pathname.split('/').pop();

// 메인페이지 영화 목록 불러오기
if (currentPage === 'index.html') {
    getMovies(popularUrl).then(data => showMovies(data, document.getElementById('popular-movies')));
    getMovies(nowUrl).then(data => showMovies(data, document.getElementById('now-playing')));
    getMovies(topUrl).then(data => showMovies(data, document.getElementById('top-rated')));

    document.addEventListener('click', function (event) {
        const movieEl = event.target.closest('.movie');
        if (movieEl) {
            const movieId = movieEl.getAttribute('data-id');
            if (movieId) {
                window.location.href = `details.html?id=${movieId}`;
            }
        }
    });
}

// 검색 결과 처리 및 영화 클릭 시 상세 페이지로 이동
if (currentPage === 'search.html') {
    const searchParams = new URLSearchParams(window.location.search);
    const searchQuery = searchParams.get('query');
    if (searchQuery) {
        document.getElementById('search-term').textContent = searchQuery;
        const searchUrl = `${searchBaseUrl}${encodeURIComponent(searchQuery)}`;
        getMovies(searchUrl).then(data => showMovies(data, document.getElementById('search-results')));
    }

    // 이벤트 위임
    document.addEventListener('click', function (event) {
        const movieEl = event.target.closest('.movie');
        if (movieEl) {
            const movieId = movieEl.getAttribute('data-id');
            if (movieId) {
                window.location.href = `details.html?id=${movieId}`;
            }
        }
    });
}

// 영화 상세 정보 처리
if (currentPage === 'details.html') {
    const searchParams = new URLSearchParams(window.location.search);
    const movieId = searchParams.get('id');

    if (movieId) {
        const detailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=ade034bc79c85d587668c346b2fbcc23&language=en-US`;
        
        getMovieDetails(detailsUrl).then(movie => {
            if (movie) {
                displayMovieDetails(movie, document.getElementById('movie-details'));
                handleLikeButton(movie);
            } else {
                console.error('영화 정보를 가져올 수 없습니다.');
            }
        }).catch(error => {
            console.error('영화 상세 정보를 가져오는 중 오류 발생:', error);
        });
    } else {
        console.error('URL에서 영화 ID를 가져올 수 없습니다.');
    }

    // 뒤로 가기 기능
    const dismissButton = document.getElementById('dismiss-btn');
    dismissButton.addEventListener('click', () => {
        window.history.back();
    });
}

// 좋아요 버튼 기능
function handleLikeButton(movie) {
    const likeButton = document.getElementById('like-btn');
    likeButton.addEventListener('click', function () {
        addToLikedMovies(movie);
    });
}

// 좋아요한 영화 로컬 저장소에 추가
function addToLikedMovies(movie) {
    const likedMovies = JSON.parse(localStorage.getItem('likedMovies')) || [];
    const isAlreadyLiked = likedMovies.some(likedMovie => likedMovie.id === movie.id);

    if (!isAlreadyLiked) {
        likedMovies.push(movie);
        localStorage.setItem('likedMovies', JSON.stringify(likedMovies));
        alert(`${movie.title}이(가) 내가 찜한 영화 목록에 추가되었습니다.`);
    } else {
        alert(`${movie.title}은(는) 이미 내가 찜한 영화 목록에 있습니다.`);
    }
}

// 좋아요한 영화 목록 표시
if (currentPage === 'like.html') {
    const likedMovies = JSON.parse(localStorage.getItem('likedMovies')) || [];
    if (likedMovies.length > 0) {
        showMovies(likedMovies, document.getElementById('liked-movies'));
    } else {
        document.getElementById('liked-movies').innerHTML = '<div><h3>내가 찜한 영화가 없습니다.</h3></div>';
    }
}

// 미구현 기능 알림
const alertComingSoon = document.getElementById('a');
alertComingSoon.addEventListener('click', () => {
    alert("Coming Soon");
});
