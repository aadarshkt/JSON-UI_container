import React, { useEffect, useState } from "react";

const Ui = ({ data, handleReset}) => {
  const initialFormData = data.reduce((acc, field) => {
    switch(field.uiType){
      case "Input":
        return {...acc, [field.label]:""}
      case "Group":
        const subParameters = field.subParameters.reduce((accu, subParameter) => {return {...accu, [subParameter.label] : subParameter.validate.defaultValue}}, {})
        return {...acc, ...subParameters}
      case "Select":
        return {...acc, [field.label]:field.validate.defaultValue}
    }
}, {})
const [fieldValue, setFieldValue] = useState("");
const [formData, setFormData] = useState();
useEffect(() => {
  const initialFormData = data.reduce((acc, field) => {
    switch(field.uiType){
        case "Input":
          return {...acc, [field.label]:""}
        case "Group":
          const subParameters = field.subParameters.reduce((accu, subParameter) => {return {...accu, [subParameter.label] : subParameter.validate.defaultValue}}, {})
          return {...acc, ...subParameters}
        case "Select":
          return {...acc, [field.label]:field.validate.defaultValue}
        }
      }, {})
  
      setFormData(initialFormData);
      console.log(data);
      setFieldValue("")
  }, [data])
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert(JSON.stringify(formData));
  };
  return (
    <div className="flex flex-col w-full p-10">
      <p className="font-medium font-[fredoka]">Create Pasta</p>
      <hr className="rounded-xl bg-gray-200 mt-1 mb-4" />
      <form onSubmit={handleSubmit}>
        {data.map((field) => {
          return (
            <div key={field.jsonKey} className="flex flex-col w-full">
              {(() => {
                switch (field.uiType) {
                  case "Input":
                    return (
                      <div className="flex items-center bg-[#FBFDFF] p-2 border rounded-md mb-2">
                        <p className="font-[fredoka] text-black text-left w-1/2">{field.label}</p>
                        <input
                          name={field.label}
                          value={fieldValue}
                          onChange={(e) => {
                            setFieldValue(e.target.value);
                            handleChange(e);
                          }}
                          placeholder={field.placeholder}
                          required={field.validate.required}
                          readOnly={field.validate.immutable}
                          className="font-[fredoka] pt-1 pb-1 pr-2 pl-2 text-black w-full rounded-md border bg-[#EFF7FF] border-[#D7E6F8] outline-none focus:border focus:border-blue-500"
                        />
                      </div>
                    );
                  case "Group":
                    return (
                      <div className="flex flex-col bg-[#FBFDFF] p-2 border rounded-md mb-2">
                        <p className="font-[fredoka] text-black text-left w-1/2">{field.label}</p>
                        <hr className="rounded-xl bg-gray-200 mt-1" />
                        {field.subParameters.map((subParameter) => {
                          return (
                            <div key={subParameter.jsonKey} className="pt-2 pb-2 flex w-full items-center">
                              <p className="font-[fredoka] w-1/2">{subParameter.label}</p>
                              <DropdownMenu
                                key={subParameter.jsonKey}
                                subParameter={subParameter}
                                handleChange={handleChange}
                              />
                            </div>
                          );
                        })}
                      </div>
                    );
                  case "Select":
                    {/* setFormData({...formData, [field.label]:field.validate.defaultValue}) */}
                    return (
                      <div className="flex items-center bg-[#FBFDFF] p-2 border rounded-md">
                          <p className="font-[fredoka] text-black text-left w-1/2">{field.label}</p>
                          <DropdownMenu subParameter={field} handleChange={handleChange} />
                      </div>
                    );
                }
              })()}
            </div>
          );
        })}
        <div className="flex w-full justify-end">
          <button 
          type="reset"
          onClick={handleReset}
          className="font-[fredoka] w-1/4 mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Reset
          </button>
          <button
            type="submit"
            className="font-[fredoka] w-1/4 mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

const DropdownMenu = ({ subParameter, handleChange }) => {
  const [subFieldvalue, setSubFieldvalue] = useState(subParameter.validate.defaultValue);
  return (
    <div className="flex flex-col w-full">
      <select
        name={subParameter.label}
        value={subFieldvalue}
        onChange={(e) => {
          setSubFieldvalue(e.target.value);
          handleChange(e);
        }}
        className="font-[fredoka] w-full bg-[#EFF7FF] rounded-lg p-1 border outline-none focus:border focus:border-blue-500"
      >
        {subParameter.validate.options.map((option) => {
          return (
            <option key={option.label} className="font-[fredoka] w-full bg-white">
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Ui;
