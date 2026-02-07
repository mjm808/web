import { useMode } from '../context/modecontext';
import RetroButton from '../components/retrobutton';
import PageTransition from '../components/PageTransition';

function LandingPage() {
  const { isRetroMode } = useMode();

  if (isRetroMode) {
    return (
      <PageTransition>
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 overflow-y-auto">
          <div className="p-6 md:p-10 shadow-lg bg-white/10 rounded-2xl shadow-2xl border border-white/20 max-w-lg w-full">
            <h1 className="text-neutral-300 text-2xl md:text-4xl text-center">Matthew Malnak</h1>
            <div className="mt-4 flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 items-center justify-center">
              <RetroButton to="/about">About Me [+]</RetroButton>
              <RetroButton to="/res">View Resume [+]</RetroButton>
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  //Normal Mode
  return (
    <PageTransition>
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <p className="text-neutral-500">Normal mode coming soon</p>
      </div>
    </PageTransition>
  );
}

export default LandingPage;