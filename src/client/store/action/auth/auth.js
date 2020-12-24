/* constant */
export const POST = 'auth/POST';
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
    put: () => {
        return {
            type: PUT
        }
    },
    delete: () => {
        return {
            type: DELETE
        }
    }
}