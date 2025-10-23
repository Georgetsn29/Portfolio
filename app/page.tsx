"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import AOS from "aos";
import "aos/dist/aos.css";


export default function Page() {

    const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const email = "giotsnobiladze5@gmail.com";

    try {
      await navigator.clipboard.writeText(email);
      setCopied(true); // set copied to true
      setTimeout(() => setCopied(false), 10); // reset after 1.5s
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

    useEffect(() => {
    AOS.init({ once: true });
    // Reset scroll on reload
    if (typeof window !== "undefined") {
      window.onbeforeunload = function () {
        window.scrollTo(0, 0);
      };
    }
  }, []);

  return (
    <>
    <a href="mailto:giotsnobiladze5@gmail.com" className={styles.sideText} onClick={handleCopy} data-aos="fade-up-right" data-aos-delay="500" data-aos-easing="linear">{copied ? "Copied!" : "giotsnobiladze5@gmail.com"}</a>

    <section>
      <div className={styles.left}>
        <div>
          <h1><span className={styles.frontend}>FRONTEND</span><br /><span className={styles.developer}>DEVELOPER</span></h1>
        </div>
        <div className={styles.devText}>Hi! I&apos;m Giorgi. A Frontend Developer with hands-on <br /> experience through building high-performance, scalable, <br /> and responsive web solutions.</div>
        <div>
          <a className={styles.resume} href="./Giorgi_Tsnobiladze_CV.pdf" target="_blank">RESUME</a>
        </div>
      </div>

      <div className={styles.right} data-aos="fade-left" data-aos-delay="500">
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
    </>
  );
}