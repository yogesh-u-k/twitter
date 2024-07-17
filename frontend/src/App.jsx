import { Navigate, Route , Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/login/LoginPage";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import Sidebar from "./components/common/Sidebar";
import RightPanel from "./components/common/RightPanel";
import NotificationPage from "./pages/notification/NotificationPage";
import ProfilePage from "./pages/profiles/ProfilePage";
import { ToastBar } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./components/common/LoadingSpinner";

function App() {
const {data:authUser, isLoading, error , isError}= useQuery({
  queryKey: ["authUser"],
  queryFn: async()=>{
    try{
      const res = await fetch('/api/auth/me', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      const data = await res.json();
      if(data.error) return null;
      if(!res.ok) throw new Error(data.error || 'Failed to fetch user');
      console.log("authUser is here:",data);
      return data;
     
    }
  
  catch(error){
    console.log(error);
    throw error;
  }
  },

  retry:false
})

if(isLoading) return (<div className="h-screen flex justify-center items-center">
<LoadingSpinner size="lg"/>
</div>)

  return (
 
    <div className='flex  max-w-6xl mx-auto' >
      {authUser && <Sidebar/> }
      <Routes>
        <Route path="/" element={authUser?<HomePage />:<Navigate to={"/login"}/>}/>
        <Route path="/login" element={!authUser?<LoginPage />:<Navigate to={"/"} />}/>
        <Route path="/signup" element={!authUser?<SignUpPage />: <Navigate to={"/"} />}/>
        <Route path="/notifications" element={authUser?<NotificationPage />:<Navigate to={"/login"} />}/>
        <Route path="/profile/:username" element={authUser?<ProfilePage />:<Navigate to={"/login"} />}/>
      </Routes>
      {authUser && <RightPanel/>}
     
      <ToastContainer/>

    </div>
  
  );
}

export default App;
