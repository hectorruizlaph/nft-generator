import * as Yup from "yup";

Yup.addMethod(
  Yup.array,
  "unique",
  function (message, mapper = (a: any) => a.name) {
    return this.test("unique", message, function (list: any) {
      return list.length === new Set(list.map(mapper)).size;
    });
  }
);

const schema = Yup.object().shape({
  collectionName: Yup.string().required("Collection name is required"),
  collectionDesc: Yup.string().required("Collection description is required"),
  collectionSize: Yup.number()
    .min(1, "Minimum collection size is 1")
    .max(10000, "Maximum collection size is 10000"),
  width: Yup.number().min(50, "Items width should be at least 50"),
  height: Yup.number().min(50, "Items height should be at least 50"),
  layers: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Layer name is required"),
        images: Yup.array().min(1, "Please add at least 1 image in each layer"),
      })
    )
    .unique("Layer name must be unique")
    .min(1, "Please add at least 1 layer"),
});

const collectionNameSchema = Yup.object().shape({
  collectionName: Yup.string().required("Collection name is required"),
});

const collectionDescSchema = Yup.object().shape({
  collectionDesc: Yup.string().required("Collection description is required"),
});

const collectionSizeSchema = Yup.object().shape({
  collectionSize: Yup.number()
    .min(1, "Minimum collection size is 1")
    .max(10000, "Maximum collection size is 10000"),
});

const widthSchema = Yup.object().shape({
  width: Yup.number().min(50, "Items width should be at least 50"),
});

const heightSchema = Yup.object().shape({
  height: Yup.number().min(50, "Items height should be at least 50"),
});

const layersSchema = Yup.object().shape({
  layers: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Layer name is required"),
        images: Yup.array().min(1, "Please add at least 1 image in each layer"),
      })
    )
    .unique("Layer name must be unique")
    .min(1, "Please add at least 1 layer"),
});

const layersNamesSchema = Yup.object().shape({
  layers: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Layer name is required"),
      })
    )
    .unique("Layer name must be unique")
    .min(1, "Please add at least 1 layer"),
});

export {
  schema,
  collectionNameSchema,
  collectionDescSchema,
  collectionSizeSchema,
  widthSchema,
  heightSchema,
  layersSchema,
  layersNamesSchema,
};
