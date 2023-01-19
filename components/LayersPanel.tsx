import React, { useContext, useState } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import {
  arrayMove,
  SortableContainer,
  SortableElement,
} from "react-sortable-hoc";
import AppContext from "../context/AppContext";
import { blendList } from "../helpers/constants";
import LayerI from "../types/LayerI";
import Layer from "./Layer";

function LayersPanel() {
  const { layers, setLayers, activeLayerId, setActiveLayerId } =
    useContext(AppContext);

  const [value, setValue] = useState("");

  const addLayer = (value: string) => {
    setLayers([
      ...layers,
      {
        id: Math.random().toString(16).slice(2),
        name: value,
        images: [],
        options: {
          bypassDNA: false,
          blend: blendList[0],
          opacity: 1,
        },
      },
    ]);
  };

  const removeLayer = (e: any, id: string) => {
    e.stopPropagation();
    setActiveLayerId(null);
    setLayers(layers.filter((layer) => layer.id !== id));
  };

  const selectLayer = (id: string) => {
    setActiveLayerId(id);
  };

  const SortableItem = SortableElement(({ name, id }: any) => (
    <Layer
      id={id}
      name={name}
      activeLayerId={activeLayerId}
      selectLayer={selectLayer}
      removeLayer={removeLayer}
    />
  ));

  const SortableList = SortableContainer(({ items }: any) => {
    return (
      <ul className="list-unstyled" >
        {items.map(({ id, name }: LayerI, index: any) => (
          <SortableItem key={`item-${id}`} index={index} name={name} id={id} />
        ))}
      </ul>
    );
  });

  const onSortEnd = ({ oldIndex, newIndex }: any) => {
    setLayers(arrayMove(layers, oldIndex, newIndex));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    addLayer(value);
    setValue("");
  };

  const isDisabled = () =>
    !value || layers.map((layer) => layer.name).includes(value);

    const inputStyle = {
      border: 'none',
      outline: "none",
      with: "50px"
    };

  return (
    <div className="layers-panel" style={{ }}>
      <h6 className="text-center mb-3" style={{fontSize: "20px"}}>Layers</h6>

      <SortableList
        items={layers}
        onSortEnd={onSortEnd}
        lockOffset={["0%", "10%"]}
        distance={1}
      />

      <form noValidate onSubmit={onSubmit} className="app-layer add-layer" style={{ cursor: "pointer", position: "relative", borderRadius: "5px", color: "#f3f4f8", padding: "5px", marginTop: "10px", right: "0", border: "1px solid #0B99D9", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <input
          type="text"
          placeholder="New Layer"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={inputStyle}
        />
        <button disabled={isDisabled()} style={{ backgroundColor: "transparent", border: "none"}}>
          <BsFillPlusCircleFill size={30} style={{width: "100%",  color: "#3182CE", minWidth: "30px", marginLeft: "-80%"}} />
        </button>
      </form>
    </div>
  );
}

export default LayersPanel;
