import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: { visible: null, text: "", style: {} },
  reducers: {
    showErrorSnackbar: (state, action: PayloadAction<string>) => {
      state.visible = true;
      state.text = action.payload ?? "Váratlan hiba történt.";
      state.style = { backgroundColor: "tomato" };
    },
    showSnackbar: (state, action) => {
      state.visible = true;
      state.text = action.payload.text;
      state.style = action.payload.style;
    },
    showSuccessSnackbar: (state, action) => {
      state.visible = true;
      state.text = action.payload.text;
      state.style = { backgroundColor: "red" };
    },
    hideSnackbar: (state) => {
      state.visible = false;
      state.text = "";
    },
  },
});

export const {
  showErrorSnackbar,
  showSnackbar,
  showSuccessSnackbar,
  hideSnackbar,
} = snackbarSlice.actions;

export const getSnackbarInfo = (state) => state.snackbar;

export default snackbarSlice.reducer;
