const initialState = {
  books: [],
  isAddBookOpen: false,
};

export const books = (state = initialState, action) => {
  if (action.type === "SET_BOOKS") {
    return {
      ...state,
      books: [...action.books],
    };
  } else if (action.type === "ADD_BOOK") {
    return {
      ...state,
      isAddBookOpen: action.open,
      books: [...state.books, action.book],
    };
  } else if (action.type === "OPEN_ADD_BOOK_MODAL") {
    return {
      ...state,
      isAddBookOpen: action.open,
    };
  } else {
    return {
      ...state,
    };
  }
};
