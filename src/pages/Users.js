import { useEffect, useState } from "react";
import useFetch from "./useFetch";

export const Users = () => {
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      {data?.map((item) => (
        <div key={`${item.id}`}>{item.name}</div>
      ))}
    </>
  );
};
