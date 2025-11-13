import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import WrittenFeedbacks from "./pages/WrittenFeedbacks/WrittenFeedbacks.jsx";
import WriteFeedback from "./pages/WriteFeedback/WriteFeedback";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import MyProfile from "./pages/MyProfile/MyProfile";
import MyWall from "./pages/MyWall/MyWall";
import UserFeedbackPage from "./pages/UserFeedbackPage/UserFeedbackPage";

function App() {
  return (
    <>
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/mywall" element={<MyWall />}></Route>
          <Route
            path="/writtenfeedbacks"
            element={<WrittenFeedbacks />}
          ></Route>
          <Route path="/writefeedback" element={<WriteFeedback />}></Route>
          <Route
            path="/writefeedback/:id"
            element={<UserFeedbackPage />}
          ></Route>
          <Route path="/myprofile" element={<MyProfile />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
