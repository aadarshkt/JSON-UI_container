import React, { useState } from "react";
import jsonData from "./data.json";
import Editor from "./Editor";
import Ui from "./Ui";

const App = () => {
  const [data, setData] = useState(JSON.parse(JSON.stringify(jsonData)));
  console.log(data);
  return (
    <div>
      <p>Hello</p>
      <Editor value={data} setValue={setData} />
      <Ui data={data}></Ui>
    </div>
  );
};

export default App;
