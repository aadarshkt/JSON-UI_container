import React, { useState } from "react";

const Editor = ({ value, handleSubmit}) => {
  const [formData, setFormData] = useState([]);
  return (
    <div className="flex flex-col w-full h-full items-center">
      <form onSubmit={handleSubmit} className="flex flex-col w-full h-full items-center">
        <input className="flex flex-grow w-full h-full border-2" type="text" value={formData} onChange={(e) => setFormData(e.target.value)} />
        <button
          type="submit"
          className="w-1/2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Preview
        </button>
      </form>
    </div>
  );
};

export default Editor;
