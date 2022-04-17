import { eventLogsReducer, snackbarReducer } from "./slices";

const rootReducer = {
  snackbar: snackbarReducer,
  eventLogs: eventLogsReducer,
};

export default rootReducer;
