# useEffect

- https://stackoverflow.com/questions/73196018/useeffect-and-usestate-to-fetch-api-data
- https://react.dev/reference/react/useEffect#fetching-data-with-effects
- `useEffect(setup, dependencies?)`
- useEffect is a React Hook that lets you synchronize a component with an external system.

## When does useEffect calls in React?
The `useEffect` Hook in React is called based on its dependency array:

**No dependency array:**
`useEffect` runs after every render, including the initial render and subsequent updates.

**Empty dependency array ([]):**
useEffect runs only once after the initial render, similar to `componentDidMount` in class components.

**Dependency array with values ([value1, value2]):**
`useEffect` runs after the initial render and whenever any of the values in the dependency array change.
It is important to note that useEffect is always called at least once, after the initial render of the component. If strict mode is enabled, React will run an extra setup + cleanup cycle in development to help find issues in the component.


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
