import {useMode} from '../context/modecontext';
import PageTransition from '../components/PageTransition';
import RetroButton from '../components/retrobutton';

function Resume() {
  const { isRetroMode } = useMode();

  if (isRetroMode) {
    return (
      <PageTransition>
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
          <div className="bg-white/10 backdrop-blur-md p-6 md:p-12 rounded-2xl shadow-2xl border border-white/20 max-w-4xl w-full">
            <div className="flex justify-between items-center mb-6">
              <RetroButton to="/" className="mb-6"> [←] Back </RetroButton>
               <a 
              href={process.env.PUBLIC_URL + "/remume/MalnakResume2026.pdf"}
              download="Matthew_Malnak_Resume.pdf"
              className="font-ibmvga text-white bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 
                          hover:from-emerald-500/30 hover:to-cyan-500/30 
                          border-2 border-emerald-400/50 hover:border-emerald-400/80
                          px-4 py-3 transition-all duration-200
                          shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]
                          inline-block"
                >
              Download [↓]
            </a>
            </div>
            
            <h1 className="text-center font-bold text-2xl md:text-3xl font-ibmvga text-white mb-6">Resume</h1>
            
            <div className="w-full h-[70vh] bg-white rounded-lg overflow-hidden">
              <iframe 
                src={process.env.PUBLIC_URL + "/remume/MalnakResume2026.pdf#toolbar=0"}
                className="w-full h-full border-0"
                title="Resume PDF"
              />
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <p className="text-neutral-500 uppercase tracking-widest text-sm">Coming Soon</p>
      </div>
    </PageTransition>
  );
}

export default Resume;