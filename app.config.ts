import { ExpoConfig, ConfigContext } from "@expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    name: "PickNRide",
    extra: {
        GOOGLE_MAP_KEY: "AIzaSyDS-lAgjgs0rT8FzzB9woxe8sTPPh6v7F4",
    },
});
