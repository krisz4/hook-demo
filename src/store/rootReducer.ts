import {
  eventLogsReducer,
  snackbarReducer,
  todoReducer,
  userReducer,
} from "./slices";

const rootReducer = {
  snackbar: snackbarReducer,
  eventLogs: eventLogsReducer,
  todos: todoReducer,
  user: userReducer,
};

export default rootReducer;
