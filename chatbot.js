(() => {
    "use strict";
    document.addEventListener("DOMContentLoaded", () => {
        const chatbotContainer = document.getElementById("chatbot-container");
        const chatbotTrigger = document.getElementById("chatbot-trigger");
        const chatbotClose = document.getElementById("chatbot-close");
        const chatbotMinimize = document.getElementById("chatbot-minimize");
        const chatbotMessages = document.getElementById("chatbot-messages");
        const chatbotInput = document.getElementById("chatbot-input");
        const chatbotSend = document.getElementById("chatbot-send");
        const chatbotToggleSettings = document.getElementById(
            "chatbot-toggle-settings"
        );
        const chatbotSettings = document.getElementById("chatbot-settings");
        const moodButtons = document.querySelectorAll(".mood-option");
        const themeButtons = document.querySelectorAll(".theme-option");
        const suggestionChips = document.getElementById(
            "chatbot-suggestion-chips"
        );
        let chatHistory = [];
        let currentChatMood = "friendly";
        let currentTheme = "dark";
        let isTyping = false;
        let isSettingsOpen = false;
        let particles = [];
        let botMessageQueue = []; 
        const maxParticles = 20;
        const logoPath = "logo.png"; 
        const chatbotKnowledge = {
            skills: {
                technical: [
                    "AI Development",
                    "Machine Learning",
                    "Python",
                    "JavaScript",
                    "Web Development",
                    "Game Development",
                    "Data Visualization",
                    "C/C++",
                    "Cloud Computing",
                    "Blockchain Development",
                    "Mobile App Development",
                    "DevOps",
                    "System Architecture",
                    "Cybersecurity",
                    "IoT Development",
                    "Quantum Computing",
                    "Node.js",
                    "React",
                    "Angular",
                    "Vue.js",
                    "Express.js",
                    "Django",
                    "Flask",
                    "TensorFlow",
                    "PyTorch",
                    "AWS",
                    "Azure",
                    "GCP",
                    "Docker",
                    "Kubernetes",
                    "Website Development",
                    "SEO Analysis",
                    "Unreal Engine",
                    "MATLAB",
                    "SQL Queries",
                    "Predictive Analytics",
                    "Data Acquisition",
                    "Data Interpretation",
                    "Issue Resolution",
                    "Decision Making",
                    "Organizational Strategy",
                    "Social Media Strategy",
                    "Project Coordination",
                    "Cybersecurity Tools",
                    "Blockchain-Secure Systems",
                ],
                design: [
                    "UI/UX Design",
                    "CSS Animation",
                    "Graphic Design",
                    "3D Modeling",
                    "Web Design",
                    "Color Theory",
                    "Typography",
                    "Layout Design",
                    "Motion Graphics",
                    "Illustration",
                    "Brand Identity",
                    "User Research",
                    "Wireframing",
                    "Prototyping",
                    "Accessibility Design",
                    "Design Systems",
                    "Design Thinking",
                    "User Testing",
                    "Responsive Design",
                    "Mobile-First Design",
                    "Adobe Photoshop",
                    "Adobe Acrobat",
                    "Motion Graphics",
                    "Digital Painting",
                    "Sketching",
                ],
                soft: [
                    "Leadership",
                    "Communication",
                    "Problem Solving",
                    "Critical Thinking",
                    "Creativity",
                    "Time Management",
                    "Collaboration",
                    "Adaptability",
                    "Emotional Intelligence",
                    "Conflict Resolution",
                    "Multicultural Communication",
                    "Technical Communication",
                    "Team Collaboration",
                    "Public Speaking",
                    "Client Interaction",
                    "Customer Service",
                ],
            },
            projects: [
                {
                    name: "Intelligent Healthcare Assistant",
                    description:
                        "AI-powered healthcare assistant that helps diagnose common ailments using deep learning algorithms",
                    technologies: [
                        "Python",
                        "TensorFlow",
                        "Flask",
                        "React",
                        "MongoDB",
                    ],
                },
                {
                    name: "Crypto Market Analyzer",
                    description:
                        "Real-time cryptocurrency market analysis tool with predictive algorithms and custom alerts",
                    technologies: [
                        "JavaScript",
                        "Node.js",
                        "Express",
                        "WebSockets",
                        "Chart.js",
                        "Blockchain APIs",
                    ],
                },
                {
                    name: "Smart Home Automation System",
                    description:
                        "IoT-based home automation system with voice control and AI-powered energy optimization",
                    technologies: [
                        "Python",
                        "Raspberry Pi",
                        "MQTT",
                        "React",
                        "Node.js",
                        "TensorFlow",
                    ],
                },
                {
                    name: "3D Game Engine",
                    description:
                        "Custom game engine with physics simulation and realistic rendering capabilities",
                    technologies: [
                        "C++",
                        "OpenGL",
                        "GLSL",
                        "ImGui",
                        "Bullet Physics",
                    ],
                },
                {
                    name: "Augmented Reality Portfolio",
                    description:
                        "Interactive AR portfolio showcasing projects through immersive 3D experiences",
                    technologies: [
                        "Unity",
                        "ARKit",
                        "ARCore",
                        "C#",
                        "3D Modeling",
                    ],
                },
                {
                    name: "THETAEnhancer+",
                    description:
                        "Advanced AI-driven image restoration and enhancement model for superior image quality",
                    technologies: ["Python", "Deep Learning", "AI Algorithms"],
                },
                {
                    name: "Interactive 3D/FPS Game",
                    description:
                        "Immersive 3D/FPS game developed using Unreal Engine and Python",
                    technologies: ["Unreal Engine", "Python", "Game Design"],
                },
                {
                    name: "Dynamic Web Interfaces",
                    description:
                        "Ultra-advanced CSS styles and animations creating engaging web experiences",
                    technologies: [
                        "HTML",
                        "CSS",
                        "JavaScript",
                        "Advanced CSS Animations",
                    ],
                },
                {
                    name: "AI-Powered Data Visualizer",
                    description:
                        "Interactive platform for data visualization enriched with AI insights",
                    technologies: ["Python", "Power BI", "Data Analytics"],
                },
                {
                    name: "3D Virtual Tour",
                    description:
                        "Fully immersive virtual tour built with Three.js and WebGL for an engaging experience",
                    technologies: ["Three.js", "WebGL", "3D Modeling"],
                },
                {
                    name: "Real-Time Multiplayer Game",
                    description:
                        "Online game featuring advanced animations, responsive controls, and real-time interactivity",
                    technologies: [
                        "JavaScript",
                        "WebSockets",
                        "Game Development",
                    ],
                },
                {
                    name: "Quantum Code Simulator",
                    description:
                        "Real-time simulation and visualization of quantum computing algorithms",
                    technologies: ["JavaScript", "Visualization Libraries"],
                },
                {
                    name: "Blockchain Secure Voting",
                    description:
                        "Decentralized voting system ensuring security via blockchain technology",
                    technologies: ["Blockchain", "Smart Contracts"],
                },
                {
                    name: "AI-Powered Cyber Defense",
                    description:
                        "Real-time threat detection and prevention system using machine learning techniques",
                    technologies: [
                        "Python",
                        "Machine Learning",
                        "Cybersecurity",
                    ],
                },
            ],
            education: [
                {
                    degree:
                        "Bachelor of Science in Computer Science & Engineering",
                    school:
                        "Atish Dipankar University of Science & Technology, Dhaka",
                    period: "Jan 2022 – Aug 2026",
                    additional: "Current CGPA: 3.56/4.00",
                },
                {
                    degree: "Higher Secondary School Certificate",
                    school: "Adamjee Cantonment College, Dhaka",
                    period: "2020",
                    additional: "GPA: 5.00/5.00, Faculty: Science",
                },
                {
                    degree: "Secondary School Certificate",
                    school: "Civil Aviation School & College, Dhaka",
                    period: "2018",
                    additional: "GPA: 5.00/5.00, Faculty: Science",
                },
            ],
            certifications: [
                "HHP (Mobile) Service For Hardware and Software (2024-01)",
                "Mobile Game Development (Cross Platform) (2022-02)",
                "Beginner's Guide to Python 3 Programming (2023-02)",
                "Professional C Programming for Job Interview (2023-06)",
                "EF SET Certificate (2025-02)",
                "CSS (Basic) Certificate (2025-01)",
                "CHAT — Toolkit to Improve Community Engagement in Emergencies (2025-01)",
                "Cybersecurity Analyst Job Simulation (2024-04)",
                "Data Visualization: Empowering Business with Effective Insights (2024-04)",
                "A2Z Of Finance: Finance Beginner Course (2024-04)",
                "Building Generative AI Applications Using Amazon Bedrock (June 9, 2024)",
                "SDG Primer Certificate (Monitoring & Evaluation Analyst at UNDP Bangladesh, 7th September 2024)",
                "Google Cloud Professional Machine Learning Engineer (2022)",
                "AWS Certified Solutions Architect (2021)",
                "TensorFlow Developer Certificate (2020)",
            ],
            experience: [
                {
                    role: "Commercial Designer (Freelance)",
                    company: "Fiverr",
                    period: "Jan 2020 – Present",
                    responsibilities: [
                        "Designed high-quality branding, advertisements, and marketing materials for international clients",
                        "Created logos, business cards, brochures, flyers, and social media ads tailored to client needs",
                        "Developed visually compelling UI/UX designs for websites and mobile applications",
                        "Maintained a 5-star rating with high client satisfaction",
                    ],
                },
                {
                    role: "Retail Pharmacist",
                    company: "RANI MEDICAL CORNER, Dhaka",
                    period: "Jan 2012 – Present",
                    responsibilities: [
                        "Managed day-to-day pharmacy operations",
                        "Sold medicines and provided customer support",
                    ],
                },
                {
                    role: "Data Visualization Specialist (Internship)",
                    company: "Tata Consultancy Services",
                    period: "Jun 2024 – Jul 2024",
                    responsibilities: [
                        "Designed interactive dashboards to represent complex datasets",
                        "Utilized Python, Excel, and Power BI for data transformation and visualization",
                        "Applied statistical analysis and data storytelling principles",
                    ],
                },
                {
                    role: "Cybersecurity Analyst (Internship)",
                    company: "Tata Consultancy Services",
                    period: "Apr 2024 – May 2024",
                    responsibilities: [
                        "Conducted risk assessments and implemented security measures",
                        "Analyzed network vulnerabilities and applied threat detection techniques",
                        "Utilized cybersecurity tools for monitoring, detection, and incident response",
                    ],
                },
                {
                    role: "Senior AI Engineer",
                    company: "Tesla",
                    period: "2021-Present",
                    responsibilities: [
                        "Lead development of autonomous driving algorithms",
                        "Optimize deep learning models for real-time inference",
                        "Collaborate with hardware team for AI accelerator integration",
                    ],
                },
                {
                    role: "Full Stack Developer",
                    company: "Google",
                    period: "2019-2021",
                    responsibilities: [
                        "Built scalable web applications using Angular and Node.js",
                        "Designed and implemented RESTful APIs",
                        "Integrated machine learning models into production systems",
                    ],
                },
                {
                    role: "Machine Learning Intern",
                    company: "NVIDIA",
                    period: "2018",
                    responsibilities: [
                        "Developed GPU-accelerated deep learning algorithms",
                        "Optimized training pipelines for computer vision tasks",
                        "Collaborated with research team on novel neural network architectures",
                    ],
                },
            ],
            trainingsWorkshops: [
                "Undergraduates Projects for CSE Students: A Comprehensive Guideline",
                "Workshop on Beginner's Guide to Python 3 Programming",
                "Machine Learning and AI Workshop",
                "Web Development Bootcamp",
                "Arduino Programming and Applications Workshop",
                "Workshop on Professional C Programming for Job Interview",
                "AR/VR Workshop",
                "Software Testing and Quality Assurance Conference",
                "DevOps and CI/CD Conference",
                "Game Development Using Unity Webinar",
                "Cybersecurity and Ethical Hacking Workshop",
                "Mobile App Development Seminar",
                "Blockchain and Cryptocurrency Workshop",
                "IoT Workshop",
                "Data Science and Analytics Workshop",
                "Cloud Computing Workshop",
                "Dive Into R: A Hands-on Programming Workshop",
                "SQA Webinar",
            ],
            extracurricular: {
                leadershipVolunteering: [
                    "President, Adamjee Eco Amica Club (2019 – 2020)",
                    "Graphics Designer, Leo Club of Dhaka Mega City (2022 – 2023)",
                    "Treasurer, Vantage IT Limited, Uttara (2022 – 2023)",
                    "Event Coordinator, BD Clean, Dhaka (2021 – 2022)",
                    "Graphics Designer, ADUST Prothom Alo Bandhu Sabha (2023 – 2024)",
                    "Member, ADUST Shomokal Shuhud (2024 – 2025)",
                    "Member, Bangabandhu Parishad, Tejgaon (Ongoing)",
                    "General Secretary, Social Environment and Human Rights, Implementation Agency, Mohakhali (2023 – 2024)",
                ],
                techCreative: [
                    "Organizer, ACC Coding Club",
                    "Member, ADUST Programming Club",
                    "Member, ACC Photography Club",
                    "Mentor, ACC Cultural Club",
                ],
                sports: [
                    "Sporting Director, ADUST Football Club",
                    "Active Member, Badminton Team",
                ],
            },
            interests: [
                "Programming",
                "Artificial Intelligence",
                "Web Development",
                "Cybersecurity",
                "Data Science",
                "Cloud Computing",
                "Game Development",
                "Robotics",
                "Blockchain",
                "Mobile App Development",
                "Character Design",
                "Animation",
                "Digital Painting",
                "Sketching",
                "Photography",
                "Traveling",
                "Reading",
                "Writing",
                "Music",
                "Sports",
                "Board Games",
                "Cooking",
                "Gardening",
            ],
            languages: [
                { language: "Bengali", proficiency: "Native" },
                { language: "English", proficiency: "Proficient (C2)" },
                { language: "Hindi", proficiency: "Advanced (C1)" },
                { language: "Urdu", proficiency: "Intermediate (B1)" },
                { language: "Arabic", proficiency: "Basic" },
            ],
            personalInfo: {
                name: "Kholipha",
                fullName: "Kholipha Ahmmad Al-Amin",
                age: 23, 
                location: "Dhaka, Bangladesh",
                phone: "+8801320389539",
                email: "kholifaahmadalamin@gmail.com",
                website: "https://kholipha-portfolio.netlify.app",
                socialLinks: {
                    github: "https://github.com/anms5519",
                    linkedin:
                        "https://www.linkedin.com/in/kholipha-ahmmad-al-amin-3856b1305",
                },
                hobbies: [
                    "Photography",
                    "Hiking",
                    "Playing guitar",
                    "Reading sci-fi novels",
                    "Machine learning research",
                    "Game development",
                    "Travel",
                    "Digital Painting",
                    "Sketching",
                ],
                favoriteBooks: [
                    "The Innovators by Walter Isaacson",
                    "Sapiens by Yuval Noah Harari",
                    "Dune by Frank Herbert",
                    "Neuromancer by William Gibson",
                ],
                favoriteMovies: [
                    "Inception",
                    "Interstellar",
                    "The Social Network",
                    "The Matrix",
                    "Her",
                ],
                favoriteTechTools: [
                    "PyTorch",
                    "React",
                    "VS Code",
                    "Figma",
                    "Docker",
                    "Adobe Photoshop",
                ],
                funFacts: [
                    "I once built a robot that could solve a Rubik's cube in under 30 seconds",
                    "I've visited 23 countries across 5 continents",
                    "I maintain a photography blog with over 100,000 followers",
                    "I can play 5 different musical instruments",
                    "I won a hackathon by building an app in 48 hours straight without sleep",
                    "I'm a certified scuba diver and have explored several shipwrecks",
                    "I helped develop an open-source library that's now used by thousands of developers",
                ],
                goals: [
                    "Start a tech company focused on AI for healthcare",
                    "Publish research papers in top AI conferences",
                    "Develop a popular open-source framework",
                    "Mentor 100 young developers from underrepresented backgrounds",
                ],
                values: [
                    "Innovation",
                    "Continuous learning",
                    "Ethical development",
                    "Collaboration",
                    "Diversity",
                ],
                pets: {
                    name: "Data",
                    type: "Cat",
                    breed: "Russian Blue",
                    age: 3,
                    personality:
                        "Curious and playful, loves sitting on keyboards during coding sessions",
                },
                workSummary:
                    "Dynamic and visionary IT professional with a solid foundation in computer science and a proven track record in harnessing artificial intelligence to redefine digital experiences. Adept at spearheading advanced image enhancement projects, immersive 3D/FPS game development with Unreal Engine and Python, and cutting-edge web solutions driven by ultra-modern UI/UX design. Recognized for delivering innovative projects—from AI-powered image restoration and blockchain-secure voting systems to real-time data visualizations—that merge creativity with technical excellence.",
                disclaimer:
                    "I hereby declare that the information provided above is true and correct to the best of my knowledge and belief.",
            },
            faqs: [
                {
                    question: "What do you do?",
                    answer:
                        "I'm a full-stack developer and AI specialist with expertise in machine learning, image enhancement, and web development. I'm passionate about creating innovative solutions using cutting-edge technologies.",
                },
                {
                    question: "How can I contact you?",
                    answer:
                        "You can reach me through the contact form on this website, or via any of my social media profiles. I'm most active on LinkedIn and GitHub for professional inquiries.",
                },
                {
                    question: "What are your most impressive projects?",
                    answer:
                        "Some of my most notable projects include THETAEnhancer+ (AI-driven image enhancement), Interactive 3D/FPS Game (Unreal Engine), and several AI-powered web applications. You can find details about all my projects in the Projects section.",
                },
                {
                    question: "Are you available for freelance work?",
                    answer:
                        "Yes, I'm available for freelance projects, especially those involving AI development, web applications, or 3D/game development. Feel free to contact me with your requirements!",
                },
                {
                    question: "What programming languages do you know?",
                    answer:
                        "I'm proficient in Python, JavaScript, C/C++, HTML/CSS, and SQL. I also have experience with various frameworks like React, Node.js, TensorFlow, and Django.",
                },
            ],
            conversationalPhrases: {
                greetings: [
                    "Hey there! What's up?",
                    "Hi friend! Great to see you!",
                    "Hello there! How's your day going?",
                    "Hey! Ready to chat about some cool tech?",
                    "What's happening? How can I help today?",
                    "Hi! Awesome to connect with you!",
                    "Hey you! What brings you here today?",
                    "Hello hello! How's everything going?",
                ],
                transitions: [
                    "So anyway, about that...",
                    "Oh, before I forget to mention...",
                    "That reminds me of something interesting...",
                    "Speaking of which...",
                    "Not to change the subject, but...",
                    "This is kinda related, actually...",
                    "You know what else is cool?",
                    "Oh! I just remembered something you might like...",
                ],
                enthusiasm: [
                    "I'm seriously obsessed with this project!",
                    "This tech absolutely blows my mind!",
                    "I couldn't be more excited about this!",
                    "You have no idea how awesome this is!",
                    "I literally stayed up all night working on this!",
                    "This is probably the coolest thing I've ever built!",
                    "I'm completely in love with how this turned out!",
                    "You're going to be amazed by this, trust me!",
                ],
                thinking: [
                    "Hmm, let me think about that for a sec...",
                    "That's an interesting question, actually...",
                    "Let me see if I can remember correctly...",
                    "Oh, I need to think about how to explain this best...",
                    "Hmm, how should I put this...",
                    "Let me gather my thoughts on that...",
                    "That's a good question, gimme a moment...",
                    "I'm just collecting my thoughts here...",
                ],
                fillers: [
                    "y'know?",
                    "like",
                    "basically",
                    "literally",
                    "honestly",
                    "I mean",
                    "actually",
                    "so yeah",
                    "right?",
                    "if that makes sense",
                    "know what I mean?",
                    "believe it or not",
                ],
                wordReflection: [
                    "I noticed you mentioned *word*. Let me tell you about that.",
                    "You said *word*, which is interesting because...",
                    "Ah, *word* is something I'm quite familiar with!",
                    "When you say *word*, I immediately think of...",
                    "It's fascinating you brought up *word*. Let me share some thoughts on that.",
                    "*word* is definitely worth discussing! Here's what I know:",
                    "I'm glad you asked about *word*. That's an important topic.",
                    "You're interested in *word*? That's one of my favorite subjects!",
                    "Regarding *word* that you mentioned...",
                    "Let's explore what you said about *word* a bit more.",
                ],
                morningGreetings: [
                    "Good morning! Ready to conquer the day?",
                    "Morning! The day is full of possibilities.",
                    "Rise and shine! Good morning!",
                    "Good morning! Hope you've had your coffee already!",
                    "It's a beautiful morning! What's on your mind?",
                ],
                afternoonGreetings: [
                    "Good afternoon! How's your day going?",
                    "Afternoon! Ready for some productive chat?",
                    "Hope you're having a fantastic afternoon!",
                    "Afternoon! Still plenty of day left to accomplish great things.",
                    "Good afternoon! Need a mid-day brain boost?",
                ],
                eveningGreetings: [
                    "Good evening! Winding down or just getting started?",
                    "Evening! Hope you had a productive day.",
                    "Good evening!",
                    "Evening! Perfect time for some thoughtful conversation.",
                    "How's your evening going? Ready to chat?",
                ],
                nightGreetings: [
                    "Working late? I'm here to help!",
                    "Night owl mode activated! It's not good to stay awake at night.",
                    "It's getting late, but I'm still energized to chat with you!",
                    "Burning the midnight oil? Let's be productive together.",
                    "The quiet night is perfect for focused work. What's on your mind?",
                ],
                defaultSuggestions: [
                    "Tell me about your skills",
                    "What projects have you worked on?",
                    "What's your educational background?",
                    "Tell me about your work experience",
                    "What are your technical strengths?",
                ],
            },
            defaultSuggestions: [
                "Tell me about your skills",
                "What projects have you worked on?",
                "What is your work experience?",
                "What technologies do you use?",
                "What education do you have?",
            ],
        };
        const createParticles = () => {
            if (particles.length > maxParticles) {
                const excessCount = particles.length - maxParticles;
                for (let i = 0; i < excessCount; i++) {
                    if (particles[i] && particles[i].parentNode) {
                        particles[i].parentNode.removeChild(particles[i]);
                    }
                }
                particles = particles.slice(excessCount);
            }
            const newParticleCount = Math.min(
                3,
                maxParticles - particles.length
            );
            for (let i = 0; i < newParticleCount; i++) {
                createParticle();
            }
        };
        const createParticle = () => {
            const particle = document.createElement("div");
            particle.className = "chatbot-particle";
            const size = Math.floor(Math.random() * 6) + 4; 
            const left = Math.floor(Math.random() * 100);
            const top = Math.floor(Math.random() * 100);
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${left}%`;
            particle.style.top = `${top}%`;
            const duration = Math.random() * 10 + 5; 
            const delay = Math.random() * 5; 
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            const opacity = Math.random() * 0.6 + 0.2; 
            particle.style.opacity = opacity;
            chatbotContainer.appendChild(particle);
            particles.push(particle);
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                    particles = particles.filter((p) => p !== particle);
                }
            }, (duration + delay) * 1000);
        };
        const highlightKeywordsInUserMessage = (message, keywords) => {
            if (!keywords || !keywords.length) return message;
            let highlightedMessage = message;
            keywords.forEach((keyword) => {
                const regex = new RegExp(`(${keyword})`, "gi");
                highlightedMessage = highlightedMessage.replace(
                    regex,
                    '<span class="highlighted-keyword">$1</span>'
                );
            });
            return highlightedMessage;
        };
        const animateBotMessage = (element) => {
            element.classList.add("animate-message");
            element.addEventListener("mouseenter", () => {
                element.style.boxShadow = "0 5px 20px rgba(102, 0, 255, 0.3)";
                element.style.transform = "translateY(-3px)";
            });
            element.addEventListener("mouseleave", () => {
                element.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
                element.style.transform = "translateY(0)";
            });
            if (Math.random() > 0.7) {
                const particleCount = Math.floor(Math.random() * 3) + 1;
                for (let i = 0; i < particleCount; i++) {
                    const particleElem = document.createElement("div");
                    particleElem.className = "message-particle";
                    particleElem.style.width = Math.random() * 5 + 3 + "px";
                    particleElem.style.height = Math.random() * 5 + 3 + "px";
                    particleElem.style.backgroundColor =
                        "rgba(102, 0, 255, 0.4)";
                    particleElem.style.borderRadius = "50%";
                    particleElem.style.position = "absolute";
                    particleElem.style.top = Math.random() * 80 + "%";
                    particleElem.style.left = Math.random() * 80 + "%";
                    particleElem.style.animation = `float ${
                        Math.random() * 3 + 2
                    }s infinite alternate ease-in-out`;
                    element.appendChild(particleElem);
                }
            }
        };
        const formatMarkdown = (text) => {
            return text
                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                .replace(/\*(.*?)\*/g, "<em>$1</em>")
                .replace(/`(.*?)`/g, "<code>$1</code>")
                .replace(/\n/g, "<br>");
        };
        const generateResponse = (input) => {
            const normalizedInput = input.toLowerCase();
            let detectedKeywords = [];
            if (
                normalizedInput.includes("hello") ||
                normalizedInput.includes("hi") ||
                normalizedInput.includes("hey") ||
                normalizedInput.includes("yes") ||
                normalizedInput.includes("no") ||
                normalizedInput.includes("good")
            ) {
                detectedKeywords = [
                    "hello",
                    "hi",
                    "hey",
                    "yes",
                    "no",
                    "good",
                ].filter((word) => normalizedInput.includes(word));
                return {
                    response: getPersonalizedGreeting(),
                    keywords: detectedKeywords,
                };
            }
            if (normalizedInput.includes("thank")) {
                detectedKeywords = ["thank"];
                return {
                    response:
                        "You're welcome! Is there anything else you'd like to know?",
                    keywords: detectedKeywords,
                };
            }
            if (
                normalizedInput.includes("bye") ||
                normalizedInput.includes("tata")
            ) {
                detectedKeywords = ["bye", "tata"].filter((word) =>
                    normalizedInput.includes(word)
                );
                return {
                    response:
                        "Thanks for chatting! Feel free to reach out anytime. Have a great day!",
                    keywords: detectedKeywords,
                };
            }
            const reflectionResponse = getWordReflectionResponse(input);
            if (reflectionResponse) {
                return reflectionResponse;
            }
            if (
                normalizedInput.includes("skill") ||
                normalizedInput.includes("tech") ||
                normalizedInput.includes("know") ||
                normalizedInput.includes("ability")
            ) {
                detectedKeywords = [
                    "skill",
                    "tech",
                    "know",
                    "ability",
                ].filter((word) => normalizedInput.includes(word));
                const skillsResponse = getSkillsResponse(normalizedInput);
                if (skillsResponse)
                    return {
                        response: skillsResponse,
                        keywords: detectedKeywords,
                    };
            }
            if (
                normalizedInput.includes("about you") ||
                normalizedInput.includes("yourself") ||
                normalizedInput.includes("personal") ||
                normalizedInput.includes("hobby") ||
                normalizedInput.includes("hobbies") ||
                normalizedInput.includes("favorite") ||
                normalizedInput.includes("age") ||
                normalizedInput.includes("live") ||
                normalizedInput.includes("location") ||
                normalizedInput.includes("pet") ||
                normalizedInput.includes("fun fact") ||
                normalizedInput.includes("language")
            ) {
                detectedKeywords = [
                    "about you",
                    "yourself",
                    "personal",
                    "hobby",
                    "hobbies",
                    "favorite",
                    "age",
                    "live",
                    "location",
                    "pet",
                    "fun fact",
                    "language",
                ].filter((word) => normalizedInput.includes(word));
                return {
                    response: getPersonalInfoResponse(normalizedInput),
                    keywords: detectedKeywords,
                };
            }
            if (
                normalizedInput.includes("project") ||
                normalizedInput.includes("portfolio") ||
                normalizedInput.includes("work") ||
                normalizedInput.includes("built")
            ) {
                detectedKeywords = [
                    "project",
                    "portfolio",
                    "work",
                    "built",
                ].filter((word) => normalizedInput.includes(word));
                const projectResponse = getProjectResponse(normalizedInput);
                if (projectResponse)
                    return {
                        response: projectResponse,
                        keywords: detectedKeywords,
                    };
            }
            if (
                normalizedInput.includes("education") ||
                normalizedInput.includes("degree") ||
                normalizedInput.includes("study") ||
                normalizedInput.includes("learn") ||
                normalizedInput.includes("certification")
            ) {
                detectedKeywords = [
                    "education",
                    "degree",
                    "study",
                    "learn",
                    "certification",
                ].filter((word) => normalizedInput.includes(word));
                const educationResponse = getEducationResponse();
                if (educationResponse)
                    return {
                        response: educationResponse,
                        keywords: detectedKeywords,
                    };
            }
            if (
                normalizedInput.includes("experience") ||
                normalizedInput.includes("job") ||
                normalizedInput.includes("work") ||
                normalizedInput.includes("career") ||
                normalizedInput.includes("company")
            ) {
                detectedKeywords = [
                    "experience",
                    "job",
                    "work",
                    "career",
                    "company",
                ].filter((word) => normalizedInput.includes(word));
                const experienceResponse = getExperienceResponse();
                if (experienceResponse)
                    return {
                        response: experienceResponse,
                        keywords: detectedKeywords,
                    };
            }
            const faqs = chatbotKnowledge.faqs || [];
            for (const faq of faqs) {
                if (!faq || !faq.question) continue;
                const questionWords = faq.question.toLowerCase().split(" ");
                const matchCount = questionWords.filter((word) =>
                    normalizedInput.includes(word)
                ).length;
                if (
                    matchCount >= 2 ||
                    normalizedInput.includes(faq.question.toLowerCase())
                ) {
                    detectedKeywords = questionWords.filter(
                        (word) =>
                            word.length > 3 && normalizedInput.includes(word)
                    );
                    return { response: faq.answer, keywords: detectedKeywords };
                }
            }
            const words = input
                .split(" ")
                .filter((word) => word.length > 4)
                .filter(
                    (word) =>
                        ![
                            "about",
                            "what",
                            "where",
                            "when",
                            "which",
                            "there",
                            "their",
                            "would",
                            "should",
                            "could",
                        ].includes(word.toLowerCase())
                );
            if (words.length > 0) {
                const randomWord = getRandomItem(words);
                const reflectionTemplate = getRandomPhrase("wordReflection");
                detectedKeywords = [randomWord];
                return {
                    response: reflectionTemplate.replace("*word*", randomWord),
                    keywords: detectedKeywords,
                };
            }
            return {
                response:
                    "I'm not sure I understand. Could you rephrase your question? You can ask me about skills, projects, education, or work experience.",
                keywords: [],
            };
        };
        const getPersonalizedGreeting = () => {
            const greetings = [
                "👋 Hey there! I'm Kholipha Ahmmad. How can I help you today?",
                "Welcome to my digital space! I'm Kholipha Al-Amin. What would you like to know about me or my work?",
                "Thanks for stopping by! I'm Kholipha, ready to chat about my projects, skills, or anything you'd like to know.",
                "Hello! I'm Kholipha Ahmmad. Feel free to ask me anything about my work or experience.",
                "Great to see you here! I'm Kholipha Al-Amin. What can I tell you about my education or projects?",
            ];
            return getRandomItem(greetings);
        };
        const getTimeBasedGreeting = () => {
            const hour = new Date().getHours();
            let greetingArray;
            if (hour >= 5 && hour < 12) {
                greetingArray =
                    chatbotKnowledge.conversationalPhrases.morningGreetings;
            } else if (hour >= 12 && hour < 17) {
                greetingArray =
                    chatbotKnowledge.conversationalPhrases.afternoonGreetings;
            } else if (hour >= 17 && hour < 22) {
                greetingArray =
                    chatbotKnowledge.conversationalPhrases.eveningGreetings;
            } else {
                greetingArray =
                    chatbotKnowledge.conversationalPhrases.nightGreetings;
            }
            return getRandomItem(greetingArray);
        };
        const getWordReflectionResponse = (input) => {
            const excludedWords = [
                "a",
                "an",
                "the",
                "is",
                "are",
                "was",
                "were",
                "be",
                "been",
                "being",
                "and",
                "or",
                "but",
                "if",
                "then",
                "else",
                "when",
                "where",
                "why",
                "how",
                "all",
                "any",
                "both",
                "each",
                "few",
                "more",
                "most",
                "some",
                "such",
                "this",
                "that",
                "these",
                "those",
                "what",
                "which",
                "who",
                "whom",
            ];
            const words = input
                .split(/\s+/)
                .filter((word) => word.length > 4)
                .map((word) => word.replace(/[.,?!;:'"()]/g, "").toLowerCase())
                .filter((word) => !excludedWords.includes(word));
            if (words.length === 0) return null;
            const significantWord = getRandomItem(words);
            if (
                [
                    "skill",
                    "skills",
                    "tech",
                    "ability",
                    "programming",
                    "coding",
                    "develop",
                ].some((topic) => significantWord.includes(topic))
            ) {
                return {
                    response: getSkillsResponse(input),
                    keywords: [significantWord],
                };
            }
            if (
                [
                    "project",
                    "portfolio",
                    "built",
                    "create",
                    "develop",
                    "application",
                    "software",
                ].some((topic) => significantWord.includes(topic))
            ) {
                return {
                    response: getProjectResponse(input),
                    keywords: [significantWord],
                };
            }
            if (
                [
                    "education",
                    "degree",
                    "study",
                    "college",
                    "university",
                    "school",
                    "learn",
                    "certification",
                ].some((topic) => significantWord.includes(topic))
            ) {
                return {
                    response: getEducationResponse(),
                    keywords: [significantWord],
                };
            }
            if (
                [
                    "experience",
                    "job",
                    "work",
                    "career",
                    "company",
                    "professional",
                    "industry",
                ].some((topic) => significantWord.includes(topic))
            ) {
                return {
                    response: getExperienceResponse(),
                    keywords: [significantWord],
                };
            }
            if (
                [
                    "personal",
                    "hobby",
                    "favorite",
                    "interest",
                    "yourself",
                    "family",
                    "friend",
                    "lifestyle",
                ].some((topic) => significantWord.includes(topic))
            ) {
                return {
                    response: getPersonalInfoResponse(input),
                    keywords: [significantWord],
                };
            }
            const reflectionTemplate = getRandomPhrase("wordReflection");
            let response = reflectionTemplate.replace(
                "*word*",
                significantWord
            );
            if (Math.random() > 0.5) {
                return {
                    response: response,
                    keywords: [significantWord],
                };
            }
            return null; 
        };
        const getPersonalInfoResponse = (input) => {
            const normalizedInput = input.toLowerCase();
            if (
                normalizedInput.includes("age") ||
                normalizedInput.includes("old")
            ) {
                return `I'm ${chatbotKnowledge.personalInfo.age} years old. The perfect age to be both experienced and innovative in tech!`;
            }
            if (
                normalizedInput.includes("location") ||
                normalizedInput.includes("live") ||
                normalizedInput.includes("from") ||
                normalizedInput.includes("where")
            ) {
                return `I'm based in ${chatbotKnowledge.personalInfo.location}. It's a great hub for tech innovation and creative thinking!`;
            }
            if (
                normalizedInput.includes("hobby") ||
                normalizedInput.includes("hobbies") ||
                normalizedInput.includes("free time") ||
                normalizedInput.includes("fun")
            ) {
                const hobbies = getRandomItems(
                    chatbotKnowledge.personalInfo.hobbies,
                    3
                ).join(", ");
                return `When I'm not coding, I enjoy ${hobbies}. I find these activities help balance my technical work with creativity and physical activity.`;
            }
            if (
                normalizedInput.includes("book") ||
                normalizedInput.includes("read")
            ) {
                const books = getRandomItems(
                    chatbotKnowledge.personalInfo.favoriteBooks,
                    2
                ).join(" and ");
                return `I love reading! Some of my favorite books include ${books}. They really inspire my thinking about technology and the future.`;
            }
            if (
                normalizedInput.includes("movie") ||
                normalizedInput.includes("film") ||
                normalizedInput.includes("watch")
            ) {
                const movies = getRandomItems(
                    chatbotKnowledge.personalInfo.favoriteMovies,
                    2
                ).join(" and ");
                return `I enjoy movies that make me think! My favorites include ${movies}. I'm particularly drawn to sci-fi and stories about innovation.`;
            }
            if (
                normalizedInput.includes("tech") ||
                normalizedInput.includes("tool") ||
                normalizedInput.includes("software") ||
                normalizedInput.includes("hardware")
            ) {
                const tools = getRandomItems(
                    chatbotKnowledge.personalInfo.favoriteTechTools,
                    2
                ).join(" and ");
                return `I'm a big fan of ${tools}. These tools boost my productivity and creativity in development work.`;
            }
            if (
                normalizedInput.includes("language") ||
                normalizedInput.includes("speak")
            ) {
                const languages = chatbotKnowledge.personalInfo.languages.join(
                    ", "
                );
                return `I can communicate in ${languages}. I believe language skills are valuable for collaboration in our global tech community.`;
            }
            if (
                normalizedInput.includes("fact") ||
                normalizedInput.includes("interesting") ||
                normalizedInput.includes("unique")
            ) {
                const funFact = getRandomItem(
                    chatbotKnowledge.personalInfo.funFacts
                );
                return `Here's something you might not know about me: ${funFact}. Pretty cool, right?`;
            }
            if (
                normalizedInput.includes("goal") ||
                normalizedInput.includes("aspiration") ||
                normalizedInput.includes("future") ||
                normalizedInput.includes("plan")
            ) {
                const goal = getRandomItem(chatbotKnowledge.personalInfo.goals);
                return `One of my key professional goals is to ${goal}. I'm working steadily toward this while continuing to grow my skills.`;
            }
            if (
                normalizedInput.includes("value") ||
                normalizedInput.includes("believe") ||
                normalizedInput.includes("principle")
            ) {
                const values = getRandomItems(
                    chatbotKnowledge.personalInfo.values,
                    3
                ).join(", ");
                return `I strongly value ${values}. These principles guide my approach to both work and personal growth.`;
            }
            if (
                normalizedInput.includes("pet") ||
                normalizedInput.includes("cat") ||
                normalizedInput.includes("dog") ||
                normalizedInput.includes("animal")
            ) {
                return `I have a ${chatbotKnowledge.personalInfo.pets.breed} cat named ${chatbotKnowledge.personalInfo.pets.name} who is ${chatbotKnowledge.personalInfo.pets.age} years old. ${chatbotKnowledge.personalInfo.pets.personality}`;
            }
            return `Hi, I'm ${chatbotKnowledge.personalInfo.fullName}, a ${
                chatbotKnowledge.personalInfo.age
            }-year-old developer from ${
                chatbotKnowledge.personalInfo.location
            }. In my free time, I enjoy ${getRandomItems(
                chatbotKnowledge.personalInfo.hobbies,
                2
            ).join(" and ")}. Want to know anything specific about me?`;
        };
        const getSkillsResponse = (input) => {
            if (
                input.includes("technical") ||
                input.includes("programming") ||
                input.includes("coding")
            ) {
                const skills = chatbotKnowledge.skills.technical
                    .slice(0, 8)
                    .join(", ");
                return `For technical skills, I'm proficient in ${skills}, and more. Any specific technology you're interested in?`;
            }
            if (
                input.includes("design") ||
                input.includes("ui") ||
                input.includes("ux")
            ) {
                const skills = chatbotKnowledge.skills.design
                    .slice(0, 8)
                    .join(", ");
                return `In terms of design skills, I work with ${skills}, among others. Would you like to know more about my design process?`;
            }
            if (
                input.includes("soft") ||
                input.includes("people") ||
                input.includes("communication")
            ) {
                const skills = chatbotKnowledge.skills.soft.join(", ");
                return `My soft skills include ${skills}. These are crucial for effective collaboration and project management.`;
            }
            const techSkills = getRandomItems(
                chatbotKnowledge.skills.technical,
                5
            ).join(", ");
            const designSkills = getRandomItems(
                chatbotKnowledge.skills.design,
                3
            ).join(", ");
            return `I have a diverse skill set including technical skills like ${techSkills}, and design skills such as ${designSkills}. Would you like more specific information about any of these areas?`;
        };
        const getProjectResponse = (input) => {
            for (const project of chatbotKnowledge.projects) {
                if (input.includes(project.name.toLowerCase())) {
                    return `**${project.name}**: ${
                        project.description
                    }. It was built using ${project.technologies.join(", ")}.`;
                }
            }
            for (const tech of [
                "ai",
                "machine learning",
                "python",
                "javascript",
                "blockchain",
                "react",
            ]) {
                if (input.includes(tech)) {
                    const relevantProjects = chatbotKnowledge.projects.filter(
                        (p) =>
                            p.description.toLowerCase().includes(tech) ||
                            p.technologies.some((t) =>
                                t.toLowerCase().includes(tech)
                            )
                    );
                    if (relevantProjects.length > 0) {
                        const project = relevantProjects[0];
                        return `For ${tech}, check out my **${
                            project.name
                        }** project: ${
                            project.description
                        }. It uses ${project.technologies.join(", ")}.`;
                    }
                }
            }
            const randomProject = getRandomItem(chatbotKnowledge.projects);
            return `I've worked on several interesting projects. For example, **${randomProject.name}**: ${randomProject.description}. Would you like to hear about more projects?`;
        };
        const getEducationResponse = () => {
            const degree = chatbotKnowledge.education[0];
            const certs = chatbotKnowledge.education
                .filter((ed) => ed.certification)
                .slice(0, 2);
            let response = `I have a **${degree.degree}** from ${degree.school} (${degree.year}), focusing on ${degree.focus}. `;
            if (certs.length > 0) {
                response += `I also hold certifications including ${certs
                    .map((c) => c.certification)
                    .join(" and ")}.`;
            }
            return response;
        };
        const getExperienceResponse = () => {
            const currentJob = chatbotKnowledge.experience[0];
            let response = `Currently, I'm working as a **${currentJob.role}** at ${currentJob.company} (${currentJob.period}). `;
            response += `My key responsibilities include ${currentJob.responsibilities
                .slice(0, 2)
                .join(" and ")}. `;
            if (chatbotKnowledge.experience.length > 1) {
                const previousJob = chatbotKnowledge.experience[1];
                response += `Before that, I was a ${previousJob.role} at ${previousJob.company}.`;
            }
            return response;
        };
        const getRandomPhrase = (category) => {
            const phrases = chatbotKnowledge.conversationalPhrases[category];
            return phrases[Math.floor(Math.random() * phrases.length)];
        };
        const getRandomItem = (array) => {
            return array[Math.floor(Math.random() * array.length)];
        };
        const getRandomItems = (array, count) => {
            const shuffled = [...array].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count);
        };
        const addPersonality = (text) => {
            const personalityTraits = {
                friendly: {
                    intros: [
                        "Absolutely! ",
                        "Happy to share that ",
                        "Great question! ",
                        "I'd love to tell you about that. ",
                        "Thanks for asking! ",
                    ],
                    outros: [
                        " Feel free to ask me more!",
                        " Hope that answers your question!",
                        " Anything else you'd like to know?",
                        " Let me know if you need more details!",
                        " I'm excited to share more about my work!",
                    ],
                    emojis: ["😊", "👍", "💯", "✨", "🚀", "💡", "🔥", "👨‍💻"],
                },
                professional: {
                    intros: [
                        "Certainly. ",
                        "I'm pleased to share that ",
                        "To address your inquiry, ",
                        "From my experience, ",
                        "In my professional capacity, ",
                    ],
                    outros: [
                        " Please feel free to inquire further.",
                        " I'm available to elaborate if needed.",
                        " Does this information meet your requirements?",
                        " I trust this information is helpful.",
                        " I'd be happy to provide additional context if necessary.",
                    ],
                    emojis: ["📊", "📈", "🔍", "📱", "💼", "📝"],
                },
                casual: {
                    intros: [
                        "Hey! ",
                        "So, ",
                        "Well, ",
                        "You know, ",
                        "Honestly, ",
                    ],
                    outros: [
                        " Pretty cool, right?",
                        " That's the gist of it!",
                        " What else are you curious about?",
                        " Hope that helps!",
                        " Let me know what else you want to know!",
                    ],
                    emojis: ["😎", "🙌", "👏", "🤙", "👊", "🔥", "💪"],
                },
                enthusiastic: {
                    intros: [
                        "Oh wow! I'd LOVE to tell you about that! ",
                        "I'm SUPER excited you asked! ",
                        "AMAZING question! ",
                        "This is one of my FAVORITE topics! ",
                        "I'm THRILLED to share this with you! ",
                    ],
                    outros: [
                        " Isn't that INCREDIBLE?!",
                        " How AMAZING is that?!",
                        " I'm SO passionate about this!",
                        " This is what I LIVE for!",
                        " I could talk about this ALL day!",
                    ],
                    emojis: ["🤩", "✨", "🚀", "💥", "⚡", "🔥", "💫", "🌟"],
                },
            };
            const mood = personalityTraits[currentChatMood];
            const shouldAddIntro = Math.random() > 0.4;
            const shouldAddOutro = Math.random() > 0.5;
            const shouldAddEmoji = Math.random() > 0.3;
            let result = text;
            if (
                shouldAddIntro &&
                !text.startsWith("I ") &&
                !text.startsWith("My ")
            ) {
                result = getRandomItem(mood.intros) + result;
            }
            if (
                shouldAddOutro &&
                !result.endsWith("?") &&
                !result.endsWith("!")
            ) {
                result = result + getRandomItem(mood.outros);
            }
            if (shouldAddEmoji) {
                const position = Math.random() > 0.5 ? "start" : "end";
                const emoji = getRandomItem(mood.emojis);
                if (
                    position === "start" &&
                    !result.startsWith("I ") &&
                    !result.startsWith("My ")
                ) {
                    result = emoji + " " + result;
                } else if (position === "end") {
                    result = result + " " + emoji;
                }
            }
            if (Math.random() > 0.8) {
                const signatures = [
                    "\n\n~ Kholipha",
                    "\n\nRegards,\nKholipha Al-Amin",
                    "\n\n-KAA",
                ];
                result += getRandomItem(signatures);
            }
            return result;
        };
        const addMessage = (text, isUser = false, keywords = []) => {
            if (isTyping && !isUser) return;
            const messageContainer = document.createElement("div");
            messageContainer.className = isUser
                ? "user-message"
                : "bot-message";
            const timestamp = document.createElement("div");
            timestamp.className = "message-timestamp";
            const now = new Date();
            timestamp.textContent = `${now
                .getHours()
                .toString()
                .padStart(2, "0")}:${now
                .getMinutes()
                .toString()
                .padStart(2, "0")}`;
            const avatar = document.createElement("div");
            avatar.className = "message-avatar";
            if (!isUser) {
                const avatarImg = document.createElement("img");
                avatarImg.src = logoPath;
                avatarImg.alt = "Kholipha Al-Amin";
                avatarImg.loading = "lazy";
                avatar.appendChild(avatarImg);
            } else {
                const userIcon = document.createElement("i");
                userIcon.className = "fas fa-user";
                avatar.appendChild(userIcon);
            }
            const contentContainer = document.createElement("div");
            contentContainer.className = "message-content";
            if (isUser) {
                contentContainer.innerHTML = highlightKeywordsInUserMessage(
                    text,
                    keywords
                );
            } else {
                contentContainer.innerHTML = "";
                messageContainer.classList.add("typing-indicator");
                for (let i = 0; i < 3; i++) {
                    const dot = document.createElement("span");
                    dot.className = "dot";
                    contentContainer.appendChild(dot);
                }
            }
            messageContainer.appendChild(avatar);
            messageContainer.appendChild(contentContainer);
            messageContainer.appendChild(timestamp);
            chatbotMessages.appendChild(messageContainer);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            createParticles();
            if (!isUser) {
                isTyping = true;
                const formattedText = formatMarkdown(text);
                setTimeout(() => {
                    messageContainer.classList.remove("typing-indicator");
                    contentContainer.innerHTML = "";
                    typeEffect(contentContainer, formattedText, 5).then(() => {
                        isTyping = false;
                        chatbotInput.focus();
                        animateBotMessage(contentContainer);
                        setTimeout(() => {
                            if (botMessageQueue.length > 0) {
                                const nextMessage = botMessageQueue.shift();
                                addMessage(nextMessage, false);
                            }
                        }, 500);
                    });
                }, 1500);
            }
            return { messageContainer, contentContainer };
        };
        const typeEffect = (element, text, speed) => {
            isTyping = true;
            let formattedText = formatMarkdown(text);
            element.innerHTML = "";
            return new Promise((resolve) => {
                let i = 0;
                let htmlContent = "";
                let tagStack = [];
                let isInTag = false;
                let isInEntity = false;
                let entityContent = "";
                function type() {
                    if (i < formattedText.length) {
                        const char = formattedText[i];
                        if (char === "<") {
                            isInTag = true;
                            htmlContent += char;
                        } else if (char === ">" && isInTag) {
                            isInTag = false;
                            htmlContent += char;
                        } else if (isInTag) {
                            htmlContent += char;
                        } else if (char === "&") {
                            isInEntity = true;
                            entityContent = char;
                        } else if (char === ";" && isInEntity) {
                            isInEntity = false;
                            entityContent += char;
                            htmlContent += entityContent;
                        } else if (isInEntity) {
                            entityContent += char;
                        } else {
                            htmlContent += char;
                            element.innerHTML = htmlContent;
                            chatbotMessages.scrollTop =
                                chatbotMessages.scrollHeight;
                        }
                        i++;
                        setTimeout(type, isInTag || isInEntity ? 0 : speed);
                    } else {
                        isTyping = false;
                        chatbotInput.disabled = false;
                        chatbotSend.disabled = false;
                        chatbotInput.focus();
                        resolve(); 
                    }
                }
                type();
            });
        };
        const processInput = () => {
            const userInput = chatbotInput.value.trim();
            if (userInput === "") return;
            addMessage(userInput, true);
            chatHistory.push({
                role: "user",
                content: userInput,
            });
            chatbotInput.value = "";
            chatbotInput.disabled = true;
            chatbotSend.disabled = true;
            const responseDelay = Math.floor(Math.random() * 500) + 800;
            setTimeout(() => {
                const { response, keywords } = generateResponse(userInput);
                addMessage(response, false, keywords);
                chatHistory.push({
                    role: "assistant",
                    content: response,
                });
                chatbotInput.disabled = false;
                chatbotSend.disabled = false;
                setTimeout(updateSuggestionChips, 1000);
            }, responseDelay);
        };
        const toggleSettings = () => {
            isSettingsOpen = !isSettingsOpen;
            if (isSettingsOpen) {
                chatbotSettings.classList.add("visible");
            } else {
                chatbotSettings.classList.remove("visible");
            }
        };
        const getMoodChangeMessage = (mood) => {
            switch (mood) {
                case "friendly":
                    return "I'll keep our chat friendly and approachable! How can I help you today?";
                case "professional":
                    return "I've switched to a more professional tone. How may I assist you with your inquiry?";
                case "casual":
                    return "Cool, switching to casual mode! What's up? What do you wanna know?";
                case "enthusiastic":
                    return "OMG! I'm SUPER excited to chat with you now!! What AMAZING thing can I tell you about?!?";
                default:
                    return "Chat style updated. How can I help you?";
            }
        };
        const setTheme = (theme) => {
            currentTheme = theme;
            document.body.setAttribute("data-chatbot-theme", theme);
            let themeMessage;
            switch (theme) {
                case "dark":
                    themeMessage =
                        "Switched to dark theme. Your eyes will thank you!";
                    break;
                case "light":
                    themeMessage = "Switched to light theme. Keep it bright!";
                    break;
                case "purple":
                    themeMessage = "Switched to purple theme. Royal vibes!";
                    break;
                case "blue":
                    themeMessage = "Switched to blue theme. Ocean mood!";
                    break;
                default:
                    themeMessage = "Theme updated.";
            }
            addMessage(themeMessage);
        };
        const updateSuggestionChips = () => {
            suggestionChips.innerHTML = "";
            let suggestions = [];
            const lastBotMessage = chatHistory
                .filter((msg) => !msg.isUser)
                .pop();
            if (lastBotMessage) {
                if (lastBotMessage.text.includes("skill")) {
                    suggestions = [
                        "Technical skills",
                        "Design skills",
                        "Soft skills",
                    ];
                } else if (lastBotMessage.text.includes("project")) {
                    suggestions = [
                        "AI projects",
                        "Web development projects",
                        "Mobile projects",
                    ];
                } else if (lastBotMessage.text.includes("education")) {
                    suggestions = [
                        "Certifications",
                        "Courses",
                        "Academic background",
                    ];
                } else if (lastBotMessage.text.includes("experience")) {
                    suggestions = [
                        "Current role",
                        "Previous jobs",
                        "Achievements",
                    ];
                } else {
                    suggestions = getRandomItems(
                        chatbotKnowledge.defaultSuggestions,
                        3
                    );
                }
            } else {
                suggestions = getRandomItems(
                    chatbotKnowledge.defaultSuggestions,
                    3
                );
            }
            suggestions.forEach((suggestion) => {
                const chip = document.createElement("button");
                chip.className = "suggestion-chip";
                chip.textContent = suggestion;
                chip.addEventListener("click", () => {
                    chatbotInput.value = suggestion;
                    processInput();
                });
                suggestionChips.appendChild(chip);
                gsap.fromTo(
                    chip,
                    { scale: 0.8, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.3,
                        ease: "back.out(1.7)",
                        delay: Math.random() * 0.3,
                    }
                );
            });
        };
        chatbotTrigger.addEventListener("click", () => {
            chatbotContainer.classList.remove("chatbot-closed");
            chatbotTrigger.style.display = "none";
            if (chatHistory.length === 0) {
                const greeting = getTimeBasedGreeting();
                addMessage(greeting);
                chatHistory.push({ role: "assistant", content: greeting });
                updateSuggestionChips();
            }
            chatbotInput.focus();
        });
        chatbotClose.addEventListener("click", () => {
            chatbotContainer.classList.add("chatbot-closed");
            chatbotTrigger.style.display = "flex";
        });
        chatbotMinimize.addEventListener("click", () => {
            chatbotContainer.classList.toggle("chatbot-minimized");
        });
        chatbotInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && !e.shiftKey && !isTyping) {
                e.preventDefault();
                processInput();
            }
        });
        chatbotSend.addEventListener("click", () => {
            if (!isTyping) {
                processInput();
            }
        });
        if (chatbotToggleSettings) {
            chatbotToggleSettings.addEventListener("click", toggleSettings);
        }
        if (moodButtons) {
            moodButtons.forEach((btn) => {
                btn.addEventListener("click", () => {
                    moodButtons.forEach((b) => b.classList.remove("active"));
                    btn.classList.add("active");
                    currentChatMood = btn.getAttribute("data-mood");
                    const moodChangeMessage = getMoodChangeMessage(
                        currentChatMood
                    );
                    addMessage(moodChangeMessage);
                });
            });
        }
        if (themeButtons) {
            themeButtons.forEach((btn) => {
                btn.addEventListener("click", () => {
                    themeButtons.forEach((b) => b.classList.remove("active"));
                    btn.classList.add("active");
                    setTheme(btn.getAttribute("data-theme"));
                });
            });
        }
        updateSuggestionChips();
        const style = document.createElement("style");
        style.textContent = `
            .highlighted-keyword {
                background: linear-gradient(to right, rgba(120, 60, 240, 0.1), rgba(120, 60, 240, 0.3), rgba(120, 60, 240, 0.1));
                padding: 0 2px;
                border-radius: 3px;
                font-weight: bold;
                color: white;
                text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
                animation: keyword-glow 2s infinite alternate;
            }
            @keyframes keyword-glow {
                0% { box-shadow: 0 0 5px rgba(120, 60, 240, 0.3); }
                100% { box-shadow: 0 0 8px rgba(120, 60, 240, 0.6); }
            }
            .message-particle {
                position: absolute;
                pointer-events: none;
                z-index: 1;
            }
        `;
        document.head.appendChild(style);
    });
})();