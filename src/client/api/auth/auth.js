import axios from 'axios';

const auth = {
    post: async formData => await axios({
        method: 'POST',
        url: `/api/auth`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data: formData
    }).then(response => response.data),
    get: async () => await axios({
        method: 'GET',
        url: `/api/auth`
    }).then(response => response.data),
    put: async () => await axios({
        
    }).then(response => response.data),
    delete: async () => await axios({
        method: 'DELETE',
        url: `/api/auth`
    }).then(response => response.data)
}

export default auth;