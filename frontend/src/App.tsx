import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import NotificationList from "./Components/NotificationList";
import NotificationButton from "./Components/NotificationButton";
import { onMessage } from "firebase/messaging";

import { getToken } from "firebase/messaging";
import { db, messaging } from "./Database";
import { collection, getDocs, query, where } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import Message from "./Components/Message";
import "react-toastify/dist/ReactToastify.css";


interface Notification {
  id: string;
  type: string;
  read: boolean;
  timestamp: any;
}

function App() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [token, setToken] = useState<string>('')

  const requestPermission = async () => {
    try {
      const token = await getToken(messaging, {
        vapidKey:
          "BMZ9u9NtDA-jxnNUr5_E5LCYRt1CD8MpbhqCAE_JzC4Uptl6gZA4T9vtEx4pxsRL79PZNKTZindDcytA1gQBnJk",
      });
      console.log("FCM Token:", token);
      setToken(token);
      // Save the token to your database or use it for further actions
    } catch (error) {
      console.error("Error getting FCM token:", error);
    }
  };

  // onMessage(messaging, (payload) => {
  //   toast(<Message notification={payload.notification} />);
  // });

  const fetchNotifications = async () => {
    const q = query(
      collection(db, "notifications"),
      where("read", "==", false)
    );
    const querySnapshot = await getDocs(q);
    const notificationsData: Notification[] = [];
    querySnapshot.forEach((doc) => {
      notificationsData.push({ id: doc.id, ...doc.data() } as Notification);
    });
    setNotifications(notificationsData);
  };

  useEffect(() => {
    requestPermission();
    fetchNotifications();
    onMessage(messaging, (payload) => {
      toast(<Message notification={payload.notification} />);
    });
  }, []);

  return (
    <div className="App">
      <ToastContainer />
      <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
      <NotificationButton refresh={fetchNotifications} type="Button Type 1" fcmToken={token}/> 
      <NotificationButton refresh={fetchNotifications} type="Button Type 2" fcmToken={token} />
      <NotificationButton refresh={fetchNotifications} type="Button Type 3" fcmToken={token} />

      </div>
      <NotificationList
        notifications={notifications}
        refresh={fetchNotifications}
      />

    </div>
  );
}

export default App;
