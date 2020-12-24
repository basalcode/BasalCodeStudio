import axios from 'axios';

const user = {
    post: async formData => await axios({
        method: 'POST',
        url: `/api/user`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data: formData
    }).then(response => response.data),
    get: async () => await axios({

    }).then(response => response.data),
    put: async () => await axios({

    }).then(response => response.data),
    delete: async () => await axios({

    }).then(response => response.data)
}

export default user;