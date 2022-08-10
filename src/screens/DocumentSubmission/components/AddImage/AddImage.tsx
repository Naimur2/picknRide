import { HStack, Text, VStack } from "native-base";
import React from "react";
import ImageCard from "./ImageCard/ImageCard";

interface Images {
    [key: string]: string;
}

export default function AddImage({
    title,
    getImages,
}: {
    title: string;
    getImages: (image: string) => void;
}) {
    const [images, setImages] = React.useState<Images>({
        1: "",
        2: "",
    });

    const handleAddImage = (image: string, id: string) => {
        setImages({
            ...images,
            [id]: image,
        });
    };

    React.useEffect(() => {
        if (Object.keys(images).length >= 1) {
            getImages?.(images);
        }
    }, [images]);

    return (
        <VStack my={4} space={4}>
            <Text
                mt={2}
                w="280px"
                fontSize={20}
                fontWeight={600}
                _dark={{
                    color: "#fff",
                }}
            >
                {title}
            </Text>
            <HStack justifyContent={"space-between"}>
                <ImageCard
                    setImage={(img) => handleAddImage(img, "1")}
                    image={images["1"]}
                    title={"Front Side"}
                />
                <ImageCard
                    setImage={(img) => handleAddImage(img, "2")}
                    image={images["2"]}
                    title={"Back Side"}
                />
            </HStack>
        </VStack>
    );
}
