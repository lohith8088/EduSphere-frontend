import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { server } from "../main";
import toast, { Toaster } from "react-hot-toast";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));

  // const [isLogin, setIsLogin] = useState(false);
  // const [isRegister, setIsRegister] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  async function loginUser(email, password, navigate, fetchMyCourse) {
    try {
      setBtnLoading(true); // move it here!
      const { data } = await axios.post(`${server}/api/user/login`, {
        email,
        password,
      });

      toast.success(data.message);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      setIsAuth(true);
      navigate("/");
      fetchMyCourse(); // fetch courses after login
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
      setIsAuth(false);
    } finally {
      setBtnLoading(false); // make sure to stop loading in both success/fail
    }
  }

  async function registerUser(name, email, password, navigate) {
    try {
      setBtnLoading(true); // move it here!
      const { data } = await axios.post(`${server}/api/user/register`, {
        name,
        email,
        password,
      });

      toast.success(data.message);
      localStorage.setItem("activationToken", data.activationToken);
      setUser(data.user);
      // setIsAuth(true);
      navigate("/verify");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
      setIsAuth(false);
    } finally {
      setBtnLoading(false); // make sure to stop loading in both success/fail
    }
  }

async function verifyOtp(otp,navigate){
  setBtnLoading(true); // move it here!
  const activationToken=localStorage.getItem("activationToken")
  try{
      const { data } = await axios.post(`${server}/api/user/verify`, {
        otp,
        activationToken,
      });
      navigate("/login")
      toast.success(data.message);
      localStorage.clear();
      setBtnLoading(false);

  }catch(error){
    toast.error(error.response.data.message)
    setBtnLoading(false);

  }
}



  async function fetchUser() {
  const token = localStorage.getItem("token");
  if (!token) {
    setIsAuth(false);
    setUser(null);
    setLoading(false);
    return;
  }

  try {
    const { data } = await axios.get(`${server}/api/user/me`, {
      headers: { token },
    });
    setUser(data.user);
    setIsAuth(true);
  } catch (err) {
    console.error("Fetch user failed", err);
    localStorage.removeItem("token");
    setIsAuth(false);
    setUser(null);
  } finally {
    setLoading(false);
  }
}

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        setIsAuth,
        isAuth,
        loginUser,
        btnLoading,
        setBtnLoading,
        loading,
        registerUser,
        verifyOtp,
        fetchUser,
      
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
