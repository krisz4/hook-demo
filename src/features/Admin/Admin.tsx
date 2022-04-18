import React from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { useEventDispatchAndLog } from "../../hooks/useEventLog";
import {
  selectEventLogsList,
  syncLogs,
} from "../../store/slices/eventLogs.slice";

const Admin = () => {
  const { loggedEvents } = useSelector(selectEventLogsList);
  console.log(loggedEvents);
  const { eventDispatcher, logCounter } = useEventDispatchAndLog();

  return (
    <View style={styles.container}>
      <View>
        <Text>{`Count of all logs made: ${logCounter}`}</Text>
      </View>
      <View>
        <Button
          title="Manual sync"
          onPress={() =>
            eventDispatcher({
              event: { type: "MANUAL_LOG_SYNC", action: syncLogs() },
            })
          }
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {loggedEvents?.map((log) => (
          <View key={log.createdAt} style={styles.card}>
            {Object.entries(log).map((keyValue) => (
              <Text>{`${keyValue[0]}:${keyValue[1]}`}</Text>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Admin;

const styles = StyleSheet.create({
  container: {
    margin: 8,
    flex: 1,
  },
  scrollContainer: {
    padding: 8,
  },
  card: {
    backgroundColor: "white",
    elevation: 10,
    marginBottom: 8,
    padding: 8,
    marginVertical: 8,
    marginHorizontal: 8,
  },
});
