import { LoaderCircle, AlertTriangle } from "lucide-react";
import { useState } from "react";

const DeleteAlert = ({ content, onDelete, onClose }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await onDelete();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-2">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-pink-500/20 flex items-center justify-center border border-red-500/30 flex-shrink-0">
          <AlertTriangle className="text-red-400" size={24} />
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Confirm Deletion</h4>
          <p className="text-sm text-slate-400">{content}</p>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-700/50">
        <button
          onClick={onClose}
          type="button"
          className="px-6 py-2.5 rounded-lg text-sm font-medium text-slate-300 bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-300 border border-slate-700/50"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          disabled={loading}
          type="button"
          className="px-6 py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Deleting...
            </>
          ) : (
            <>Delete</>
          )}
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
