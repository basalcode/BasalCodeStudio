import axios from 'axios';

const auth = {
    post: async () => await axios({

    }).then(response => response.data),
    get: async formData => await axios({
        method: 'get',
        url: `/api/auth?email=${encodeURIComponent(formData.email)}&password=${encodeURIComponent(formData.password)}`,
    }).then(response => response.data),
    put: async () => await axios({

    }).then(response => response.data),
    delete: async () => await axios({

    }).then(response => response.data)
}

export default auth;