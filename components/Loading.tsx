import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

interface LoadingProps {}

const Loading = () => {
  return (
    <div className="loading">
      <div className="title">Generating Collection...</div>
      <AiOutlineLoading size={70} className="icon" />
    </div>
  );
};

export default Loading;
