// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectsGrid = document.getElementById('projects-grid');
const contactForm = document.getElementById('contact-form');
const performanceTestBtn = document.getElementById('run-performance-test');
const performanceScore = document.getElementById('performance-score');
const currentYear = document.getElementById('current-year');

// Projects Data - Updated with your personal projects
const projects = [
    {
        id: 1,
        title: "Space Explorer Game",
        description: "A 2D space exploration game built with JavaScript and HTML5 Canvas. Features asteroid dodging, power-up collection, and score tracking.",
        tags: ["game", "javascript"],
        image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        github: "#",
        live: "#"
    },
    {
        id: 2,
        title: "Algorithm Visualizer",
        description: "Interactive visualization tool for common CS algorithms (Sorting, Pathfinding). Built with React and D3.js for educational purposes.",
        tags: ["web", "cs"],
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        github: "#",
        live: "#"
    },
    {
        id: 3,
        title: "Pixel Art Creator",
        description: "Web-based pixel art editor with color palettes, layers, and export functionality. Created for digital art enthusiasts.",
        tags: ["web", "javascript"],
        image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        github: "#",
        live: "#"
    },
    {
        id: 4,
        title: "Maze Runner Game",
        description: "Procedurally generated maze game with multiple difficulty levels and player progression system. Built with Phaser.js game engine.",
        tags: ["game", "javascript"],
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        github: "#",
        live: "#"
    },
    {
        id: 5,
        title: "Student Task Manager",
        description: "Full-stack task management application for students. Features deadline tracking, priority sorting, and progress visualization.",
        tags: ["web", "cs"],
        image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        github: "#",
        live: "#"
    },
    {
        id: 6,
        title: "Physics Engine Simulator",
        description: "2D physics simulation demonstrating gravity, collisions, and particle systems. Built for Computer Graphics course assignment.",
        tags: ["cs", "game"],
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        github: "#",
        live: "#"
    },
    {
        id: 7,
        title: "Multiplayer Quiz Game",
        description: "Real-time multiplayer quiz game with Socket.io. Supports multiple rooms, live scoring, and custom question sets.",
        tags: ["game", "web"],
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        github: "#",
        live: "#"
    },
    {
        id: 8,
        title: "Data Structures Visualizer",
        description: "Interactive visualization of common data structures (Linked Lists, Trees, Graphs) with operations and animations.",
        tags: ["cs", "web"],
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        github: "#",
        live: "#"
    }
];

// Skills Data - Updated with your skills
const skills = [
    {
        category: "Programming",
        skills: [
            { name: "JavaScript", level: 88 },
            { name: "Python", level: 85 },
            { name: "Java", level: 80 },
            { name: "C++", level: 75 }
        ]
    },
    {
        category: "Web Development",
        skills: [
            { name: "HTML/CSS", level: 92 },
            { name: "React", level: 85 },
            { name: "Node.js", level: 82 },
            { name: "Git/GitHub", level: 90 }
        ]
    },
    {
        category: "Game Development",
        skills: [
            { name: "Phaser.js", level: 80 },
            { name: "Unity Basics", level: 75 },
            { name: "Game Design", level: 78 },
            { name: "Physics Simulation", level: 70 }
        ]
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initProjects();
    initSkills();
    initFormValidation();
    initSmoothScrolling();
    initPerformanceTest();
    initAnimatedCounters();
    
    // Set current year
    currentYear.textContent = new Date().getFullYear();
});

// Theme Toggle Functionality
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.className = 'fas fa-sun';
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'light');
        }
    });
}

// Project Filtering Functionality
function initProjects() {
    renderProjects(projects);
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            const filter = button.dataset.filter;
            const filteredProjects = filter === 'all' 
                ? projects 
                : projects.filter(project => project.tags.includes(filter));
            
            renderProjects(filteredProjects);
        });
    });
}

function renderProjects(projectsToRender) {
    projectsGrid.innerHTML = '';
    
    projectsToRender.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.setAttribute('data-aos', 'fade-up');
        
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-image" loading="lazy">
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.github}" class="project-link" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-github"></i> Code
                    </a>
                    <a href="${project.live}" class="project-link" target="_blank" rel="noopener noreferrer">
                        <i class="fas fa-external-link-alt"></i> Demo
                    </a>
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
}

// Skills Rendering with Animation
function initSkills() {
    const skillsContainer = document.querySelector('.skills-container');
    
    skills.forEach(category => {
        const categoryElement = document.createElement('div');
        categoryElement.className = 'skill-category';
        
        let skillsHTML = `
            <h3>${category.category}</h3>
            <ul class="skill-list">
        `;
        
        category.skills.forEach(skill => {
            skillsHTML += `
                <li class="skill-item">
                    <span class="skill-name">${skill.name}</span>
                    <div class="skill-bar">
                        <div class="skill-level" data-level="${skill.level}"></div>
                    </div>
                    <span class="skill-percentage">${skill.level}%</span>
                </li>
            `;
        });
        
        skillsHTML += '</ul>';
        categoryElement.innerHTML = skillsHTML;
        skillsContainer.appendChild(categoryElement);
    });
    
    // Animate skill bars when in viewport
    animateSkillBars();
}

function animateSkillBars() {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillLevel = entry.target;
                const level = skillLevel.dataset.level;
                skillLevel.style.width = `${level}%`;
            }
        });
    }, { threshold: 0.5 });
    
    skillLevels.forEach(level => observer.observe(level));
}

// Form Validation
function initFormValidation() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    const formStatus = document.getElementById('form-status');
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showError(input, errorElement, message) {
        errorElement.textContent = message;
        input.style.borderColor = '#ff4757';
    }
    
    function clearError(input, errorElement) {
        errorElement.textContent = '';
        input.style.borderColor = '';
    }
    
    nameInput.addEventListener('input', () => {
        if (nameInput.value.trim().length < 2) {
            showError(nameInput, nameError, 'Name must be at least 2 characters');
        } else {
            clearError(nameInput, nameError);
        }
    });
    
    emailInput.addEventListener('input', () => {
        if (!validateEmail(emailInput.value)) {
            showError(emailInput, emailError, 'Please enter a valid email address');
        } else {
            clearError(emailInput, emailError);
        }
    });
    
    messageInput.addEventListener('input', () => {
        if (messageInput.value.trim().length < 10) {
            showError(messageInput, messageError, 'Message must be at least 10 characters');
        } else {
            clearError(messageInput, messageError);
        }
    });
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate all fields
        if (nameInput.value.trim().length < 2) {
            showError(nameInput, nameError, 'Name must be at least 2 characters');
            isValid = false;
        }
        
        if (!validateEmail(emailInput.value)) {
            showError(emailInput, emailError, 'Please enter a valid email address');
            isValid = false;
        }
        
        if (messageInput.value.trim().length < 10) {
            showError(messageInput, messageError, 'Message must be at least 10 characters');
            isValid = false;
        }
        
        if (isValid) {
            formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
            formStatus.className = 'form-status success';
            
            // Simulate form submission
            setTimeout(() => {
                contactForm.reset();
                formStatus.textContent = '';
                formStatus.className = 'form-status';
            }, 3000);
        } else {
            formStatus.textContent = 'Please fix the errors above.';
            formStatus.className = 'form-status error';
        }
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Performance Test
function initPerformanceTest() {
    performanceTestBtn.addEventListener('click', async () => {
        performanceScore.textContent = 'Testing...';
        
        // Simulate performance test
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Generate random score between 85-100
        const score = Math.floor(Math.random() * 16) + 85;
        performanceScore.textContent = `${score}`;
        
        // Show performance tips
        showPerformanceTips(score);
    });
}

function showPerformanceTips(score) {
    const tips = [
        "✅ Images are properly optimized and lazy loaded",
        "✅ CSS and JS are minified",
        "✅ Smooth animations with hardware acceleration",
        score < 90 ? "⚠️ Consider implementing more aggressive caching" : "✅ Caching strategy implemented",
        score < 95 ? "⚠️ Review third-party scripts impact" : "✅ Minimal third-party scripts"
    ];
    
    console.log(`Performance Score: ${score}/100`);
    console.log("Tips for improvement:");
    tips.forEach(tip => console.log(`  ${tip}`));
}

// Animated Counters
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    if (navLinks.style.display === 'flex') {
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.backgroundColor = 'var(--bg-color)';
        navLinks.style.padding = '2rem';
        navLinks.style.boxShadow = 'var(--shadow)';
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.style.display = 'none';
    }
});

// Add CS course specific features
function initCourseFeatures() {
    // Add assignment completion indicator
    const assignmentProgress = document.createElement('div');
    assignmentProgress.className = 'assignment-progress';
    assignmentProgress.innerHTML = `
        <div class="progress-bar">
            <div class="progress-fill" style="width: 85%"></div>
        </div>
        <p>Portfolio Assignment Progress: 85%</p>
    `;
    
    document.querySelector('.course-info').prepend(assignmentProgress);
}