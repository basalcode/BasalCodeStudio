const responseHandler = (response, callback = { 200: null, 400: null, 401: null, 404: null, 500: null }) => {
    switch (response.statusCode) {
        case 200:
            if (callback[200]) {
                callback[200]();
                break;
            }
            alert('성공했습니다.');
            break;
        case 400:
            if (callback[400]) {
                callback[400]();
                break;
            }
            alert('잘못된 값이 입력되었습니다. 다시 시도해주세요.');
            break;
        case 401:
            if (callback[401]) {
                callback[401]();
                break;
            }
            alert('요청 권한이 없습니다.');
            break;
        case 404:
            if (callback[404]) {
                callback[404]();
                break;
            }
            alert('찾을 수 없는 요청입니다.');
            break;
        case 500:
            if (callback[500]) {
                callback[500]();
                break;
            }
            alert('서버에서 요청을 처리할 수 없습니다. 관리자에게 문의해주세요.');
            break;
        default:
            alert('응답 상태를 확인할 수 없습니다. 관리자에게 문의해주세요.');
            break;
    }
}

export default responseHandler;