import CheckBox from "@components/CheckBox/CheckBox";
import GradientBtn from "@components/GradientBtn/GradientBtn";
import { useUploadDocumentMutation } from "@store/api/v2/documentApi/documentApiSlice";
import { IAuthState } from "@store/features/auth/authSlice.types";
import {
    selectAllDocumentFieldValues,
    setDocumentFieldValue,
} from "@store/features/document/documentSlice";
import { selectAuth } from "@store/store";
import { createFormFile } from "@utils/fileDetails";
import { Center, HStack, Pressable, Text, VStack } from "native-base";
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import Signature from "./DocumentForm/Signature/Signature";
import { setCurrentForm } from "@store/features/auth/authSlice";

export default function SignatureSubmission() {
    const [termAccept, setTermAccept] = React.useState(false);
    const dispatch = useDispatch();
    const values = useSelector(selectAllDocumentFieldValues) as any;
    const auth = useSelector(selectAuth);
    const { resident_status } = auth as IAuthState;
    const [submitDocument, result] = useUploadDocumentMutation();

    const setFieldValue = (field: string, value: any) => {
        dispatch(setDocumentFieldValue({ fieldName: field, value }));
    };

    const userTypes = {
        "0": "Residence",
        "1": "Tourist",
    };

    const userType =
        userTypes[resident_status as keyof typeof userTypes] ?? "Residence";

    const handleSubmit = async () => {
        try {
            // formdata for signature
            const document3 = new FormData();
            const document2Expiry = new Date(values.expiry2);
            document3.append("UserType", userType);
            document3.append("DocumentType", "Signature");
            document3.append(
                "Signature",
                createFormFile(values.signature) as any
            );
            document3.append(
                "FrontImage",
                createFormFile(values.signature) as any
            );
            document3.append("Expiry", document2Expiry.toISOString());

            // formdata for selfie video
            const document4 = new FormData();
            document4.append("UserType", userType);
            document4.append("DocumentType", "SelfieVideo");
            document4.append(
                "FrontImage",
                createFormFile(values.selfieVideo, "video") as any
            );

            document4.append("Expiry", document2Expiry.toISOString());

            const res4 = await submitDocument(document4).unwrap();

            if (res4?.error) {
                alert(res4.error);
            }

            if (res4?.succeeded && res4?.error === null) {
                alert(
                    "Documents uploaded successfully, please wait for approval"
                );
                dispatch(setCurrentForm(undefined));
            }
        } catch (error) {
            console.warn(error);
            alert(error.message ?? "Something went wrong");
        }
    };

    const submitForm = () => {
        if (termAccept) {
            handleSubmit();
        } else {
            alert("Please accept terms and conditions");
        }
    };

    return (
        <VStack>
            <Text fontSize="lg" fontWeight="semibold" mt={8} mb={4}>
                Please sign below
            </Text>
            <Signature
                setSignatureValue={(data) => {
                    setFieldValue("signature", data);
                }}
                signatureValue={values.signature}
            />

            <Center>
                <HStack space="2" mt={12}>
                    <Pressable onPress={() => setTermAccept((prev) => !prev)}>
                        <CheckBox isChecked={termAccept} />
                    </Pressable>
                    <Text
                        _dark={{
                            color: "#fff",
                        }}
                    >
                        Agree terms and condition
                    </Text>
                </HStack>
                <GradientBtn
                    onPress={submitForm}
                    mt="5"
                    mb={8}
                    title="Continue"
                    disabled={result.isLoading || !termAccept}
                />
            </Center>
        </VStack>
    );
}