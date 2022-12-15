import React, { useState } from "react";
import jsonData from "./data.json";
import Editor from "./Editor";
import Ui from "./Ui";

const App = () => {
  // JSON.parse(JSON.stringify(jsonData))
  const [data, setData] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const value = JSON.parse(event.target[0].value);
    console.log(typeof event.target[0].value);
    console.log(typeof value);
    setData(value)
  };
  return (
    <div className="flex w-full h-screen">
      <div className="flex flex-col p-10 w-1/2 h-full items-center">
        <Editor value={data} setValue={setData} handleSubmit={handleSubmit} />
      </div>
      <div className="flex w-1/2">
        <Ui data={data} />
      </div>
    </div>
  );
};

export default App;
