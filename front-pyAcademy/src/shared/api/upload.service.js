/**
 * Sube un archivo a Cloudinary y retorna su URL pública
 * @param {File} file
 * @returns {Promise<string>}
 */
export const uploadToCloudinary = async (file) => {
    const cloudName = 'dxhxsli12';
    const uploadPreset = 'py-academy-preset';

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
        method: 'POST',
        body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
        console.error('[Cloudinary error response]:', data);
        throw new Error(data.error?.message || 'Error al subir a Cloudinary');
    }

    return data.secure_url;
};
