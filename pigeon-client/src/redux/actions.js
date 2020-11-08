import { SET_MESSAGE_LIST, SET_USER_ID, SET_LOCATION } from './actionTypes';

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

export const setLocation = location => ({
  type: SET_LOCATION,
  payload: {
    location,
  },
});
