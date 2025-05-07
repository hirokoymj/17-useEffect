import React from "react";

const User = () => {
  const user = {
    name: "Sloba",
    email: "sloba@example.com",
  };

  return (
    <div>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default User;
