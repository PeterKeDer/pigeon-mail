import { SET_MESSAGE_LIST, SET_USER_ID } from './actionTypes';

const initialState = {
  userId: null,
  messageList: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER_ID: {
      const { userId } = action.payload;
      return {
        ...state,
        userId,
      };
    }
    case SET_MESSAGE_LIST: {
      const { messageList } = action.payload;
      return {
        ...state,
        messageList,
      };
    }
    default: {
      return state;
    }
  }
};
