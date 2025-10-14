import React from "react";
import DenialForm from "./components/DenialForm";
import Dashboard from "./components/Dashboard";

const App = () => {
  return (
    <div style={{ fontFamily: "sans-serif", padding: 20 }}>
      <h1>🎯 AR Mastery Platform</h1>
      <p>Transform into a top-performing AR Specialist in 90 days.</p>
      <DenialForm />
      <hr />
      <Dashboard />
    </div>
  );
};

export default App;
