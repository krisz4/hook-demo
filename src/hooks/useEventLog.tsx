import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosService from "../store/axiosService";
import { addLog, selectLogCounter } from "../store/slices/eventLogs.slice";
import { selectUser } from "../store/slices/user.slice";
import { AppDispatch } from "../store/store";
import { EventLog } from "../store/types/EventData.type";

type UseEventDispatchAndLogParams = {
  eventType:
    | "ADD_TODO"
    | "ADD_TODO_FAIL"
    | "REMOVE_TODO"
    | "REMOVE_TODO_FAIL"
    | "MANUAL_LOG_SYNC";
  persistConfig?: {
    action: any;
  };
  networkConfig?: {
    method: "POST" | "GET";
    endpoint: string;
    body?: any;
  };
};

export const useEventDispatchAndLog = () => {
  const [sessionCounter, setSessionCounter] = useState(0);
  const { logCounter } = useSelector(selectLogCounter);
  const { user } = useSelector(selectUser);

  const dispatch = useDispatch<AppDispatch>();

  const eventDispatcher = ({
    eventType,
    persistConfig,
    networkConfig,
  }: UseEventDispatchAndLogParams) => {
    if (eventType) {
      // log event
      const log: EventLog = {
        user_id: user.user_id,
        team_id: user.team_id,
        event: eventType,
        createdAt: new Date().toISOString(),
      };
      dispatch(addLog(log));

      // make network request or dispatch action
      if (persistConfig) {
        // add setTimeout so addLog runs first incase we dispatch to the same slice
        setTimeout(() => dispatch(persistConfig.action), 0);
      } else if (networkConfig) {
        networkConfig.method === "GET"
          ? axiosService.get(networkConfig.endpoint)
          : axiosService.post(networkConfig.endpoint, networkConfig.body);
      }

      // count events made using this hook instance
      setSessionCounter((state) => state + 1);
    }
  };

  return {
    eventDispatcher,
    sessionCounter,
    logCounter,
  };
};
