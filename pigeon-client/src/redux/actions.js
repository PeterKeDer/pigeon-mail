import { SET_MESSAGE_LIST, SET_USER_ID } from './actionTypes';

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
