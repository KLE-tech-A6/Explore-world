import React from "react";
import Sidebar from "./Sidebar";

const UserDelete = () => {
  return (
    <div className=" w-full ">
      <div className="flex">
        <div className="fixed">
          <Sidebar />
        </div>
        <div className="pl-80 w-full pt-8 pr-10 h-screen">
          <h1 className="text-2xl font-bold">Delete User</h1>
        </div>
      </div>
    </div>
  );
};

export default UserDelete;
