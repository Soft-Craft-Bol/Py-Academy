    import { FaCamera } from "react-icons/fa";
    import PropTypes from "prop-types";

    const ProfileImageUpload = ({ preview, setPreview, onChange }) => {
        const handleFileChange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreview(reader.result);
                };
                reader.readAsDataURL(file);
                onChange(file);
            }
        };

        return (
            <div className="flex justify-center mb-4">
                <label className="relative cursor-pointer">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="photo-upload"
                    />
                    <div className="w-28 h-28 rounded-full bg-gray-200 overflow-hidden shadow-md">
                        {preview ? (
                            <img
                                src={preview}
                                alt="Foto de perfil"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                                Sin foto
                            </div>
                        )}
                    </div>
                    <div className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow">
                        <FaCamera size={18} />
                    </div>
                </label>
            </div>
        );
    };

    ProfileImageUpload.propTypes = {
        preview: PropTypes.string,
        setPreview: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
    };

    export default ProfileImageUpload;
