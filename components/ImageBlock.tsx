import React, { useState } from "react";
import { BiPencil } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import RangeBox from "./RangeBox";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Tooltip } from '@nextui-org/react';



interface ImageBlockProps {
  image: any;
  index: number;
  onImageRemove: any;
  onImageUpdate: any;
  onChange: any;
  imageList: any;
}

const ImageBlock = ({
  image,
  index,
  onImageRemove,
  onImageUpdate,
  onChange,
  imageList,
}: ImageBlockProps) => {
  return (
    <div className="image-item box">
      <img src={image["data_url"]} alt="" className="img-fluid" />
      <div className="btn-wrapper">
        <button className="remove" style={{ marginRight: "0", backgroundColor: "transparent", border: "none" }} onClick={() => onImageRemove(index)}>
          <MdDeleteForever size={28} style={{ color: "#3182CE" }} />
        </button>
        <button className="update" style={{ marginRight: "0", backgroundColor: "transparent", border: "none" }} onClick={() => onImageUpdate(index)}>
          <FaEdit size={25} style={{ color: "#3182CE" }} />
        </button>
      </div>

      <span className="rarity-value box">{image.rarity}%</span>

      <RangeBox
        min={0.2}
        max={100}
        value={image.rarity ? image.rarity : 1}
        onChange={(e: any) =>
          onChange(imageList, index, parseFloat(e.target.value))
        }
      />

      <div className="d-flex justify-content-between rare-common">
        <Tooltip content={"Rare"} rounded color="primary" placement="bottom">
          <span>R</span>
        </Tooltip>
        <Tooltip content={"Common"} rounded color="primary" placement="bottom">
          <span>C</span>
        </Tooltip>
      </div>
    </div>
  );
};

export default ImageBlock;
