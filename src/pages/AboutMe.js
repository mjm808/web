import Typewriter from 'typewriter-effect'
import {useMode} from '../context/modecontext';
import PageTransition from '../components/PageTransition';
import RetroButton from '../components/retrobutton';

function AboutMe() {
  const { isRetroMode } = useMode();

  if (isRetroMode) {
    return (
      <PageTransition>
        <div className="bg-white/10 backdrop-blur-md flex flex-col items-center justify-center min-h-screen px-4 py-8 overflow-y-auto">
          <div className="bg-white/10 backdrop-blur-md p-6 md:p-12 rounded-2xl shadow-2xl border border-white/20 max-w-2xl w-full">
            <RetroButton to="/" className="mb-6"> [←] Back </RetroButton>
            <div className="text-white font-ibmvga text-lg leading-relaxed break-words">
              <Typewriter options={{delay: 7}}
                onInit={(typewriter) => {
                  typewriter
                    // About Me Section
                    .typeString('<div class="text-center font-bold text-2xl mb-4 mt-4">About Me</div>')
                    .typeString('<strong>Current Role:</strong> IT Support Engineer at Insmed Incorporated<br/><br/>')
                    .typeString('<strong>Education:</strong> Rutgers University Graduate (Cum Laude, Dean\'s List)<br/>')
                    .typeString('Double Major in Information Technology & Informatics and Criminal Justice<br/><br/>')
                    .typeString('<strong>What I Do:</strong><br/>I build and manage IT knowledge bases with 100+ articles, develop ServiceNow workflows and automation, support IT compliance audits and SOX documentation, troubleshoot R&D lab equipment, and administer IAM platforms like Okta. I also produce technical training videos and handle incidents, requests, and change management.<br/><br/>')
                    .pauseFor(200)
                    
                    // What I Work With Section
                    .typeString('<div class="text-center font-bold text-2xl mb-4 mt-6">What I Work With</div>')
                    .typeString('<strong>Platforms:</strong> ServiceNow, Active Directory, Okta, Jamf, Intune, Carbon Black, AirWatch, Office 365, DocuSign Admin, DocuSign Part 11<br/><br/>')
                    .typeString('<strong>Systems:</strong> Windows, macOS, Linux (Fedora, Arch, Mint)<br/><br/>')
                    .typeString('<strong>Languages:</strong> PowerShell, Python, Java, JavaScript, HTML, R, SQL<br/><br/>')
                    .typeString('<strong>Certifications:</strong> TestOut Security Pro (November 2024)<br/><br/>')
                    
                    // Beyond Tech Section
                    .typeString('<div class="text-center font-bold text-2xl mb-4 mt-6">Hobbies</div>')
                    .typeString('I play bass guitar, produce music in FL Studio, and used to be a DJ on WVPH 90.3 The Core!')
                    .start();
                }}
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

export default AboutMe;