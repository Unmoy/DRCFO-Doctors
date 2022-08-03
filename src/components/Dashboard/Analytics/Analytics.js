import React, { useState } from "react";
import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import Conference from "./Conference";
const Analytics = () => {
  //   const userName = localStorage.getItem("joining_name");
  const hmsActions = useHMSActions();
  const [token, setToken] = useState(
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2Nlc3Nfa2V5IjoiNjJlYTQ4YzRjMTY2NDAwNjU2OTY1ZmQyIiwicm9vbV9pZCI6IjYyZWE0OTZiYjFlNzgwZTc4YzNhODdhOCIsInVzZXJfaWQiOiJkdHd2bmxvZCIsInJvbGUiOiJob3N0IiwianRpIjoiOWMyMDkxMWEtNGI2Yy00ZjIwLTkxODYtOTViMGUxMzdmYzljIiwidHlwZSI6ImFwcCIsInZlcnNpb24iOjIsImV4cCI6MTY1OTYwODEyNn0.qei0ITroJyCYv7pXcaVbcwtFy_JKTzh_0QVhpHd0ips"
  );
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  // useEffect(() => {
  //   window.onunload = () => {
  //     if (isConnected) {
  //       hmsActions.leave();
  //     }
  //   };
  // }, [hmsActions, isConnected]);
  const handleSubmit = (e) => {
    e.preventDefault();
    hmsActions.join({
      userName: "Doctor",
      authToken: token,
    });
  };
  return (
    <div className="text-center fs-5 fw-bold">
      {isConnected ? (
        <Conference />
      ) : (
        <button onClick={handleSubmit}>Call Patient</button>
      )}
    </div>
  );
};

export default Analytics;
