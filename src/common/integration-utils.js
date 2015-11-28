'use strict';

let debug = false;

export function unwrapResponse(response) {
    return response.data;
}

export function logResponse(response) {
    if (debug) {
        console.log(response);
    }
    return response;
}

export function logRejection(rejection) {
    console.log(rejection);
}