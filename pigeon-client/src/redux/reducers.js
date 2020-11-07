import { SET_USER_ID } from './actionTypes';

const initialState = {
  userId: null,
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
    default: {
      return state;
    }
  }
};
