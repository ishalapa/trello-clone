import React, { createContext, useState } from 'react'

import { useSelector } from 'react-redux'

const GeneralContext = createContext()

export const GeneralContextProvider = ({ children }) => {
  
    let text = "context text"
  return (
    <GeneralContext.Provider
      value={{
        text
      }}
    >
      {children}
    </GeneralContext.Provider>
  )
}

export default GeneralContext