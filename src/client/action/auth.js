import { LOGIN } from '../constant/auth';

export const login = (isLoggedIn) => {
    return {
        type: LOGIN,
        payload: isLoggedIn
    }
}