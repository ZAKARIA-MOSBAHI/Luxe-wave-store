import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteUserInApi,
  getUsers,
  suspendUserInApi,
} from "@/services/user.service";
import {
  deleteUserFromStore,
  setUsers,
  suspendUserFromStore,
} from "@/app/slices/adminUsersSlice";

export const useAdminUsers = () => {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.adminUsersState);

  const suspendUser = async (userId) => {
    const response = await suspendUserInApi(userId);
    if (response.success) {
      dispatch(suspendUserFromStore(userId));
    }
    return response;
  };
  const deleteUser = async (userId) => {
    const response = await deleteUserInApi(userId);
    if (response.success) {
      dispatch(deleteUserFromStore(userId));
    }
    return response;
  };

  useEffect(() => {
    if (!users) {
      (async () => {
        const res = await getUsers();
        if (res.success) {
          dispatch(setUsers(res.users));
        }
      })();
    }
  }, [dispatch, users]);

  //   useEffect(() => {
  //     applyOrderFilters();
  //   }, [ordersState.orders, ordersState.searchQuery, ordersState.filterOption]);

  return {
    users,
    suspendUser,
    deleteUser,
    // setSearchQuery: (v) => dispatch(setSearchQuery(v)),
    // setFilterOption: (v) => dispatch(setFilterOption(v)),
    // handleCancelOrder,
  };
};
