"use client";

import { useEffect, useState, useCallback } from "react";
import styles from "./page.module.scss";
import AOS from "aos";
import "aos/dist/aos.css";
import Modal from "./components/certificate_modal/Modal";

/* =========================================================
   Constants & data
   ========================================================= */
const YOUR_BIRTH_YEAR = 2003;
const EMAIL = "giotsnobiladze5@gmail.com";

const calculateAge = (birthYear: number): number => {
  const today = new Date();
  let age = today.getFullYear() - birthYear;

  // getMonth() is 0-based: 4 = May, 5 = June
  const birthdayMonth = 5;
  const birthdayDay = 29;

  const currentMonth = today.getMonth();
  const currentDay = today.getDate();

  if (
    currentMonth < birthdayMonth ||
    (currentMonth === birthdayMonth && currentDay < birthdayDay)
  ) {
    age--;
  }

  return age;
};

const LETTERS = ["G", "I", "O", "R", "G", "I"];

const REVEAL_DELAY = 150;
const FADE_DELAY = 100;
const HOLD_TIME = 800;

const TOTAL_LETTERS = LETTERS.length;
// Steps: 1-6 (reveal), 7 (hold), 8 (start exit)
const TOTAL_STEPS = TOTAL_LETTERS + 2;

const techStackData = [
  {
    category: "Frontend",
    items: [
      { name: "HTML", url: "/Portfolio/img/frontend/HTML.webp" },
      { name: "CSS", url: "/Portfolio/img/frontend/CSS.webp" },
      { name: "JavaScript", url: "/Portfolio/img/frontend/JavaScript.webp" },
      { name: "TypeScript", url: "/Portfolio/img/frontend/TypeScript.webp" },
      { name: "React", url: "/Portfolio/img/frontend/React.webp" },
      { name: "Next.Js", url: "/Portfolio/img/frontend/Next.webp" },
      { name: "Tailwind CSS", url: "/Portfolio/img/frontend/Tailwind.webp" },
      { name: "Sass", url: "/Portfolio/img/frontend/Sass.webp" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", url: "/Portfolio/img/backend/Node.webp" },
      { name: "Express.js", url: "/Portfolio/img/backend/Express.webp" },
      { name: "PHP", url: "/Portfolio/img/backend/PHP.webp" },
      { name: "Laravel", url: "/Portfolio/img/backend/Laravel.webp" },
      { name: "MongoDB", url: "/Portfolio/img/backend/MongoDB.webp" },
      { name: "MySQL", url: "/Portfolio/img/backend/MySQL.webp" },
      { name: "Supabase", url: "/Portfolio/img/backend/Supabase.webp" },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git", url: "/Portfolio/img/tools/Git.webp" },
      { name: "GitHub", url: "/Portfolio/img/tools/GitHub.webp" },
      { name: "Postman", url: "/Portfolio/img/tools/Postman.webp" },
      { name: "VSCODE", url: "/Portfolio/img/tools/VSCODE.webp" },
      { name: "NPM", url: "/Portfolio/img/tools/NPM.webp" },
      { name: "PNPM", url: "/Portfolio/img/tools/PNPM.webp" },
      { name: "Yarn", url: "/Portfolio/img/tools/Yarn.webp" },
    ],
  },
  {
    category: "Studying",
    items: [
      { name: "Hono", url: "/Portfolio/img/studying/Hono.webp" },
      { name: "Flutter", url: "/Portfolio/img/studying/Flutter.webp" },
    ],
  },
];

const menuItems = [
  { name: "Home", href: "#home", iconClass: styles.iconHome },
  { name: "About Me", href: "#about", iconClass: styles.iconAbout },
  { name: "Education", href: "#education", iconClass: styles.iconEdu },
  { name: "Experience", href: "#experience", iconClass: styles.iconExp },
  { name: "Projects", href: "#projects", iconClass: styles.iconProjects },
];

const dynamicItemStyle = {
  opacity: 0.7969,
  transform: "translate3d(0px, 10.1567px, 0px)",
};

/* =========================================================
   Small components
   ========================================================= */
const AnimatedMenuButton = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={styles.menuButton}
    aria-label={isOpen ? "Close menu" : "Open menu"}
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

// Each instance needs a unique `id` (duplicate SVG ids are invalid HTML)
const FlowerIcon = ({ id }: { id: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    fill="none"
    viewBox="0 0 25 29"
    width="25"
    className={styles.spinner}
    aria-hidden="true"
  >
    <path fill={`url(#${id}-pattern)`} d="M25 0H0v28.929h25z"></path>
    <defs>
      <pattern
        id={`${id}-pattern`}
        width="1"
        height="1"
        patternContentUnits="objectBoundingBox"
      >
        <use
          xlinkHref={`#${id}-image`}
          transform="matrix(.00255 0 0 .0022 -.01 0)"
        ></use>
      </pattern>
      <image
        xlinkHref="img/flower.png"
        id={`${id}-image`}
        width="400"
        height="453"
      ></image>
    </defs>
  </svg>
);

const SectionHeading = ({
  id,
  title,
  indent = false,
}: {
  id: string;
  title: string;
  indent?: boolean;
}) => (
  <div
    className={styles.myStackContainer}
    style={indent ? { paddingLeft: "1.5rem" } : undefined}
  >
    <FlowerIcon id={id} />
    <h2 className={styles.myStackTitle}>{title}</h2>
  </div>
);

const ProjectArrowIcon = () => (
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
      <path className={styles.pathArrowLine} d="M10 14 21 3" />
      <path className={styles.pathArrowCurb} d="M15 3h6v6" />
    </svg>
  </span>
);

/* =========================================================
   Page
   ========================================================= */
export default function Page() {
  const [copied, setCopied] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeImg, setActiveImg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  const closeSidebar = () => setIsSidebarOpen(false);

  // Strip any #hash from the address bar on load
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const cleanUrl = window.location.pathname + window.location.search;
      window.history.replaceState(null, "", cleanUrl);
    }
  }, []);

  const handleCopy = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  // Always start at the top
  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    if (typeof window !== "undefined") {
      window.onbeforeunload = function () {
        window.scrollTo(0, 0);
      };
    }
  }, []);

  useEffect(() => {
  if (!isSidebarOpen) return;

  const { overflow, paddingRight } = document.body.style;
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;

  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = `${scrollbarWidth}px`; // stops the page jumping sideways

  return () => {
    document.body.style.overflow = overflow;
    document.body.style.paddingRight = paddingRight;
  };
}, [isSidebarOpen]);

  // Scroll progress bar
  const updateScrollProgress = useCallback(() => {
    const scrollableHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = document.documentElement.scrollTop;

    if (scrollableHeight > 0) {
      const percentage =
        Math.max(0, Math.min(1, scrolled / scrollableHeight)) * 100;
      setScrollProgress(percentage);
    } else {
      setScrollProgress(0);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", updateScrollProgress);
    updateScrollProgress();
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, [updateScrollProgress]);

  const translationPercentage = 100 - scrollProgress;
  const currentAge = calculateAge(YOUR_BIRTH_YEAR);

  // Splash screen timing
  useEffect(() => {
    if (!isLoading) return;

    if (currentStep >= TOTAL_STEPS) {
      const finishTimer = setTimeout(() => setIsLoading(false), 700);
      return () => clearTimeout(finishTimer);
    }

    let delay = REVEAL_DELAY;
    if (currentStep === TOTAL_LETTERS) {
      delay = HOLD_TIME;
    } else if (currentStep > TOTAL_LETTERS) {
      delay = FADE_DELAY;
    }

    const timer = setTimeout(() => setCurrentStep((prev) => prev + 1), delay);
    return () => clearTimeout(timer);
  }, [currentStep, isLoading]);

  const isExiting = currentStep >= TOTAL_STEPS - 1;

  const SplashScreen = (
    <div
      className={`${styles.splashScreen} ${isExiting ? styles.exitActive : ""}`}
    >
      {/* Background columns */}
      <div className={styles.columnContainer}>
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className={styles.column}
            style={{ transitionDelay: `${i * 0.04}s` }}
          />
        ))}
      </div>

      {/* Text layer */}
      <div className={styles.georgeTextContainer}>
        {LETTERS.map((letter, index) => {
          const isRevealed = currentStep > index;

          return (
            <span
              key={index}
              className={styles.letter}
              style={{
                transform: isExiting
                  ? "translateY(-150%)"
                  : isRevealed
                  ? "translateY(0%)"
                  : "translateY(110%)",
                opacity: isRevealed ? 1 : 0,
                transitionDelay: isExiting ? `${index * 0.03}s` : "0s",
              }}
            >
              {letter}
            </span>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {isLoading && SplashScreen}

      <div className={styles.menuButtonWrapper}>
        <AnimatedMenuButton
          isOpen={isSidebarOpen}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      </div>

      {/* --- Sidebar --- */}
      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}>
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
                  >
                    RESUME
                  </a>
                </li>
              </ul>
            </nav>

            <nav className={styles.socialSection}>
              <p className={styles.sectionTitle}>MENU</p>
              <ul className={styles.navList}>
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={closeSidebar}
                      className={styles.navButton}
                    >
                      <span className={`${styles.iconContainer} ${item.iconClass}`}>
                        <SvgIcon />
                      </span>
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className={styles.sidebarFooter}>
          <p>GET IN TOUCH</p>
          <a
            href={`mailto:${EMAIL}`}
            className={styles.sideBarEmail}
            onClick={handleCopy}
          >
            {copied ? "Copied!" : EMAIL}
          </a>
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

      {/* --- Scroll progress (make sure .progress-track is in globals.css) --- */}
      <div className="progress-track">
        <div
          id="scroll-progress-bar"
          style={{
            width: "100%",
            backgroundColor: "#30c495",
            borderRadius: "9999px",
            height: "100%",
            transition: "transform 500ms ease-out",
            transform: `translateY(-${translationPercentage}%)`,
          }}
        />
      </div>

      <a
        href={`mailto:${EMAIL}`}
        className={styles.sideEmail}
        onClick={handleCopy}
      >
        {copied ? "Copied!" : EMAIL}
      </a>

      {/* =====================  HOME  ===================== */}
      <section id="home" className={styles.home}>
        <div className={styles.left}>
          <div>
            <h1>
              <span className={styles.frontend}>FULL STACK</span>
              <br />
              <span className={styles.developer}>DEVELOPER</span>
            </h1>
          </div>
          <div className={styles.devText}>
            Hi! I&apos;m <strong>Giorgi</strong>. A junior Full Stack Developer
            with hands-on <br /> experience through building high-performance,
            scalable, <br /> and responsive web solutions.
          </div>
          <div>
            <a
              className={styles.resume}
              href="./Giorgi_Tsnobiladze_CV.pdf"
              target="_blank"
              rel="noreferrer"
            >
              RESUME
            </a>
          </div>
        </div>

        <div className={styles.right}>
          <span className={styles.spanColor}>&lt;span&gt;</span>
          <div className={styles.innerSpan} style={{ fontSize: "14px" }}>
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

      {/* =====================  ABOUT  ===================== */}
      <section id="about" className={styles.about}>
        <div className={styles.aboutContainer}>
          <p className={styles.aboutPMain} data-aos="fade-up">
            I believe in a user centered design approach, ensuring that every
            project I work on is tailored to meet the specific needs of its
            users.
          </p>
          <p
            className={styles.aboutPMe}
            data-aos="fade-up"
            data-aos-delay="250"
            data-aos-once="true"
          >
            This is me.
          </p>

          <div className={styles.aboutContainerMain}>
            <div className={styles.aboutContainerLeft}>
              <div>
                <p className={styles.aboutPGiorgi} data-aos="fade-up">
                  I&apos;m Giorgi.
                </p>
                <p className={styles.aboutPWeb} data-aos="fade-up">
                  Web developer with a relentless drive for excellence, skilled
                  in creating and maintaining functional and responsive web
                  applications and websites.
                </p>
              </div>
            </div>

            <div className={styles.aboutContainerRight}>
              <p data-aos="fade-up">
                A {currentAge} year old junior Full Stack Web Developer based in
                Tbilisi, Georgia. Dedicated to turning ideas into creative
                solutions. I specialize in creating seamless and intuitive user
                experiences.
              </p>
              <hr
                style={{ border: "0", borderTop: "2px solid #6a7282" }}
                data-aos="fade-left"
              />
              <p data-aos="fade-up">
                My approach focuses on creating scalable, high-performing
                solutions tailored to both user needs and business objectives.
                By prioritizing performance, accessibility, and responsiveness,
                I strive to deliver experiences that not only engage users but
                also drive tangible results.
              </p>
            </div>
          </div>

          <p className={styles.aboutPStop} data-aos="fade-up">
            I CAN&apos;T STOP CONFIGURING MY CODE EDITOR
          </p>
        </div>
      </section>

      {/* =====================  STACK  ===================== */}
      <section className={styles.aboutSkill}>
        <SectionHeading id="flower-stack" title="MY STACK" />

        <div className={styles.techStackContainer} data-aos="fade-up">
          {techStackData.map((section) => (
            <div key={section.category} className={styles.techSection}>
              <div className={styles.sectionTitleWrapper}>
                <h2 className={styles.sectionTitleSkill}>{section.category}</h2>
              </div>

              <div className={styles.techGrid} data-aos="fade-up">
                {section.items.map((item) => (
                  <div
                    key={item.name}
                    className={`${styles.techItem} ${styles.slideUp}`}
                  >
                    <div className={styles.iconWrapper} data-aos="fade-up">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
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

      {/* =====================  EDUCATION  ===================== */}
      <section id="education" className={styles.education}>
        <SectionHeading id="flower-education" title="MY EDUCATION" indent />

        <div
          className={styles.gridContainer}
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div className={styles.experienceItem} style={dynamicItemStyle}>
            <a
              href="https://ibsu.edu.ge/en/"
              target="_blank"
              rel="noreferrer"
              className={styles.textTitleA}
            >
              International Black Sea University
            </a>
            <p className={styles.textSubtitle}>Computer Science</p>
            <p className={styles.textDate}>08/2021 - Present</p>
          </div>
        </div>

        <div
          className={styles.gridContainer}
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div className={styles.experienceItem} style={dynamicItemStyle}>
            <a
              href="https://doit.gov.ge/"
              target="_blank"
              rel="noreferrer"
              className={styles.textTitleB}
            >
              Do It in Georgia <span style={{ color: "#fcba03" }}>X</span>{" "}
              Mziuri
            </a>
            <p className={styles.textSubtitle}>
              Full Stack WEB Development - Course
            </p>

            <div className={styles.experience_wrapper}>
              <p className={styles.textDate}>05/2026 - Present</p>

              <button
                className={styles.textButton}
                onClick={() => setActiveImg("img/front-certificate-img.png")}
              >
                Front end Certificate
              </button>
            </div>
          </div>

          <Modal
            isOpen={activeImg !== null}
            onClose={() => setActiveImg(null)}
            imgSrc={activeImg ?? ""}
            alt="Certificate"
          />
        </div>
      </section>

      {/* =====================  EXPERIENCE  ===================== */}
      <section id="experience" className={styles.experience}>
        <SectionHeading id="flower-experience" title="MY EXPERIENCE" indent />

        <div className={styles.gridContainer} data-aos="fade-up">
          <div className={styles.experienceItem} style={dynamicItemStyle}>
            <a
              href="https://smt.ge/en"
              target="_blank"
              rel="noreferrer"
              className={styles.textTitleC}
              
            >
              Soft Master Trade
            </a>
            <p className={styles.textSubtitle}>IT Specialist</p>
            <p className={styles.textDate}>05&#47;2025 &#8209; 08&#47;2025</p>
          </div>
        </div>

        <div
          className={styles.gridContainer}
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div className={styles.experienceItem} style={dynamicItemStyle}>
            <a
              href="https://ag.ge/"
              target="_blank"
              rel="noreferrer"
              className={styles.textTitleD}
            >
              Georgian Amelioration
            </a>
            <p className={styles.textSubtitle}>Junior Backend Developer</p>
            <p className={styles.textDate}>10/2026 - Present</p>
          </div>
        </div>
      </section>

      {/* =====================  PROJECTS  ===================== */}
      <section id="projects" className={styles.projects}>
        <SectionHeading id="flower-projects" title="SELECTED PROJECTS" indent />

        {/* _01 */}
        <div className={styles.containerProjects} data-aos="fade-up">
          <a
            href="https://georgetsn29.github.io/sfbsolutions.ge/"
            target="_blank"
            rel="noreferrer"
            className={styles.projectCard}
          >
            <div className={styles.cardContent}>
              <div className={styles.projectNumber}>_01.</div>

              <div className={styles.projectDetails}>
                <p className={styles.projectTitle}>
                  Sfbsolutions
                  <ProjectArrowIcon />
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
        </div>

        {/* _02 */}
        <div className={styles.containerProjects} data-aos="fade-up">
          <a
            href="https://concrete-static.onrender.com/"
            target="_blank"
            rel="noreferrer"
            className={styles.projectCard}
          >
            <div className={styles.cardContent}>
              <div className={styles.projectNumber}>_02.</div>

              <div className={styles.projectDetails}>
                <p className={styles.projectTitle}>
                  Concrete Static
                  <ProjectArrowIcon />
                </p>

                <div className={styles.tagsContainer}>
                  <div className={styles.tag}>
                    <span>React</span>
                    <span className={styles.dot}></span>
                  </div>
                  <div className={styles.tag}>
                    <span>TypeScript</span>
                    <span className={styles.dot}></span>
                  </div>
                  <div className={styles.tag}>
                    <span>TailwindCSS</span>
                    <span className={styles.dot}></span>
                  </div>
                  <div className={styles.tag}>
                    <span>Node JS</span>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* _03 */}
        <div className={styles.containerProjects} data-aos="fade-up">
          <a
            href="https://georgetsn29.github.io/Gita-Mziuri-frontend-project/index.html"
            target="_blank"
            rel="noreferrer"
            className={styles.projectCard}
          >
            <div className={styles.cardContent}>
              <div className={styles.projectNumber}>_03.</div>

              <div className={styles.projectDetails}>
                <p className={styles.projectTitle}>
                  Gita <span style={{ color: "#fcba03" }}>X</span> Mziuri
                  <ProjectArrowIcon />
                </p>

                <br />
                <div className={styles.tag}>
                  <span className={styles.projectTitleLittle}>
                    Front end Project
                  </span>
                </div>
                <br />

                <div className={styles.tagsContainer}>
                  <div className={styles.tag}>
                    <span>HTML</span>
                    <span className={styles.dot}></span>
                  </div>
                  <div className={styles.tag}>
                    <span>Sass</span>
                    <span className={styles.dot}></span>
                  </div>
                  <div className={styles.tag}>
                    <span>JS</span>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* =====================  FOOTER  ===================== */}
      <section className={styles.footer}>
        <div className={styles.footerwrapper}>
          <p>You know how to find me</p>
          <a
            href={`mailto:${EMAIL}`}
            className={styles.footerEmail}
            onClick={handleCopy}
          >
            {copied ? "Copied!" : EMAIL}
          </a>
          <a
            href="https://github.com/Georgetsn29"
            target="_blank"
            rel="noreferrer"
            className={styles.footerGit}
          >
            built by GIORGI &lt;3
          </a>
        </div>
      </section>
    </>
  );
}
