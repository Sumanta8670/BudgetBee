import { Image, X } from "lucide-react";
import { useState } from "react";
import EmojiPicker from "emoji-picker-react";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEmojiClick = (emoji) => {
    onSelect(emoji?.imageUrl || "");
    setIsOpen(false);
  };

  return (
    <div className="mb-6">
      <label className="label-animated mb-3">Category Icon</label>

      <div className="emoji-picker-wrapper">
        <div
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-4 cursor-pointer group"
        >
          <div className="icon-badge w-16 h-16 flex items-center justify-center rounded-xl text-3xl transition-all duration-300 group-hover:scale-105">
            {icon ? (
              <img src={icon} alt="Icon" className="w-12 h-12" />
            ) : (
              <Image className="text-purple-400" size={28} />
            )}
          </div>
          <div>
            <p className="text-white font-medium mb-1">
              {icon ? "Change category icon" : "Pick a category icon"}
            </p>
            <p className="text-sm text-slate-400">
              Click to select an emoji that represents this category
            </p>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-3 -right-3 w-10 h-10 flex items-center justify-center bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-full z-10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-lg"
            >
              <X className="text-white" size={20} />
            </button>
            <div className="emoji-picker-container">
              <EmojiPicker
                open={isOpen}
                onEmojiClick={handleEmojiClick}
                theme="dark"
                width={350}
                height={450}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
