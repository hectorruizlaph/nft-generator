import React, { useEffect, useState } from "react";
import ResultsPanel from "../components/ResultsPanel";
import SettingsPanel from "../components/SettingsPanel";
import Page from "../components/Page";
import AppContext from "../context/AppContext";
import { dataURLtoFile, generateNFT } from "../core/generate";
import { schema } from "../helpers/schemas";
import {
  createDna,
  filterDNAOptions,
  isDnaUnique,
  layersSetup,
  showToast,
} from "../helpers/utils";
import CollectionI from "../types/CollectionI";
import DataI from "../types/DataI";
import LayerI from "../types/LayerI";
import Loading from "../components/Loading";
import { background } from "../helpers/config";
import { auto } from "@popperjs/core";



const Application = () => {
  const [amount, setAmount] = useState(0);
  const [data, setData] = useState<DataI | undefined>();
  const [showResults, setShowResults] = useState<boolean>(false);
  const [layers, setLayers] = useState<LayerI[]>([]);
  const [activeLayerId, setActiveLayerId] = useState<string | null>(null);
  const [collectionName, setCollectionName] = useState<string>("");
  const [collectionDesc, setCollectionDesc] = useState<string>("");
  const [collectionSize, setCollectionSize] = useState<number>(5);
  const [width, setWidth] = useState<number>(512);
  const [height, setHeight] = useState<number>(512);
  const [useGif, setUseGif] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if ("indexedDB" in window) {
      let request = window.indexedDB.open("collection", 1);

      request.onupgradeneeded = (event: any) => {
        const db = event.target.result;
        db.createObjectStore("collection", {
          keyPath: "collectionId",
        });
      };

      request.onsuccess = (event: any) => {
        const db = event.target.result;
        var transaction = db.transaction(["collection"]);
        var objectStore = transaction.objectStore("collection");
        var collectionReq = objectStore.get("app-collection");
        collectionReq.onsuccess = (e: any) => {
          const collection = collectionReq.result;
          if (collection) {
            setCollectionName(collection.name);
            setCollectionDesc(collection.description);
            setCollectionSize(collection.size);
            setWidth(collection.width || 0);
            setHeight(collection.height || 0);
            setLayers(collection.layers || []);
            setUseGif(collection.useGif || false);
          }
        };
      };
    }
  }, []);

  useEffect(() => {
    if ("indexedDB" in window) {
      const currentCollection: CollectionI = {
        name: collectionName,
        description: collectionDesc,
        size: collectionSize,
        width,
        height,
        layers,
        useGif,
        collectionId: "app-collection",
      };

      let request = window.indexedDB.open("collection", 1);

      request.onsuccess = (event: any) => {
        const db = event.target.result;
        var collectionObjectStore = db
          .transaction(["collection"], "readwrite")
          .objectStore("collection");
        var request = collectionObjectStore.get("app-collection");

        request.onsuccess = (event: any) => {
          collectionObjectStore.put(currentCollection);
        };
      };
    }
  }, [
    collectionName,
    collectionDesc,
    collectionSize,
    width,
    height,
    useGif,
    layers,
  ]);

  const validation = async (layersClone: any) => {
    try {
      await schema.validate({
        collectionName,
        collectionDesc,
        collectionSize,
        width,
        height,
        layers,
      });
      let layerConfigIndex = 0;
      let failedCount = 0;
      const uniqueDnaTorrance = 10000;
      let editionCount = 1;
      var dnaList = new Set();

      const layerConfigurations = [
        {
          growEditionSizeTo: collectionSize,
          layersOrder: layersClone,
        },
      ];

      while (layerConfigIndex < layerConfigurations.length) {
        const layers = layersSetup(layersClone);

        while (
          editionCount <=
          layerConfigurations[layerConfigIndex].growEditionSizeTo
        ) {
          let newDna = createDna(layers);
          if (isDnaUnique(dnaList, newDna)) {
            dnaList.add(filterDNAOptions(newDna));
            editionCount++;
          } else {
            failedCount++;
            if (failedCount >= uniqueDnaTorrance) {
              const e = new Error(
                `You need more layers or elements to grow your edition to ${layerConfigurations[layerConfigIndex].growEditionSizeTo} artworks!`
              );
              e.name = "ValidationError";
              throw e;
            }
          }
        }

        layerConfigIndex++;
      }
    } catch (error) {
      throw error;
    }
  };

  const startGenerating = async () => {
    try {
      const layersClone: any = [...layers];

      await Promise.all(
        layersClone?.map(async (layer: any) => {
          await Promise.all(
            layer.images?.map(async (image: any) => {
              const extension = image.data_url.substring(
                "data:image/".length,
                image.data_url.indexOf(";base64")
              );

              const file = dataURLtoFile(
                image.data_url,
                `${Math.random().toString(16).slice(2)}.${extension}`
              );

              image.file = file;
            })
          );
        })
      );

      await validation(layersClone);
      await generate();
    } catch (error: any) {
      console.log(error);
      if (error.name !== "ValidationError") setError(error);
      showToast(error.message, "error");
    }
  };

  const generate = async () => {
    try {
      window.scrollTo(0, 0);

      const newCollection: CollectionI = {
        name: collectionName,
        description: collectionDesc,
        size: collectionSize,
        width,
        height,
        layers,
        results: [],
        metadata: [],
        collectionId: Math.random().toString(16).slice(2),
      };

      setLoading(true);
      await generateNFT(newCollection, useGif, (data: any) => {
        if (data.error) return showToast(data.error, "error");

        newCollection.results = data.collections;
        newCollection.metadata = data.metadata;
        setData(data);
        setShowResults(true);
        setLoading(false);
      });
    } catch (error: any) {
      setLoading(false);
      throw error;
    }
  };

  const handleGenerate = async () => {
    try {
      await generate();
    } catch (error: any) {
      console.log(error);
      if (error.name !== "ValidationError") setError(error);
      showToast(error.message, "error");
    }
  };

  const render = () => {
    if (loading) return <Loading />;

    if (error)
      return (
        <ResultsPanel
          data={data}
          setData={setData}
          setError={setError}
          generate={handleGenerate}
        />
      );

    if (!showResults)
      return <SettingsPanel startGenerating={startGenerating} />;

    return (
      <ResultsPanel
        data={data}
        setData={setData}
        setError={setError}
        generate={handleGenerate}
      />
    );
  };

  return (
    <>
      <div style={{
        maxWidth: "none!important",
        paddingLeft: "32px",
        paddingRight: "32px",
        width: "100%",
        minHeight: "100vh",
        fontSize: "1em",
        fontWeight: "400",
        lineHeight: "1.5",
        flexGrow: "1",
        margin: "0 auto",
        position: "relative",
      }}>

        <Page title="NFT Generator">
          <AppContext.Provider
            value={{
              layers,
              setLayers,
              activeLayerId,
              setActiveLayerId,
              collectionName,
              setCollectionName,
              collectionDesc,
              setCollectionDesc,
              collectionSize,
              setCollectionSize,
              useGif,
              setUseGif,
              width,
              setWidth,
              height,
              setHeight,
              loading,
              data,
              showResults,
              setShowResults,
            }}
          >
            {render()}
          </AppContext.Provider>
        </Page>
      </div>
    </>
  );
};

export default Application;
