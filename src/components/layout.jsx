import { useMode } from '../context/modecontext';

function Layout({ children }) {
  const { isRetroMode } = useMode();

  if (isRetroMode) {
    return (
      <div className="min-h-screen font-nec text-black">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen text-neutral-100">
      {children}
    </div>
  );
}

export default Layout;