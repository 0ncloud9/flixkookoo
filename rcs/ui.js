const imgUrl = "https://image.tmdb.org/t/p/w1280";

// 영화 목록을 화면에 표시하고, 영화 클릭 시 상세페이지로 이동
export function showMovies(movies, container) {
    container.innerHTML = '';
    movies.forEach(movie => {
        const { id, title, poster_path, vote_average, overview } = movie;

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.setAttribute('data-id', id);

        movieEl.innerHTML = `
            <img src="${imgUrl + poster_path}" alt="${title}">
            <div class="movie_info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">(${vote_average})</span>
                <p>${overview}</p>
            </div>
        `;

        container.appendChild(movieEl);
    });
}

// 영화 상세 정보를 화면에 표시
export function displayMovieDetails(movie, container) {
    container.innerHTML = `
        <div class="detail-container">
            <div class="detail-poster">
                <img src="${imgUrl + movie.poster_path}" alt="${movie.title}">
            </div>
            <div class="detail-movie-info">
                <h1>${movie.title}</h1>
                <span class="${getClassByRate(movie.vote_average)}">${movie.vote_average}</span>
                <p class="release">${movie.release_date}</p>
                <p class="run-time">${movie.runtime} min</p>
                <p class="genre">${movie.genres.map(genre => genre.name).join(', ')}</p>
                <div class="tagline">"${movie.tagline}"</div>
                <div class="overview">${movie.overview}</div>
            </div>
        </div>
    `;
}

// 평점에 따라 색상을 설정
function getClassByRate(vote) {
    if (vote >= 8) return 'green';
    if (vote >= 5) return 'orange';
    return 'red';
}
