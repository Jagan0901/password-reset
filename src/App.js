import "./App.css";
import { Routes, Route } from "react-router-dom";
import { SignUp } from "./Pages/SignUp";
import { Reset } from "./Pages/Reset";
import { CodeVerify } from "./Pages/CodeVerify";
import { EndCard } from "./Pages/EndCard";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/codeSend" element={<Reset />} />
        <Route path="/codeVerify" element={<CodeVerify />} />
        <Route path="/endCard" element={<EndCard />} />
      </Routes>
    </div>
  );
}

export default App;
