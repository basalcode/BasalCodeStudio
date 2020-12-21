import type from '~/../../shared/typeValidation';

const responseHandler = (response, resolveCallback, rejectCallback) => {
    if (response.statusCode === 200) {
        if (type.isFunction(resolveCallback)) {
            resolveCallback();
            return;
        }
        alert('요청 처리에 성공했습니다.');
        return;
    } else {
        if (type.isFunction(rejectCallback)) {
            rejectCallback();
        } else {
            switch (response.statusCode) {
                case 400:
                    if (type.isFunction(rejectCallback[400])) {
                        rejectCallback[400]();
                        break;
                    }
                    alert('잘못된 값이 입력되었습니다. 다시 시도해주세요.');
                    break;
                case 401:
                    if (type.isFunction(rejectCallback[401])) {
                        rejectCallback[401]();
                        break;
                    }
                    alert('요청 권한이 없습니다.');
                    break;
                case 404:
                    if (type.isFunction(rejectCallback[404])) {
                        rejectCallback[404]();
                        break;
                    }
                    alert('찾을 수 없는 요청입니다.');
                    break;
                case 500:
                    if (type.isFunction(rejectCallback[500])) {
                        rejectCallback[500]();
                        break;
                    }
                    alert('서버에서 요청을 처리할 수 없습니다. 관리자에게 문의해주세요.');
                    break;
                default:
                    alert('응답 상태를 확인할 수 없습니다. 서버 관리자에게 문의해주세요.');
                    break;
            }
        }
    }
}

export default responseHandler;