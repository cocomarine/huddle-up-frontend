import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (first_name, last_name, email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await axios.post('http://localhost:4000/auth/signup', { first_name, last_name, email, password });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({type: "LOGIN", payload: json});
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
