import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosService from "../axiosService";
import type { RootState } from "../store";
import { EventEntry } from "../types/EventData.type";
import { showErrorSnackbar } from "./snackbar.slice";

type EventState = {
  loggedEvents: EventEntry[];
};

const initialState: EventState = {
  loggedEvents: [],
};

export const addLog = createAsyncThunk(
  "startup-lab-events/fetchStartupLabEvents",
  async (params: EventEntry, thunkApi) => {
    try {
      const response = await axiosService.instance.post("/addLogEntry", {
        params,
      });
      const result = { ...(response.data as EventEntry), synced: true };
      return result;
    } catch (error) {
      thunkApi.dispatch(showErrorSnackbar());
      const result = { ...params, synced: false };
      return result;
    }
  }
);

export const eventLogsSlice = createSlice({
  name: "eventLogs",
  initialState,
  reducers: {
    removeSyncedData: (state) => {
      state.loggedEvents.filter((log) => !log.synced);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addLog.fulfilled, (state, action) => {
      state.loggedEvents.push(action.payload);
    });
  },
});

export const selectEventLogsList = ({
  eventLogs: { loggedEvents },
}: RootState) => ({
  loggedEvents,
});

export default eventLogsSlice.reducer;
