import axios from 'axios';

export const get = async email => await axios({
    method: 'GET',
    url: `/api/user/email?email=${email}`
}).then(response => {
    console.log('response', response);
}).catch(error => { 
    console.log(error);
}).finally(() => {

});