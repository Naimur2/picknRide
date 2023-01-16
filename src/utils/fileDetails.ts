export function fileDetails(url: string): {
    fileName: string;
    fileExtensionName: string;
} {
    const fileName = url.split("/").pop() || "";
    const fileExtensionName = fileName?.split(".").pop() || "";

    return {
        fileName,
        fileExtensionName,
    };
}

export function createFormFile(
    fileUrl: string,
    type: string = "image"
): {
    uri: string;
    name: string;
    type: string;
} {
    const { fileName, fileExtensionName } = fileDetails(fileUrl);
    const file = {
        uri: fileUrl,
        name: fileName,
        type: `${type}/${fileExtensionName}`,
    };
    return file;
}
