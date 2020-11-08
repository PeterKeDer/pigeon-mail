import { SET_MESSAGE_LIST, SET_USER_ID, SET_LOCATION } from './actionTypes';

const initialState = {
  userId: null,
  messageList: [],
  location: {
    latitude: 0,
    longitude: 0
  }
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
    case SET_LOCATION: {
      const { location } = action.payload;
      return {
        ...state,
        location,
      };
    }
    default: {
      return state;
    }
  }
};
