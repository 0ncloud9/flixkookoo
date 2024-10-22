const apiKey = "ade034bc79c85d587668c346b2fbcc23";
const apiBaseUrl = `https://api.themoviedb.org/3`;
const imgUrl = "https://image.tmdb.org/t/p/w1280";

// API에서 영화 데이터를 가져오는 함수
export async function getMovies(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data.results;  // 영화 목록 반환
    } catch (error) {
        console.error('영화 데이터를 불러오는 중 오류 발생:', error);
        throw error;
    }
}

// 영화 상세 정보를 가져오는 함수
export async function getMovieDetails(url) {
    try {
        const res = await fetch(url);
        const movie = await res.json();
        return movie;  // 영화 상세 정보 반환
    } catch (error) {
        console.error('영화 상세 정보를 불러오는 중 오류 발생:', error);
        throw error;
    }
}
