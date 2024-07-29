import React from "react";
import { db } from "../Database";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import axios from "axios";

const NotificationButton: React.FC<{
  type: string;
  refresh: any;
  fcmToken: string;
}> = ({ type, refresh, fcmToken }) => {
  const sendNotification = async (type: string) => {
    try {
      const data = {
        title: "You have received a notification",
        desc: type,
        token:
          "flEmCuOvl0P88a3_G1Ymo9:APA91bG1z0OAM_JhT07rFcgJ1JObF5m7oseCGGehqAHjn6STzKk2P0syFbocKVKpQeq7mWvvqSnK6TWVjsAiCIn_nTpoNyjcLTPxeXwFqRk6eCP8CfRzLl1W5Ec01NqTCjLsxzG84jZc",
      };
      const result = await axios.post(
        "http://localhost:3003/push-notification",
        data
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async () => {
    try {
      let x = await addDoc(collection(db, "notifications"), {
        type: `You have clicked on "${type}"`,
        read: false,
        timestamp: Timestamp.now(),
      });
      await refresh();
      await sendNotification(type);
    } catch (error) {
      console.error("Error adding notification: ", error);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        style={{
          width: "12%",
          marginLeft: "20px",
          // marginRight: "auto",
          marginTop: "1%",
          padding: "0.5%",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        {type}
      </button>
    </>
  );
};

export default NotificationButton;
