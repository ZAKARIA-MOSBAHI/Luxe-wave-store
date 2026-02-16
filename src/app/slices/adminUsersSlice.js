import { createSlice } from "@reduxjs/toolkit";

const adminUsersState = createSlice({
  name: "adminUsersState",
  initialState: {
    users: null,
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    addUserInStore: (state, action) => {
      const newUser = action.payload;
      const newUsers = [...state.users, newUser];
      state.users = newUsers;
    },
    deleteUserFromStore: (state, action) => {
      const userIdToDelete = action.payload;
      if (state.users) {
        state.users = state.users.filter((user) => user._id !== userIdToDelete);
      }
    },
    suspendUserFromStore: (state, action) => {
      const userIdToSuspend = action.payload;
      if (state.users) {
        state.users = state.users.map((user) =>
          user._id === userIdToSuspend
            ? { ...user, status: "suspended" }
            : user,
        );
      }
    },
  },
});

export default adminUsersState.reducer;
export const {
  setUsers,
  deleteUserFromStore,
  suspendUserFromStore,
  setFilteredUsers,
  addUserInStore,
} = adminUsersState.actions;
