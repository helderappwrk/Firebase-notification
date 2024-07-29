

export default function Message({ notification }) {
  return (
    <>
      <div>
        <span>{notification.title}</span>
      </div>
      <div >{notification.body}</div>
    </>
  );
}
