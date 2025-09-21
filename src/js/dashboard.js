// Worqley Dashboard Module

window.WorqleyDashboard = {
    currentUser: null,
    currentSection: 'service',
    
    // Mock data
    mockBookings: [
        {
            id: 'WQ001',
            service: 'Plumbing Service',
            worker: 'Raj Kumar',
            customer: 'Priya Sharma',
            date: '2024-12-15',
            time: '14:00',
            status: 'pending',
            amount: 800,
            location: 'Koramangala, Bangalore'
        },
        {
            id: 'WQ002',
            service: 'Electrical Work',
            worker: 'Suresh Patel',
            customer: 'Amit Singh',
            date: '2024-12-14',
            time: '10:00',
            status: 'completed',
            amount: 1200,
            location: 'Whitefield, Bangalore'
        }
    ],
    
    mockTasks: [
        {
            id: 'TASK001',
            title: 'Kitchen Plumbing Repair',
            location: 'Koramangala, Bangalore',
            payment: 800,
            duration: '2 hours',
            description: 'Fix leaking kitchen sink and replace tap',
            urgency: 'high',
            customer: 'Priya Sharma'
        },
        {
            id: 'TASK002',
            title: 'Bathroom Cleaning',
            location: 'Electronic City, Bangalore',
            payment: 500,
            duration: '1.5 hours',
            description: 'Deep cleaning of bathroom tiles and fixtures',
            urgency: 'medium',
            customer: 'Rajesh Kumar'
        }
    ],
    
    mockEarnings: {
        daily: 450,
        weekly: 2800,
        monthly: 12500,
        total: 45000
    },
    
    // Initialize dashboard
    init(user) {
        this.currentUser = user;
        console.log('Dashboard initialized for:', user.type);
        
        this.setupDashboardEvents();
        this.loadDashboardData();
        this.updateDashboardUI();
    },
    
    // Setup dashboard event listeners
    setupDashboardEvents() {
        // Star rating interactions
        this.setupStarRating();
        
        // Service booking interactions
        this.setupServiceBooking();
        
        // Task management
        this.setupTaskManagement();
        
        // Earnings tracking
        this.setupEarningsTracking();
        
        // Profile management
        this.setupProfileManagement();
    },
    
    // Setup star rating functionality
    setupStarRating() {
        const starContainers = document.querySelectorAll('.stars');
        starContainers.forEach(container => {
            const stars = container.querySelectorAll('i');
            stars.forEach((star, index) => {
                star.addEventListener('click', () => {
                    this.setRating(container, index + 1);
                });
                
                star.addEventListener('mouseenter', () => {
                    this.highlightStars(container, index + 1);
                });
            });
            
            container.addEventListener('mouseleave', () => {
                this.resetStarHighlight(container);
            });
        });
    },
    
    // Set star rating
    setRating(container, rating) {
        const stars = container.querySelectorAll('i');
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.remove('far');
                star.classList.add('fas');
            } else {
                star.classList.remove('fas');
                star.classList.add('far');
            }
        });
        
        // Store rating
        container.setAttribute('data-rating', rating);
        console.log(`Rating set to: ${rating}`);
    },
    
    // Highlight stars on hover
    highlightStars(container, rating) {
        const stars = container.querySelectorAll('i');
        stars.forEach((star, index) => {
            if (index < rating) {
                star.style.color = '#ffc107';
            } else {
                star.style.color = '#e1e5e9';
            }
        });
    },
    
    // Reset star highlight
    resetStarHighlight(container) {
        const currentRating = parseInt(container.getAttribute('data-rating') || '0');
        const stars = container.querySelectorAll('i');
        stars.forEach((star, index) => {
            if (index < currentRating) {
                star.style.color = '#ffc107';
            } else {
                star.style.color = '#e1e5e9';
            }
        });
    },
    
    // Setup service booking
    setupServiceBooking() {
        const serviceButtons = document.querySelectorAll('[data-action="book-service"]');
        serviceButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const service = e.target.getAttribute('data-service');
                this.bookService(service);
            });
        });
    },
    
    // Book a service
    bookService(serviceType) {
        console.log(`Booking service: ${serviceType}`);
        
        // Create new booking
        const newBooking = {
            id: `WQ${Date.now()}`,
            service: `${serviceType} Service`,
            date: new Date().toISOString().split('T')[0],
            time: new Date().toLocaleTimeString('en-US', { 
                hour12: false, 
                hour: '2-digit', 
                minute: '2-digit' 
            }),
            status: 'pending',
            customer: this.currentUser.fullName
        };
        
        this.mockBookings.unshift(newBooking);
        this.updateBookingsList();
        
        // Show success message
        alert(`${serviceType} service booked successfully! Our AI assistant will connect you with available workers shortly.`);
    },
    
    // Setup task management
    setupTaskManagement() {
        // Accept task buttons
        document.addEventListener('click', (e) => {
            if (e.target.textContent === 'Accept Task') {
                const taskCard = e.target.closest('.task-card');
                if (taskCard) {
                    this.acceptTask(taskCard);
                }
            }
        });
    },
    
    // Accept a task
    acceptTask(taskCard) {
        const taskTitle = taskCard.querySelector('h3').textContent;
        console.log(`Accepting task: ${taskTitle}`);
        
        // Update UI
        const acceptBtn = taskCard.querySelector('button');
        acceptBtn.textContent = 'Task Accepted';
        acceptBtn.classList.remove('btn-primary');
        acceptBtn.classList.add('btn-success');
        acceptBtn.disabled = true;
        
        // Show success message
        alert(`Task "${taskTitle}" accepted successfully! Customer details will be shared with you shortly.`);
        
        // Update earnings (simulation)
        this.updateEarnings();
    },
    
    // Setup earnings tracking
    setupEarningsTracking() {
        this.updateEarningsDisplay();
    },
    
    // Update earnings display
    updateEarningsDisplay() {
        const earningsElements = {
            daily: document.querySelector('#daily-earnings'),
            weekly: document.querySelector('#weekly-earnings'),
            monthly: document.querySelector('#monthly-earnings'),
            total: document.querySelector('#total-earnings')
        };
        
        Object.keys(earningsElements).forEach(key => {
            const element = earningsElements[key];
            if (element) {
                element.textContent = `₹${this.mockEarnings[key].toLocaleString()}`;
            }
        });
    },
    
    // Update earnings after completing task
    updateEarnings() {
        this.mockEarnings.daily += 500;
        this.mockEarnings.weekly += 500;
        this.mockEarnings.monthly += 500;
        this.mockEarnings.total += 500;
        
        this.updateEarningsDisplay();
    },
    
    // Setup profile management
    setupProfileManagement() {
        // Profile photo change
        const changePhotoBtn = document.querySelector('.profile-photo button');
        if (changePhotoBtn) {
            changePhotoBtn.addEventListener('click', () => {
                this.changeProfilePhoto();
            });
        }
        
        // Profile editing
        this.setupProfileEditing();
    },
    
    // Change profile photo
    changeProfilePhoto() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const profileImg = document.getElementById('worker-profile-photo');
                    if (profileImg) {
                        profileImg.src = e.target.result;
                    }
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    },
    
    // Setup profile editing
    setupProfileEditing() {
        // Make profile fields editable on click
        const editableFields = [
            '#worker-profile-name',
            '#worker-category'
        ];
        
        editableFields.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                element.addEventListener('dblclick', () => {
                    this.makeFieldEditable(element);
                });
            }
        });
    },
    
    // Make field editable
    makeFieldEditable(element) {
        const currentValue = element.textContent;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentValue;
        input.className = 'form-control';
        
        input.addEventListener('blur', () => {
            element.textContent = input.value;
            element.style.display = 'block';
            input.remove();
        });
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                input.blur();
            }
        });
        
        element.style.display = 'none';
        element.parentNode.insertBefore(input, element);
        input.focus();
    },
    
    // Load dashboard data
    loadDashboardData() {
        if (this.currentUser.type === 'customer') {
            this.loadCustomerData();
        } else if (this.currentUser.type === 'labor') {
            this.loadWorkerData();
        } else if (this.currentUser.type === 'admin') {
            this.loadAdminData();
        }
    },
    
    // Load customer-specific data
    loadCustomerData() {
        this.updateBookingsList();
        this.updateServiceCategories();
    },
    
    // Load worker-specific data
    loadWorkerData() {
        this.updateTasksList();
        this.updateWorkerProfile();
        this.updateEarningsDisplay();
        this.updateWorkHistory();
    },
    
    // Load admin-specific data
    loadAdminData() {
        this.updateAdminStats();
        this.updateUsersList();
        this.updateWorkersList();
        this.updateBookingsTable();
    },
    
    // Update bookings list
    updateBookingsList() {
        const bookingsList = document.querySelector('.bookings-list');
        if (!bookingsList) return;
        
        bookingsList.innerHTML = '';
        
        this.mockBookings.forEach(booking => {
            const bookingCard = this.createBookingCard(booking);
            bookingsList.appendChild(bookingCard);
        });
    },
    
    // Create booking card
    createBookingCard(booking) {
        const card = document.createElement('div');
        card.className = 'booking-card';
        
        card.innerHTML = `
            <div class="booking-info">
                <h3>${booking.service}</h3>
                <p class="booking-date">Date: ${booking.date}, ${booking.time}</p>
                <p class="booking-worker">Worker: ${booking.worker || 'TBD'}</p>
            </div>
            <div class="booking-status">
                <span class="status-badge status-${booking.status}">${booking.status}</span>
                <div class="booking-actions">
                    <button class="btn btn-small btn-outline">Cancel</button>
                    <button class="btn btn-small btn-primary">Contact</button>
                </div>
            </div>
        `;
        
        return card;
    },
    
    // Update tasks list
    updateTasksList() {
        const tasksList = document.querySelector('.tasks-list');
        if (!tasksList) return;
        
        tasksList.innerHTML = '';
        
        this.mockTasks.forEach(task => {
            const taskCard = this.createTaskCard(task);
            tasksList.appendChild(taskCard);
        });
    },
    
    // Create task card
    createTaskCard(task) {
        const card = document.createElement('div');
        card.className = 'task-card';
        
        card.innerHTML = `
            <div class="task-info">
                <h3>${task.title}</h3>
                <p class="task-location">Location: ${task.location}</p>
                <p class="task-payment">Payment: ₹${task.payment}</p>
                <p class="task-time">Duration: ${task.duration}</p>
            </div>
            <div class="task-actions">
                <button class="btn btn-primary">Accept Task</button>
                <button class="btn btn-outline">View Details</button>
            </div>
        `;
        
        return card;
    },
    
    // Update worker profile
    updateWorkerProfile() {
        if (this.currentUser.type !== 'labor') return;
        
        const profileName = document.getElementById('worker-profile-name');
        const profileCategory = document.getElementById('worker-category');
        
        if (profileName) {
            profileName.textContent = this.currentUser.fullName;
        }
        
        if (profileCategory) {
            profileCategory.textContent = `${this.currentUser.workCategory} Worker`;
        }
    },
    
    // Update work history
    updateWorkHistory() {
        const historyList = document.querySelector('.history-list');
        if (!historyList) return;
        
        const mockHistory = [
            {
                job: 'Kitchen Plumbing',
                customer: 'Priya Sharma',
                date: 'Dec 10, 2024',
                status: 'completed',
                earning: 800
            },
            {
                job: 'Bathroom Cleaning',
                customer: 'Rajesh Kumar',
                date: 'Dec 8, 2024',
                status: 'completed',
                earning: 500
            }
        ];
        
        historyList.innerHTML = '';
        
        mockHistory.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            
            historyItem.innerHTML = `
                <div class="job-info">
                    <h3>${item.job}</h3>
                    <p>Customer: ${item.customer}</p>
                    <p>Date: ${item.date}</p>
                </div>
                <div class="job-status">
                    <span class="status-badge status-${item.status}">${item.status}</span>
                    <span class="earning">₹${item.earning}</span>
                </div>
            `;
            
            historyList.appendChild(historyItem);
        });
    },
    
    // Update admin statistics
    updateAdminStats() {
        const stats = {
            customers: 5234,
            workers: 1847,
            jobs: 12456,
            revenue: 234567
        };
        
        const statCards = document.querySelectorAll('.admin-stats .stat-card h3');
        if (statCards.length >= 4) {
            statCards[0].textContent = stats.customers.toLocaleString();
            statCards[1].textContent = stats.workers.toLocaleString();
            statCards[2].textContent = stats.jobs.toLocaleString();
            statCards[3].textContent = `₹${stats.revenue.toLocaleString()}`;
        }
    },
    
    // Update UI based on current state
    updateDashboardUI() {
        // Update user-specific elements
        if (this.currentUser) {
            const nameElements = document.querySelectorAll('[id$="-name"]');
            nameElements.forEach(el => {
                if (el.id.includes(this.currentUser.type)) {
                    el.textContent = `Welcome, ${this.currentUser.fullName}`;
                }
            });
        }
    },
    
    // Handle section switching
    switchSection(sectionId) {
        this.currentSection = sectionId;
        console.log(`Switched to section: ${sectionId}`);
        
        // Load section-specific data
        this.loadSectionData(sectionId);
    },
    
    // Load section-specific data
    loadSectionData(sectionId) {
        switch (sectionId) {
            case 'bookings':
                this.updateBookingsList();
                break;
            case 'tasks':
                this.updateTasksList();
                break;
            case 'earnings':
                this.updateEarningsDisplay();
                break;
            case 'history':
                this.updateWorkHistory();
                break;
            default:
                break;
        }
    },
    
    // Export data for backup/sync
    exportDashboardData() {
        const data = {
            user: this.currentUser,
            bookings: this.mockBookings,
            tasks: this.mockTasks,
            earnings: this.mockEarnings,
            timestamp: new Date().toISOString()
        };
        
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `worqley_data_${Date.now()}.json`;
        link.click();
        
        console.log('Dashboard data exported');
    }
};

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.WorqleyDashboard;
}