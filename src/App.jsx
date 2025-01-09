import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import ErrorPage from "./pages/ErrorPage"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Home from "./pages/Home"
import MyBookings from "./pages/MyBookings"
import Notifications from "./pages/Notification"



export default function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="*" element={<ErrorPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/home" element={<Home />} />
            <Route path="/mybookings" element={<MyBookings />} />
            <Route path="/notification" element={<Notifications />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}


