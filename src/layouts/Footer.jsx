import React from "react";

export default function Footer() {
  return (
    <div className="fixed bottom-0 left-0 bg-blue-300 w-full">
      <nav className="flex items-center justify-center p-3">
        <h4 className="flex items-center gap-2">
          <i className="fa fa-copyright"></i>
          PT.Prodemy 23.05, 2023. All Rights Reserved
        </h4>
      </nav>
    </div>
  );
}
