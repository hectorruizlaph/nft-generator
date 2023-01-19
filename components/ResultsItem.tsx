import React, { useState } from "react";

interface ResultsItemProps {
  image: any;
  gif: any;
}

const ResultsItem = ({ image, gif }: ResultsItemProps) => {
  const [showGif, setShowGif] = useState(false);

  if (!gif)
    return (
      <div className="collection-block mt-4">
        <img src={image} className="img-fluid" alt="result-image" />
      </div>
    );

  return (
    <div className="collection-block mt-4">
      <img
        src={showGif ? gif : image}
        className="img-fluid"
        alt="result-image"
      />
    </div>
  );
};

export default ResultsItem;
