import React from "react";
import { hot } from "react-hot-loader/root";
import "./styles.scss";

const App = () => {
  const [count, setCount] = React.useState<number>(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCount((count) => count + 1);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  function displayCount(message: string): string {
    return message;
  }

  return <h2 className="test">{displayCount(`Count: ${count}`)}</h2>;
};

export default hot(App);
