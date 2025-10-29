import { LoaderCircle } from "lucide-react";
import { useState } from "react";

const DeleteAlert = ({ content, onDelete, onClose }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await onDelete();
      onClose(); // ensure modal closes immediately
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p className="text-sm">{content}</p>
      <div className="flex justify-end mt-6">
        <button
          onClick={handleDelete}
          disabled={loading}
          type="button"
          className="add-btn add-btn-fill"
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
