import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";

export const useUser = () => {
  const { user, setUser, clearUser } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      return;
    }

    let isMounted = true;

    const fetchUserInfo = async () => {
      try {
        const response = await AxiosConfig.get(API_ENDPOINTS.GET_USER_INFO);
        if (response.data && isMounted) {
          setUser(response.data);
        }
      } catch (error) {
        console.log("Error fetching user info:", error);
        if (isMounted) {
          clearUser();
          navigate("/login");
        }
      }
    };

    fetchUserInfo();

    return () => {
      isMounted = false;
    };
  }, [user]); // Only depend on user, ignore the ESLint warning
  // eslint-disable-next-line react-hooks/exhaustive-deps
};
