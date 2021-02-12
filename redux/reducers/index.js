import { combineReducers } from "redux";
import { user } from "./user";
import { books } from "./books";

const Reducers = combineReducers({
  userState: user,
  booksState: books,
});

export default Reducers;
