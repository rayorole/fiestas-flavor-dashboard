import axios from "axios";

export const uploadImageToCloudinary = async (formData: FormData) => {
    const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
    );

    return response;
};

export const deleteImageFromCloudinary = async (publicId: string) => {
    const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
    const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;
    console.log(`https://${apiKey}:${apiSecret}@api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/delete_by_token`)
    const response = await axios.post(
        `https://${apiKey}:${apiSecret}@api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/delete_by_token`,
        {
            public_id: publicId,
        }
    );

    return response;
}

export type ValidatedImages = {
    validated: boolean;
    message?: string;
};

export const validateImages = (images: File[], totalImages: number): ValidatedImages => {
    const ACCEPTED_IMAGE_TYPES = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/jpg",
        "image/svg+xml",
    ];
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

    for (const image of images) {
        if (!image) {
            return {
                validated: false,
                message: "No image found.",
            };
        }

        if (!ACCEPTED_IMAGE_TYPES.includes(image.type)) {
            return {
                validated: false,
                message: "Invalid file type. Only images are allowed.",
            };
        }

        if (image.size > MAX_FILE_SIZE) {
            return {
                validated: false,
                message: "Max file size is 5MB.",
            };
        }
    }

    if (images.length + totalImages > 5) {
        return {
            validated: false,
            message: "Max number of images is 5.",
        };
    }

    return {
        validated: true,
    };
};
