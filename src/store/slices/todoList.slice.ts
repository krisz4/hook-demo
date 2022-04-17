import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { mock } from "../axiosService";
import { showErrorSnackbar, showSnackbar } from "./snackbar.slice";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  try {
    const response = await mock.instance.get("/todos");
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (
    props: {
      input: string;
      setInput(value): void;
      setSubmitting(value): void;
    },
    thunkAPI
  ) => {
    const { input, setInput, setSubmitting } = props;
    try {
      const response = await mock.post("/addTodo", {
        input,
      });
      setInput("");
      setSubmitting(false);
      thunkAPI.dispatch(showSnackbar({ text: "Successful add" }));
      return response.data;
    } catch (error) {
      setSubmitting(false);
      thunkAPI.dispatch(showErrorSnackbar());
      throw error;
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
      const response = await mock.post("/removeTodo", {
        id,
      });
      thunkAPI.dispatch(showSnackbar({ text: "Successful delete" }));
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(showErrorSnackbar());
      throw error;
    }
  }
);

export const suggestionSlice = createSlice({
  name: "suggestion",
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
      state.data = state.data.filter((todo) => todo._id === action.payload);
      state.isDataAvailable = state.data.length !== 0;
    });
  },
});

export const getTodos = ({ suggestion: { data, isDataAvailable } }) => ({
  data,
  isDataAvailable,
});

export default suggestionSlice.reducer;
