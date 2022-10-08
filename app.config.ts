import { ConfigContext, ExpoConfig } from "@expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    name: "PickNRide",
    slug: "PickNRide",
    extra: {
        GOOGLE_MAP_KEY: "AIzaSyDS-lAgjgs0rT8FzzB9woxe8sTPPh6v7F4",
    },
    androidStatusBar: {
        hidden: true,
    },
    jsEngine: "hermes",
    android: {
        ...config.android,
        softwareKeyboardLayoutMode: "pan",
        package: "com.picknride",

        permissions: [
            "ACCESS_BACKGROUND_LOCATION",
            "ACCESS_FINE_LOCATION",
            "ACCESS_COARSE_LOCATION",
            "CAMERA",
            "FOREGROUND_SERVICE",
            "READ_EXTERNAL_STORAGE",
            "WRITE_EXTERNAL_STORAGE",
        ],
        versionCode: 1,
        config: {
            googleMaps: {
                apiKey: "AIzaSyDS-lAgjgs0rT8FzzB9woxe8sTPPh6v7F4",
            },
        },
    },
});
