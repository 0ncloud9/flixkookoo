const imgUrl = "https://image.tmdb.org/t/p/w1280";

/**
 * 영화 목록을 UI에 렌더링하는 함수
 * @param {Array} movies - 렌더링할 영화 목록 배열
 * @param {HTMLElement} container - 영화를 렌더링할 컨테이너 요소
 */
export function renderMovies(movies, container) {
    if (!movies || movies.length === 0) {
        console.warn('표시할 영화가 없습니다.');
        return;
    }

    // 이전 콘텐츠 초기화
    container.innerHTML = '';

    // 각 영화를 순회하며 카드 요소 생성
    movies.forEach(movie => {
        const { id, title, poster_path, vote_average, overview } = movie;

        const movieEl = document.createElement('a');
        movieEl.href = `details.html?id=${id}`;
        movieEl.dataset.id = id;

        // 영화 카드 생성
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

        // 링크 요소에 영화 카드 추가
        movieEl.appendChild(movieCard);

        // 컨테이너에 영화 카드 추가
        container.appendChild(movieEl);
    });
}

/**
 * 영화 평점에 따라 색상을 반환하는 함수
 * @param {number} vote
 * @returns {string}
 */
function getClassByRate(vote) {
    if (vote >= 8) return 'green';
    if (vote >= 5) return 'orange';
    return 'red';
}

/**
 * 영화 상세 정보를 UI에 렌더링
 * @param {Object} movie
 * @param {HTMLElement} container
 */
export function renderMovieDetails(movie, container) {
    // 영화 상세 정보 생성
    container.innerHTML = `
        <div class="detail-container">
            <div class="detail-poster">
                <img src="${imgUrl + movie.poster_path}" alt="${movie.title}">
            </div>
            <div class="detail-movie-info">
                <h1>${movie.title}</h1>
                <span class="${getClassByRate(movie.vote_average)}">${movie.vote_average}</span>
                <p class="release">Release Date: ${movie.release_date}</p>
                <p class="run-time">Runtime: ${movie.runtime} min</p>
                <p class="genre">Genres: ${movie.genres.map(genre => genre.name).join(', ')}</p>
                <div class="tagline">${movie.tagline}</div>
                <div class="overview">${movie.overview}</div>
            </div>
        </div>
    `;
}
