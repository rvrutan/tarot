import React, { useState } from "react";
import BasicReading from "./components/BasicReading";
import logo from "../src/assets/logo.png";
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
