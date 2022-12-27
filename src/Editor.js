import React, { useRef, useEffect } from "react";

const Editor = ({ value, handleSubmit, formData, setFormData }) => {
  const textareaRef = useRef(null);
  
  const line_1 = {
    backgroundColor: "yellow"
  }
  const line_0 = {
    backgroundColor: "red"
  }
  const lineNumbersRef = useRef(null);
  const handleFormData = (e) => {
    try {
      const editorObj = JSON.parse(e.target.value);
      setFormData(JSON.stringify(editorObj, null, 8));
    } catch (error) {
      setFormData(e.target.value);
    }
  };
  useEffect(() => {
    const textarea = textareaRef.current;
    const lineNumbers = lineNumbersRef.current;

    textarea.addEventListener("input", updateLineNumbers);
    textarea.addEventListener("scroll", syncScroll);

    function updateLineNumbers() {  
      const numLines = textarea.value.split('\n').length;
      lineNumbers.innerHTML = Array(numLines)
        .fill()
        .map((_, i) => `${i + 1}<br />`)
        .join('');
    }

    function syncScroll() {
      lineNumbers.scrollTop = textarea.scrollTop;
    }
  }, []);
  return (
      <form onSubmit={handleSubmit} className="flex flex-col w-full h-full justify-between items-center">
        <div className="flex w-full h-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500">
          <div
            ref={lineNumbersRef}
            className="font-[fredoka] max-w-full h-full overflow-y-hidden overflow-x-hidden max-h-full text-right py-2 px-2 border-r border-gray-300 text-gray-500 select-none"
          ></div>
          <textarea
            ref={textareaRef}
            value={formData}
            type="text"
            onChange={handleFormData}
            className="font-[fredoka] p-2 w-full h-full outline-none rounded-md max-h-full min-h-full"
          ></textarea>
        </div>
        {/* <textarea
          className="font-[fredoka] flex w-full h-full border-2 outline-none border border-gray-400 focus:border focus:border-gray-700 rounded-lg"
          type="text"
          value={formData}
          onChange={handleFormData}
        /> */}
        <button
          type="submit"
          className="font-[fredoka] w-1/2 m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Preview
        </button>
      </form>
  );
};

export default Editor;
