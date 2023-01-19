import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

interface LayerProps {
  id: string;
  name: string;
  activeLayerId: string | null | undefined;
  selectLayer: any;
  removeLayer: any;
}

function Layer({
  id,
  name,
  activeLayerId,
  selectLayer,
  removeLayer,
}: LayerProps) {
  return (
    <li style={{ cursor: "pointer", position: "relative", borderRadius: "5px", color: "#0b99d9", padding: "10px", marginTop: "10px", right: "0", border: "1px solid #86C2DE", display: "flex", flexDirection: "row", justifyContent: "space-between"}}
      className={`app-layer ${id === activeLayerId ? "active" : ""
        }`}
      onClick={() => selectLayer(id)}
    >
      <div className="layer-name" style={{ color: "#3182CE" }}>{name}</div>
      <button className="remove-btn" style={{ marginRight: "0", backgroundColor: "transparent", border: "none" }} onClick={(e) => removeLayer(e, id)}>
        <AiOutlineCloseCircle size={28} style={{color: "#3182CE"}} />
      </button>
    </li>
  );
}

export default Layer;
