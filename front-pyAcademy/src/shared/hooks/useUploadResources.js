import { useState } from 'react';
import { uploadToCloudinary } from '../api/upload.service';

/**
 * Hook para subir archivos a Cloudinary.
 * @returns {{ uploadFile: Function, uploading: boolean }}
 */
export const useUploadResources = () => {
    const [uploading, setUploading] = useState(false);

    const uploadFile = async (file) => {
        try {
        setUploading(true);
        console.log('[Subiendo archivo a Cloudinary]:', file);
        const url = await uploadToCloudinary(file);
        console.log('[Archivo subido con éxito]:', url);
        return url;
        } catch (error) {
        console.error('[Error al subir archivo a Cloudinary]:', error);
        throw error;
        } finally {
        setUploading(false);
        }
    };

    return { uploadFile, uploading };
};
