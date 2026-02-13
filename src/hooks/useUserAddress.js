import { setUserAddress } from "@/app/slices/userAddressSlice";
import {
  createClientAddress,
  getClientAddress,
} from "@/services/address.service";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useUserAddress = () => {
  const [error, setError] = useState(null);
  const { address } = useSelector((state) => state.userAddressState);
  const dispatch = useDispatch();

  const createAddress = async (data) => {
    const response = await createClientAddress(data);
    if (response.success) {
      dispatch(setUserAddress(response.newAddress));
    }
    return response;
  };
  useEffect(() => {
    const fetchAddress = async () => {
      const response = await getClientAddress();
      if (response.success) {
        dispatch(setUserAddress(response.address));
      } else {
        setError(response.message);
      }
    };
    if (!address) {
      fetchAddress();
    }
  }, [dispatch, address]);
  return {
    address,
    createAddress,
    error,
  };
};
