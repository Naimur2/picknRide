import GradientBtn from "@components/GradientBtn/GradientBtn";
import Scroller from "@components/Scroller/Scroller";
import config from "@config";
import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useValidateCarTripRequestMutation } from "@store/api/v2/tripApi/tripApiSlice";
import convertToBase64 from "@utils/convertToBase64";
import { Camera } from "expo-camera";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import {
    Center,
    Factory,
    HStack,
    Image,
    Input,
    Pressable,
    Spinner,
    Text,
    VStack,
} from "native-base";
import React, { useState } from "react";
import { Background, Platform, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { IValidateCarTripData } from "./ScanQrCode.types";

export default function ScanQrCode() {
    const navigation = useNavigation();

    const [flashOn, setFlashOn] = React.useState(false);
    const [cameraPhoto, setCameraPhoto] = React.useState<any>(null);
    const [imageUri, setImageUri] = React.useState<string>("");
    const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
    const inputRef = React.useRef<any>(null);

    const [validateCarTrip, validationResult] =
        useValidateCarTripRequestMutation();

    // console.log("validationResult", validationResult);

    const handleNavigation = (tripData: IValidateCarTripData | null) => {
        if (!config.DEV_MODE && tripData) {
            console.log(config.DEV_MODE, tripData);
            const data: IValidateCarTripData = tripData;

            // navigation.navigate("StartEndRide", {
            //     ...data,
            //     type: "START",
            // });
        } else {
            console.log(config.DEV_MODE, tripData);
            const data: IValidateCarTripData = {
                isValidVehicle: true,
                vehicleNo: "123456",
                tripToken: "123456",
            };
            // navigation.navigate("StartEndRide", {
            //     type: "START",
            //     data: data,
            // });
        }
    };

    React.useLayoutEffect(() => {
        setIsLoaded(true);
        return () => {
            setIsLoaded(false);
        };
    }, [navigation]);

    const LinGrad = Factory(LinearGradient);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTransparent: true,
            headerShown: false,
            unmountOnBlur: true,
        });
    }, [navigation]);

    const camRef = React.useRef<Camera>(null);

    const takePicture = React.useCallback(async () => {
        if (camRef.current) {
            const photo = await camRef.current.takePictureAsync();
            const base64 = await convertToBase64(photo.uri);
            setImageUri(photo.uri);
            setCameraPhoto(base64);
        }
    }, []);

    const handleReset = React.useCallback(() => {
        setCameraPhoto(null);
    }, []);

    const handleSubmit = React.useCallback(async () => {
        const { status, granted } =
            await Location.getForegroundPermissionsAsync();
        const hasImageOrNumber = cameraPhoto || inputRef?.current;
        if (status !== "granted" || !granted) {
            alert("Permission to access location was denied");
        } else if (!hasImageOrNumber) {
            alert("Image or number is required");
        } else {
            if (!config.DEV_MODE) {
                const location = await Location.getCurrentPositionAsync({});
                const res = await validateCarTrip({
                    numberPlateImage: cameraPhoto,
                    vehicleNo: inputRef?.current as string,
                    mobileLatitude: location.coords.latitude,
                    mobileLongitude: location.coords.longitude,
                }).unwrap();
                handleNavigation(res?.data);
            } else {
                const demoData = {
                    numberPlateImage:
                        "/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCADqAeIDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9U6KKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKK4r4zfFrRfgX8Mdf8d+Io7ybRtFhWa4jsI1knYM6oAisygks46kD3oA7Wivx++Ln/AAWs8Z6xNNa/DjwXpfhyzPyrfa47Xt0f9pUUpGh9j5g/p8t+LP8AgoF+0P40uGlvvitrtqWBG3SXTT1AxjgW6p+fXv1oA/olor+bvSf2zPjvoswlt/jB40kYMGxd63cXK5HtIzDHt0NfSPwR/wCCwnxc8D6hbwePobH4h6IWUSu8EdlfxrwPkkiUI2Bk4dCSf4h1oA/bOivNfgD+0N4K/aV8BQeK/BGpfbLMt5VzazKEubKbGTFMmTtb3BII5BI5r0qgAoor8g/21f8Agoh8cfgz+1B468GeFfEtnY+H9KngjtbeTSraZkDW0UjZd0LH5nY8nvQB+vlFfgt/w9g/aS/6G/T/APwSWn/xuj/h7B+0l/0N+n/+CS0/+N0AfvTRX4Lf8PYP2kv+hv0//wAElp/8bo/4ewftJf8AQ36f/wCCS0/+N0AfvTRX5e/8E4P23PjX+0h+0FP4a8Zazb6t4dttGuL6dLfTIIPLdXjRGLogPV8Yzzmv1CoAKK+Rf+Cmn7Q3jf8AZr+BegeJfAWpQ6Xq954kg06aae1juAYGtbqQrtkBAO6JDnGePevzQ/4ewftJf9Dfp/8A4JLT/wCN0AfvTRX4Lf8AD2D9pL/ob9P/APBJaf8Axuj/AIewftJf9Dfp/wD4JLT/AON0AfvTRX4Lf8PYP2kv+hv0/wD8Elp/8boH/BV79pJiAPF+nk/9gS0/+N0AfvTRWJ4IutTvfBegXGtI0esTafbyXqMgQrOY1MgKjgfNnjtW3QAUV+D2o/8ABVr9o+31C6iTxfp4SOVlUf2JadASB/yzqv8A8PYP2kv+hv0//wAElp/8boA/emivwW/4ewftJf8AQ36f/wCCS0/+N0f8PYP2kv8Aob9P/wDBJaf/ABugD96aK/Bb/h7B+0l/0N+n/wDgktP/AI3X6G/8Evf2lPib+0x4P8daz8Q7+PU4dOv7a00+4hsYrZNxjd5k/dqNxAMR56bh60AfblFFFABRXxn+23/wUi8Mfstzz+FPD1pD4s+IxiDtZM5+x6cG5U3LKQSxHzCJSGIwSUBUn8uviD/wUe/aF+Ieoy3M3xEvtBgb7ln4fVbGKIZzgFBvP1ZmPvQB/QjRX843hv8Abg+PvhW4Say+Lviyd1bcBqWpPfL1B5WcuCOOhHr6mvuT9lP/AILEXV7rVp4c+N9naxWs5WKLxXpUBj8pjgbrqEEjaeSXiA28fIRkgA/VWiobS7g1C1hurWaO5tpkWSKaFgySIRkMpHBBBBBFTUAFFeQ/tcfETXPhP+zb4/8AF/hq5Sz13SdONxaTyRLKqPvUZKsCDwT1Ffjp/wAPYP2kv+hv0/8A8Elp/wDG6AP3por8Fv8Ah7B+0l/0N+n/APgktP8A43R/w9g/aS/6G/T/APwSWn/xugD96aK/Bb/h7B+0l/0N+n/+CS0/+N0f8PYP2kv+hv0//wAElp/8boA/emivCf2HfiV4v+MP7Lvgrxj46mFx4l1ZbqWaZbdIBJGLqZIWCIAADEqEYHI5717tQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABXhP7cngLX/ih+yr4+8K+FtNk1jX9Ugt4bSyhZVaVvtUJPLEKAACSSQAASTXu1FAH5V/AD/gi0sltbap8YfFUkcrYc+H/DbL8vfbLcupyexVE+jnrX214H/YP/Z/+H1uItM+FPh27IAHm61a/wBpyZBzndcmQg59MV71RQB5P4o/ZN+C3jLTXsdW+FfhGeFlKhodHgglTPXZLGquh4HKkdBX5Wf8FEP+CcNt+zrpJ+Ifw7kurrwKZli1DTbp/Nl0pnYLGyyHl4mYhfmyykrktuyP2rryn9rDS9P1j9mD4s22qqrWH/CK6nLIzLu2FLWR1cDHVWUMPdRQB+GP7C37R+ofs1/tB+HtZW6kTw3qdxHpuu2u8iOS1kYKZCOhaInzF/3SMgMa/okr+Vev6jfA8lzN4L0CS92/bG0+3afYSR5hjXdgntnNAG3Xz38Sv2AfgL8X/HGqeL/F3gT+1vEWqOr3d5/bF/D5jKiop2RzqgwqKOAOlfQlFAHyr/w64/Zi/wCiZ/8Alf1T/wCSaP8Ah1x+zF/0TP8A8r+qf/JNfVVFAHyr/wAOuP2Yv+iZ/wDlf1T/AOSa/E39pb/hCIvjt4ztfhxpSaP4JstQey023juZrgPHFiMyiSV3ciRlaQZPAcDjFfu5+3f8cP8AhQH7L/jLxFb3H2fWruD+ydJIOH+13AKKy/7UaeZL/wBsjX8+/wAPfA+pfEzx34e8J6PH5uqa3fw6fbKRwHkcICfRRnJPYAmgD9gv+CNvwP8A+EJ+Bus/EO+t9mpeMLzy7VmHIsbcsikem6UzE+oRD6V+g1c98PPA+m/DPwH4e8JaPH5el6JYQ6fbDHJSNAgJ9WOMk9ySa6GgDz741/APwH+0V4XtPDvxC0L/AISDRrW8XUIbb7ZPbbZ1R41fdDIjH5ZXGCcfN0yBXi3/AA64/Zi/6Jn/AOV/VP8A5Jr6qooA+Vf+HXH7MX/RM/8Ayv6p/wDJNH/Drj9mL/omf/lf1T/5Jr6qooA/G3/gqP8As+/An9mnwr4Q0T4feC00fxlrd1JdS3f9rXtyYbKJdpGyWd1BeR1w2OkT18+/8E7/AIH/APC9v2qvCWm3Nv5+iaLJ/bupgjKmG3ZWVGHcPKYkI9HNQf8ABQX44f8AC+v2qPF+sW0/n6JpUv8AYmlkNlTb25ZS6n+68plkHtIK/Q3/AII0fBD/AIQ/4K678R76326h4svPs9mzDkWVsWTI9N0xlz6iNDQB+h1FFFAHyxN/wS9/ZluJnlk+Gm53Ysx/t7Uxkk5P/LzTP+HXH7MX/RM//K/qn/yTX1VRQB8q/wDDrj9mL/omf/lf1T/5Jrm/iV/wT1/ZQ+Fvw+8R+L9Y+GuzTNDsJtQn/wCKg1MFljQttX/SfvNjaB3JAr7Or88v+Cy3xw/4Q/4K6H8OLG42ah4tu/tF4qnkWVuVfB9N8xix6iNxQB+NV7NHdXk80NulpFJIzpbxszLEpOQgLEsQBxySeOSa/op/Yb+B/wDwz/8Asx+DPDFxb/Z9Zmtv7T1YMMN9rnxI6t7oCsX0jFfi5/wT7+B//C+f2p/B+j3Nv5+iaXL/AG3qgIypt7chgjD+68hijPtJX9DlABXiH7Zn7QsP7Mv7PviTxkrx/wBtFBYaNFIARJfSgiLg8EIA0hHdY2Fe31+SX/Bbn4mTXHjD4dfD6JttvZ2Muu3ChuHeWRoYsj/ZEE3/AH8NAH536Fo3in44/Ey0022a58Q+L/E2oiMSTyF5bi4lfl3c+5LFj0AJPAr93P2YP+Ce/wALf2d/CdjHd6Bpvi/xiYv9O8QaraLOzSH7wgR8iJB0G0biPvE1+f3/AARh+FsHir9oDxH4zu7bz4vCmk7bZyOIrq6Yxq2fXykuR/wI+lftFQB5r8Sf2bPhd8XNEm0rxX4F0PVLeQYEhs0injOMBo5kAdCBxlWFfhj+3R+yFffsi/FgaVBNNqPg/WEe60PUpgN7RggPBIRwZIyygkcEMjYG7aP6GK+L/wDgrR8Krf4gfsk6rri2/m6r4SvLfVLd1Hz+W0iwzrn+7sl3n/rkPSgDx7/gjv8AtTXHinw9qXwZ8RX0lxfaNEb/AECWd8sbPIEtsCf+ebMGUcna7AYVAB+mNfzhfsW/E2f4R/tTfDbxFFIyQDV4bG7Cn71vcHyJcjocJISM91HpX9HtAHPfEDwDoPxS8Gat4U8T2H9p6BqsP2e8s/Okh82PION8bKy8gcgg187f8OuP2Yv+iZ/+V/VP/kmvqqigD5V/4dcfsxf9Ez/8r+qf/JNH/Drj9mL/AKJn/wCV/VP/AJJr6qooA/M39vX9j/8AZs/Zp/Zt1/xPpHw9S08UXbx6Xosj63qMm26lJ+fa9wVbZGssmGBBKAEYNflr8J/hzqPxe+JnhjwXpI/0/XdQhsI325Ee9wGkYf3VXLH2U19xf8Fl/jf/AMJh8atC+HFjcbtP8J2f2i8RTwb25VXwfXbCIsHsZHFXP+CMPwP/AOEo+LPiP4m39vusvDFr9h092HBvLhSHZT6pCHB/67rQB+u/g/wrp3gXwnovhvR4Ps2laRZQ2FpD/ciiQIg/JRWvRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFfA/wDwVx/aYs/hp8FG+GWm3O7xT4yQLOkbDda6crgyO3p5pXygMcjzecrX0b+1h+1R4W/ZQ+Gdx4l12RLzVpw0WkaGkgWbUJwB8o4O1FyC74wo9WKqf5/fHvjrxp+0h8WrvXdXa48Q+L/EV4qR29rGzs7sQkUEMYyQoG1FUdgKAOt/Y7+BN5+0V+0N4R8IRWzXGmG6W91d9pKxWETBpix7bhiMZ/ikUd6/pAr5P/4J6/sZwfsp/C83WtwQyfETX0WXV51YOLVBzHaIw4wucsRwzk8kKtfWFABRRRQAUUVleK/E2neCvC+seIdXnFrpWk2c19dzHpHDEhd2/BVNAH5G/wDBaL44f8JH8TvDHwvsLjdZ+HLb+0tRRDwbydR5asPVIQGHtcGsP/gjd8D/APhNvjprHxDvrffpvg+z2WrMODfXAZFI9dsQmJ9CyH0r4p+MHxK1H4xfFLxT421UkXuu6hNfNHnIiVmJSMH+6i7VHsor92/+CcPwP/4Ub+yn4UtLq38jW9fX+39S3DDCSdVMaEdQVhEKkdmDetAH09RRRQAUUUUAFeDftyfHD/hn/wDZj8Z+J7e4+z6zNbf2ZpJU4f7XPmNGX3QFpfpGa95r8f8A/gtJ8cP7e+InhX4WWFxutNAt/wC1dSRG4N3OuIlYeqQ5Ye1xQB+efgXwbqXxF8baD4W0eLz9V1q+h0+1TsZJXCLn0GTknsAa/pn+GngHTfhZ8PfDng/R026Zoenw6fBxgssaBdzf7TEFie5Jr8ef+COnwP8A+E8+PupePr638zS/BtnmBmHym+uA0cfsdsYnb2Ow+lftXQAUUUUAFFFFABX89f8AwUP+OH/C9v2qvFupW1x5+iaNJ/YWmEHKmG3ZlZ1PcPKZXB9HFftD+2z8cB+z7+zR408VwT+RrBtf7P0og4b7ZP8Au42X1KZMn0jNfzx+DfCepeP/ABhonhrSIftOrazew2FrH/ellcIoPtlhzQB+vP8AwRj+B/8Awivwf8Q/Eu+t9t94pu/sdg7DkWVuxVmU/wC3MZAR/wBMVr9Fq5b4WfD3TvhP8N/DPg3SFxp2h6fDYRNtwX8tApc/7TEFj6ljXU0AFfgz/wAFZPEEms/tseK7R2Zl0mw06yQEdFa1jnwOfWcn8a/eav5+P+CnBuT+3J8T/tQUS+bYY2/3P7Pttn/ju2gD7g/4Ih6LHb/Cf4k6uMebda3BaN1ziKDcP/R5r9J6/Pv/AIIpLD/wzD4tKiP7R/wmFwHIxv2/YrLbnvjO7H4+9foJQAV5Z+1VosfiL9mX4r6fJgCbwtqYUtnCuLWRlP4MAfwr1OuR+LypJ8JvGqyqrRNol6GVxkEeQ+QfagD+Ym3uJLS4inhcxyxsHRx1Vgcg/nX9SPhjWB4h8N6TqqlWW+tIbkFFIB3oG4B5A571/LVX9PHwd87/AIVF4H+0CMXH9h2PmeVnZu+zpnGecZ9aAOwooooAKwfHnjTTPhz4J17xVrMvk6VotjNqF046+XEhdgPUkDAHckCt6vz/AP8AgsZ8cP8AhBfgLpfgCxuNmp+Mrz/SFU/MLG3KyP06bpTCvuA49aAPx7+JXjzUvil8QfEfi/WH36nrl/NqE/OQrSOW2r/srnaB2AAr9+/2Afgf/wAKE/Za8H6Jc2/2fWtRh/trVQRhvtNwA21v9pIxFGf+udfi7+wr8D/+F/8A7T3gzw3cW/2jRba4/tXVgwyn2S3w7K3s7BIvrKK/oroAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACvJP2mP2mPCH7LPw4uPFXiq43ytui03SYWAuNRnxkRxg9AOCznhRyeSAT9pj9pjwh+yz8OLjxV4quN8rbotN0mFgLjUZ8ZEcYPQDgs54UcnkgH8CPj58fPHH7V3xUk8R+I5Jb7UbuQWumaPZqzRWkZbEdvBGMk8kerMxyck0AVvjh8bvG37UfxUuPE3iSabVNY1CVbax021Vmjtoy2Ira3jGTjLYAGSzEk5Ykn9cP8Agnd/wTzsv2edKtPHvjq1hvviXeQ7oLdwHj0SN15ROxnIOHftkqvG5nz/APgnX/wTrtvgTZWfxE+IlnFd/EW4j32WnyAPHoiMPyNwQeW6ICVXuT990AFFFFABRRRQAV8J/wDBXz44f8K5/Zxg8GWVx5Wr+Nrv7KyqcMLKErJOw+rGGM+okavuyvwM/wCCn3xw/wCFzftWa/bWdx52ieE1GgWe0/KXiYm4fHTJmaRc91RKAPNP2Nfgk37QX7SHgrwfLCZtKlvBeapxwLOH95MCe25V2A+rrX9HqqEUKoCqBgADAFfmN/wRV+B/9meF/GHxXv4MT6nKND0t2XBEEZWS4cHurSeUv1gav06oAKKKKACiiigDN8S+ItP8I+HdV13VrhbTS9LtZb27uH6RQxoXdj7BVJ/Cv5nfjR8Tr/40fFjxZ441Pct3ruoy3nlsc+TGzfu4gfRECoPZRX7If8Fdfjh/wrP9mtfCVlceVrHja6+w4U4YWcW2S4YexPlRn2lNfk7+yH8FH/aC/aK8FeC3iaTTbq9W41IjotnEPMn57ZRSoP8AedaAP2g/4JrfA/8A4Uj+yj4YjurfyNb8SA+INQ3DDAzqvkoe42wrECD0bd619TUyKNIY0jjRY40AVUUYCgdAB6U+gAooooAKKKz/ABBr1j4V0HUta1S4W00zTbaS8urh/uxRRoXdj7BQT+FAH5Lf8Fp/jh/bXjrwl8KrC43Wuiwf2xqcang3UwKwqw/vJFub6XFcL/wR6+B//CwP2hL7x1fW/maT4Ls/NiZhlTfTho4RjvtQTv7MqH0r5C+OHxSv/jZ8XvFvjrUdwudc1GW7WNzkwxE4iiz6JGEQeyiv3D/4Jl/A/wD4Ur+yj4ba7t/J1vxQT4gvtwwwEyr5CHuMQrFlT0Zn96APq2iiigAr8Fv+CsGgS6P+214uu5FYJq1lp15GW6FRaRwZHtmBvxBr96a/Iv8A4LcfDWe08efDz4gRJutb/TpdDnZRxHJBI00e73ZbiTH/AFyPtQB6f/wRF1iOf4R/EfSgP3trrkN03X7stuFHbHWFq/SWvxk/4It/E+Dwz8ePFXgu6nWFfFOkrLbKx/1tzaMzhB7+VLcN9ENfs3QAV5f+1JrEXh/9mn4rahMNyQeFtTYLyNzG1kCrkA4ySBnHGa9Qr44/4KvfE+3+H/7IOu6V56x6l4pu7fSLZM/MV8wTTHHp5cTKT0+ceooA/CGCGS5mjhiRpJZGCIijJYk4AFf1I+FdHHh7wxo+lABRY2cNsApJA2IF6nr0r+c/9jn4Zz/F39p/4b+GoY/Mim1iG6uuvFtAfPn57fu43A9yK/pEoAKKKKACv5+f+Cknxw/4Xh+1Z4ontbjz9D8OkaBp205UrAzCVx2IaZpSD3Xb6V+0H7YnxsX9n39nHxr4yjmWLU7ezNrpmTybyY+XCQO+1mDkf3Uav50fDfh/UvGvifS9E0yF73V9WvIrO2izlpZpXCIv1LMPzoA/W7/gi58D/wDhH/hv4p+KV/b7bvxBcf2XprsORaQHMrKfR5jtPvb1+k1cZ8Gfhlp/wZ+FPhTwPpm02mhadDZCQDHmuq/vJSPV3LOfdjXZ0AFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFee/Hz43aB+zt8KNd8e+JFuJdN0uNcW9qm6WeV2CRxL2BZ2UZPAzk8CvQq+b/+ChHwj8WfHH9lvxH4Q8E6T/bXiK7urKSGz+0w2+9Y7hHc75XVBhVJ5PbigD8OP2jf2ivF37TnxKvfF/iy7LO5Mdjp0bH7Pp9vklYYh6Du3Vjknk19df8ABOmT9m34INa/Ej4m/EbS5fHxBOm6QbW5kj0dSCPMYrEVacgnoSEB4yxyvj3/AA64/ad/6Jn/AOV/S/8A5Jo/4dcftO/9Ez/8r+l//JNAH60/8PIf2bf+ipaf/wCAV3/8Zo/4eQ/s2/8ARUtP/wDAK7/+M1+S3/Drj9p3/omf/lf0v/5Jo/4dcftO/wDRM/8Ayv6X/wDJNAH60/8ADyH9m3/oqWn/APgFd/8AxmvofQtcsfE2h6frGmXC3em6hbx3drcKCBJFIoZGAIBGVIPI71+B/wDw64/ad/6Jn/5X9L/+Sa/c74N6Df8AhX4Q+B9E1WD7Lqem6FY2d1BvV/Lmjt0R13KSpwykZBIOODQB2FFFFAHlP7U3xmh/Z/8AgB408cu6rd6bYstgj4IkvJCI7dcdx5joT/shj2r+b2wsdS8XeILeztkm1HV9TulijTJaSeeRwAMnqzM35mv2u/4KkfBr40ftCeGfB/gz4ZeEn1zQYbmTU9WuP7Ss7UGZV8uCPE0yMQA8rHgjJTuK+b/2Dv8Agm78VPAv7SXh7xb8UvCCaF4d8PrJqMDPqVndefeKAsCBYZnYFWbzdxAGYgM8gEA/Tr4AfCez+BfwX8H+BLLY0eiafHbyyRjAmnPzTy/8DlZ2/wCBV6BRRQAUUUUAFFFc18StQ8RaV8PfEd34R0v+2vFMWnzNpWn+bHEJ7rYfKVmkZUVd+3JJHGfpQB+HP/BUn44f8Lh/aq1rT7O483RPCCDQbUK3ymZGJuXx6+azJnuIlr6o/wCCKfwQ+xaJ4z+LF/b4lvXGg6W7DB8pCsty49Qz+SoI7xOK+Sr3/gmL+1JqV5Pd3Xw4e4uriRpZZpPEGmMzuxyzE/aeSSSa/bL9nX4RWvwH+CHg3wHa7CdG0+OK4kj+7Lctl55B/vStI340AejUUUUAFFFFABXxB/wVv+OH/Cr/ANmdvCtlceVrPja5/s5QrYcWceJLlh7EeXEfaY19v1+Vn/BR/wDZW/aI/ac+P32/wv4CfUPBWiWMVhpU7azp8InJHmTS+XJcKyku2zkDIiU0AfA37JvwWk/aC/aG8FeCDGz2F9fLLqLLkbbOIGSc57Exoyg/3mX1r+kiCGO1hjhhjWKKNQiRoAFVQMAADoAK/PP/AIJbfsQ+NP2eNe8Y+MfiXoCaH4huYI9L0q2+2W90VtyfMnk3QyOo3MsSjkH5G4wa/RCgAooooAK8E/bf/Zzj/ac/Z51/wrCudetf+Jpoj5AxfRI2xST0Dqzxk9hJntXvdFAH8wngvxf4n+BvxO03X9L87RfFfhvUPMWO5iKvDPGxV4pUODjhkZD2LA1++f7Mf7c3wz/aX8K2dxY65Z6F4p8v/TfDepXKRXMMgHzGMMR5sfGQ654I3BTkDyX9uL/gmfof7Sl/d+NfBt5B4X+IboPPEykWOqFRgGbaC0cmMDzFByBhlP3h+WvxA/YM+Pvw31KW01D4XeINSVDxdaDaNqUDLgncHgD4GB/FgjuBQB+/fxI+MXgj4Q6LPq3jPxTpfhyxhGWa+uVR2OMhUT7zsccKoJPYV+E/7ff7Yk37XHxUgudNinsfBGgo9totncALI+8gy3EgGcPIVX5c8KijruJ838P/ALJvxq8UXCRab8J/GU+5/L81tDuY4g3HDSOgVeo6kV9w/sq/8Eedevtatte+N08OlaTAVkTwxpt0s1zcMMHbPMmUROxCFmbnlOpAOv8A+CN/7MFzothq/wAaPENi0MuoRNpnh5ZlwTBuzcXIB7MVWNW9Fk7MK/UGqul6ZZ6Lptpp2n2sNjYWkKW9va28YSOGNFCoiKOFUAAADgAVaoAKKKSgD8lP+C1Xxw/tHxJ4O+E9hPmDTozruqKpyPPkDR26H0ZY/Nb6TLXlH/BIn4H/APCyv2lH8XXtv5uj+CbX7dlhlTeS7o7dT7gebIPeIVN+0F+wl+1R8dfjV4x8eXnwydW1rUJJ4Y5PEGllobcfJBH/AMfP8ESxr/wGv0W/4Jy/sy6p+zH+z7HpniawTT/Ges30uoatAsscxhOfLhi8yNmVgI0DcEgNI1AH1PRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAf//Z",
                    vehicleNo: inputRef?.current as string,
                    mobileLatitude: config.latitude,
                    mobileLongitude: config.longitude,
                };
                const res = await validateCarTrip(demoData).unwrap();
                if (res?.data) {
                    handleNavigation(res?.data);
                }
            }
        }
    }, []);

    return (
        <>
            <VStack
                w="full"
                h="full"
                position={"absolute"}
                bg="#5AB94795"
                zIndex={-1}
            />
            <Scroller
                contentStyle={{
                    flexGrow: 1,
                }}
                position="relative"
            >
                <VStack
                    space={6}
                    px="6"
                    pb={8}
                    h="full"
                    maxWidth={scale(500)}
                    mx="auto"
                    justifyContent={"center"}
                    pt={Platform.OS === "android" ? 10 : 0}
                >
                    <Text
                        fontSize={13}
                        fontWeight={600}
                        color="#fff"
                        mx={"auto"}
                        textAlign={"center"}
                    >
                        Scan number plate to proceed
                    </Text>
                    {validationResult?.data?.data?.error ? (
                        <Text
                            fontSize={13}
                            fontWeight={600}
                            color="#fff"
                            mx={"auto"}
                            textAlign={"center"}
                        >
                            {validationResult.data.data.error.messagw}
                        </Text>
                    ) : null}
                    {validationResult.isLoading ? (
                        <Center my="2">
                            <Spinner size={"lg"} color="blue.100" />
                        </Center>
                    ) : null}

                    {cameraPhoto ? (
                        <Image
                            alt="cameraPhoto"
                            w="300"
                            h="300"
                            source={{
                                uri: imageUri,
                            }}
                        />
                    ) : null}

                    {!cameraPhoto ? (
                        <LinGrad
                            py={10}
                            colors={["#fff", "#FF000095"]}
                            borderRadius={30}
                            start={{ x: 0, y: 0.2 }}
                            end={{ x: 0, y: 1 }}
                            borderBottomWidth={1}
                            mx={"auto"}
                        >
                            <VStack w={"300px"} h="300px" mx={"auto"}>
                                <Camera
                                    style={StyleSheet.absoluteFillObject}
                                    ref={camRef}
                                    type={Camera.Constants.Type.back}
                                />
                            </VStack>
                        </LinGrad>
                    ) : null}

                    <HStack
                        space={4}
                        alignItems={"center"}
                        justifyContent={"center"}
                    >
                        {!cameraPhoto ? (
                            <Pressable
                                onPress={takePicture}
                                rounded={"full"}
                                py={4}
                                px={4}
                                bg={"#fff"}
                            >
                                <Entypo name="camera" size={24} color="black" />
                            </Pressable>
                        ) : (
                            <>
                                <Pressable
                                    onPress={handleReset}
                                    rounded={"full"}
                                    py={4}
                                    px={4}
                                    bg={"#fff"}
                                >
                                    <MaterialCommunityIcons
                                        name="camera-retake"
                                        size={24}
                                        color="black"
                                    />
                                </Pressable>
                                <Pressable
                                    onPress={handleSubmit}
                                    rounded={"full"}
                                    py={4}
                                    px={4}
                                    bg={"#fff"}
                                >
                                    <AntDesign
                                        name="checkcircle"
                                        size={24}
                                        color="black"
                                    />
                                </Pressable>
                            </>
                        )}
                    </HStack>

                    <Text
                        fontSize={24}
                        fontWeight={700}
                        color="#fff"
                        mx={"auto"}
                        textAlign={"center"}
                    >
                        Place your Phone above the License Plate
                    </Text>
                    <VStack space="2">
                        <Text
                            fontSize={13}
                            fontWeight={600}
                            color="#fff"
                            mx={"auto"}
                            textAlign={"center"}
                        >
                            Enter Code Manually
                        </Text>
                        <Input
                            _focus={{
                                bg: "#BFDFBA",
                            }}
                            mb={4}
                            placeholder="Enter Code Manually"
                            bg="#BFDFBA"
                            borderRadius={15}
                            onChangeText={(text) => (inputRef.current = text)}
                        />
                    </VStack>

                    <Center>
                        <GradientBtn
                            onPress={handleSubmit}
                            title="Submit Manually"
                        />
                    </Center>

                    {/* <VStack space="2" alignItems={"center"} mb={16}>
                        <Text
                            fontSize={13}
                            fontWeight={600}
                            color="#fff"
                            mx={"auto"}
                            textAlign={"center"}
                        >
                            Use Flash
                        </Text>
                        <Pressable
                            w="50px"
                            h="50px"
                            alignItems="center"
                            justifyContent="center"
                            borderRadius={30}
                            bg="#fff"
                            shadow="9"
                            onPress={handleCameraFlash}
                        >
                            <  source={torch} alt="torch" />
                        </Pressable>
                    </VStack> */}
                </VStack>
            </Scroller>
        </>
    );
}
