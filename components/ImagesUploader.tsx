import React, { useContext } from "react";
import ImageUploading from "react-images-uploading";
import AppContext from "../context/AppContext";
import ImageBlock from "./ImageBlock";
import { Grid } from '@nextui-org/react';


interface ImagesUploaderProps {
  onChange: any;
  className?: string;
}

const ImagesUploader = ({ onChange, className }: ImagesUploaderProps) => {
  const { layers, activeLayerId } = useContext(AppContext);
  const activeLayer = layers.find((layer) => layer.id === activeLayerId);


  return (
    <div className={`images-uploader ${className}`}>
      <ImageUploading
        multiple
        value={activeLayer?.images || []}
        onChange={onChange}
        dataURLKey="data_url"
        acceptType={["gif", "png"]}
      >
        {({
          imageList,
          onImageUpload,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <>

            <div className="image-items row" style={{ display: "flex", margin: "-90px 0 5% 0", justifyContent: "center" }}>
                  {imageList.map((image, index) => (
                    <div key={index} className="col-sm-4" style={{ padding: "5%", display: "flex", flexWrap: "wrap", maxWidth: "90px" }}>
                      <ImageBlock
                        image={image}
                        index={index}
                        onImageUpdate={onImageUpdate}
                        onImageRemove={onImageRemove}
                        imageList={imageList}
                        onChange={onChange}
                      />

                    </div>
                  ))}
            </div>

            <button style={{
              outline: "3px dashed #86C2DE",
              outlineOffset: "-10px",
              minHeight: "20%",
              minWidth: "100%",
              borderRadius: "20px",
              borderColor: "transparent",
              padding: "50px"
            }}
              className={`box upload-btn ${isDragging ? "dragging" : undefined
                }`}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or drop images here
            </button>
          </>
        )}
      </ImageUploading>
    </div>
  );
};

export default ImagesUploader;
