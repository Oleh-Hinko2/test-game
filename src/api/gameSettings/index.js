import http from '../index';

export function getGameSettings(data) {
    return http.get('/game-settings', data)
        .then(response => response)
        .catch(error => error.response);
};
