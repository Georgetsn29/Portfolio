"use client";

import { useEffect, useState, useCallback } from "react";
import styles from "./page.module.css";
import AOS from "aos";
import "aos/dist/aos.css"; 
import { Target } from "lucide-react";
import { useRouter } from 'next/navigation';


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

const techStackData = [
  {
    category: "Frontend",
    items: [
      { name: "HTML", url: "https://res.cloudinary.com/damompp1b/image/upload/v1761132094/tech-stack/e4ihbttbjc9fnqxtqfjk.webp" },
      { name: "CSS", url: "https://res.cloudinary.com/damompp1b/image/upload/v1761132123/tech-stack/a8amf3ew3ncwhmgqp4ap.webp" },
      { name: "JavaScript", url: "https://res.cloudinary.com/damompp1b/image/upload/v1761132141/tech-stack/it9gcd7lykyi0g8jydp3.webp" },
      { name: "TypeScript", url: "https://res.cloudinary.com/damompp1b/image/upload/v1761132203/tech-stack/jiijjitzpqqlprtajrhk.webp" },
      { name: "React", url: "https://res.cloudinary.com/damompp1b/image/upload/v1761132226/tech-stack/g5935sduhdm81jtm4jom.webp" },
      { name: "Next.Js", url: "https://res.cloudinary.com/damompp1b/image/upload/v1761133323/tech-stack/do3gzkhaca5bdyoc29u0.webp" },
      { name: "Tailwind CSS", url: "https://res.cloudinary.com/damompp1b/image/upload/v1761132308/tech-stack/jad7xbpdj86iun2ltk2z.webp" },
    ]
  },
  {
    category: "Backend",
    items: [
       { name: "Node.js", url: "https://res.cloudinary.com/damompp1b/image/upload/v1761132513/tech-stack/zynfozlvk9xzpfgpio7l.webp" },
      { name: "Express.js", url: "https://res.cloudinary.com/damompp1b/image/upload/v1761132715/tech-stack/cawxocttm1iih5znufe2.webp" },
      { name: "MongoDB", url: "https://res.cloudinary.com/damompp1b/image/upload/v1761132785/tech-stack/reepwudqzpvwkgw6k9bq.webp" },
      { name: "Supabase", url: "https://res.cloudinary.com/damompp1b/image/upload/v1761132759/tech-stack/vqocrcbbkvljocxjosxd.webp" },
    ]
  },
  {
    category: "Tools",
    items: [
      { name: "Git", url: "https://res.cloudinary.com/damompp1b/image/upload/v1761132924/tech-stack/mhcfcbwo2jbswn71fibm.webp" },
      { name: "GitHub", url: "https://res.cloudinary.com/damompp1b/image/upload/v1761132950/tech-stack/vwvkzjuycvulgcexomll.webp" },
      { name: "Postman", url: "https://res.cloudinary.com/damompp1b/image/upload/v1761132971/tech-stack/hsxezphnnbqbgrt3iaa4.webp" },
      { name: "VSCODE", url: "https://res.cloudinary.com/damompp1b/image/upload/v1761133012/tech-stack/z22vae593l42i5b0owut.webp" },
      { name: "NPM", url: "https://res.cloudinary.com/damompp1b/image/upload/v1761133030/tech-stack/frmotw4echmb7rodvhzq.webp" },
      { name: "PNPM", url: "https://res.cloudinary.com/damompp1b/image/upload/v1761133049/tech-stack/kbbiqhq3mcujtlrobiiu.webp" },
      { name: "Yarn", url: "https://res.cloudinary.com/damompp1b/image/upload/v1761133111/tech-stack/lsuwj4a4wjjy9b80zhlh.webp" },
      // { name: "Bun", url: "https://res.cloudinary.com/damompp1b/image/upload/v1762380323/tech-stack/itdtbhlknbmh8ezmv6kk.webp" },
    ]
  },
  {
    category: "Studying",
    items: [
      { name: "Hono", url: "https://res.cloudinary.com/damompp1b/image/upload/v1761132881/tech-stack/uwcz57v8ialn8a7uhfd5.webp" },
    ]
  }
];

export default function Page() {

    const [copied, setCopied] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const closeSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    // Safety check to ensure we are running in a browser environment
    if (typeof window !== 'undefined' && window.location.hash) {
      
      // 1. Get the current clean URL (pathname and search query). 
      //    This automatically excludes the hash fragment.
      const cleanUrl = window.location.pathname + window.location.search;

      // 2. Use the native History API to replace the current URL entry.
      //    This strips ANY hash fragment from the address bar without reloading the page.
      window.history.replaceState(null, '', cleanUrl);
    }
  }, []);

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
    AOS.init({ 
      duration: 1000,
     });
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


  const dynamicItemStyle = {
    opacity: 0.7969,
    transform: 'translate3d(0px, 10.1567px, 0px)',
  };
  

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
                    // style={{ cursor: "none" }}
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
                    // style={{ cursor: "none" }}
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
                    // style={{ cursor: "none" }}
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
                  <a href="#home" onClick={closeSidebar} className={`${styles.group} ${styles.navButton}`}
                  //  style={{ cursor: "none" }}
                   >
                    <span className={`${styles.iconContainer} ${styles.iconHome}`}>
                      <SvgIcon />
                    </span>
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" onClick={closeSidebar} className={`${styles.group} ${styles.navButton}`}
                  //  style={{ cursor: "none" }}
                   >
                    <span className={`${styles.iconContainer} ${styles.iconAbout}`}>
                      <SvgIcon />
                    </span>
                    About Me
                  </a>
                </li>
                <li>
                  <a href="#experience" onClick={closeSidebar} className={`${styles.group} ${styles.navButton}`}
                  //  style={{ cursor: "none" }}
                   >
                    <span className={`${styles.iconContainer} ${styles.iconExp}`}>
                      <SvgIcon />
                    </span>
                    Experience
                  </a>
                </li>
                <li>
                  <a href="#projects" onClick={closeSidebar} className={`${styles.group} ${styles.navButton}`} 
                  // style={{ cursor: "none" }}
                  >
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
          <h1><span className={styles.frontend}>FULL STACK</span><br /><span className={styles.developer}>DEVELOPER</span></h1>
        </div>
        <div className={styles.devText}>Hi! I&apos;m <strong>Giorgi</strong>. A junior Full Stack Developer with hands-on <br /> experience through building high-performance, scalable, <br /> and responsive web solutions.</div>
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


    <section id="about" className={styles.about} >
      <div className={styles.aboutContainer}>
        <p className={styles.aboutPMain} data-aos="fade-up"> I believe in a user centered design approach, ensuring that every project I work on is tailored to meet the specific needs of its users. </p>
        <p className={styles.aboutPMe} data-aos="fade-up" data-aos-delay="250" data-aos-once="true">This is me.</p>
      <div className={styles.aboutContainerMain}>
        <div className={styles.aboutContainerLeft}>
          <div className={styles.aboutContainerLeftIn}>
            <p className={styles.aboutPGiorgi} data-aos="fade-up">I&apos;m Giorgi</p>
            <p className={styles.aboutPWeb} data-aos="fade-up">Web developer with a relentless drive for excellence, skilled in creating and maintaining functional and responsive web applications and websites.</p>
          </div>
          </div>
          <div className={styles.aboutContainerRight}>
            <p className={styles.aboutPYear} data-aos="fade-up">A {currentAge} year old junior Full Stack Web Developer based in Tbilisi, Georgia. Dedicated to turning ideas into creative solutions. I specialize in creating seamless and intuitive user experiences.</p>
            <p className={styles.aboutPAproach} data-aos="fade-up">My approach focuses on creating scalable, high-performing solutions tailored to both user needs and business objectives. By prioritizing performance, accessibility, and responsiveness, I strive to deliver experiences that not only engage users but also drive tangible results.</p>
          </div>
      </div>
      <p className={styles.aboutPStop} data-aos="fade-up">I CAN&apos;T STOP CONFIGURING MY CODE EDITOR</p>
      </div>
    </section>

    <section className={styles.aboutSkill}>
      <div className={styles.myStackContainer}>
        <svg 
        xmlns="http://www.w3.org/2000/svg" 
        xmlnsXlink="http://www.w3.org/1999/xlink" 
        fill="none" 
        viewBox="0 0 25 29" 
        width="25" 
        className={styles.spinner}
      >
        <path fill="url(#section-flower_svg__a)" d="M25 0H0v28.929h25z"></path>
        <defs>
          <pattern 
            id="section-flower_svg__a" 
            width="1" 
            height="1" 
            patternContentUnits="objectBoundingBox"
          >
            <use 
              xlinkHref="#section-flower_svg__b" 
              transform="matrix(.00255 0 0 .0022 -.01 0)"
            ></use>
          </pattern>
          {/* Note: The original image href 'a' is a placeholder and should be updated */}
          <image xlinkHref="img/flower.png" id="section-flower_svg__b" width="400" height="453"></image>
        </defs>
      </svg>
        <h2 className={styles.myStackTitle}>MY STACK</h2>
      </div>
      <div className={styles.techStackContainer} data-aos="fade-up">
        {techStackData.map((section, index) => (
          <div key={index} className={styles.techSection}>
            <div className={styles.sectionTitleWrapper}>
              <h2 className={styles.sectionTitleSkill}>{section.category}</h2>
            </div>
            
            <div className={styles.techGrid} data-aos="fade-up">
              {section.items.map((item, i) => (
                <div key={i} className={`${styles.techItem} ${styles.slideUp}`}>
                  <div className={styles.iconWrapper} data-aos="fade-up">
                    <img 
                      src={item.url} 
                      alt={item.name} 
                      className={styles.techIcon}
                      loading="lazy"
                    />
                  </div>
                  <span className={styles.techName}>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>

    <section id="experience" className={styles.experience}>
      <div className={styles.myStackContainer} style={{paddingLeft: "1.5rem"}}>
        <svg 
        xmlns="http://www.w3.org/2000/svg" 
        xmlnsXlink="http://www.w3.org/1999/xlink" 
        fill="none" 
        viewBox="0 0 25 29" 
        width="25" 
        className={styles.spinner}
      >
        <path fill="url(#section-flower_svg__a)" d="M25 0H0v28.929h25z"></path>
        <defs>
          <pattern 
            id="section-flower_svg__a" 
            width="1" 
            height="1" 
            patternContentUnits="objectBoundingBox"
          >
            <use 
              xlinkHref="#section-flower_svg__b" 
              transform="matrix(.00255 0 0 .0022 -.01 0)"
            ></use>
          </pattern>
          {/* Note: The original image href 'a' is a placeholder and should be updated */}
          <image xlinkHref="img/flower.png" id="section-flower_svg__b" width="400" height="453"></image>
        </defs>
      </svg>
        <h2 className={styles.myStackTitle}>MY EXPERIENCE</h2>
      </div>
      <div className={styles.gridContainer} data-aos="fade-up">
        <div className={styles.experienceItem} style={dynamicItemStyle}>
          <p className={styles.textTitle}>Soft Master Trade</p>
          <p className={styles.textSubtitle}>IT Specialist</p>
          <p className={styles.textDate}>05/2025 - 08/2025</p>
        </div>
      </div>
      {/* <div className={styles.gridContainer} data-aos="fade-up" data-aos-delay="300">
        <div className={styles.experienceItem} style={dynamicItemStyle}>
          <p className={styles.textTitle}>All-Safe</p>
          <p className={styles.textSubtitle}>Front-End Developer - Internship</p>
          <p className={styles.textDate}>04/2025 - 07/2025</p>
        </div>
      </div> */}
    </section>

    <section id="projects" className={styles.projects}>
      <div className={styles.myStackContainer} style={{paddingLeft: "1.5rem"}}>
        <svg 
        xmlns="http://www.w3.org/2000/svg" 
        xmlnsXlink="http://www.w3.org/1999/xlink" 
        fill="none" 
        viewBox="0 0 25 29" 
        width="25" 
        className={styles.spinner}
      >
        <path fill="url(#section-flower_svg__a)" d="M25 0H0v28.929h25z"></path>
        <defs>
          <pattern 
            id="section-flower_svg__a" 
            width="1" 
            height="1" 
            patternContentUnits="objectBoundingBox"
          >
            <use 
              xlinkHref="#section-flower_svg__b" 
              transform="matrix(.00255 0 0 .0022 -.01 0)"
            ></use>
          </pattern>
          {/* Note: The original image href 'a' is a placeholder and should be updated */}
          <image xlinkHref="img/flower.png" id="section-flower_svg__b" width="400" height="453"></image>
        </defs>
      </svg>
        <h2 className={styles.myStackTitle}>SELECTED PROJECTS</h2>
      </div>
      <div className={styles.containerProjects} data-aos="fade-up">
        <a href="https://sfbsolutions.ge/" target="#" className={styles.projectCard}>
        <div className={styles.cardContent}>
          
          {/* Number */}
          <div className={styles.projectNumber}>_01.</div>

          <div className={styles.projectDetails}>
            {/* Title with Gradient Hover Effect */}
            <p className={styles.projectTitle}>
              Sfbsolutions
              
              {/* Animated SVG Icon */}
              <span className={styles.iconWrapperProjects}>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="36" 
                  height="36" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path 
                    className={styles.pathBox} 
                    d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" 
                  />
                  <path 
                    className={styles.pathArrowLine} 
                    d="M10 14 21 3" 
                  />
                  <path 
                    className={styles.pathArrowCurb} 
                    d="M15 3h6v6" 
                  />
                </svg>
              </span>
            </p>

            {/* Tags */}
            <div className={styles.tagsContainer}>
              <div className={styles.tag}>
                <span>Next</span>
                <span className={styles.dot}></span>
              </div>
              <div className={styles.tag}>
                <span>TypeScript</span>
                <span className={styles.dot}></span>
              </div>
              <div className={styles.tag}>
                <span>CSS</span>
              </div>
            </div>
          </div>
        </div>
      </a>
      </div>

      {/* <div className={styles.containerProjects} data-aos="fade-up">
        <a href="https://georgetsn29.github.io/web-login-reg/" target="#" className={styles.projectCard}>
        <div className={styles.cardContent}>
          
          <div className={styles.projectNumber}>_02.</div>

          <div className={styles.projectDetails}>
            <p className={styles.projectTitle}>
              Login/Reg
              
              <span className={styles.iconWrapperProjects}>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="36" 
                  height="36" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path 
                    className={styles.pathBox} 
                    d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" 
                  />
                  <path 
                    className={styles.pathArrowLine} 
                    d="M10 14 21 3" 
                  />
                  <path 
                    className={styles.pathArrowCurb} 
                    d="M15 3h6v6" 
                  />
                </svg>
              </span>
            </p>

            <div className={styles.tagsContainer}>
              <div className={styles.tag}>
                <span>Next</span>
                <span className={styles.dot}></span>
              </div>
              <div className={styles.tag}>
                <span>TypeScript</span>
                <span className={styles.dot}></span>
              </div>
              <div className={styles.tag}>
                <span>CSS</span>
              </div>
            </div>
          </div>
        </div>
      </a>
      </div> */}
      
    </section>

    <section className={styles.footer}>
      <div className={styles.footerwrapper}>
        <p>You know how to find me</p>
        <a href="mailto:giotsnobiladze5@gmail.com" className={styles.footerEmail} onClick={handleCopy}>{copied ? "Copied!" : "giotsnobiladze5@gmail.com"}</a>
        <a href="https://github.com/Georgetsn29" target="_blank" className={styles.footerGit}>built by GIORGI &lt;3</a>
      </div>
    </section>
    </>
  );
}