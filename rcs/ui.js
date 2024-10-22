const imgUrl = "https://image.tmdb.org/t/p/w1280";

// 영화 목록을 화면에 표시하고, 영화 클릭 시 details.html로 이동하는 함수
export function showMovies(movies, container) {
    container.innerHTML = '';  // 이전 내용을 초기화
    movies.forEach(movie => {
        const { id, title, poster_path, vote_average, overview } = movie;

        const movieEl = document.createElement('a');
        movieEl.href = `details.html?id=${id}`;  // 영화 상세 정보 페이지로 이동하는 경로 설정

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

// 영화 상세 정보를 화면에 표시하는 함수
export function displayMovieDetails(movie, container) {
    container.innerHTML = `
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
