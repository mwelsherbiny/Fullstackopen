export default function Notifcation({ notification }) {
  if (!notification) {
    return null;
  }

  let style = {
    display: "flex",
    alignItems: "center",
    height: "50px",
    borderRadius: "10px",
    padding: "10px",
    fontSize: "24px",
  };

  if (notification.error) {
    style = {
      ...style,
      border: "4px solid red",
      color: "red",
      backgroundColor: "#ffc6c4",
    };
  } else {
    style = {
      ...style,
      border: "4px solid green",
      color: "green",
      backgroundColor: "#B9E2A7",
    };
  }

  return <div style={style}>{notification.message}</div>;
}
