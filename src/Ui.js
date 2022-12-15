import React from "react";

const Ui = ({ data }) => {
  return (
    <div>
      {data.forEach((field) => {
        return (
          <div>
            <p>{field.label}</p>
            {field.uiType === "Input" ? (
              <input
                type="text"
                placeholder={field.placeholder}
                required={field.validate.required}
                readOnly={field.value.immutable}
              />
            ) : (
              <></>
            )}
            {field.uiType === "Group" ? <div></div> : <></>}
          </div>
        );
      })}
    </div>
  );
};

export default Ui;
