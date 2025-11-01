import { Trash, Upload, User } from "lucide-react";
import { useRef, useState } from "react";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewURL, setPreviewURL] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewURL(preview);
    }
  };

  const handleRemoveImage = (e) => {
    e.preventDefault();
    setImage(null);
    setPreviewURL(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const onChooseFile = (e) => {
    e.preventDefault();
    inputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div className="relative group">
          <div className="w-24 h-24 flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full border-2 border-purple-500/30 transition-all duration-300 group-hover:border-purple-500/50">
            <User className="text-purple-400" size={40} />
          </div>

          <button
            type="button"
            onClick={onChooseFile}
            className="profile-upload-btn w-10 h-10 flex items-center justify-center text-white rounded-full absolute -bottom-1 -right-1 shadow-lg"
          >
            <Upload size={18} className="text-white" />
          </button>
        </div>
      ) : (
        <div className="relative group">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-purple-500/50 shadow-xl">
            <img
              src={previewURL}
              alt="profile photo"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            type="button"
            onClick={handleRemoveImage}
            className="w-10 h-10 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-full absolute -bottom-1 -right-1 transition-all duration-300 shadow-lg hover:scale-110"
          >
            <Trash size={18} />
          </button>
        </div>
      )}

      <p className="text-xs text-slate-500 text-center max-w-[200px]">
        {!image
          ? "Upload a profile photo (optional)"
          : "Click the icon to change or remove"}
      </p>
    </div>
  );
};

export default ProfilePhotoSelector;
