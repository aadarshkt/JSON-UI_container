import React, { useState } from "react";
import jsonData from "./data.json";
import Editor from "./Editor";
import Ui from "./Ui";

const App = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      const value = JSON.parse(event.target[0].value);
      setData(value);
    } catch (error) {
      alert(`Input is invalid. ${error}`)
    }
  };
  const handleReset = () => {
    setData(JSON.parse(formData));
  };
  return (
    <div className="flex w-full h-screen">
      <div className="flex flex-col pl-10 pr-10 pt-4 pb-2 w-1/2 h-full items-center">
        <Editor
          value={data}
          setValue={setData}
          handleSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
        />
      </div>
      <div className="flex w-1/2">
        <Ui data={data} handleReset={handleReset} />
      </div>
    </div>
  );
};

export default App;
