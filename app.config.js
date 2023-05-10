import "dotenv/config";

export default {
  scheme: "acme",
  web: {
    bundler: "metro"
  },
  name: "mappy",
  slug: "mappy",
  android: {
    package: "com.poigrammer.mappy"
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