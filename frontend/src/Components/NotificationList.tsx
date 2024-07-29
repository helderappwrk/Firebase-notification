import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../Database";
import { CiRead, CiCircleRemove } from "react-icons/ci";

const NotificationList: React.FC<any> = ({
  notifications,
  refresh,
}: {
  notifications: any[];
  refresh: any;
}) => {
  const markAsRead = async (id: string) => {
    const notificationDoc = doc(db, "notifications", id);
    await updateDoc(notificationDoc, { read: true });
    await refresh();
  };

  return (
    <div
      style={{
        margin: "50px auto",
        alignSelf: "center",
        textAlign: "left",
        padding: "20px",
        border: "2px solid #ccc",
        borderRadius: "10px",
        width: "50%",
      }}
    >
      <h2 style={{ fontSize: "40px" }}>Notifications</h2>
      {!notifications.length && <p>No notifications left to show</p>}

      {notifications.map((notification, index) => (
        <>
          <p key={notification.id} style={{marginTop: '50px'}}>
            {index+1+"."} {notification.type} -{" "}
            <div
              style={{cursor: "pointer", marginLeft: '90%'}}
              onClick={() => markAsRead(notification.id)}
            >
              <CiCircleRemove style={{height: "40%", width: "40%", marginBottom: '10px'}}/>
            </div>
          </p>
          <hr />
        </>
      ))}
    </div>
  );
};

export default NotificationList;
