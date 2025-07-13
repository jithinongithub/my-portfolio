import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Brain, Database, TrendingUp, ChevronDown, Menu, X } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
  image: string;
}

interface SkillGroup {
  category: string;
  items: string[];
}

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

type SectionId = 'home' | 'about' | 'projects' | 'experience' | 'contact';

const MLPortfolio: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects: Project[] = [
    {
      title: "Computer Vision for Medical Imaging",
      description: "Deep learning model for automated detection of anomalies in medical scans using CNN architectures. Achieved 94% accuracy on validation set.",
      tech: ["PyTorch", "OpenCV", "Docker", "FastAPI"],
      github: "https://github.com/username/medical-cv",
      demo: "https://demo.medical-cv.com",
      image: "https://via.placeholder.com/400x200/4f46e5/ffffff?text=Medical+CV"
    },
    {
      title: "NLP Sentiment Analysis Pipeline",
      description: "End-to-end pipeline for real-time sentiment analysis of social media data with 92% accuracy using transformer models.",
      tech: ["HuggingFace", "Apache Kafka", "PostgreSQL", "React"],
      github: "https://github.com/username/sentiment-pipeline",
      demo: "https://sentiment-demo.com",
      image: "https://via.placeholder.com/400x200/059669/ffffff?text=NLP+Pipeline"
    },
    {
      title: "MLOps Deployment Platform",
      description: "Automated ML model deployment system with monitoring, A/B testing, and rollback capabilities using Kubernetes and MLflow.",
      tech: ["Kubernetes", "MLflow", "Prometheus", "Grafana"],
      github: "https://github.com/username/mlops-platform",
      demo: "https://mlops-demo.com",
      image: "https://via.placeholder.com/400x200/dc2626/ffffff?text=MLOps+Platform"
    }
  ];

  const skills: SkillGroup[] = [
    { category: "Machine Learning", items: ["PyTorch", "TensorFlow", "Scikit-learn", "XGBoost", "Keras"] },
    { category: "Deep Learning", items: ["CNN", "RNN/LSTM", "Transformers", "GANs", "Reinforcement Learning"] },
    { category: "Data Engineering", items: ["Apache Spark", "Kafka", "Airflow", "PostgreSQL", "MongoDB"] },
    { category: "Cloud & DevOps", items: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"] },
    { category: "Programming", items: ["Python", "R", "SQL", "JavaScript", "Go", "TypeScript"] }
  ];

  const experience: Experience[] = [
    {
      title: "Senior ML Engineer",
      company: "TechCorp AI",
      period: "2022 - Present",
      description: "Led development of production ML systems serving 10M+ users. Improved model performance by 35% through advanced feature engineering and ensemble methods."
    },
    {
      title: "Data Scientist",
      company: "DataDriven Inc",
      period: "2020 - 2022",
      description: "Built predictive models for customer churn, increasing retention by 28%. Designed and implemented A/B testing framework for model validation."
    },
    {
      title: "ML Research Intern",
      company: "AI Research Lab",
      period: "2019 - 2020",
      description: "Conducted research on computer vision applications in healthcare. Published 2 papers at top-tier conferences (CVPR, NeurIPS)."
    }
  ];

  const sections: SectionId[] = ['home', 'about', 'projects', 'experience', 'contact'];

  const scrollToSection = (sectionId: SectionId): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  const handleMenuToggle = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleExternalLink = (url: string): void => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/95 backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Brain className="h-8 w-8 text-purple-400" />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {sections.map((section) => (
                    <button
                      key={section}
                      onClick={() => scrollToSection(section)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeSection === section
                          ? 'bg-purple-600 text-white'
                          : 'text-gray-300 hover:text-white hover:bg-purple-600/50'
                      }`}
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="md:hidden">
              <button
                onClick={handleMenuToggle}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {sections.map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 w-full text-left"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-600/20 animate-pulse"></div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Jithin Raj
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Transforming data into intelligent solutions. Specializing in deep learning, computer vision, and MLOps.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('projects')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              View Projects <ExternalLink className="h-4 w-4" />
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="border border-purple-600 hover:bg-purple-600 text-purple-400 hover:text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Get in Touch
            </button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-6 w-6 text-gray-400" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">About Me</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Passionate ML engineer with 5+ years of experience building production-ready machine learning systems.
              I specialize in computer vision, NLP, and MLOps, with a track record of delivering impactful solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-purple-600/20 p-3 rounded-lg">
                  <Brain className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Machine Learning Expertise</h3>
                  <p className="text-gray-300">Deep learning, computer vision, NLP, and reinforcement learning</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-green-600/20 p-3 rounded-lg">
                  <Database className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Data Engineering</h3>
                  <p className="text-gray-300">Building robust data pipelines and scalable ML infrastructure</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-blue-600/20 p-3 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">MLOps & Production</h3>
                  <p className="text-gray-300">Deploying and monitoring ML models at scale</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {skills.map((skillGroup, index) => (
                <div key={index} className="bg-slate-800/50 p-6 rounded-xl backdrop-blur-sm border border-slate-700">
                  <h3 className="text-lg font-semibold mb-3 text-purple-400">{skillGroup.category}</h3>
                  <div className="space-y-2">
                    {skillGroup.items.map((skill, skillIndex) => (
                      <div key={skillIndex} className="text-sm text-gray-300 bg-slate-700/50 px-3 py-1 rounded-full">
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              A showcase of my machine learning projects, from research to production deployments.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-slate-800/50 rounded-xl overflow-hidden backdrop-blur-sm border border-slate-700 hover:border-purple-600/50 transition-all duration-300 hover:transform hover:scale-105">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-300 mb-4 text-sm">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="bg-purple-600/20 text-purple-400 px-2 py-1 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleExternalLink(project.github)}
                      className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
                      aria-label={`View ${project.title} source code`}
                    >
                      <Github className="h-4 w-4" />
                      <span className="text-sm">Code</span>
                    </button>
                    <button
                      onClick={() => handleExternalLink(project.demo)}
                      className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
                      aria-label={`View ${project.title} demo`}
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span className="text-sm">Demo</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Experience</h2>
            <p className="text-gray-300 text-lg">My professional journey in machine learning and data science.</p>
          </div>
          
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <div key={index} className="bg-slate-800/50 p-6 rounded-xl backdrop-blur-sm border border-slate-700">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{exp.title}</h3>
                    <p className="text-purple-400 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-gray-400 text-sm">{exp.period}</span>
                </div>
                <p className="text-gray-300">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            I'm always interested in discussing new opportunities, collaborations, or just chatting about ML and AI.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="mailto:your.email@example.com" 
              className="flex items-center gap-3 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              aria-label="Send email"
            >
              <Mail className="h-5 w-5" />
              your.email@example.com
            </a>
            <a 
              href="https://linkedin.com/in/yourprofile" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              aria-label="Visit LinkedIn profile"
            >
              <Linkedin className="h-5 w-5" />
              LinkedIn
            </a>
            <a 
              href="https://github.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              aria-label="Visit GitHub profile"
            >
              <Github className="h-5 w-5" />
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-slate-700">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2025 ML Engineer Portfolio. Built with React, TypeScript & Vite.</p>
        </div>
      </footer>
    </div>
  );
};

export default MLPortfolio;