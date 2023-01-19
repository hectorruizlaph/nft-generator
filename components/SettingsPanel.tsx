import React, { useContext } from "react";
import { BsArrowRightShort, BsFillCheckCircleFill } from "react-icons/bs";
import AppContext from "../context/AppContext";
import Button from "./Button";
import LayerPanel from "./LayerPanel";
import LayersPanel from "./LayersPanel";
import ProjectPanel from "./ProjectPanel";
import MediaQuery from 'react-responsive';

interface SettingsPanelProps {
  startGenerating: any;
}

const SettingsPanel = ({ startGenerating }: SettingsPanelProps) => {
  const { collectionSize, data, setShowResults } = useContext(AppContext);

  const style = {
    // Adding media query..
    "@media (max-width: 500px)": {
      display: "flex",
      flexDirection: "column"
    }
  };

  return (    
    <div className="row">
      <div className="column outer2">
      <video autoPlay loop muted id="video">
      <source src='/waves-vid.mp4' type="video/mp4" />
    </video>
        <LayersPanel />
        <Button
          onClick={startGenerating}
          theme="white"
          className="mt-3"
        >
          <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            Generate Collection
            <BsFillCheckCircleFill size={30} style={{ paddingLeft: "5px" }} />
          </div>
        </Button>
      </div>

      <div className="column" style={{marginTop: "-10px", textAlign: "center"}}>
        <div>
          <LayerPanel />
        </div>
      </div>

      <div className="column outer2">
        <div>
          <ProjectPanel />
        </div>
      </div>

    </div>
  );
};

export default SettingsPanel;
