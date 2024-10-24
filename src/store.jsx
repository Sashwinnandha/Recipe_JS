import { createContext, useEffect, useState } from "react";

export const ContextCreator = createContext({
  name: {},
  setName: () => {},
});

export function ContextProvider({ children }) {
  const [name, setName] = useState(
    JSON.parse(localStorage.getItem("Loggeduser"))
  );

  return (
    <ContextCreator.Provider value={{ name, setName }}>
      {children}
    </ContextCreator.Provider>
  );
}
