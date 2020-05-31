import http from '../index';

export function fetchAllWinners() {
    return http.get('/winners')
        .then(response => response)
        .catch(error => error.response);
};

export function setWinners(data) {
    return http.post('/winners', data)
        .then(response => response)
        .catch(error => error.response);
};
