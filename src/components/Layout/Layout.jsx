import React from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import Alert from "./../Alert/Alert";

export default function Layout({ children }) {
  return (
    <section
      className="grid min-h-screen"
      style={{ gridTemplateRows: "min-content auto min-content" }}
    >
      <Alert />
      <Navbar /> <div className="m-auto">{children}</div> <Footer />
    </section>
  );
}
