import axios from 'axios';

export const post = async formData => await axios({
    method: 'POST',
    url: `/api/user`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
    },
    data: formData
}).then(response => response.data);