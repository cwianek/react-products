const initialState = {
  modalOpen: false
}

const MODAL_OPENED = 'notifications/modalOpened';
const MODAL_CLOSED = 'notifications/modalClosed';



export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case MODAL_OPENED: {
      return { modalOpen: true }
    }
    case MODAL_CLOSED: {
      return { modalOpen: false }
    }
    default:
      return state
  }
}

export const openModal = () => {
  return (dispatch) => {
    dispatch({ type: MODAL_OPENED })
  }
}

export const closeModal = () => {
  return (dispatch) => {
    dispatch({ type: MODAL_CLOSED })
  }
}
