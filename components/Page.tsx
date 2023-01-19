import React from "react";
import { ToastContainer } from "react-toastify";
import { withRouter } from "../helpers/route";

interface PageProps {
  children?: any;
}

const Page = ({ children }: PageProps) => {
  return (
    <div>
      <div className="all-page">
        <ToastContainer draggable={false} position="top-center" icon={false} />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default withRouter(Page);
