function DetailPanel({ isOpen = true, onClose, title, children, alwaysOpen = false }) {
  return (
    <div
      className={`bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 transition-all duration-500 ease-in-out overflow-y-auto ${
        alwaysOpen
          ? 'p-6 md:p-12 max-w-2xl w-full min-h-screen flex flex-col items-center justify-center mx-auto'
          : isOpen
            ? 'p-6 md:p-12 max-w-md w-full ml-4 max-h-[90vh] translate-x-0 opacity-100 scale-100'
            : 'p-6 md:p-12 max-w-md w-full ml-4 max-h-[90vh] translate-x-full opacity-0 scale-95 pointer-events-none absolute'
      }`}
    >
      {!alwaysOpen && onClose && (
        <button
          onClick={onClose}
          className="mb-6 text-white/70 hover:text-white font-ibmvga text-lg"
        >
          [✕] Close
        </button>
      )}
      {title && (
        <h2 className="font-bold text-2xl mb-4 font-ibmvga text-white">{title}</h2>
      )}
      <div className="text-white font-nec w-full">
        {children}
      </div>
    </div>
  );
}

export default DetailPanel;