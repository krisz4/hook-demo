import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosService from "../axiosService";
import type { RootState } from "../store";
import { EventEntry, EventLog } from "../types/EventData.type";
import { showErrorSnackbar } from "./snackbar.slice";

type EventState = {
  loggedEvents: EventEntry[];
  logCounter: number;
};

const initialState: EventState = {
  loggedEvents: [],
  logCounter: 0,
};

export const addLog = createAsyncThunk(
  "logs/add",
  async (props: EventLog, thunkApi) => {
    try {
      const response = await axiosService.post("logs/addLogEntry", props);
      const result = { ...(response.data as EventLog), synced: true };
      return result;
    } catch (error) {
      thunkApi.dispatch(showErrorSnackbar());
      const result = { ...props, synced: false };
      return result;
    }
  }
);

export const syncLogs = createAsyncThunk("logs/sync", async (_, thunkApi) => {
  const { eventLogs } = thunkApi.getState() as RootState;
  const { loggedEvents } = eventLogs;

  const eventsAfterSync = loggedEvents?.map(async (event) => {
    const { synced, ...log } = event;

    if (!synced) {
      try {
        const response = await axiosService.post("/addLogEntry", {
          log,
        });
        const result = { ...(response.data as EventLog), synced: true };
        return result;
      } catch (error) {
        thunkApi.dispatch(showErrorSnackbar());
        const result = { ...event, synced: false };
        return result;
      }
    }

    return event;
  });

  const resolvedEvents = await Promise.all(eventsAfterSync);
  const notSyncedLogs = resolvedEvents?.filter((event) => !event.synced);

  return notSyncedLogs;
});

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
      state.logCounter = state.logCounter + 1;
    });
    builder.addCase(syncLogs.fulfilled, (state, action) => {
      state.loggedEvents = (action.payload as any) || [];
    });
  },
});

export const selectEventLogsList = ({
  eventLogs: { loggedEvents },
}: RootState) => ({
  loggedEvents,
});

export const selectLogCounter = ({ eventLogs: { logCounter } }: RootState) => ({
  logCounter,
});

export default eventLogsSlice.reducer;
