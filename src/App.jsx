
import React, { useContext, useEffect, useState } from "react";
import Routering from "./Router";
import { DataContext } from "./Components/DataProvider/DataProvider";
import { Type } from "./Utility/action.type.js";
import { auth } from "./Utility/firebase.js";

function App() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [authChecked, setAuthChecked] = useState(false); 

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      console.log("Auth state changed:", authUser);

      if (authUser) {
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }

      setAuthChecked(true); 
    });

    return () => unsubscribe();
  }, []);


  if (!authChecked) {
    return <p>Loading...</p>; 
  }

  return <Routering />;
}

export default App;

