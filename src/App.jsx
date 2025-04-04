import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <main style={{ fontFamily: "'Philosopher', sans-serif" }}>
        <Navbar />
        <Outlet />
      </main>
    </>
  );
}

export default App;
