/* constant */
export const POST = 'auth/POST';
export const GET = 'auth/GET';
export const PUT = 'auth/PUT';
export const DELETE = 'auth/DELETE';

/* action */
export const action = {
    post: (email, userName) => {
        return {
            type: POST,
            payload: {
                isLoggedIn: true,
                email: email,
                userName: userName
            }
        }
    },
    get: () => {
        return {
            type: GET,
            payload: {}
        }
    },
    put: () => {
        return {
            type: PUT,
            payload: {}
        }
    },
    delete: () => {
        return {
            type: DELETE,
            payload: {
                isLoggedIn: false,
                email: '',
                userName: ''
            }
        }
    }
}