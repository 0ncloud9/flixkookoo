const apiKey = "ade034bc79c85d587668c346b2fbcc23";
const apiBaseUrl = `https://api.themoviedb.org/3`;

// 영화 목록을 가져rl
export async function getMovies(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data.results;
    } catch (error) {
        console.error('영화 데이터를 불러오는 중 오류 발생:', error);
        throw error;
    }
}

// 영화 상세 정보를 가져오기
export async function getMovieDetails(url) {
    try {
        const res = await fetch(url);
        const movie = await res.json();
        return movie;
    } catch (error) {
        console.error('영화 상세 정보를 불러오는 중 오류 발생:', error);
        throw error;
    }
}
