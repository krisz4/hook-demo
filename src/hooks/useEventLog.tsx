import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosService from "../store/axiosService";
import { addLog, selectLogCounter } from "../store/slices/eventLogs.slice";
import { selectUser } from "../store/slices/user.slice";
import { AppDispatch } from "../store/store";
import { EventLog } from "../store/types/EventData.type";

type UseEventDispatchAndLogParams = {
  event: {
    type:
      | "ADD_TODO"
      | "ADD_TODO_FAIL"
      | "REMOVE_TODO"
      | "REMOVE_TODO_FAIL"
      | "MANUAL_LOG_SYNC";
    action?: any;
    endpoint?: string;
  };
  persist?: boolean;
};

export const useEventDispatchAndLog = () => {
  const [sessionCounter, setSessionCounter] = useState(0);
  const { logCounter } = useSelector(selectLogCounter);
  const { user } = useSelector(selectUser);

  const dispatch = useDispatch<AppDispatch>();

  const eventDispatcher = ({
    event,
    persist = true,
  }: UseEventDispatchAndLogParams) => {
    if (event.type) {
      // log event
      console.log("start log for", event.type);
      const log: EventLog = {
        user_id: user.user_id,
        team_id: user.team_id,
        event: event.type,
        createdAt: new Date().toISOString(),
      };
      dispatch(addLog(log));

      // make network request or dispatch action
      if (persist && event.action) {
        setTimeout(() => dispatch(event.action), 0);
      } else if (event.endpoint) {
        axiosService.post(event.endpoint, {});
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
