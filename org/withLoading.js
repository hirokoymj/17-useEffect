import React, { useState } from "react";

const withLoader = (WrappedComponent) => {
  return (props) => {
    /// takes a component wrap component as an argument and returns a new compoent
    const [loading, setLoading] = useState(true); //Inside the return component we use the useState() hook

    setTimeout(() => {
      setLoading(false);
    }, 2000);

    return (
      // In Component render method
      <div>{loading ? <p>Loading...</p> : <WrappedComponent {...props} />}</div>
    );
  };
};

export default withLoader;
