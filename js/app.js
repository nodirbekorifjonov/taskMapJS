require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/Graphic",
  "esri/layers/GraphicsLayer",
  "esri/symbols/PictureMarkerSymbol",
  "esri/PopupTemplate",
  "esri/widgets/Popup",
], function (
  esriConfig,
  Map,
  MapView,
  Graphic,
  GraphicsLayer,
  PictureMarkerSymbol,
  PopupTemplate,
  Popup
) {
  // API Key
  esriConfig.apiKey =
    "AAPK5dc0411b605d49a99d2a7fd4599e7299kyM_2RdSHjmX9Widny1Uf8bDIEM9pDtOE1vifUTqNmlUHYGcJxXaJuYUcpnZ14TW";

  const map = new Map({
    basemap: "arcgis-navigation",
  });

  const view = new MapView({
    map: map,
    center: [69.25998178194466, 41.3062758938635],
    container: "viewDiv",
    zoom: 11,
  });

  const graphicsLayer = new GraphicsLayer();
  map.add(graphicsLayer);

  const point = {
    type: "point",
    longitude: 69.336241,
    latitude: 41.34226,
  };

  const iconSvg = "assets/Work.svg";
  const markerSymbol = new PictureMarkerSymbol({
    url: iconSvg,
    width: "20px",
    height: "20px",
  });

  const popupTemplate = new PopupTemplate({
    title: "Работа:",
    content: "Министерство цифровых технологий.",
  });

  const pointGraphic = new Graphic({
    geometry: point,
    symbol: markerSymbol,
    popupTemplate: popupTemplate,
  });

  graphicsLayer.add(pointGraphic);

  const popup = new Popup({
    view: view,
  });

  view.on("click", function (event) {
    view.hitTest(event).then(function (response) {
      if (response.results.length) {
        const graphic = response.results[0].graphic;
        if (graphic && graphic.popupTemplate) {
          popup.open({
            features: [graphic],
            location: event.mapPoint,
          });
        }
      }
    });
  });
});
