import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosService from "../axiosService";
import { showErrorSnackbar, showSnackbar } from "./snackbar.slice";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  try {
    const response = await axiosService.get("/todos");
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (
    props: {
      id: string;
      text: string;
    },
    thunkAPI
  ) => {
    const { id, text } = props;
    try {
      const response = await axiosService.post("/addTodo", {
        id,
        text,
      });
      thunkAPI.dispatch(showSnackbar({ text: "Successful add" }));
      return { id, text };
    } catch (error) {
      thunkAPI.dispatch(showErrorSnackbar());
      //throw error;
      return { id, text };
    }
  }
);

export const removeTodo = createAsyncThunk(
  "todos/removeTodo",
  async (
    props: {
      id: string;
    },
    thunkAPI
  ) => {
    const { id } = props;
    try {
      const response = await axiosService.post("/removeTodo", {
        id,
      });
      thunkAPI.dispatch(showSnackbar({ text: "Successful delete" }));
      return { id };
    } catch (error) {
      thunkAPI.dispatch(showErrorSnackbar());
      // throw error;
      return { id };
    }
  }
);

export const todoSlice = createSlice({
  name: "todos",
  initialState: {
    data: [],
    isDataAvailable: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isDataAvailable = true;
    });
    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.data.push(action.payload);
      state.isDataAvailable = true;
    });
    builder.addCase(removeTodo.fulfilled, (state, action) => {
      state.data = state.data.filter((todo) => todo.id !== action.payload?.id);
      state.isDataAvailable = state.data.length !== 0;
    });
  },
});

export const selectTodos = ({ todos: { data, isDataAvailable } }) => ({
  data,
  isDataAvailable,
});

export default todoSlice.reducer;
