import axios from 'axios';

const constants = {
    api: {
        baseURL: 'https://silly-votes-api.azure-api.net/silly-votes-campaigns/'
    },
};

export default axios.create({
    baseURL: constants.api.baseURL,
    headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    }
});