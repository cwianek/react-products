import productService from '../services/products';

const initialState = {
  products: [],
  selected: [],
  outfitModalOpen: false,
  productModalOpen: false
}

const PRODUCTS_LOADED = 'products/productsLoaded';
const PRODUCT_REMOVED = 'products/productRemoved';
const PRODUCT_ADDED = 'products/productsAdded';
const PRODUCT_SELECTED = 'products/productSelected';
const PRODUCT_DESELECTED = 'products/productDeselected';
const OPEN_PRODUCT_MODAL = 'products/openProductModal';
const CLOSE_PRODUCT_MODAL = 'products/closeProductModal';
const OPEN_OUTFIT_MODAL = 'products/openOutfitModal';
const CLOSE_OUTFIT_MODAL = 'products/closeOutfitModal';
const SELECTION_CLEARED = 'products/selectionCleared';



export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case PRODUCTS_LOADED: {
      return { ...state, products: action.payload }
    }
    case PRODUCT_REMOVED: {
      return { ...state, products: state.products.filter((product) => product.id !== action.payload) };
    }
    case PRODUCT_ADDED: {
      console.log("PRODUCT_ADDED", action.payload, Object.keys(action.payload))
      return { ...state, products: [...state.products, action.payload] }
    }
    case PRODUCT_SELECTED: {
      return { ...state, selected: [...state.selected, action.payload] }
    }
    case PRODUCT_DESELECTED: {
      return { ...state, selected: state.selected.filter((selected) => selected !== action.payload) }
    }
    case SELECTION_CLEARED: {
      return { ...state, selected: [] }
    }
    case OPEN_PRODUCT_MODAL: {
      return { ...state, productModalOpen: true }
    }
    case CLOSE_PRODUCT_MODAL: {
      return { ...state, productModalOpen: false }
    }
    case OPEN_OUTFIT_MODAL: {
      console.log("OPEN_OUTFIT_MODALOPEN_OUTFIT_MODAL")
      return { ...state, outfitModalOpen: true }
    }
    case CLOSE_OUTFIT_MODAL: {
      return { ...state, outfitModalOpen: false }
    }
    default:
      return state
  }
}

// Thunk function
export async function fetchProducts(dispatch, getState) {
  const response = await productService.fetchProducts(getState().session.user.token);
  dispatch({ type: PRODUCTS_LOADED, payload: response })
}

export function removeProduct(id) {
  return async function removeProductThunk(dispatch, getState) {
    const response = await productService.removeProduct(id);
    dispatch({ type: PRODUCT_REMOVED, payload: id })
  }
}

export function addProduct(product) {
  return async function addProductThunk(dispatch, getState) {
    const response = await productService.addProduct(product);
    dispatch({ type: PRODUCT_ADDED, payload: response })
  }
}

export const selectProduct = (id) => {
  return (dispatch) => {
    dispatch({ type: PRODUCT_SELECTED, payload: id })
  }
}

export const deselectProduct = (id) => {
  return (dispatch) => {
    dispatch({ type: PRODUCT_DESELECTED, payload: id })
  }
}

export const openProductModal = () => {
  return (dispatch) => {
    dispatch({ type: OPEN_PRODUCT_MODAL })
  }
}

export const closeProductModal = () => {
  return (dispatch) => {
    dispatch({ type: CLOSE_PRODUCT_MODAL })
  }
}

export const openOutfitModal = () => {
  return (dispatch) => {
    dispatch({ type: OPEN_OUTFIT_MODAL })
  }
}

export const closeOutfitModal = () => {
  return (dispatch) => {
    dispatch({ type: CLOSE_OUTFIT_MODAL })
  }
}

export const clearSelected = () => {
  return (dispatch) => {
    dispatch({type: SELECTION_CLEARED})
  }
}



