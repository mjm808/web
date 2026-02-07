import { useMode } from '../context/modecontext';

function ModeToggle() {
    return null; //remember to remove to bring back mode
  const {isRetroMode, toggleMode} = useMode();

  if (isRetroMode) {
    // oldmode toggle lol
    return (
      <button
        onClick={toggleMode}
        className="fixed top-4 right-4 z-50 px-3 py-2 font-nec text-sm bg-[#C0C0C0] border-2 border-t-white border-l-white border-r-gray-600 border-b-gray-600 hover:border-t-gray-600 hover:border-l-gray-600 hover:border-r-white hover:border-b-white active:scale-95"
      >
        Mode Toggle
      </button>
    );
  }

  // Clean modern toggle
  return (
    <button
      onClick={toggleMode}
      className="fixed top-4 right-4 z-50 px-4 py-2 text-xs font-medium tracking-wide bg-neutral-800 text-neutral-300 rounded-full hover:bg-neutral-700 transition-colors"
    >
      Mode Toggle
    </button>
  );
}

export default ModeToggle;