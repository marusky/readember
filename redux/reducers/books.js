const initialState = {
  books: [],
};

export const books = (state = initialState, action) => {
  if (action.type === "SET_BOOKS") {
    return {
      books: [...action.books],
    };
  } else {
    return {
      ...state,
    };
  }
};
