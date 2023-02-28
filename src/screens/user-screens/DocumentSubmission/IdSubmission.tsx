import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    selectAllDocumentFieldValues,
    setDocumentFieldValue,
} from "@store/features/document/documentSlice";
import { VStack, FormControl, Input, Toast } from "native-base";
import FormLabel from "./DocumentForm/FormLabel/FormLabel";
import { selectAuth } from "@store/store";
import { IAuthState } from "@store/features/auth/authSlice.types";
import ErrorToast from "@components/ErrorToast/ErrorToast";
import * as Yup from "yup";
import { createFormFile } from "@utils/fileDetails";
import { TDDocumentType } from "@store/api/v2/documentApi/documentApiSlice.types";
import ExpiryDate from "./DocumentForm/ExpiryDate/ExpiryDate";
import AddImage from "./AddImage/AddImage";
import { useUploadDocumentMutation } from "@store/api/v2/documentApi/documentApiSlice";
import GradientBtn from "@components/GradientBtn/GradientBtn";
import { setCurrentForm } from "@store/features/auth/authSlice";

export default function IdSubmission() {
    const dispatch = useDispatch();
    const auth = useSelector(selectAuth);
    const values = useSelector(selectAllDocumentFieldValues);
    const [submitDocument, result] = useUploadDocumentMutation();
    const { resident_status } = auth as IAuthState;

    const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

    const firstDocumentTypes: {
        [key: number]: TDDocumentType;
    } = {
        0: "Address",
        1: "Passport",
    };

    const userTypes = {
        "0": "Residence",
        "1": "Tourist",
    };

    const userType =
        userTypes[resident_status as keyof typeof userTypes] ?? "Residence";

    const schema = Yup.object().shape({
        docId1: Yup.number().required("Required"),
        expiry1: Yup.string().required("Required"),
        frontImage1: Yup.string().required("Required"),
        backImage1: Yup.string().required("Required"),
    });

    const errorValidation = async () => {
        try {
            await schema.validate(values, { abortEarly: false });
            return {};
        } catch (err: any | Yup.ValidationError) {
            const errors: { [key: string]: string } = {};
            err?.inner?.forEach((error: any) => {
                errors[error.path] = error.message;
            });
            return errors;
        }
    };

    const setFieldValue = (field: string, value: any) => {
        dispatch(setDocumentFieldValue({ fieldName: field, value }));
    };

    const handleSubmit = async () => {
        try {
            const document1Form = new FormData();
            const document1Expiry = new Date(values.expiry1);
            document1Form.append("UserType", userType);
            document1Form.append(
                "DocumentType",
                firstDocumentTypes[resident_status as "0" | "1"] ?? "Address"
            );
            document1Form.append("DocId", values.docId1.toString());
            document1Form.append("Expiry", document1Expiry.toISOString());
            document1Form.append("Country", values.country);
            document1Form.append(
                "FrontImage",
                createFormFile(values.frontImage1) as any
            );
            document1Form.append(
                "BackImage",
                createFormFile(values.backImage1) as any
            );

            const res1 = await submitDocument(document1Form).unwrap();

            console.log(res1?.succeeded);

            if (res1.error) {
                Toast.show({
                    id: "otpError",
                    render: () => <ErrorToast message={res1.error.message} />,
                    placement: "top",
                });
            }

            if (res1?.succeeded) {
                alert(
                    "Documents uploaded successfully, please wait for approval"
                );
                dispatch(setCurrentForm(2));
            }
        } catch (error) {
            console.warn(error);
            alert(error.message ?? "Something went wrong");
        }
    };

    const submitForm = async () => {
        // check if all the fields are filled
        const errorsValues = await errorValidation();
        const numberOfErrors = Object.keys(errorsValues).length;
        if (numberOfErrors > 0) {
            Toast.show({
                id: "otpError",
                render: () => (
                    <ErrorToast
                        space={4}
                        w={"320px"}
                        direction={"column"}
                        textProps={{ textAlign: "center" }}
                        px={4}
                        message={
                            "Please fill all the required fields to proceed"
                        }
                    />
                ),
                placement: "top",
            });
            return;
        }

        handleSubmit();
    };

    const handleAddMedia = async ({
        fieldName,
        uri,
    }: {
        fieldName: string;
        uri: string;
    }) => {
        // const base64Image = await convertToBase64(uri);
        setFieldValue(fieldName, uri);
    };

    React.useEffect(() => {
        (async () => {
            const errorsValues = await errorValidation();
            setErrors(errorsValues);
        })();
    }, [values]);

    return (
        <VStack>
            <FormControl mt={5}>
                <FormLabel title="ID Number" />
                <Input
                    fontSize={17}
                    fontWeight={600}
                    variant="underlined"
                    borderBottomColor={"light.200"}
                    placeholder="Enter Id"
                    placeholderTextColor="gray.300"
                    keyboardType="number-pad"
                    _dark={{
                        color: "#fff",
                        placeholderTextColor: "white",
                    }}
                    onChangeText={(value) => setFieldValue("docId1", value)}
                    value={values.docId1}
                />
            </FormControl>

            <ExpiryDate
                onChange={(data) => {
                    setFieldValue("expiry1", data);
                }}
                date={values.expiry1 as Date}
            />

            <AddImage
                frontImage={values.frontImage1}
                backImage={values.backImage1}
                setFrontImage={(img) =>
                    handleAddMedia({
                        fieldName: "frontImage1",
                        uri: img,
                    })
                }
                setBackImage={(img) =>
                    handleAddMedia({
                        fieldName: "backImage1",
                        uri: img,
                    })
                }
                title={
                    resident_status === "0"
                        ? "Upload both sides of your ID Card"
                        : "Upload both sides of your Passport"
                }
            />

            <GradientBtn
                onPress={submitForm}
                mt="5"
                mb={8}
                title="Continue"
                disabled={result.isLoading}
                mx="auto"
            />
        </VStack>
    );
}
