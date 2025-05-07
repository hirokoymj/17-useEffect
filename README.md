# useEffect

- https://stackoverflow.com/questions/73196018/useeffect-and-usestate-to-fetch-api-data
- https://react.dev/reference/react/useEffect#fetching-data-with-effects
- `useEffect(setup, dependencies?)`
- useEffect is a React Hook that lets you synchronize a component with an external system.

**My Effect runs twice when the component mounts**:

- When Strict Mode is on, in development, React runs setup and cleanup one extra time before the actual setup.
- This is a stress-test that verifies your Effect’s logic is implemented correctly. If this causes visible issues, your cleanup function is missing some logic.

```js
import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setData(json);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
```

```js
import React from "react";
import useFetch from "./useFetch";

function MyComponent() {
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/todos/1"
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h1>{data.title}</h1>
      <p>User ID: {data.userId}</p>
      <p>Completed: {data.completed ? "Yes" : "No"}</p>
    </div>
  );
}

export default MyComponent;
```

<hr />
