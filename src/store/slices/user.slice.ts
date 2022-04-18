import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type UserState = {
  user_id: string;
  team_id: string;
  name: string;
};

const initialState: UserState = {
  user_id: "test_user_id",
  team_id: "test_team_id",
  name: "test_user",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const selectUser = ({ user }: RootState) => ({
  user,
});

export default userSlice.reducer;
