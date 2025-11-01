import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay fixed inset-0 z-50 flex justify-center items-center w-full h-full overflow-hidden animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative p-4 w-full max-w-2xl max-h-[90vh] z-10 animate-in zoom-in-95 duration-300">
        <div className="modal-content relative rounded-2xl shadow-2xl">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700/50 rounded-t-2xl">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <button
              onClick={onClose}
              type="button"
              className="text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-sm w-10 h-10 flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 text-slate-300 max-h-[calc(90vh-120px)] overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
