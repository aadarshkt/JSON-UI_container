import React, { useState } from "react";

const Ui = ({ data }) => {
  const [fieldValue, setFieldValue] = useState();
  return (
    <div className="flex flex-col w-full p-10">
      {data.map((field) => {
        console.log(field);
        return (
          <div key={field.jsonKey} className="flex flex-col w-full">
            {(() => {
              switch (field.uiType) {
                case "Input":
                  return (
                    <div className="flex items-center">
                      <p className="text-black text-left w-1/2">{field.label}</p>
                      <input
                        value={fieldValue}
                        onChange={(e) => setFieldValue(e.target.value)}
                        placeholder={field.placeholder}
                        required={field.validate.required}
                        readOnly={field.validate.immutable}
                        className="pt-1 pb-1 pr-2 pl-2"
                      />
                    </div>
                  );
                case "Group":
                  return (
                    <div className="flex flex-col">
                      <p className="text-black text-left w-1/2">{field.label}</p>
                      <hr className="rounded-xl bg-gray-200" />
                      {field.subParameters.map((subParameter) => {
                        return (
                          <div key={subParameter.jsonKey} className="pt-2 pb-2 flex w-full items-center">
                            <p className="w-1/2">{subParameter.label}</p>
                            <DropdownMenu key={subParameter.jsonKey} subParameter={subParameter} />
                          </div>
                        );
                      })}
                    </div>
                  );
                case "Select":
                  return (
                    <div className="flex items-center">
                      <p className="text-black text-left w-1/2">{field.label}</p>
                      <DropdownMenu subParameter={field} />
                    </div>
                  );
              }
            })()}
          </div>
        );
      })}
    </div>
  );
};

const DropdownMenu = ({ subParameter }) => {
  const [active, setActive] = useState(false);
  const [subFieldvalue, setSubFieldvalue] = useState(subParameter.validate.defaultValue);
  return (
    <div className="flex flex-col">
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={() => setActive(!active)}
      >
        {subFieldvalue}{" "}
        <svg
          className="ml-2 w-4 h-4"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      {active ? (
        <div className="z-10 absolute mt-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
          <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
            <li>
              {subParameter.validate.options.map((option) => {
                return (
                  <p
                    key={option.label}
                    onClick={() => {
                      setSubFieldvalue(option.label);
                      setActive(false);
                    }}
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {option.label}
                  </p>
                );
              })}
            </li>
          </ul>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Ui;
