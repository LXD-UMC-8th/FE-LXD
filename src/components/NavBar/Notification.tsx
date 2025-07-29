import NotificationContent from "./NotificationContent";

const Notification = () => {
  const notifications = [
    { id: 1, title: "requestFriend", body: "You’ve got mail!" },
    { id: 2, title: "Server down", body: "We’re working on it." },
    { id: 3, title: "Update available", body: "Please refresh." },
    { id: 3, title: "Update available", body: "Please refresh." },
    { id: 3, title: "Update available", body: "Please refresh." },
    { id: 3, title: "Update available", body: "Please refresh." },

    // …etc
  ];
  const handleReadAll = () => {
    console.log("모두 읽음 클릭됨");
  };
  return (
    <div className="w-120 h-150 flex flex-col bg-white rounded-lg shadow-[0px_4px_30px_0px_rgba(0,0,0,0.1)]">
      <div className="bg-white p-5 rounded-t-lg border-b-1 border-gray-300">
        <div className="mt-2 flex justify-between">
          <h1 className="font-bold text-xl">알림</h1>
          <button className="white cursor-pointer" onClick={handleReadAll}>
            모두 읽음
          </button>
        </div>
      </div>
      <div className="bg-gray-100 flex-1 overflow-y-auto rounded-b-lg p-4">
        <div className="flex flex-col gap-4 justify-center items-center ">
          {notifications.map((note) => (
            // 2) Use map to repeat — **always** give a unique key
            <NotificationContent
              key={note.id}
              title={note.title}
              body={note.body}
            />
          ))}{" "}
        </div>
      </div>
    </div>
  );
};

export default Notification;
