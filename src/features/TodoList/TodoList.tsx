import React, { useEffect, useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";
import { useSelector } from "react-redux";
import { useEventDispatchAndLog } from "../../hooks/useEventLog";
import {
  addTodo,
  removeTodo,
  selectTodos,
} from "../../store/slices/todoList.slice";

const LIST_ITEM_COLOR = "#3bc47f";

interface Todo {
  id: string;
  text: string;
}

export default function App() {
  const { eventDispatcher, sessionCounter } = useEventDispatchAndLog();

  const initialMode = useRef<boolean>(true);

  useEffect(() => {
    initialMode.current = false;
  }, []);

  const { data: items, isDataAvailable } = useSelector(selectTodos);
  console.log(isDataAvailable);

  const onAdd = () => {
    const newTodo: Todo = {
      id: new Date().toISOString(),
      text: new Date().toLocaleString(),
    };

    eventDispatcher({
      event: {
        type: "ADD_TODO",
        action: addTodo(newTodo),
      },
    });
  };

  const onDelete = (itemId: string) => {
    eventDispatcher({
      event: {
        type: "REMOVE_TODO",
        action: removeTodo({ id: itemId }),
      },
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.floatingButton} onPress={onAdd}>
        <Text style={{ color: "white", fontSize: 40 }}>+</Text>
      </TouchableOpacity>
      <Text>
        Events logged in this component since the start of the application:
        {sessionCounter}
      </Text>
      <View>
        {!isDataAvailable ? (
          <Text>Click on + button to add new todo!!</Text>
        ) : null}
      </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingVertical: 50 }}
      >
        {items.map((item, index) => {
          return (
            <Animated.View
              key={item.id}
              entering={
                initialMode.current ? FadeIn.delay(100 * index) : FadeIn
              }
              onTouchEnd={() => onDelete(item.id)}
              exiting={FadeOut}
              layout={Layout.delay(100)}
              style={styles.listItem}
            >
              <Animated.Text
                entering={
                  initialMode.current ? FadeIn.delay(100 * index) : FadeIn
                }
                exiting={FadeOut}
              >
                {item.text}
              </Animated.Text>
              <Animated.Text
                style={styles.deleteText}
                entering={
                  initialMode.current ? FadeIn.delay(100 * index) : FadeIn
                }
                exiting={FadeOut}
              >
                Touch to delete
              </Animated.Text>
            </Animated.View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 1,
  },
  listItem: {
    height: 100,
    backgroundColor: LIST_ITEM_COLOR,
    width: "90%",
    marginVertical: 10,
    borderRadius: 20,
    alignSelf: "center",
    // Shadow on Android
    elevation: 5,
    // Shadow on iOS
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  floatingButton: {
    width: 80,
    aspectRatio: 1,
    backgroundColor: "black",
    borderRadius: 40,
    position: "absolute",
    bottom: 50,
    right: "5%",
    zIndex: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteText: {
    color: "white",
    fontSize: 12,
  },
});
