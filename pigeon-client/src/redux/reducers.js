import { SET_MESSAGE_LIST, SET_USER_ID, SET_STATION_ID, SET_PIGEON_LIST } from './actionTypes';

const initialState = {
  userId: null,
  messageList: [],
  stationId: null,
  pigeonList: [],
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
    case SET_STATION_ID:
      const { stationId } = action.payload;
      return {
        ...state,
        stationId,
      };
    case SET_PIGEON_LIST:
      const { pigeonList } = action.payload;
      return {
        ...state,
        pigeonList,
      }
    default: {
      return state;
    }
  }
};
