// Worqley Authentication Module

window.WorqleyAuth = {
    // Mock user database
    users: [
        {
            id: 'customer_demo',
            fullName: 'Demo Customer',
            mobile: '9876543210',
            password: 'password123',
            type: 'customer',
            email: 'customer@worqley.com'
        },
        {
            id: 'labor_demo',
            fullName: 'Demo Worker',
            mobile: '9876543211',
            password: 'password123',
            type: 'labor',
            workCategory: 'Construction',
            experience: '3-5',
            shiftType: 'full-time',
            rating: 4.5,
            completedJobs: 32,
            totalEarnings: 65000,
            aadhaarNumber: '123456789012',
            address: {
                street: '123 Worker Street',
                city: 'Bangalore',
                state: 'Karnataka',
                country: 'India',
                pincode: '560001'
            }
        },
        {
            id: 'admin_demo',
            fullName: 'Admin User',
            mobile: '9876543212',
            password: 'admin123',
            type: 'admin'
        }
    ],
    
    // Current session
    currentSession: null,
    
    // Authentication methods
    authenticate(mobile, password, userType = null) {
        console.log(`Attempting authentication for: ${mobile}`);
        
        // Find user by mobile number
        const user = this.users.find(u => u.mobile === mobile);
        
        if (!user) {
            throw new Error('User not found');
        }
        
        // Check password
        if (user.password !== password) {
            throw new Error('Invalid password');
        }
        
        // Check user type if specified
        if (userType && user.type !== userType) {
            throw new Error('Invalid user type');
        }
        
        // Create session
        this.currentSession = {
            userId: user.id,
            loginTime: new Date(),
            isAuthenticated: true
        };
        
        // Store session
        localStorage.setItem('worqley_session', JSON.stringify(this.currentSession));
        
        return user;
    },
    
    // Register new user
    register(userData) {
        console.log('Registering new user:', userData);
        
        // Check if user already exists
        const existingUser = this.users.find(u => u.mobile === userData.mobile);
        if (existingUser) {
            throw new Error('User with this mobile number already exists');
        }
        
        // Create new user
        const newUser = {
            id: `${userData.type}_${Date.now()}`,
            ...userData,
            createdAt: new Date()
        };
        
        // Add to mock database
        this.users.push(newUser);
        
        // Auto-login after registration
        this.currentSession = {
            userId: newUser.id,
            loginTime: new Date(),
            isAuthenticated: true
        };
        
        localStorage.setItem('worqley_session', JSON.stringify(this.currentSession));
        
        return newUser;
    },
    
    // Check if user is authenticated
    isAuthenticated() {
        const session = localStorage.getItem('worqley_session');
        if (!session) {
            return false;
        }
        
        try {
            this.currentSession = JSON.parse(session);
            return this.currentSession.isAuthenticated;
        } catch (e) {
            return false;
        }
    },
    
    // Get current user
    getCurrentUser() {
        if (!this.isAuthenticated()) {
            return null;
        }
        
        const userId = this.currentSession.userId;
        return this.users.find(u => u.id === userId);
    },
    
    // Logout
    logout() {
        this.currentSession = null;
        localStorage.removeItem('worqley_session');
        localStorage.removeItem('worqley_user');
        console.log('User logged out');
    },
    
    // Update user profile
    updateUserProfile(userId, updates) {
        const userIndex = this.users.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
            this.users[userIndex] = { ...this.users[userIndex], ...updates };
            return this.users[userIndex];
        }
        throw new Error('User not found');
    },
    
    // Reset password (mock implementation)
    resetPassword(mobile, newPassword) {
        const user = this.users.find(u => u.mobile === mobile);
        if (user) {
            user.password = newPassword;
            return true;
        }
        throw new Error('User not found');
    },
    
    // Validate phone number
    validateMobile(mobile) {
        const mobileRegex = /^[6-9]\d{9}$/;
        return mobileRegex.test(mobile);
    },
    
    // Validate Aadhaar number
    validateAadhaar(aadhaar) {
        const aadhaarRegex = /^\d{12}$/;
        return aadhaarRegex.test(aadhaar);
    },
    
    // Validate email
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    // Validate PIN code
    validatePincode(pincode) {
        const pincodeRegex = /^\d{6}$/;
        return pincodeRegex.test(pincode);
    },
    
    // Generate OTP (mock)
    generateOTP(mobile) {
        const otp = Math.floor(100000 + Math.random() * 900000);
        console.log(`Generated OTP for ${mobile}: ${otp}`);
        
        // Store OTP temporarily (in real app, this would be server-side)
        sessionStorage.setItem(`otp_${mobile}`, otp.toString());
        
        return otp;
    },
    
    // Verify OTP (mock)
    verifyOTP(mobile, enteredOTP) {
        const storedOTP = sessionStorage.getItem(`otp_${mobile}`);
        if (storedOTP === enteredOTP.toString()) {
            sessionStorage.removeItem(`otp_${mobile}`);
            return true;
        }
        return false;
    },
    
    // Check if mobile number is available
    isMobileAvailable(mobile) {
        return !this.users.some(u => u.mobile === mobile);
    },
    
    // Get user statistics
    getUserStats(userId) {
        const user = this.users.find(u => u.id === userId);
        if (!user || user.type !== 'labor') {
            return null;
        }
        
        return {
            totalEarnings: user.totalEarnings || 0,
            completedJobs: user.completedJobs || 0,
            rating: user.rating || 0,
            memberSince: user.createdAt || new Date(),
            isPremium: user.isPremium || false
        };
    },
    
    // Initialize auth module
    init() {
        console.log('Authentication module initialized');
        
        // Check for existing session
        const session = localStorage.getItem('worqley_session');
        if (session) {
            try {
                this.currentSession = JSON.parse(session);
                console.log('Existing session found');
            } catch (e) {
                console.error('Error parsing session:', e);
                localStorage.removeItem('worqley_session');
            }
        }
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.WorqleyAuth.init();
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.WorqleyAuth;
}