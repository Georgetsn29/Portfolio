"use client";

import { useEffect, useState, useCallback } from "react";
import styles from "./page.module.css";
import AOS from "aos";
import "aos/dist/aos.css"; 
import { Target } from "lucide-react";


const YOUR_BIRTH_YEAR: number = 2003; 

const calculateAge = (birthYear: number): number => {
  const today = new Date();
  const currentYear = today.getFullYear();

  let age = currentYear - birthYear;

  const birthdayMonth = 6; 
  const birthdayDay = 29;

  const currentMonth = today.getMonth();
  const currentDay = today.getDate();

  if (currentMonth < birthdayMonth || 
      (currentMonth === birthdayMonth && currentDay < birthdayDay)) {
    
    age--;
  }

  return age;
};

const AnimatedMenuButton = ({ isOpen, onClick, }: { isOpen: boolean; onClick: () => void;}) => (
  <button 
    onClick={onClick}
    className={styles.menuButton}
  >
    <div
      className={`${styles.bar} ${
        isOpen ? styles.barTopOpen : styles.barTopClosed
      }`}
    />
    <div
      className={`${styles.bar} ${
        isOpen ? styles.barBottomOpen : styles.barBottomClosed
      }`}
    />
  </button>
);

// const NavLink = ({ name, href, closeSidebar }) => (
//   <a
//     href={href}
//     onClick={closeSidebar}
//     className={styles.navLink} 
//   >
//     {name}
//   </a>
// );

const SvgIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8"
      height="8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={styles.iconSvg}
      aria-hidden="true"
    >
      <path d="M13 5H19V11"></path>
      <path d="M19 5L5 19"></path>
    </svg>
  );

const LETTERS = ['G', 'I', 'O', 'R', 'G', 'I'];

const REVEAL_DELAY = 150;
const FADE_DELAY = 100;
const HOLD_TIME = 800;

const TOTAL_LETTERS = LETTERS.length;
const TOTAL_STEPS = TOTAL_LETTERS * 2 + 1; 

  const letterStyles = [
    { color: '#ffffff' }
];

export default function Page() {

    const [copied, setCopied] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const closeSidebar = () => setIsSidebarOpen(false);

  const handleCopy = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const email = "giotsnobiladze5@gmail.com";

    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 10);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

   useEffect(() => {
        if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
            window.scrollTo(0, 0);
        }
    }, []);

    useEffect(() => {
    AOS.init({ once: true });
    if (typeof window !== "undefined") {
      window.onbeforeunload = function () {
        window.scrollTo(0, 0);
      };
    }
  }, []);



  

    const updateScrollProgress = useCallback(() => {
        const scrollableHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        const scrolled = document.documentElement.scrollTop;
        
        if (scrollableHeight > 0) {
            let percentage = scrolled / scrollableHeight;
            
            percentage = Math.max(0, Math.min(1, percentage)) * 100;
            
            setScrollProgress(percentage);
        } else {
            setScrollProgress(0);
        }
    }, []);

  useEffect(() => {
        window.addEventListener('scroll', updateScrollProgress);
        
        updateScrollProgress();

        return () => window.removeEventListener('scroll', updateScrollProgress);
    }, [updateScrollProgress]);

    const translationPercentage = 100 - scrollProgress;

    const currentAge = calculateAge(YOUR_BIRTH_YEAR);




    const [isLoading, setIsLoading] = useState(true);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        if (!isLoading || currentStep >= TOTAL_STEPS) {
            if (currentStep >= TOTAL_STEPS) {
                const finishTimer = setTimeout(() => {
                    setIsLoading(false);
                }, 700); 
                return () => clearTimeout(finishTimer);
            }
            return;
        }

        let delay = REVEAL_DELAY;

        if (currentStep < TOTAL_LETTERS) {
            delay = REVEAL_DELAY;
        } else if (currentStep === TOTAL_LETTERS) {
            delay = HOLD_TIME;
        } else {
            delay = FADE_DELAY;
        }

        const timer = setTimeout(() => {
            setCurrentStep(prev => prev + 1);
        }, delay);

        return () => clearTimeout(timer);
    }, [currentStep, isLoading]);


    const getLetterVisuals = (index: number) => {
        const revealEnd = TOTAL_LETTERS;
        const fadeStart = TOTAL_LETTERS + 1;
        
        let opacity = 0;
        let transform = 'translateY(100%) scale(0.5)';

        if (currentStep < revealEnd) {
            if (index <= currentStep) {
                opacity = 1;
                transform = 'translateY(0%) scale(1)';
            }
        } else if (currentStep >= revealEnd && currentStep < fadeStart) {
            opacity = 1;
            transform = 'translateY(0%) scale(1)';
        } else {
            const fadeProgress = currentStep - revealEnd;
            if (index < fadeProgress) {
                opacity = 0;
                transform = 'translateY(-100%) scale(0.5)';
            } else {
                opacity = 1;
                transform = 'translateY(0%) scale(1)';
            }
        }
        
        return { opacity, transform };
    };

    const SplashScreen = (
      <div
          className={`splash-screen ${currentStep >= TOTAL_STEPS - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
          <div className="george-text-container">
              {LETTERS.map((letter, index) => {
                  const { opacity, transform } = getLetterVisuals(index);

                  return (
                      <span
                          key={index}
                          className="letter"
                          style={{ 
                              opacity: opacity,
                              transform: transform,
                              ...letterStyles[index % letterStyles.length],
                          }}
                      >
                          {letter}
                      </span>
                  );
              })}
          </div>
      </div>
  );




  //   const navItems = [
  //   { name: 'Home', href: '#home' },
  //   { name: 'About Me', href: '#about' },
  //   { name: 'Experience', href: '#portfolio' },
  //   { name: 'Projects', href: '#settings' },
  // ];

  // const socialItems = [
  //   { name: 'Github', href: 'https://github.com/Georgetsn29' },
  //   { name: 'Linkedin',  href: 'https://linkedin.com/in/my-profile' },
  //   { name: 'RESUME',  href: './Giorgi_Tsnobiladze_CV.pdf' },
  // ];
  

  return (
    <>

    {isLoading && SplashScreen}

    <div className={styles.menuButtonWrapper}>
      <AnimatedMenuButton 
        isOpen={isSidebarOpen}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      />
    </div>

    <aside 
          className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}
        >
          <div className={styles.sidebarContent}>
            <div className={styles.sidebarContentFlex}>
            <nav className={styles.navSection}>
              <p className={styles.sectionTitle}>SOCIAL</p>
              <ul className={styles.navList}>
                <li>
                  <a
                    href="https://github.com/Georgetsn29"
                    target="_blank"
                    rel="noreferrer"
                    className={`${styles.navLink} ${styles.capitalizeText}`}
                    style={{ cursor: "none" }}
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/giorgi-tsnobiladze-317b6a194/"
                    target="_blank"
                    rel="noreferrer"
                    className={`${styles.navLink} ${styles.capitalizeText}`}
                    style={{ cursor: "none" }}
                  >
                    Linkedin
                  </a>
                </li>
                <li>
                  <a
                    href="./Giorgi_Tsnobiladze_CV.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className={styles.navLink}
                    style={{ cursor: "none" }}
                  >
                    RESUME
                  </a>
                </li>
              </ul>
            </nav>
            
            <nav className={styles.socialSection}>
              <p className={styles.sectionTitle}>MENU</p>
              <ul className={styles.navList}>
                <li>
                  <a href="#home" onClick={closeSidebar} className={`${styles.group} ${styles.navButton}`} style={{ cursor: "none" }}>
                    <span className={`${styles.iconContainer} ${styles.iconHome}`}>
                      <SvgIcon />
                    </span>
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" onClick={closeSidebar} className={`${styles.group} ${styles.navButton}`} style={{ cursor: "none" }}>
                    <span className={`${styles.iconContainer} ${styles.iconAbout}`}>
                      <SvgIcon />
                    </span>
                    About Me
                  </a>
                </li>
                <li>
                  <a href="#experience" onClick={closeSidebar} className={`${styles.group} ${styles.navButton}`} style={{ cursor: "none" }}>
                    <span className={`${styles.iconContainer} ${styles.iconExp}`}>
                      <SvgIcon />
                    </span>
                    Experience
                  </a>
                </li>
                <li>
                  <a href="#projects" onClick={closeSidebar} className={`${styles.group} ${styles.navButton}`} style={{ cursor: "none" }}>
                    <span className={`${styles.iconContainer} ${styles.iconProjects}`}>
                      <SvgIcon />
                    </span>
                    Projects
                  </a>
                </li>
              </ul>
            </nav>
            </div>
          </div>

          <div className={styles.sidebarFooter}>
            <p>GET IN TOUCH</p>
            <a href="mailto:giotsnobiladze5@gmail.com" className={styles.sideBarEmail} onClick={handleCopy}>{copied ? "Copied!" : "giotsnobiladze5@gmail.com"}</a>
          </div>
        </aside>

        {/* --- Backdrop --- */}
        {isSidebarOpen && (
          <div
            className={styles.backdrop}
            onClick={closeSidebar}
            aria-hidden="true"
          />
        )}

    <div className="progress-track">
        <div 
            id="scroll-progress-bar" 
            style={{ 
                width: '100%',
                backgroundColor: '#d84e2c',
                borderRadius: '9999px',
                height: '100%',
                transition: 'transform 500ms ease-out ',
                transform: `translateY(-${translationPercentage}%)`,
            }}
        />
    </div>

    {/* <button className={styles.sidebarBtn}>
      <div className={styles.sidebarBtnUp}></div>
      <div className={styles.sidebarBtnDown}></div>
    </button> */}

    <a href="mailto:giotsnobiladze5@gmail.com" className={styles.sideEmail} onClick={handleCopy}>{copied ? "Copied!" : "giotsnobiladze5@gmail.com"}</a>

    <section id="home" className={styles.home}>
      <div className={styles.left}>
        <div>
          <h1><span className={styles.frontend}>FRONTEND</span><br /><span className={styles.developer}>DEVELOPER</span></h1>
        </div>
        <div className={styles.devText}>Hi! I&apos;m <strong>Giorgi</strong>. A Frontend Developer with hands-on <br /> experience through building high-performance, scalable, <br /> and responsive web solutions.</div>
        <div>
          <a className={styles.resume} href="./Giorgi_Tsnobiladze_CV.pdf" target="_blank">RESUME</a>
        </div>
      </div>

      <div className={styles.right}>
          <span className={styles.spanColor}>&lt;span&gt;</span>
            <div className={styles.innerSpan}>
              <div>
                <span>Proficient in the latest web technologies and</span>
              </div>
                <div>
                  <span>frameworks, continuously expanding my skill set</span>
                </div>
                  <div>
                    <span>to stay at the forefront of the industry.</span>
                </div>
              </div>
          <span className={styles.spanColor}>&lt;/span&gt;</span>
      </div>
    </section>


    <section id="about" className={styles.about} data-aos="fade-up" data-aos-delay="100">
      <div className={styles.aboutContainer}>
        <p className={styles.aboutPMain} data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000"> I believe in a user centered design approach, ensuring that every project I work on is tailored to meet the specific needs of its users. </p>
        <p className={styles.aboutPMe} data-aos="fade-up" data-aos-delay="250" data-aos-once="true">This is me.</p>
      <div className={styles.aboutContainerMain}>
        <div className={styles.aboutContainerLeft}>
          <div className={styles.aboutContainerLeftIn}>
            <p className={styles.aboutPGiorgi} data-aos="fade-up" data-aos-delay="300">I&apos;m Giorgi</p>
            <p className={styles.aboutPWeb} data-aos="fade-up" data-aos-delay="350">Web developer with a relentless drive for excellence, skilled in creating and maintaining functional and responsive web applications and websites.</p>
          </div>
          </div>
          <div className={styles.aboutContainerRight}>
            <p className={styles.aboutPYear} data-aos="fade-up" data-aos-delay="400">A {currentAge} year old Frontend web developer based in Tbilisi, Georgia. Dedicated to turning ideas into creative solutions. I specialize in creating seamless and intuitive user experiences.</p>
            <p className={styles.aboutPAproach} data-aos="fade-up" data-aos-delay="450">My approach focuses on creating scalable, high-performing solutions tailored to both user needs and business objectives. By prioritizing performance, accessibility, and responsiveness, I strive to deliver experiences that not only engage users but also drive tangible results.</p>
          </div>
      </div>
      <p className={styles.aboutPStop} data-aos="fade-up" data-aos-delay="450">i can't stop configuring my code editor</p>
      </div>
    </section>

    <section className={styles.footer}>
      <div className={styles.footerwrapper}>
        <p>You know how to find me</p>
        <a href="mailto:giotsnobiladze5@gmail.com" className={styles.footerEmail} onClick={handleCopy}>{copied ? "Copied!" : "giotsnobiladze5@gmail.com"}</a>
        <a href="https://github.com/Georgetsn29" target="_blank" className={styles.footerGit}>build by GIORGI &lt;3</a>
      </div>
    </section>
    </>
  );
}