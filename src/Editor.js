import React from 'react'

const Editor = ({value,setValue}) => {
  return (
    <div>
        <input type="text" value={value[0].jsonKey} onChange={(e) => setValue(e.target.value)}/>
    </div>
  )
}

export default Editor