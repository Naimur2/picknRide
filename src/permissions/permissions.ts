const [libraryStatus, requestPermission] =
    ImagePicker.useMediaLibraryPermissions();
const [foreLocationStatus, requestForeLocationPermission] =
    Location.useForegroundPermissions();
const [error, setError] = React.useState();
const [camePermission, setCameraPermission] = React.useState(false);
const [microphonePermission, setMicrophonePermission] = React.useState(false);
const [mediaLibraryPermission, setMediaLibraryPermission] =
    React.useState(false);

const askPermission = async () => {
    try {
        const cameraPermission = await Camera.requestCameraPermissionsAsync();
        const microphonePermission =
            await Camera.requestMicrophonePermissionsAsync();
        const mediaLibraryPermission =
            await MediaLibrary.requestPermissionsAsync();
        return {
            cameraPermission,
            microphonePermission,
            mediaLibraryPermission,
        };
    } catch (err) {
        setError(err);
    }
};
React.useEffect(() => {
    requestPermission();
    requestForeLocationPermission();
    (async () => {
        const {
            cameraPermission,
            microphonePermission,
            mediaLibraryPermission,
        } = await askPermission();
        setCameraPermission(cameraPermission.status === "granted");
        setMicrophonePermission(microphonePermission.status === "granted");
        setMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
}, []);

if (
    !libraryStatus?.granted ||
    !foreLocationStatus?.granted ||
    !camePermission ||
    !microphonePermission ||
    !mediaLibraryPermission
) {
    return (
        <VStack
            _dark={{
                bg: "#000",
            }}
            bg="#fff"
            flex="1"
            alignItems={"center"}
            justifyContent="center"
        >
            <Spinner color={"#c00000"} size="lg" />
            <Text fontWeight={600}>Checking Permissiom</Text>
        </VStack>
    );
}
