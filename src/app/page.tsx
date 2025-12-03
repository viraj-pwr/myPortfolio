"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { blogs } from "./data/blogs";

// Custom hook for scroll animations
function useScrollReveal(initialVisible = false) {
  const [isVisible, setIsVisible] = useState(initialVisible);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return { ref, isVisible };
}

export default function Home() {
  const starFieldRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<{ element: HTMLDivElement; baseX: number; baseY: number; depth: number }[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const heroReveal = useScrollReveal(true); // Start visible
  const specializationReveal = useScrollReveal();
  const experienceReveal = useScrollReveal();
  const projectsReveal = useScrollReveal();
  const blogsReveal = useScrollReveal();
  const techStackReveal = useScrollReveal();

  useEffect(() => {
    if (!starFieldRef.current) return;

    // Create stars
    const starField = starFieldRef.current;
    const starCount = 150;
    const stars: { element: HTMLDivElement; baseX: number; baseY: number; depth: number }[] = [];

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      star.className = "star";
      const size = Math.random() * 2 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      const baseX = Math.random() * 100;
      const baseY = Math.random() * 100;
      star.style.left = `${baseX}%`;
      star.style.top = `${baseY}%`;
      star.style.animationDelay = `${Math.random() * 3}s`;
      // Depth determines how much the star moves with mouse (0.1 to 1)
      const depth = Math.random() * 0.9 + 0.1;
      star.dataset.depth = depth.toString();
      starField.appendChild(star);
      stars.push({ element: star, baseX, baseY, depth });
    }
    starsRef.current = stars;

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      // Calculate offset from center (-1 to 1)
      const offsetX = (clientX - centerX) / centerX;
      const offsetY = (clientY - centerY) / centerY;
      
      mouseRef.current = { x: offsetX, y: offsetY };

      // Move each star based on mouse position and its depth
      starsRef.current.forEach(({ element, baseX, baseY, depth }) => {
        const moveX = offsetX * 30 * depth; // Max 30px movement
        const moveY = offsetY * 30 * depth;
        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <div ref={starFieldRef} className="star-field" />

      <div className="relative z-10 min-h-screen">
        {/* Navigation */}
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-black/60 backdrop-blur-md rounded-full px-8 py-4 border border-white/10">
            <div className="flex gap-12">
              <a href="#home" className="text-sm hover:text-accent transition-colors">Home</a>
              <a href="#experience" className="text-sm hover:text-accent transition-colors">Experience</a>
              <a href="#projects" className="text-sm hover:text-accent transition-colors">Projects</a>
              <a href="#blogs" className="text-sm hover:text-accent transition-colors">Blogs</a>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section
          ref={heroReveal.ref as React.RefObject<HTMLElement>}
          id="home"
          className={`min-h-screen flex flex-col items-center justify-center px-6 pt-20 transition-all duration-1000 ${
            heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center max-w-5xl mx-auto">
            {/* Profile Photo */}
            <div className="mb-8">
              <Image 
                src="/viraj.jpg" 
                alt="Viraj Pawar" 
                width={192}
                height={192}
                className="w-48 h-48 rounded-full mx-auto object-cover border-4 border-cyan-400/50 shadow-xl shadow-cyan-400/20"
                priority
              />
            </div>
            
            <p className="text-xl mb-8 text-foreground/80">Hello, I'm Viraj, a</p>

            <h1 className="font-orbitron font-extrabold text-[48px] md:text-[60px] leading-[50px] md:leading-[65px] text-[rgb(255,255,227)] mb-8 tracking-wider">
              DATA SCIENTIST/
              <br />
              DATA ANALYST
            </h1>

            <p className="text-lg mb-16 text-foreground/90">
              I build dynamic web{" "}
              <span className="text-orange-500">applications</span> from concept to{" "}
              <span className="text-cyan-400">deployment</span>
            </p>

{/* Social Links */}
            <div className="flex justify-center mb-20">
              <div className="inline-flex items-center gap-4 bg-black/60 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10 font-poppins font-normal text-white text-[16px] leading-[24px]">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <img src="https://ext.same-assets.com/564016206/1511665057.svg" alt="LinkedIn" className="social-icon-img" />
                  <span className="social-icon-label">LinkedIn</span>
                </a>
                <a href="https://medium.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <img src="https://ext.same-assets.com/564016206/867924452.svg" alt="Medium" className="social-icon-img" />
                  <span className="social-icon-label">Medium</span>
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" className="social-icon-img-white" />
                  <span className="social-icon-label">GitHub</span>
                </a>
                <a href="/resume.pdf" className="social-icon">
                  <img src="https://ext.same-assets.com/564016206/1119384252.svg" alt="Resume" className="social-icon-img-white" />
                  <span className="social-icon-label">Resume</span>
                </a>
                <a href="mailto:ishant9715@gmail.com" className="social-icon">
                  <img src="https://ext.same-assets.com/564016206/1688448539.svg" alt="Email" className="social-icon-img-white" />
                  <span className="social-icon-label">Email</span>
                </a>
              </div>
            </div>

            {/* Specialization */}
            <div
              ref={specializationReveal.ref as React.RefObject<HTMLDivElement>}
              className={`max-w-6xl mr-auto transition-all duration-1000 delay-300 font-poppins ${
                specializationReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              {/* Left aligned text */}
              <h2 className="text-4xl font-normal leading-tight text-left mb-12">
                I specialize in developing and deploying{" "}
                <span className="text-orange-400">scalable</span>
                <br />
                <span className="text-orange-400">web applications</span>.
              </h2>

              {/* Horizontal divider line */}
              <div className="w-full h-[2px] bg-white/30 mb-12" />

              {/* Right aligned text */}
              <p className="text-4xl font-normal leading-tight text-right">
                I expertise in building apps on
                <br />
                <span className="bg-white text-black px-3 py-1 rounded font-semibold">Java</span>{" "}
                and{" "}
                <span className="bg-white text-black px-3 py-1 rounded font-semibold">TypeScript</span>
                <br />
                Currently working on{" "}
                <span className="text-cyan-400">Golang</span>,
                <br />
                <span className="text-orange-400">Nest.js</span> and{" "}
                <span className="text-purple-500">AWS</span>.
              </p>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section
          ref={experienceReveal.ref as React.RefObject<HTMLElement>}
          id="experience"
          className={`py-20 px-6 transition-all duration-1000 ${
            experienceReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col lg:flex-row gap-16">
              {/* Left side - Experience heading */}
              <div className="lg:w-1/3 lg:sticky lg:top-32 lg:self-start">
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-extralight tracking-tight">
                  Experience
                </h2>
              </div>

              {/* Right side - Experience entries */}
              <div className="lg:w-2/3 space-y-8">
                {/* McCune Management Services */}
                <div className="group flex gap-8 p-6 -m-6 rounded-xl transition-all duration-300 hover:bg-white/[0.03] hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] hover:drop-shadow-lg cursor-default">
                  <div className="w-40 flex-shrink-0 text-sm text-foreground/50 pt-1 group-hover:text-foreground/70 transition-colors">
                    July 2024 — March 2025
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1 group-hover:text-cyan-400 transition-colors">McCune Management Services Ltd</h3>
                    <p className="text-sm text-foreground/60 mb-1">Belfast, Northern Ireland</p>
                    <p className="text-lg text-cyan-400 mb-6 font-orbitron font-extrabold">Data Analyst</p>

                    <div className="space-y-4 mb-8 font-poppins font-normal text-white text-[12px] leading-[16px]">
                      <p>Optimised resource allocation by analysing historical project timelines, contractor delays, and hardware delivery data, contributing to a 10% reduction in average project delays.</p>
                      <p>Developed microservices on Google Cloud Platform to integrate REST APIs from Smartsheet, Google Sheets, and Autodesk Construction Cloud, streamlining cross-platform data flow and reducing ETL time by 80%.</p>
                      <p>Developed and deployed a semantic segmentation deep learning model on Google's Vertex AI Platform to extract road and pavement features from satellite imagery, supporting vehicle dynamics analysis for hostile vehicle mitigation.</p>
                      <p>Improved semantic segmentation model performance by fine-tuning hyperparameters and implementing advanced augmentation techniques, resulting in a 12% increase in IoU score for road and pavement detection.</p>
                      <p>Built a web application for vehicle dynamics analysis for hostile vehicle mitigation using vanilla JavaScript on the Google Apps Script platform, and integrated the semantic segmentation model API to identify vulnerable access points for hostile vehicles.</p>
                      <p>Developed a vendor performance model using Propensity Score Matching in Python and proposed strategic changes in contractor comparison, which improved project delivery time by 15%.</p>
                      <p>Created ad-hoc data visualisation on Looker Studio and communicated results to stakeholders across APAC, Americas, EMEA and Bay Area.</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="px-4 py-1.5 border border-cyan-400/50 text-cyan-400 rounded-full text-sm">Python</span>
                      <span className="px-4 py-1.5 border border-cyan-400/50 text-cyan-400 rounded-full text-sm">GCP</span>
                      <span className="px-4 py-1.5 border border-cyan-400/50 text-cyan-400 rounded-full text-sm">Vertex AI</span>
                      <span className="px-4 py-1.5 border border-cyan-400/50 text-cyan-400 rounded-full text-sm">Deep Learning</span>
                      <span className="px-4 py-1.5 border border-cyan-400/50 text-cyan-400 rounded-full text-sm">Looker Studio</span>
                    </div>
                  </div>
                </div>

                {/* Capgemini */}
                <div className="group flex gap-8 p-6 -m-6 rounded-xl transition-all duration-300 hover:bg-white/[0.03] hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] hover:drop-shadow-lg cursor-default">
                  <div className="w-40 flex-shrink-0 text-sm text-foreground/50 pt-1 group-hover:text-foreground/70 transition-colors">
                    Nov 2022 — Dec 2023
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1 group-hover:text-cyan-400 transition-colors">Capgemini Consulting Österreich AG</h3>
                    <p className="text-sm text-foreground/60 mb-1">Remote</p>
                    <p className="text-lg text-cyan-400 mb-6 font-orbitron font-extrabold">Data Scientist</p>

                    <div className="space-y-4 mb-8 font-poppins font-normal text-white text-[12px] leading-[16px]">
                      <p>Reduced data preparation time by 60% for regression model training by implementing data integrity methods on steel manufacturing process data.</p>
                      <p>Created manifests for automatic validation of process and laser measurement data, reducing manual validation workload by 90%.</p>
                      <p>Pre-processed and manipulated steel manufacturing process data using Python to develop machine learning models predicting the remaining brick length of vessels, reducing data understanding time by 80%.</p>
                      <p>Analysed large volumes of steel production process and laser measurement data to identify trends and patterns in manufacturing parameters.</p>
                      <p>Generated analysis and investigation reports for client data validation, ensuring consistency across multiple datasets.</p>
                      <p>Defined BOF, RH, EAF, and Ladle vessel regions with their coordinates for integration into RHI Magnesita's Cockpit platform.</p>
                      <p>Collaborated with the technical marketing team and customers to define data requirements and automate ingestion of process, 3D, and measurement data via PowerShell.</p>
                      <p>Delivered product demonstrations of RHI's data services to major steel manufacturing corporations.</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="px-4 py-1.5 border border-cyan-400/50 text-cyan-400 rounded-full text-sm">Python</span>
                      <span className="px-4 py-1.5 border border-cyan-400/50 text-cyan-400 rounded-full text-sm">Machine Learning</span>
                      <span className="px-4 py-1.5 border border-cyan-400/50 text-cyan-400 rounded-full text-sm">PowerShell</span>
                      <span className="px-4 py-1.5 border border-cyan-400/50 text-cyan-400 rounded-full text-sm">Data Validation</span>
                    </div>
                  </div>
                </div>

                {/* Larsen & Toubro */}
                <div className="group flex gap-8 p-6 -m-6 rounded-xl transition-all duration-300 hover:bg-white/[0.03] hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] hover:drop-shadow-lg cursor-default">
                  <div className="w-40 flex-shrink-0 text-sm text-foreground/50 pt-1 group-hover:text-foreground/70 transition-colors">
                    March 2021 — March 2022
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1 group-hover:text-cyan-400 transition-colors">Larsen & Toubro Infotech Limited</h3>
                    <p className="text-sm text-foreground/60 mb-1">Remote</p>
                    <p className="text-lg text-cyan-400 mb-6 font-orbitron font-extrabold">Data Scientist</p>

                    <div className="space-y-4 mb-8 font-poppins font-normal text-white text-[12px] leading-[16px]">
                      <p>Collaborated with the Cisco team to develop a knowledge graph-based Q&A system for Cisco's enterprise offerings.</p>
                      <p>Annotated text data for named entity recognition and text classification as part of the Q&A pipeline.</p>
                      <p>Tuned LSTM and Transformer model hyperparameters to optimise NLP pipelines for entity and relation extraction.</p>
                      <p>Built custom NER and relation extraction models using first-order logic in Python.</p>
                      <p>Parsed technical datasheets for evaluating NLP pipeline performance.</p>
                      <p>Applied research in graph neural networks and semantic role labelling to enhance the Q&A system.</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="px-4 py-1.5 border border-cyan-400/50 text-cyan-400 rounded-full text-sm">Python</span>
                      <span className="px-4 py-1.5 border border-cyan-400/50 text-cyan-400 rounded-full text-sm">NLP</span>
                      <span className="px-4 py-1.5 border border-cyan-400/50 text-cyan-400 rounded-full text-sm">LSTM</span>
                      <span className="px-4 py-1.5 border border-cyan-400/50 text-cyan-400 rounded-full text-sm">Transformers</span>
                      <span className="px-4 py-1.5 border border-cyan-400/50 text-cyan-400 rounded-full text-sm">Knowledge Graphs</span>
                    </div>
                  </div>
                </div>

                {/* Telematicus */}
                <div className="group flex gap-8 p-6 -m-6 rounded-xl transition-all duration-300 hover:bg-white/[0.03] hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] hover:drop-shadow-lg cursor-default">
                  <div className="w-40 flex-shrink-0 text-sm text-foreground/50 pt-1 group-hover:text-foreground/70 transition-colors">
                    Sept 2018 — Sept 2020
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1 group-hover:text-cyan-400 transition-colors">Telematicus</h3>
                    <p className="text-sm text-foreground/60 mb-1">Macclesfield, UK</p>
                    <p className="text-lg text-cyan-400 mb-6 font-orbitron font-extrabold">Data Scientist</p>

                    <div className="space-y-4 mb-8 font-poppins font-normal text-white text-[12px] leading-[16px]">
                      <p>Statistical analysis (descriptive, inferential, parametric and non-parametric tests) on GPS based telematics data to draw insights in driving behaviour using Python scripts, R scripts.</p>
                      <p>Deployed risk assessment and image classification models for car insurance clients, reducing claims costs by 15–20% and successfully decreasing loss ratios from 110% to below 50% within the first year of use.</p>
                      <p>Led computer vision related project that reduced false positives in speeding flags by 90% through deploying a ResNet classifier for speed sign recognition, utilising transfer learning and a softmax output layer.</p>
                      <p>Improved speed sign classification performance by 10% through PCA-based colour augmentation and hyperparameter tuning; further enhanced test accuracy by 5% using 10-crop augmentation.</p>
                      <p>Created ETL pipelines in Azure Data Factory to prepare machine learning datasets, analysing over 100K rows of telematics data.</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="px-4 py-1.5 border border-cyan-400/50 text-cyan-400 rounded-full text-sm">Python</span>
                      <span className="px-4 py-1.5 border border-cyan-400/50 text-cyan-400 rounded-full text-sm">R</span>
                      <span className="px-4 py-1.5 border border-cyan-400/50 text-cyan-400 rounded-full text-sm">Computer Vision</span>
                      <span className="px-4 py-1.5 border border-cyan-400/50 text-cyan-400 rounded-full text-sm">Azure</span>
                      <span className="px-4 py-1.5 border border-cyan-400/50 text-cyan-400 rounded-full text-sm">ResNet</span>
                    </div>
                  </div>
                </div>

                {/* Langroo */}
                <div className="group flex gap-8 p-6 -m-6 rounded-xl transition-all duration-300 hover:bg-white/[0.03] hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] hover:drop-shadow-lg cursor-default">
                  <div className="w-40 flex-shrink-0 text-sm text-foreground/50 pt-1 group-hover:text-foreground/70 transition-colors">
                    Aug 2017 — Aug 2018
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1 group-hover:text-cyan-400 transition-colors">Langroo Ltd.</h3>
                    <p className="text-sm text-foreground/60 mb-1">Dublin, Ireland</p>
                    <p className="text-lg text-cyan-400 mb-6 font-orbitron font-extrabold">Data Scientist</p>

                    <div className="space-y-4 mb-8 font-poppins font-normal text-white text-[12px] leading-[16px]">
                      <p>Engineered data infrastructure and reporting mechanisms; creating structured datasets and databases for chatbot conversation logs and AI applications.</p>
                      <p>Developed text pre-processing and entity recognition pipelines for natural language understanding.</p>
                      <p>Improved chatbot interactions to increase user engagement and drive tutor request conversions.</p>
                      <p>Collaborated with the technology team and regularly shared progress updates via Slack.</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="px-4 py-1.5 border border-cyan-400/50 text-cyan-400 rounded-full text-sm">Python</span>
                      <span className="px-4 py-1.5 border border-cyan-400/50 text-cyan-400 rounded-full text-sm">NLP</span>
                      <span className="px-4 py-1.5 border border-cyan-400/50 text-cyan-400 rounded-full text-sm">Chatbots</span>
                      <span className="px-4 py-1.5 border border-cyan-400/50 text-cyan-400 rounded-full text-sm">Data Engineering</span>
                    </div>
                  </div>
                </div>

                {/* Earlier Roles */}
                <div className="group flex gap-8 p-6 -m-6 rounded-xl transition-all duration-300 hover:bg-white/[0.03] hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] hover:drop-shadow-lg cursor-default">
                  <div className="w-40 flex-shrink-0 text-sm text-foreground/50 pt-1 group-hover:text-foreground/70 transition-colors">
                    2012 — 2016
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1 group-hover:text-cyan-400 transition-colors">Earlier Roles</h3>
                    <p className="text-sm text-foreground/60 mb-1">Mumbai, India</p>
                    <p className="text-lg text-cyan-400 mb-6 font-orbitron font-extrabold">Engineering & Technical</p>

                    <div className="space-y-4 mb-8 font-poppins font-normal text-white text-[12px] leading-[16px]">
                      <p><strong>Testing Engineer</strong> — Novire Technologies (Dec 2015 — Aug 2016)</p>
                      <p><strong>Service Engineer</strong> — Elico Ltd. (June 2014 — Aug 2015)</p>
                      <p><strong>Team Leader & Programme Technician</strong> — Jabil Global Services Pvt. Ltd. (Feb 2013 — March 2014)</p>
                      <p><strong>Service Engineer</strong> — Krasny Marine Services (May 2012 — Feb 2013)</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="px-4 py-1.5 border border-cyan-400/50 text-cyan-400 rounded-full text-sm">Testing</span>
                      <span className="px-4 py-1.5 border border-cyan-400/50 text-cyan-400 rounded-full text-sm">Engineering</span>
                      <span className="px-4 py-1.5 border border-cyan-400/50 text-cyan-400 rounded-full text-sm">Technical Support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          ref={projectsReveal.ref as React.RefObject<HTMLElement>}
          id="projects"
          className={`py-20 px-6 transition-all duration-1000 ${
            projectsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="container mx-auto max-w-6xl">
            <h2 className="font-poppins font-thin text-white text-[48px] leading-[48px] mb-16 relative flex items-center gap-4">
              My Past Work
              <div className="flex-1 h-[2px] bg-white/30" />
            </h2>

            <div className="space-y-12">
              {/* Disaster Data API */}
              <div className="flex gap-8 items-start">
                <div className="flex-1">
                  <h3 className="text-3xl font-light mb-2">Disaster Data API</h3>
                  <p className="text-sm text-foreground/60 mb-4">Aug 2024</p>
                  <div className="mb-4">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" className="w-6 h-6 invert" />
                    </a>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-poppins font-normal text-white text-[14px] leading-[20px] mb-4">
                    Real-time system designed to collect, process, and distribute media content related to natural disasters from social media platforms and distribute using HTTP protocol.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-1.5 border border-cyan-400/50 text-cyan-400 rounded-full font-sans font-normal text-[14px] leading-[20px]">Java</span>
                    <span className="px-4 py-1.5 border border-cyan-400/50 text-cyan-400 rounded-full font-sans font-normal text-[14px] leading-[20px]">Spring Boot</span>
                    <span className="px-4 py-1.5 border border-cyan-400/50 text-cyan-400 rounded-full font-sans font-normal text-[14px] leading-[20px]">Hibernate</span>
                    <span className="px-4 py-1.5 border border-cyan-400/50 text-cyan-400 rounded-full font-sans font-normal text-[14px] leading-[20px]">PostgreSQL</span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

              {/* eWallet */}
              <div className="flex gap-8 items-start">
                <div className="flex-1">
                  <h3 className="text-3xl font-light mb-2">eWallet</h3>
                  <p className="text-sm text-foreground/60 mb-4">July 2024</p>
                  <div className="mb-4">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" className="w-6 h-6 invert" />
                    </a>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-poppins font-normal text-white text-[14px] leading-[20px] mb-4">
                    Aims to perform operations like a real e-wallet applications like PayTM. Transfer funds from one user to another, deposit and withdraw funds from external banks.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-1.5 border border-cyan-400/50 text-cyan-400 rounded-full font-sans font-normal text-[14px] leading-[20px]">TypeScript</span>
                    <span className="px-4 py-1.5 border border-cyan-400/50 text-cyan-400 rounded-full font-sans font-normal text-[14px] leading-[20px]">Next.js</span>
                    <span className="px-4 py-1.5 border border-cyan-400/50 text-cyan-400 rounded-full font-sans font-normal text-[14px] leading-[20px]">PostgreSQL</span>
                    <span className="px-4 py-1.5 border border-cyan-400/50 text-cyan-400 rounded-full font-sans font-normal text-[14px] leading-[20px]">Node.js</span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

              {/* Sway */}
              <div className="flex gap-8 items-start">
                <div className="flex-1">
                  <h3 className="text-3xl font-light mb-2">Sway</h3>
                  <p className="text-sm text-foreground/60 mb-4">June 2024</p>
                  <div className="mb-4">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" className="w-6 h-6 invert" />
                    </a>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-poppins font-normal text-white text-[14px] leading-[20px] mb-4">
                    Streamline access to educational content from YouTube. Users can search for topics that they want to study, and the app will provide curated subtopics with relevant YouTube videos.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-1.5 border border-cyan-400/50 text-cyan-400 rounded-full font-sans font-normal text-[14px] leading-[20px]">React.js</span>
                    <span className="px-4 py-1.5 border border-cyan-400/50 text-cyan-400 rounded-full font-sans font-normal text-[14px] leading-[20px]">Node.js</span>
                    <span className="px-4 py-1.5 border border-cyan-400/50 text-cyan-400 rounded-full font-sans font-normal text-[14px] leading-[20px]">Express.js</span>
                    <span className="px-4 py-1.5 border border-cyan-400/50 text-cyan-400 rounded-full font-sans font-normal text-[14px] leading-[20px]">MongoDB</span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

              {/* SpaceX */}
              <div className="flex gap-8 items-start">
                <div className="flex-1">
                  <h3 className="text-3xl font-light mb-2">SpaceX</h3>
                  <p className="text-sm text-foreground/60 mb-4">October 2023</p>
                  <div className="mb-4 flex gap-3">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-white/90 transition-colors inline-flex items-center gap-2">
                      Visit
                      <img src="https://ext.same-assets.com/564016206/2942702850.svg" alt="Arrow" className="w-4 h-4" />
                    </a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" className="w-6 h-6 invert" />
                    </a>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-poppins font-normal text-white text-[14px] leading-[20px] mb-4">
                    Developed a UI clone of 'spacex.com' using raw CSS and JavaScript. Created interactive and visually appealing animations to closely match the official 'spacex.com' site.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-1.5 border border-cyan-400/50 text-cyan-400 rounded-full font-sans font-normal text-[14px] leading-[20px]">JavaScript</span>
                    <span className="px-4 py-1.5 border border-cyan-400/50 text-cyan-400 rounded-full font-sans font-normal text-[14px] leading-[20px]">CSS</span>
                    <span className="px-4 py-1.5 border border-cyan-400/50 text-cyan-400 rounded-full font-sans font-normal text-[14px] leading-[20px]">HTML</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blogs Section */}
        <section
          ref={blogsReveal.ref as React.RefObject<HTMLElement>}
          id="blogs"
          className={`py-20 px-6 transition-all duration-1000 ${
            blogsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="container mx-auto max-w-6xl">
            <h2 className="font-poppins font-thin text-white text-[48px] leading-[48px] mb-16 relative flex items-center gap-4">
              Blogs
              <div className="flex-1 h-[2px] bg-white/30" />
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <Link 
                  key={blog.slug}
                  href={`/blog/${blog.slug}`} 
                  className="group block bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:transform hover:scale-[1.02]"
                >
                  <div className={`h-48 bg-gradient-to-br ${blog.gradient} flex items-center justify-center`}>
                    <span className="text-6xl">{blog.emoji}</span>
                  </div>
                  <div className="p-6">
                    <p className={`text-sm ${blog.categoryColor} mb-2`}>{blog.category}</p>
                    <h3 className="font-poppins font-medium text-white text-lg mb-3 group-hover:text-cyan-400 transition-colors">{blog.title}</h3>
                    <p className="font-poppins font-normal text-white/70 text-[14px] leading-[20px] mb-4">{blog.description}</p>
                    <div className="flex items-center justify-between text-sm text-white/50">
                      <span>{blog.readTime}</span>
                      <span>{blog.date}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section
          ref={techStackReveal.ref as React.RefObject<HTMLElement>}
          className={`py-20 px-6 transition-all duration-1000 ${
            techStackReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="container mx-auto max-w-6xl">
            <h2 className="font-poppins font-thin text-white text-[48px] leading-[48px] mb-8 flex items-center gap-4">
              My Tech Stack
              <div className="flex-1 h-[2px] bg-white/30" />
            </h2>

            <p className="text-2xl md:text-3xl mb-16 leading-relaxed">
              I leverage <span className="text-orange-400">data technologies</span> to extract insights
              <br />
              and build <span className="text-cyan-400">intelligent solutions</span> at scale
            </p>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center">
              {/* Programming Languages */}
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" className="w-16 h-16 md:w-20 md:h-20" />
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg" alt="R" className="w-16 h-16 md:w-20 md:h-20" />
              
              {/* Data Science & ML */}
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" alt="TensorFlow" className="w-16 h-16 md:w-20 md:h-20" />
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" alt="PyTorch" className="w-16 h-16 md:w-20 md:h-20" />
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" alt="Pandas" className="w-16 h-16 md:w-20 md:h-20" />
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" alt="NumPy" className="w-16 h-16 md:w-20 md:h-20" />
              
              {/* Databases */}
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" className="w-16 h-16 md:w-20 md:h-20" />
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" className="w-16 h-16 md:w-20 md:h-20" />
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" alt="MySQL" className="w-16 h-16 md:w-20 md:h-20" />
              
              {/* Cloud & Big Data */}
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" alt="Google Cloud" className="w-16 h-16 md:w-20 md:h-20" />
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" alt="Azure" className="w-16 h-16 md:w-20 md:h-20" />
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" alt="AWS" className="w-16 h-16 md:w-20 md:h-20 invert" />
              
              {/* Data Engineering */}
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachespark/apachespark-original.svg" alt="Apache Spark" className="w-16 h-16 md:w-20 md:h-20" />
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apacheairflow/apacheairflow-original.svg" alt="Apache Airflow" className="w-16 h-16 md:w-20 md:h-20" />
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" className="w-16 h-16 md:w-20 md:h-20" />
              
              {/* Tools */}
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" alt="Jupyter" className="w-16 h-16 md:w-20 md:h-20" />
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" className="w-16 h-16 md:w-20 md:h-20" />
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" alt="Linux" className="w-16 h-16 md:w-20 md:h-20" />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-white/10 mt-20">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <p className="text-xl mb-2">
                  Delivering <span className="text-cyan-400">Precision</span> and
                </p>
                <p className="text-xl mb-4">
                  <span className="text-purple-500">Performance</span> in Tech
                </p>
                <p className="text-sm text-foreground/60 mt-8">Ireland</p>
                <p className="text-sm text-foreground/60">Viraj Pawar © 2025</p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4 text-orange-400">Explore More</h3>
                <ul className="space-y-2">
                  <li><a href="#home" className="text-foreground/70 hover:text-foreground transition-colors">Home</a></li>
                  <li><a href="#experience" className="text-foreground/70 hover:text-foreground transition-colors">Experience</a></li>
                  <li><a href="#projects" className="text-foreground/70 hover:text-foreground transition-colors">Projects</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4 text-cyan-400">Socials</h3>
                <ul className="space-y-2">
                  <li><a href="https://linkedin.com" className="text-foreground/70 hover:text-foreground transition-colors flex items-center gap-2">
                    <img src="https://ext.same-assets.com/564016206/1511665057.svg" alt="" className="w-4 h-4" />
                    LinkedIn
                  </a></li>
                  <li><a href="https://medium.com" className="text-foreground/70 hover:text-foreground transition-colors flex items-center gap-2">
                    <img src="https://ext.same-assets.com/564016206/867924452.svg" alt="" className="w-4 h-4" />
                    Medium
                  </a></li>
                  <li><a href="https://github.com" className="text-foreground/70 hover:text-foreground transition-colors flex items-center gap-2">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="" className="w-4 h-4 invert" />
                    GitHub
                  </a></li>
                  <li><a href="https://leetcode.com" className="text-foreground/70 hover:text-foreground transition-colors flex items-center gap-2">
                    <img src="https://ext.same-assets.com/564016206/4263899412.svg" alt="" className="w-4 h-4" />
                    LeetCode
                  </a></li>
                  <li><a href="https://twitter.com" className="text-foreground/70 hover:text-foreground transition-colors flex items-center gap-2">
                    <img src="https://ext.same-assets.com/564016206/488585962.svg" alt="" className="w-4 h-4" />
                    Twitter
                  </a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4 text-purple-500">Others</h3>
                <ul className="space-y-2">
                  <li><a href="/resume.pdf" className="text-foreground/70 hover:text-foreground transition-colors flex items-center gap-2">
                    <img src="https://ext.same-assets.com/564016206/1119384252.svg" alt="" className="w-4 h-4" />
                    Resume
                  </a></li>
                  <li><a href="mailto:ishant9715@gmail.com" className="text-foreground/70 hover:text-foreground transition-colors flex items-center gap-2">
                    <img src="https://ext.same-assets.com/564016206/1688448539.svg" alt="" className="w-4 h-4" />
                    ishant9715@gmail.com
                  </a></li>
                </ul>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 text-center">
              <p className="text-sm text-foreground/60">Viraj Pawar © 2025</p>
              <p className="text-sm text-foreground/60">Ireland</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
