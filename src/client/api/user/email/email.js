import axios from 'axios';

const email = {
    post: async () => await axios({

    }).then(response => response.data),
    get: async email => await axios({
        method: 'GET',
        url: `/api/user/email?email=${encodeURIComponent(email)}`
    }).then(response => response.data),
    put: async () => await axios({

    }).then(response => response.data),
    delete: async () => await axios({

    }).then(response => response.data)
}

export default email;