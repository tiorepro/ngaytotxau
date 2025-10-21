// Main Application
class NgayTotXauApp {
    constructor() {
        this.init();
    }

    async init() {
        console.log('🚀 Khởi tạo ứng dụng Ngày Tốt Xấu...');
        
        // Show loading
        this.showLoading();
        
        try {
            // Load all data
            const loaded = await window.dataLoader.loadAllData();
            
            if (loaded) {
                console.log('✅ Đã tải xong tất cả dữ liệu');
                
                // Initialize all modules
                this.initializeModules();
                
                // Hide loading
                this.hideLoading();
                
                // Set creation time
                this.setCreationTime();
                
                console.log('🎉 Ứng dụng đã sẵn sàng!');
            } else {
                throw new Error('Không thể tải dữ liệu');
            }
        } catch (error) {
            console.error('❌ Lỗi khởi tạo:', error);
            this.showError('Không thể tải ứng dụng. Vui lòng thử lại sau.');
        }
    }

    showLoading() {
        document.body.innerHTML = `
            <div class="loading-screen">
                <div class="loading-content">
                    <h2>🔮 TIẾN TQN - NGÀY TỐT XẤU</h2>
                    <div class="loading">Đang tải dữ liệu...</div>
                    <p>Vui lòng chờ trong giây lát...</p>
                </div>
            </div>
            <style>
                .loading-screen {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 9999;
                }
                .loading-content {
                    text-align: center;
                    color: white;
                    background: rgba(255,255,255,0.1);
                    padding: 40px;
                    border-radius: 15px;
                    backdrop-filter: blur(10px);
                }
                .loading-content h2 {
                    margin-bottom: 20px;
                    font-size: 2em;
                }
            </style>
        `;
    }

    hideLoading() {
        // Remove loading screen and restore original content
        location.reload();
    }

    showError(message) {
        document.body.innerHTML = `
            <div class="error-screen">
                <div class="error-content">
                    <h2>❌ Lỗi</h2>
                    <p>${message}</p>
                    <button onclick="location.reload()" class="btn btn-primary">Thử lại</button>
                </div>
            </div>
            <style>
                .error-screen {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 9999;
                }
                .error-content {
                    text-align: center;
                    color: white;
                    background: rgba(255,255,255,0.1);
                    padding: 40px;
                    border-radius: 15px;
                    backdrop-filter: blur(10px);
                }
            </style>
        `;
    }

    initializeModules() {
        // All modules will be initialized by their respective files
        // This method can be used for any final setup
        
        // Set up error handling
        window.addEventListener('error', (e) => {
            console.error('Global error:', e.error);
        });

        // Set up unhandled promise rejection handling
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
        });
    }

    setCreationTime() {
        const createdTimeElement = document.getElementById('createdTime');
        if (createdTimeElement) {
            const now = new Date();
            createdTimeElement.textContent = now.toLocaleString('vi-VN');
        }
    }
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new NgayTotXauApp();
});

// Add some utility functions
window.utils = {
    formatDate: (date) => {
        return date.toLocaleDateString('vi-VN');
    },
    
    formatTime: (date) => {
        return date.toLocaleTimeString('vi-VN');
    },
    
    escapeHtml: (text) => {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};