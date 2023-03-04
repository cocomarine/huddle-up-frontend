import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await axios.post('http://localhost:4000/auth/signin', { email, password });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      // saving user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update auth context
      dispatch({type: "login", payload: json});

      // update loading status
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};