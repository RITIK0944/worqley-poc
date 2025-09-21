// Worqley Main Application JavaScript

// Global State Management
window.WorqleyApp = {
    currentPage: 'homepage',
    currentUser: null,
    currentLanguage: 'en',
    isLoading: false,
    
    // Initialize the application
    init() {
        console.log('Initializing Worqley App...');
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Initialize translations
        this.initializeTranslations();
        
        // Initialize signature canvas if present
        this.initializeSignatureCanvas();
        
        // Hide loading screen and show app
        setTimeout(() => {
            document.getElementById('loading-screen').style.display = 'none';
            document.getElementById('app-container').style.display = 'block';
            this.showPage('homepage');
        }, 2000);
    },
    
    // Set up all event listeners
    setupEventListeners() {
        // Navigation buttons
        document.addEventListener('click', (e) => {
            if (e.target.hasAttribute('data-navigate')) {
                e.preventDefault();
                const page = e.target.getAttribute('data-navigate');
                this.navigateTo(page);
            }
            
            // Service booking buttons
            if (e.target.hasAttribute('data-action') && e.target.getAttribute('data-action') === 'book-service') {
                const service = e.target.getAttribute('data-service');
                this.openAICallModal(service);
            }
            
            // Dashboard tab navigation
            if (e.target.classList.contains('nav-tab')) {
                const section = e.target.getAttribute('data-section');
                this.showDashboardSection(section);
            }
            
            // Multi-step form navigation
            if (e.target.hasAttribute('data-next-step')) {
                const nextStep = e.target.getAttribute('data-next-step');
                this.showFormStep(nextStep);
            }
            
            if (e.target.hasAttribute('data-prev-step')) {
                const prevStep = e.target.getAttribute('data-prev-step');
                this.showFormStep(prevStep);
            }
            
            // Modal close
            if (e.target.classList.contains('modal-close') || e.target.id === 'end-call') {
                this.closeModal();
            }
            
            // Clear signature
            if (e.target.id === 'clear-signature') {
                this.clearSignature();
            }
            
            // Copy referral code
            if (e.target.textContent === 'Copy') {
                this.copyReferralCode();
            }
        });
        
        // Language selector
        const languageSelector = document.getElementById('language-selector');
        if (languageSelector) {
            languageSelector.addEventListener('change', (e) => {
                this.changeLanguage(e.target.value);
            });
        }
        
        // Form submissions
        document.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission(e.target);
        });
        
        // Photo upload preview
        const photoInput = document.getElementById('labor-photo');
        if (photoInput) {
            photoInput.addEventListener('change', (e) => {
                this.handlePhotoUpload(e.target);
            });
        }
        
        // Logout buttons
        const logoutButtons = ['customer-logout', 'labor-logout', 'admin-logout'];
        logoutButtons.forEach(id => {
            const btn = document.getElementById(id);
            if (btn) {
                btn.addEventListener('click', () => this.logout());
            }
        });
    },
    
    // Navigation function
    navigateTo(page) {
        console.log(`Navigating to: ${page}`);
        this.currentPage = page;
        this.showPage(page);
    },
    
    // Show specific page
    showPage(pageId) {
        // Hide all pages
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => {
            page.style.display = 'none';
            page.classList.remove('active');
        });
        
        // Show target page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.style.display = 'block';
            targetPage.classList.add('active');
        }
    },
    
    // Show dashboard sections
    showDashboardSection(sectionId) {
        // Remove active class from all tabs
        const tabs = document.querySelectorAll('.nav-tab');
        tabs.forEach(tab => tab.classList.remove('active'));
        
        // Add active class to clicked tab
        const activeTab = document.querySelector(`[data-section="${sectionId}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }
        
        // Hide all sections
        const sections = document.querySelectorAll('.dashboard-section');
        sections.forEach(section => {
            section.style.display = 'none';
            section.classList.remove('active');
        });
        
        // Show target section
        const targetSection = document.getElementById(`${sectionId}-section`);
        if (targetSection) {
            targetSection.style.display = 'block';
            targetSection.classList.add('active');
        }
    },
    
    // Multi-step form navigation
    showFormStep(stepNumber) {
        // Update progress indicator
        const steps = document.querySelectorAll('.step');
        steps.forEach((step, index) => {
            step.classList.remove('active', 'completed');
            if (index + 1 < stepNumber) {
                step.classList.add('completed');
            } else if (index + 1 == stepNumber) {
                step.classList.add('active');
            }
        });
        
        // Hide all form steps
        const formSteps = document.querySelectorAll('.form-step');
        formSteps.forEach(step => {
            step.style.display = 'none';
            step.classList.remove('active');
        });
        
        // Show target step
        const targetStep = document.querySelector(`[data-step="${stepNumber}"]`);
        if (targetStep && targetStep.classList.contains('form-step')) {
            targetStep.style.display = 'block';
            targetStep.classList.add('active');
        }
    },
    
    // Handle form submissions
    handleFormSubmission(form) {
        const formId = form.id;
        console.log(`Handling form submission: ${formId}`);
        
        switch (formId) {
            case 'customer-login-form':
                this.handleCustomerLogin(form);
                break;
            case 'customer-signup-form':
                this.handleCustomerSignup(form);
                break;
            case 'labor-login-form':
                this.handleLaborLogin(form);
                break;
            case 'labor-signup-form':
                this.handleLaborSignup(form);
                break;
            default:
                console.log('Unknown form submission');
        }
    },
    
    // Handle customer login
    handleCustomerLogin(form) {
        const formData = new FormData(form);
        const mobile = formData.get('mobile');
        const password = formData.get('password');
        
        // Simple validation
        if (!mobile || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        // Mock authentication
        if (mobile.length === 10 && password.length >= 6) {
            const user = {
                id: 'customer_' + Date.now(),
                fullName: 'Customer User',
                mobile: mobile,
                type: 'customer',
                email: 'customer@example.com'
            };
            
            this.loginUser(user);
        } else {
            alert('Invalid credentials. Please check your mobile number and password.');
        }
    },
    
    // Handle customer signup
    handleCustomerSignup(form) {
        const formData = new FormData(form);
        const fullName = formData.get('fullName');
        const mobile = formData.get('mobile');
        const email = formData.get('email');
        const password = formData.get('password');
        
        // Validation
        if (!fullName || !mobile || !password) {
            alert('Please fill in all required fields');
            return;
        }
        
        if (mobile.length !== 10) {
            alert('Please enter a valid 10-digit mobile number');
            return;
        }
        
        if (password.length < 6) {
            alert('Password must be at least 6 characters long');
            return;
        }
        
        // Create user
        const user = {
            id: 'customer_' + Date.now(),
            fullName: fullName,
            mobile: mobile,
            email: email || '',
            type: 'customer'
        };
        
        this.loginUser(user);
    },
    
    // Handle labor login
    handleLaborLogin(form) {
        const formData = new FormData(form);
        const mobile = formData.get('mobile');
        const password = formData.get('password');
        
        if (!mobile || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        // Mock authentication
        if (mobile.length === 10 && password.length >= 6) {
            const user = {
                id: 'labor_' + Date.now(),
                fullName: 'Worker User',
                mobile: mobile,
                type: 'labor',
                workCategory: 'Construction',
                experience: '3-5',
                shiftType: 'full-time',
                rating: 4.2,
                completedJobs: 25,
                totalEarnings: 45000
            };
            
            this.loginUser(user);
        } else {
            alert('Invalid credentials. Please check your mobile number and password.');
        }
    },
    
    // Handle labor signup
    handleLaborSignup(form) {
        const formData = new FormData(form);
        
        // Get all form data
        const userData = {
            fullName: formData.get('fullName'),
            mobile: formData.get('mobile'),
            email: formData.get('email'),
            dateOfBirth: formData.get('dateOfBirth'),
            aadhaarNumber: formData.get('aadhaarNumber'),
            street: formData.get('street'),
            city: formData.get('city'),
            pincode: formData.get('pincode'),
            state: formData.get('state'),
            country: formData.get('country'),
            workCategory: formData.get('workCategory'),
            experience: formData.get('experience'),
            shiftType: formData.get('shiftType'),
            signupMethod: formData.get('signupMethod'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
            agreeTerms: formData.get('agreeTerms')
        };
        
        // Validation
        if (!this.validateLaborSignup(userData)) {
            return;
        }
        
        // Create user
        const user = {
            id: 'labor_' + Date.now(),
            fullName: userData.fullName,
            mobile: userData.mobile,
            email: userData.email,
            type: 'labor',
            aadhaarNumber: userData.aadhaarNumber,
            dateOfBirth: userData.dateOfBirth,
            workCategory: userData.workCategory,
            experience: userData.experience,
            shiftType: userData.shiftType,
            address: {
                street: userData.street,
                city: userData.city,
                state: userData.state,
                country: userData.country,
                pincode: userData.pincode
            },
            rating: 0,
            completedJobs: 0,
            totalEarnings: 0
        };
        
        this.loginUser(user);
    },
    
    // Validate labor signup data
    validateLaborSignup(data) {
        const required = [
            'fullName', 'mobile', 'dateOfBirth', 'aadhaarNumber',
            'street', 'city', 'pincode', 'state', 'country',
            'workCategory', 'experience', 'shiftType', 'signupMethod',
            'password', 'confirmPassword'
        ];
        
        for (let field of required) {
            if (!data[field]) {
                alert(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field`);
                return false;
            }
        }
        
        if (data.mobile.length !== 10) {
            alert('Please enter a valid 10-digit mobile number');
            return false;
        }
        
        if (data.aadhaarNumber.length !== 12) {
            alert('Please enter a valid 12-digit Aadhaar number');
            return false;
        }
        
        if (data.pincode.length !== 6) {
            alert('Please enter a valid 6-digit PIN code');
            return false;
        }
        
        if (data.password.length < 8) {
            alert('Password must be at least 8 characters long');
            return false;
        }
        
        if (data.password !== data.confirmPassword) {
            alert('Passwords do not match');
            return false;
        }
        
        if (!data.agreeTerms) {
            alert('Please agree to the Terms of Service and Privacy Policy');
            return false;
        }
        
        return true;
    },
    
    // Login user
    loginUser(user) {
        this.currentUser = user;
        
        // Store user data
        localStorage.setItem('worqley_user', JSON.stringify(user));
        
        // Update UI with user data
        this.updateUserInterface(user);
        
        // Navigate to appropriate dashboard
        if (user.type === 'customer') {
            this.navigateTo('customer-dashboard');
        } else if (user.type === 'labor') {
            this.navigateTo('labor-dashboard');
        } else if (user.type === 'admin') {
            this.navigateTo('admin-panel');
        }
    },
    
    // Update UI with user data
    updateUserInterface(user) {
        // Update user name displays
        const customerNameEl = document.getElementById('customer-name');
        const laborNameEl = document.getElementById('labor-name');
        const workerProfileNameEl = document.getElementById('worker-profile-name');
        const workerCategoryEl = document.getElementById('worker-category');
        
        if (user.type === 'customer' && customerNameEl) {
            customerNameEl.textContent = `Welcome, ${user.fullName}`;
        }
        
        if (user.type === 'labor') {
            if (laborNameEl) {
                laborNameEl.textContent = `Welcome, ${user.fullName}`;
            }
            if (workerProfileNameEl) {
                workerProfileNameEl.textContent = user.fullName;
            }
            if (workerCategoryEl) {
                workerCategoryEl.textContent = `${user.workCategory} Worker`;
            }
        }
    },
    
    // Logout user
    logout() {
        this.currentUser = null;
        localStorage.removeItem('worqley_user');
        this.navigateTo('homepage');
    },
    
    // Open AI Call Modal
    openAICallModal(service) {
        console.log(`Opening AI Call Modal for service: ${service}`);
        const modal = document.getElementById('ai-call-modal');
        if (modal) {
            modal.style.display = 'flex';
            
            // Simulate call connection
            setTimeout(() => {
                alert(`AI Assistant: Hello! I understand you need ${service} service. Let me connect you with available workers in your area. Please provide your location and preferred time.`);
            }, 2000);
        }
    },
    
    // Close modal
    closeModal() {
        const modal = document.getElementById('ai-call-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    },
    
    // Handle photo upload
    handlePhotoUpload(input) {
        const file = input.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const preview = document.getElementById('photo-preview-img');
                const previewContainer = document.querySelector('.photo-preview');
                
                if (preview && previewContainer) {
                    preview.src = e.target.result;
                    previewContainer.style.display = 'block';
                }
            };
            reader.readAsDataURL(file);
        }
    },
    
    // Initialize signature canvas
    initializeSignatureCanvas() {
        const canvas = document.getElementById('signature-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let isDrawing = false;
        let hasSignature = false;
        
        // Set canvas size
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseout', stopDrawing);
        
        // Touch events for mobile
        canvas.addEventListener('touchstart', handleTouch);
        canvas.addEventListener('touchmove', handleTouch);
        canvas.addEventListener('touchend', stopDrawing);
        
        function startDrawing(e) {
            isDrawing = true;
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            ctx.beginPath();
            ctx.moveTo(x, y);
        }
        
        function draw(e) {
            if (!isDrawing) return;
            
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ctx.lineTo(x, y);
            ctx.stroke();
            hasSignature = true;
            
            // Update status
            const status = document.querySelector('.signature-status');
            if (status) {
                status.textContent = 'Signature captured';
                status.style.color = '#28a745';
            }
        }
        
        function stopDrawing() {
            isDrawing = false;
        }
        
        function handleTouch(e) {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent(e.type === 'touchstart' ? 'mousedown' : 
                                            e.type === 'touchmove' ? 'mousemove' : 'mouseup', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            canvas.dispatchEvent(mouseEvent);
        }
        
        // Clear signature function
        this.clearSignature = function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            hasSignature = false;
            const status = document.querySelector('.signature-status');
            if (status) {
                status.textContent = 'Please sign here';
                status.style.color = '#666';
            }
        };
    },
    
    // Copy referral code
    copyReferralCode() {
        const code = document.getElementById('referral-code');
        if (code) {
            navigator.clipboard.writeText(code.textContent).then(() => {
                alert('Referral code copied to clipboard!');
            });
        }
    },
    
    // Initialize translations
    initializeTranslations() {
        // This would normally load translations from the translations.js file
        // For now, we'll just set up the basic structure
        console.log('Translations initialized');
    },
    
    // Change language
    changeLanguage(langCode) {
        this.currentLanguage = langCode;
        console.log(`Language changed to: ${langCode}`);
        
        // This would normally update all translated text elements
        // For demo purposes, we'll just log it
        if (window.WorqleyTranslations && window.WorqleyTranslations.updateLanguage) {
            window.WorqleyTranslations.updateLanguage(langCode);
        }
    },
    
    // Check if user is logged in
    checkAuthStatus() {
        const savedUser = localStorage.getItem('worqley_user');
        if (savedUser) {
            try {
                this.currentUser = JSON.parse(savedUser);
                this.updateUserInterface(this.currentUser);
                
                // Navigate to appropriate dashboard
                if (this.currentUser.type === 'customer') {
                    this.navigateTo('customer-dashboard');
                } else if (this.currentUser.type === 'labor') {
                    this.navigateTo('labor-dashboard');
                }
            } catch (e) {
                console.error('Error parsing saved user data:', e);
                localStorage.removeItem('worqley_user');
            }
        }
    }
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.WorqleyApp.init();
    window.WorqleyApp.checkAuthStatus();
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.WorqleyApp;
}