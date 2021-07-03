import outfitsService from '../services/outfits'
import getWeather from '../services/weather';
import wornService from '../services/worns'

const initialState = []

const OUTFITS_LOADED = 'outfit/outfitsLoaded';
const OUTFIT_REMOVED = 'outfit/outfitRemoved';
const OUTFIT_ADDED = 'outfit/outfitAdded';
const TOGGLE_WEAR_OUTFIT = 'outfit/wearOufit';

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case OUTFITS_LOADED: {
      return action.payload
    }
    case OUTFIT_REMOVED: {
      return state.filter((outfit) => outfit.id !== action.payload);
    }
    case OUTFIT_ADDED: {
      console.log("OUTFIT_ADDDDDED", Object.keys(action.payload))
      return [action.payload, ...state];
    }
    case TOGGLE_WEAR_OUTFIT: {
      return state.map((outfit) => {
        if (outfit.id !== action.payload) {
          return outfit;
        }
        return { ...outfit, worn: !outfit.worn }
      })
    }
    default:
      return state
  }
}

export async function fetchOutfits(dispatch, getState) {
  const response = await outfitsService.fetchOutfitsByWeather(getState().weather, getState().session.user.token);
  dispatch({ type: OUTFITS_LOADED, payload: response })
}

export function removeOutfit(id) {
  return async function removeOutfitThunk(dispatch, getState) {
    const response = await outfitsService.removeOutfit(id);
    dispatch({ type: OUTFIT_REMOVED, payload: id })
  }
}

export function addOutfit(outfit) {
  return async function removeOutfitThunk(dispatch, getState) {
    const response = await outfitsService.addOutfit(outfit);
    dispatch({ type: OUTFIT_ADDED, payload: response })
  }
}

export function wearOutfit(outfit) {
  return async function wearOutfitThunk(dispatch, getState) {
    let response = null;
    const worn = {
      outfitId: outfit.id,
      weather: getState().weather
    };
    if (outfit.worn) {
      response = await wornService.removeWorn(worn)
    } else {
      response = await wornService.addWorn(worn);
    }
    dispatch({ type: TOGGLE_WEAR_OUTFIT, payload: outfit.id })
  }
}