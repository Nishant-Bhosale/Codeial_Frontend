import { Home, Login, Settings, Signup, UserProfile } from "../pages";
import { Loader, Navbar } from "./";
import { BrowserRouter as Router, Navigate, Route, Routes, Outlet } from "react-router-dom";
import { useAuth } from "../hooks";

function PrivateRoute(){
  const auth = useAuth();

  return(
    auth.user ? <Outlet/> : <Navigate to="/login"/>
  );
}

const Page404 = () => {
  return <h1>Error: 404 Page not found</h1>
}

function App() {
  const auth = useAuth();
  console.log('auth', auth); 

  if(auth.loading){
    return <Loader />
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route path="/login" element={<Login/>} />

          <Route path="/register" element={<Signup/>} />

          <Route element={<PrivateRoute/>}>
            <Route path="/settings" element={<Settings/>}/>
            <Route path="/user/:userId" element={<UserProfile/>}/>
          </Route>

          <Route element={<Page404/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
