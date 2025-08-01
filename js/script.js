document.addEventListener('DOMContentLoaded', function() {
    const userName = prompt("What's your name? (We'd love to personalize your experience!)");
    const welcomeText = document.getElementById("welcome-text");
    
    if (userName && userName.trim()) {
        welcomeText.textContent = `Hi ${userName.trim()}, Welcome To RevoU`;
    } else {
        welcomeText.textContent = `Hi there, Welcome To RevoU!`;
    }
});

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');

mobileMenuBtn.addEventListener('click', function() {
    navMenu.classList.toggle('active');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            navMenu.classList.remove('active');
        }
    });
});

document.getElementById("message-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const birthdate = document.getElementById("birthdate").value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value || 'Not specified';
    const message = document.getElementById("message-text").value;
    const date = new Date();

    const result = `
        <div style="background: linear-gradient(135deg, #ffd700, #ffed4e); color: #5a5a0a; padding: 1rem; border-radius: 10px; margin-bottom: 1rem; box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);">
            <h4 style="margin: 0; font-size: 1.1rem;">✨ Message Submitted Successfully! ✅</h4>
        </div>
        <div style="space-y: 0.5rem; color: #5a5a0a;">
            <p style="margin-bottom: 0.8rem;"><strong style="color: #8b7355;">📅 Submission Time:</strong><br>
            <span style="color: #5a5a0a;">${date.toLocaleString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })}</span></p>
            
            <p style="margin-bottom: 0.8rem;"><strong style="color: #8b7355;">👤 Name:</strong><br>
            <span style="color: #5a5a0a;">${name}</span></p>
            
            <p style="margin-bottom: 0.8rem;"><strong style="color: #8b7355;">🎂 Birth Date:</strong><br>
            <span style="color: #5a5a0a;">${birthdate}</span></p>
            
            <p style="margin-bottom: 0.8rem;"><strong style="color: #8b7355;">⚧️ Gender:</strong><br>
            <span style="color: #5a5a0a;">${gender}</span></p>
            
            ${message ? `<p style="margin-bottom: 0.8rem;"><strong style="color: #8b7355;">💬 Message:</strong><br>
            <span style="color: #5a5a0a; font-style: italic; background: rgba(255, 248, 220, 0.5); padding: 0.5rem; border-radius: 5px; display: block; margin-top: 0.3rem;">"${message}"</span></p>` : ''}
        </div>
    `;

    const resultBox = document.getElementById("result-box");
    resultBox.innerHTML = result;
    resultBox.classList.add('has-content');
    resultBox.style.animation = 'fadeInUp 0.5s ease';
    
    showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
    
    setLoadingState(true);
    setTimeout(() => {
        setLoadingState(false);
    }, 1000);
});

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #ffd700, #ffed4e)' : 'linear-gradient(135deg, #daa520, #b8860b)'};
        color: #5a5a0a;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(255, 215, 0, 0.3);
        z-index: 1001;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        font-weight: 500;
        border: 2px solid rgba(255, 215, 0, 0.3);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 248, 220, 0.98)';
        header.style.boxShadow = '0 2px 25px rgba(255, 215, 0, 0.3)';
    } else {
        header.style.background = 'rgba(255, 248, 220, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(255, 215, 0, 0.2)';
    }
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .location').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    observer.observe(card);
});

function validateForm() {
    const name = document.getElementById("name").value.trim();
    const birthdate = document.getElementById("birthdate").value;
    const gender = document.querySelector('input[name="gender"]:checked');

    if (!name) {
        showNotification('Please enter your full name', 'error');
        return false;
    }

    if (name.length < 2) {
        showNotification('Name must be at least 2 characters long', 'error');
        return false;
    }

    if (!birthdate) {
        showNotification('Please select your date of birth', 'error');
        return false;
    }

    const today = new Date();
    const birth = new Date(birthdate);
    const age = today.getFullYear() - birth.getFullYear();
    
    if (age < 13) {
        showNotification('You must be at least 13 years old to register', 'error');
        return false;
    }

    if (!gender) {
        showNotification('Please select your gender', 'error');
        return false;
    }

    return true;
}

document.getElementById("message-form").addEventListener("submit", function (e) {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }
    
});

function setLoadingState(isLoading) {
    const submitBtn = document.querySelector('button[type="submit"]');
    if (isLoading) {
        submitBtn.textContent = '⏳ Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        submitBtn.style.cursor = 'not-allowed';
    } else {
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.style.cursor = 'pointer';
    }
}

document.getElementById("message-text").addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
});

function clearForm() {
    document.getElementById("message-form").reset();
    document.getElementById("result-box").innerHTML = '<p class="placeholder-text">Your message details will appear here after submission</p>';
    document.getElementById("result-box").classList.remove('has-content');
    const textarea = document.getElementById("message-text");
    textarea.style.height = 'auto';
    showNotification('Form cleared successfully', 'info');
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
    
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const form = document.getElementById("message-form");
        if (document.activeElement && form.contains(document.activeElement)) {
            e.preventDefault();
            form.dispatchEvent(new Event('submit'));
        }
    }
});

function addClearButton() {
    const form = document.getElementById("message-form");
    const submitButton = form.querySelector('button[type="submit"]');
    
    const clearButton = document.createElement('button');
    clearButton.type = 'button';
    clearButton.textContent = 'Clear Form';
    clearButton.style.cssText = `
        width: 100%;
        margin-top: 0.5rem;
        padding: 0.8rem;
        background: linear-gradient(135deg, #daa520, #b8860b);
        color: #fff8dc;
        border: none;
        border-radius: 10px;
        font-size: 0.9rem;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(218, 165, 32, 0.3);
    `;
    
    clearButton.addEventListener('click', clearForm);
    clearButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-1px)';
        this.style.boxShadow = '0 6px 20px rgba(218, 165, 32, 0.4)';
    });
    clearButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(218, 165, 32, 0.3)';
    });
    
    submitButton.parentNode.insertBefore(clearButton, submitButton.nextSibling);
}

window.addEventListener('load', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            section.style.transition = 'all 0.6s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

let clickCount = 0;
document.querySelector('.logo').addEventListener('click', function() {
    clickCount++;
    if (clickCount === 5) {
        showNotification('🎉 You found the easter egg! Welcome to RevoU!', 'success');
        clickCount = 0;
        const logo = this;
        logo.style.animation = 'rainbow 2s linear';
        setTimeout(() => {
            logo.style.animation = '';
        }, 2000);
    }
});

const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        25% { filter: hue-rotate(90deg); }
        50% { filter: hue-rotate(180deg); }
        75% { filter: hue-rotate(270deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);