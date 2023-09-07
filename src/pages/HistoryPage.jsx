import React from "react";
import Header from "../layouts/Header";
import SideBar from "../layouts/Sidebar";
import Footer from "../layouts/Footer";
import TransactionHistory from "../components/TransactionHistory";
import { useState } from "react";

export default function HistoryPage() {
  const [sideBar, setSideBar] = useState(false);
  return (
    <>
      <Header>
        {sideBar ? (
          <i
            className="	fa fa-close text-xl"
            onClick={() => setSideBar(false)}
          ></i>
        ) : (
          <i
            className="fa fa-bars text-xl"
            onClick={() => setSideBar(true)}
          ></i>
        )}
      </Header>
      <div className="flex gap-3">
        {sideBar ? <SideBar /> : null}
        <TransactionHistory />
      </div>
      <Footer />
    </>
  );
}
