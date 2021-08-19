import wornService from '../services/worns'

const initialState = {}

const WORNS_BY_DATE_LOADED = 'worns/wornsByDateLoaded';

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case WORNS_BY_DATE_LOADED: {
      console.log("keke", action.payload)
      return action.payload
    }
    default:
      return state
  }
}

export async function fetchWornsByDate(dispatch, getState) {
  const response = await wornService.getWornsByDate(getState().session.user.token);
  dispatch({ type: WORNS_BY_DATE_LOADED, payload: response })
}