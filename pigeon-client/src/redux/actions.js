import { SET_MESSAGE_LIST, SET_USER_ID, SET_STATION_ID, SET_PIGEON_LIST } from './actionTypes';

export const setUserId = userId => ({
  type: SET_USER_ID,
  payload: {
    userId,
  },
});

export const setMessageList = messageList => ({
  type: SET_MESSAGE_LIST,
  payload: {
    messageList,
  },
});

export const setStationId = stationId => ({
  type: SET_STATION_ID,
  payload: {
    stationId,
  },
});

export const setPigeonList = pigeonList => ({
  type: SET_PIGEON_LIST,
  payload: {
    pigeonList,
  },
})
