import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import {Store} from './Store'
import { useContext } from "react";

import { HomeScreen } from './Screens/HomeScreen';
import { SigninScreen } from "./Screens/SigninScreen";
import { SignupScreen } from "./Screens/SignupScreen";
import { CreateScreen } from "./Screens/CreateScreen";
import { ViewScreen } from "./Screens/ViewScreen";
import { EditScreen } from "./Screens/EditScreen";


function App() {

  const {state} = useContext(Store);
    const {userInfo} = state;


  return (
    <div className="app">

    <Router>
     
        <Routes>

          <Route  path = "/" element= { userInfo ? <HomeScreen/> : <SigninScreen/>}/>
          <Route  path = "/signin" element= {<SigninScreen/>}/>
          <Route  path = "/signup" element= {<SignupScreen/>}/>
          <Route  path = "/create" element= {<CreateScreen/>}/>
          <Route path = "/:id" element= {<ViewScreen/>}/>
          <Route path = "/edit/:id" element= {<EditScreen/>}/>

        </Routes>
      </Router>
      
     
    </div>
  );
}

export default App;
