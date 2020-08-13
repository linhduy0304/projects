

import React from 'react';

let HTTP = require('./HTTP');
let URL = require('./URL');

//editEvent
export function editEvent(body, id) {
  return HTTP.postWithAuth(`${URL.url}event/${id}/update`, body);
}
//delete
export function deleteEvent(slug) {
  return HTTP.postWithAuth(`${URL.url}event/${slug}/destroy`, {});
}
//load
export function event(date) {
  return HTTP.get(`${URL.url}events?time_event=${date}`);
}

//add event
export function addEvent(body) {
  return HTTP.postWithAuth(`${URL.url}events`, body);
}

export function loadDataCreateEvent(event_type) {
  return HTTP.get(`${URL.url}events/create?type=${event_type}`);
}

export function loadDataEditEvent(id, event_type) {
  console.log(`${URL.url}events/${id}/edit?type=${event_type}`);
  return HTTP.get(`${URL.url}events/${id}/edit?type=${event_type}`);
}
