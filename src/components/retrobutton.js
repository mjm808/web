import { Link } from 'react-router-dom';

function RetroButton({ to, children }) {
  return (
    <Link
      to={to}
      className="text-neutral-200 inline-block px-3 py-3 bg-white/10 backdrop-blur-md border-2 border-t-white/40 border-l-white/40 border-r-gray-400/40 border-b-gray-400/40 hover:bg-white/25 hover:border-t-gray-400/60 hover:border-l-gray-400/60 hover:border-r-white/60 hover:border-b-white/60 active:scale-95 transition-all shadow-lg"
    >
      {children}
    </Link>
  );
}

export default RetroButton;