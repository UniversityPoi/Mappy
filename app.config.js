import "dotenv/config";

export default {
    name: "mappy",
    slug: "mappy",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.poigrammer.mappy"
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    plugins: [
      [
        "@rnmapbox/maps",
        {
          "RNMapboxMapsImpl": "mapbox",
          "RNMapboxMapsDownloadToken": process.env.MAPBOX_SECRET_KEY
        }
      ]
    ],
    extra: {
      eas: {
        projectId: "c725ddc5-93d1-446e-aebd-0d33c83ce1fa"
      },
      MAPBOX_PUBLIC_KEY: process.env.MAPBOX_PUBLIC_KEY,
    }
}