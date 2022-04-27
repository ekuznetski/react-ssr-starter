import React from "react";
import { hot } from "react-hot-loader/root";
import SVG from "./assets/tux.svg";
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

  return (
    <>
      <h2 className="test">{displayCount(`Count: ${count}`)}</h2>
      <SVG />
      <br />
      <hr />
      <img src="assets/tux.svg" alt="test" />
      <br />
      <hr />
      <img src="assets/image.png" alt="test" />
    </>
  );
};

export default hot(App);
