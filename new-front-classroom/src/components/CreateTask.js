import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";

const CreateTask = () => {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwtDecode(token);
      console.log("Task created by:", user.name);
    }
    console.log("Task:", task);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task"
      />
      <button type="submit">Create Task</button>
    </form>
  );
};

export default CreateTask;