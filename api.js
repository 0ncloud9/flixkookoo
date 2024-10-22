const apiKey = "ade034bc79c85d587668c346b2fbcc23";
const apiBaseUrl = `https://api.themoviedb.org/3`;

/**
 * 영화 목록을 가져오는 함수
 * @param {string} endpoint
 * @returns {Promise<Array>}
 */
export async function fetchMovies(endpoint) {
    try {
        const res = await fetch(`${apiBaseUrl}${endpoint}?api_key=${apiKey}&language=en-US`);
        
        if (!res.ok) {
            throw new Error('API 요청 실패');
        }
        
        const data = await res.json();
        return data.results;
    } catch (error) {
        console.error('영화 목록을 불러오는 중 오류 발생:', error);
        throw error;
    }
}

/**
 * 영화 상세 정보를 가져오기
 * @param {number} movieId
 * @returns {Promise<Object>}
 */
export async function fetchMovieDetails(movieId) {
    try {
        // 영화 ID로 API 요청 보내기
        const res = await fetch(`${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}&language=en-US`);
        
        // 응답 상태 확인
        if (!res.ok) {
            throw new Error('영화 상세 정보 요청 실패');
        }
        
        // 결과를 JSON 형식으로 변환
        const movie = await res.json();
        return movie; // 영화 상세 정보 반환
    } catch (error) {
        console.error('영화 상세 정보를 불러오는 중 오류 발생:', error);
        throw error;
    }
}