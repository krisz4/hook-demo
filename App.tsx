import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import BottomNavigator from "./src/navigation/BottomNavigator";
import { persistor, store } from "./src/store";
import { syncLogs } from "./src/store/slices/eventLogs.slice";

export default function App() {
  // log unsynced events
  useEffect(() => {
    store.dispatch(syncLogs());
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={styles.container}>
          <BottomNavigator />
          <StatusBar style="auto" />
        </View>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
