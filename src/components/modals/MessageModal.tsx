interface MessageModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  isError?: boolean;
  onClose: () => void;
}

export const MessageModal = ({
  isOpen,
  title,
  message,
  isError = false,
  onClose,
}: MessageModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl border border-secondary-100 text-center transform scale-100 transition-all">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
            isError ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
          }`}
        >
          {isError ? (
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
        <h4 className="text-lg font-bold text-secondary-900 mb-1">{title}</h4>
        <p className="text-secondary-500 text-sm mb-6">{message}</p>
        <button
          onClick={onClose}
          className={`w-full py-2.5 px-4 rounded-xl font-medium text-white transition-colors shadow-sm ${
            isError
              ? "bg-red-600 hover:bg-red-700"
              : "bg-primary hover:opacity-90"
          }`}
        >
          OK
        </button>
      </div>
    </div>
  );
};
