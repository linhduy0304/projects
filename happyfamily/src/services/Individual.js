

import React from 'react';

let HTTP = require('./HTTP');
let URL = require('./URL');

//load
export function individual() {
    return HTTP.get(URL.individual);
}

//add
export function addIndividual(body) {
    return HTTP.postWithAuth(URL.individual, body);
}

export function relationships() {
    return HTTP.get(URL.relationships);
}

export function editIndividual(id) {
    return HTTP.get(URL.individual+'/'+id+'/edit');
}

export function updateIndividual(id, body) {
    return HTTP.postWithAuth(URL.individual+'/'+id+'/update', body);
}

export function deleteIndividual(id) {
    return HTTP.postWithAuth(URL.individual+'/'+id+'/destroy');
}

export function requestRelationship(body) {
    return HTTP.postWithAuth(URL.requestRelationship, body);
}

