import React, { useContext } from "react";
import { BsLayers } from "react-icons/bs";
import AppContext from "../context/AppContext";
import { blendList } from "../helpers/constants";
import ImagesUploader from "./ImagesUploader";
import FormControl from "./FormControl";
import CheckBox from "./CheckBox";
import SelectBox from "./SelectBox";
import RangeBox from "./RangeBox";
import { dataURItoBlob } from "../core/generate";
import { layersNamesSchema, layersSchema, schema } from "../helpers/schemas";
import { showToast } from "../helpers/utils";

function LayerPanel() {
  const {
    activeLayerId,
    collectionName,
    collectionDesc,
    collectionSize,
    width,
    height,
    layers,
    setLayers,
  } = useContext(AppContext);

  const activeLayer = layers.find((layer) => layer.id === activeLayerId);

  const changeName = async (value: string) => {
    try {
      const newLayers = [...layers];
      const index = newLayers.findIndex((layer) => layer.id === activeLayerId);
      newLayers[index].name = value;

      await layersNamesSchema.validate({
        layers: newLayers,
      });

      setLayers([...newLayers]);
    } catch (error: any) {
      showToast(error.message, "error");
    }
  };

  const changeImages = async (
    imageList: any,
    addUpdateIndex: any,
    rarity: number
  ) => {
    const list: any = [];

    imageList.forEach((e: any, index: number) => {
      const item: any = {};

      if (rarity) {
        if (addUpdateIndex === index)
          item.rarity = parseFloat(rarity.toFixed(1)) ? rarity : 0;
        else {
          const r = imageList[addUpdateIndex].rarity;
          item.rarity = parseFloat(
            ((100 - r) / (imageList.length - 1)).toFixed(1)
          );
        }
      } else {
        // default rarity
        item.rarity = parseFloat((100 / imageList.length).toFixed(1));
      }

      // const blob = dataURItoBlob(e.data_url);
      item.data_url = e.data_url;
      // item.blob = URL.createObjectURL(blob);

      list.push(item);
    });

    const newLayers = [...layers];
    const index = newLayers.findIndex((layer) => layer.id === activeLayerId);

    newLayers[index].images = list;

    setLayers([...newLayers]);
  };

  const toggleDNA = (e: any) => {
    const newLayers = [...layers];
    const index = newLayers.findIndex((layer) => layer.id === activeLayerId);
    newLayers[index].options.bypassDNA = e.target.checked;
    setLayers([...newLayers]);
  };

  const chooseBlend = (e: any) => {
    const newLayers = [...layers];
    const index = newLayers.findIndex((layer) => layer.id === activeLayerId);
    newLayers[index].options.blend = e.target.value;
    setLayers([...newLayers]);
  };

  const changeOpacity = (e: any) => {
    const newLayers = [...layers];
    const index = newLayers.findIndex((layer) => layer.id === activeLayerId);
    newLayers[index].options.opacity = parseFloat(e.target.value);
    setLayers([...newLayers]);
  };

  if (!activeLayerId || layers.length === 0)
    return (
      <div className="text-center" style={{padding: "% 0 15% 0" }}>
        <BsLayers size={50} color="#86C2DE" />
        <h5 className="mt-3" style={{ color: "#86C2DE" }} >No layer selected</h5>
      </div>
    );

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      {/* Name */}
      <div className="col-md-4" id="card" style={{ border: "1px solid #86C2DE", borderRadius: "15px", padding: "5% 5% 50px 5%", minWidth: "100%" }}>
          <h6 id="left" className="text-center mb-3" style={{ fontSize: "20px", textAlign: "left" }}>Layer Name</h6>
          <FormControl
            label=""
            type="text"
            value={activeLayer?.name || ""}
            onChange={changeName}
            className="mb-4"
          />
        {/* Images */}
        <div className="col-md-4" id="card" style={{ border: "1px solid #86C2DE", borderRadius: "15px", padding: "3% 3% 0 3%", minWidth: "100%" }}>
          <h6 className="text-center mb-3" style={{ fontSize: "20px", padding: "3% 0 3% 0", border: "1px solid #86C2DE", borderRadius: "15px" }}>Images</h6>
          <label className="form-title mb-2"></label>
          <ImagesUploader onChange={changeImages} className="mb-4" />
        </div>
      </div>
    </div>
  );
}

export default LayerPanel;
