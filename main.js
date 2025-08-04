// script.js
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginScreen = document.getElementById('loginScreen');
    const dashboard = document.getElementById('dashboard');
    const loginForm = document.getElementById('loginForm');
    const registerBtn = document.getElementById('registerBtn');
    const contentArea = document.getElementById('contentArea');
    const menuItems = document.querySelectorAll('.menu-item');
    const pageTitle = document.getElementById('pageTitle');
    
    // Check authentication on load
    checkAuthStatus();

    // Event Listeners
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (registerBtn) {
        registerBtn.addEventListener('click', showRegistrationForm);
    }

    // Menu Navigation
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const page = this.dataset.page;
            loadPage(page);
            setActiveMenuItem(page);
        });
    });

    // Functions
    function checkAuthStatus() {
        if (localStorage.getItem('clinicLoggedIn')) {
            showDashboard();
        } else {
            if (loginScreen) loginScreen.style.display = 'block';
        }
    }

    function handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        if (email && password) {
            // In a real app, you would validate with server here
            localStorage.setItem('clinicLoggedIn', 'true');
            showDashboard();
        } else {
            alert('Please enter both email and password');
        }
    }

    function showDashboard() {
        if (loginScreen) loginScreen.style.display = 'none';
        if (dashboard) dashboard.style.display = 'flex';
        loadPage('dashboard');
    }

    function showRegistrationForm() {
        contentArea.innerHTML = `
            <div class="registration-form">
                <h2>Clinic Registration</h2>
                <form id="clinicRegistrationForm">
                    <div class="input-group">
                        <label for="clinicName">Clinic Name</label>
                        <input type="text" id="clinicName" required>
                    </div>
                    <div class="input-group">
                        <label for="adminEmail">Admin Email</label>
                        <input type="email" id="adminEmail" required>
                    </div>
                    <div class="input-group">
                        <label for="adminPassword">Password</label>
                        <input type="password" id="adminPassword" required>
                    </div>
                    <button type="submit" class="btn">Register Clinic</button>
                </form>
            </div>
        `;

        const registrationForm = document.getElementById('clinicRegistrationForm');
        if (registrationForm) {
            registrationForm.addEventListener('submit', function(e) {
                e.preventDefault();
                // Handle registration logic here
                alert('Clinic registration would be processed here');
            });
        }
    }

    function loadPage(page) {
        const title = getPageTitle(page);
        if (pageTitle) pageTitle.textContent = title;

        switch(page) {
            case 'dashboard':
                loadDashboard();
                break;
            case 'queue':
                loadQueueManagement();
                break;
            case 'appointments':
                loadAppointments();
                break;
            case 'doctors':
                loadDoctors();
                break;
            case 'settings':
                loadSettings();
                break;
            default:
                loadDashboard();
        }
    }

    function getPageTitle(page) {
        const titles = {
            'dashboard': 'Clinic Dashboard',
            'queue': 'Queue Management',
            'appointments': 'Appointments',
            'doctors': 'Doctor Management',
            'settings': 'Clinic Settings'
        };
        return titles[page] || 'Clinic Dashboard';
    }

    function setActiveMenuItem(page) {
        menuItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.page === page) {
                item.classList.add('active');
            }
        });
    }

    // Page Loaders
    function loadDashboard() {
        contentArea.innerHTML = `
            <div class="stats-container">
                <!-- Dashboard stats cards -->
            </div>
            <div class="quick-actions">
                <!-- Quick action buttons -->
            </div>
            <div class="recent-activity">
                <!-- Activity feed -->
            </div>
        `;
        
        // Add dashboard event listeners
        document.querySelectorAll('.action-card').forEach(card => {
            card.addEventListener('click', function() {
                const page = this.dataset.page;
                loadPage(page);
                setActiveMenuItem(page);
            });
        });
    }

    function loadQueueManagement() {
        contentArea.innerHTML = `
            <div class="queue-container">
                <!-- Queue management UI -->
            </div>
        `;
        
        // Add queue management event listeners
        const nextPatientBtn = document.getElementById('nextPatientBtn');
        if (nextPatientBtn) {
            nextPatientBtn.addEventListener('click', handleNextPatient);
        }
    }

    function loadAppointments() {
        contentArea.innerHTML = `
            <div class="appointment-container">
                <!-- Appointments UI -->
            </div>
        `;
        
        // Add appointment filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                // Filter appointments would go here
            });
        });
    }

    function loadDoctors() {
        contentArea.innerHTML = `
            <div class="doctor-container">
                <!-- Doctors management UI -->
            </div>
        `;
        
        // Add doctor management event listeners
        const addDoctorBtn = document.getElementById('addDoctorBtn');
        if (addDoctorBtn) {
            addDoctorBtn.addEventListener('click', showDoctorModal);
        }
    }

    function loadSettings() {
        contentArea.innerHTML = `
            <div class="settings-container">
                <!-- Settings UI -->
            </div>
        `;
        
        // Add settings tab event listeners
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', function() {
                const tabId = this.dataset.tab;
                // Switch tabs logic would go here
            });
        });
    }

    // Utility Functions
    function showDoctorModal() {
        const modal = document.getElementById('doctorModal');
        if (modal) modal.style.display = 'flex';
        
        // Add modal close functionality
        const closeBtn = modal.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }
    }

    function handleNextPatient() {
        // Queue management logic would go here
        console.log('Moving to next patient in queue...');
    }
});

// Add any global functions or utilities here
function logout() {
    localStorage.removeItem('clinicLoggedIn');
    window.location.reload();
}