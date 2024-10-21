const apiKey = "ade034bc79c85d587668c346b2fbcc23";
const imgUrl = "https://image.tmdb.org/t/p/w1280";
const searchBaseUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=`;

// API URLs for 인기 영화, 현재 상영 중, 상위 평가 영화
const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
const nowUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;
const topUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`;

// 현재 페이지 이름 가져오기
const currentPage = window.location.pathname.split('/').pop();

// index.html에서 영화 목록 불러오기
if (currentPage === 'index.html') {
    loadStoredMovies();  // 저장된 영화 목록 상태 복원
    getMovies(popularUrl, document.getElementById('popular-movies'));
    getMovies(nowUrl, document.getElementById('now-playing'));
    getMovies(topUrl, document.getElementById('top-rated'));
}

// search.html에서 검색 결과 처리
const searchParams = new URLSearchParams(window.location.search);
const searchQuery = searchParams.get('query');

if (searchQuery) {
    document.getElementById('search-term').textContent = searchQuery;
    const searchUrl = `${searchBaseUrl}${encodeURIComponent(searchQuery)}`;
    searchMovies(searchUrl);
}

// details.html에서 영화 상세 정보 불러오기
const movieId = searchParams.get('id');
if (currentPage === 'details.html' && movieId) {
    const detailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;
    getMovieDetails(detailsUrl);
    addDismissButtonListener();  // 닫기 버튼에 이벤트 리스너 추가
}

// API에서 영화 데이터를 가져오는 함수
async function getMovies(url, container) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        showMovies(data.results, container);  // 영화 목록 화면에 표시
        saveMoviesToStorage(data.results, url);  // 영화 목록을 세션에 저장
    } catch (error) {
        console.error('영화 데이터를 불러오는 중 오류 발생:', error);
    }
}

// 영화 목록을 화면에 표시하고, 영화 클릭 시 details.html로 이동하는 함수
function showMovies(movies, container) {
    container.innerHTML = '';  // 이전 내용을 초기화
    movies.forEach(movie => {
        const { id, title, poster_path, vote_average, overview } = movie;

        const movieEl = document.createElement('a');
        // 영화 상세 정보 페이지로 이동하는 경로 설정
        movieEl.href = `details.html?id=${id}`;

        const movieCard = document.createElement('div');
        movieCard.classList.add('movie');
        movieCard.innerHTML = `
            <img src="${imgUrl + poster_path}" alt="${title}">
            <div class="movie_info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">(${vote_average})</span>
                <p>${overview}</p>
            </div>
        `;

        movieEl.appendChild(movieCard);
        container.appendChild(movieEl);
    });
}

// 영화 검색 결과를 표시하는 함수
async function searchMovies(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        const searchResultsContainer = document.getElementById('search-results');
        showMovies(data.results, searchResultsContainer);  // 검색 결과를 영화 목록으로 표시
    } catch (error) {
        console.error('검색 결과를 불러오는 중 오류 발생:', error);
    }
}

// 영화 상세 정보를 가져와서 표시하는 함수
async function getMovieDetails(url) {
    try {
        const res = await fetch(url);
        const movie = await res.json();
        displayMovieDetails(movie);  // 영화 상세 정보 화면에 표시
    } catch (error) {
        console.error('영화 상세 정보를 불러오는 중 오류 발생:', error);
    }
}

// 영화 상세 정보를 화면에 표시하는 함수
function displayMovieDetails(movie) {
    const movieDetailsContainer = document.getElementById('movie-details');
    movieDetailsContainer.innerHTML = `
        <div class="detail-container">
            <div class="detail-poster">
                <img src="${imgUrl + movie.poster_path}" alt="${movie.title}">
            </div>
            <div class="detail-movie-info">
                <h1>${movie.title}</h1>
                <span class="${getClassByRate(movie.vote_average)}">(${movie.vote_average})</span>
                <p class="release">${movie.release_date}</p>
                <p class="run-time">${movie.runtime} min</p>
                <p class="genre">${movie.genres.map(genre => genre.name).join(', ')}</p>
                <div class="tagline">"${movie.tagline}"</div>
                <div class="overview">${movie.overview}</div>
            </div>
        </div>
    `;
}

// 평점에 따라 색상을 설정하는 함수
function getClassByRate(vote) {
    if (vote >= 8) return 'green';
    if (vote >= 5) return 'orange';
    return 'red';
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
    document.querySelectorAll('#a').forEach(function(element) {
        element.addEventListener('click', function(event) {
            event.preventDefault();
            alert("Coming Soon...!");
        });
    });
}
// DOM이 로드되면 함수 실행
document.addEventListener('DOMContentLoaded', alertComingSoon);


