// Tabs Module
class TabManager {
    constructor() {
        this.currentTab = 'dashboard';
        this.init();
    }

    init() {
        // Add event listeners to tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tabName = e.target.getAttribute('data-tab');
                this.switchTab(tabName);
            });
        });

        // Load content for all tabs
        this.loadAllTabContent();
    }

    switchTab(tabName) {
        // Hide all tab contents
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });

        // Remove active class from all buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Show selected tab content
        const selectedContent = document.getElementById(tabName);
        if (selectedContent) {
            selectedContent.classList.add('active');
        }

        // Add active class to selected button
        const selectedBtn = document.querySelector(`[data-tab="${tabName}"]`);
        if (selectedBtn) {
            selectedBtn.classList.add('active');
        }

        this.currentTab = tabName;

        // Load specific content if needed
        this.loadTabContent(tabName);
    }

    loadAllTabContent() {
        // Load content for each tab when data is ready
        if (window.dataLoader.isLoaded()) {
            this.loadTabContent('giolech');
            this.loadTabContent('saototxau');
            this.loadTabContent('28sao');
            this.loadTabContent('giohoangdao');
            this.loadTabContent('dongcong');
            this.loadTabContent('lthg');
            this.loadTabContent('dichly');
            this.loadTabContent('phuongphap');
        }
    }

    loadTabContent(tabName) {
        const contentDiv = document.getElementById(tabName + 'Content');
        if (!contentDiv) return;

        let content = '';
        
        switch(tabName) {
            case 'giolech':
                content = this.createGiolechContent();
                break;
            case 'saototxau':
                content = this.createSaototxauContent();
                break;
            case '28sao':
                content = this.create28saoContent();
                break;
            case 'giohoangdao':
                content = this.createGiohoangdaoContent();
                break;
            case 'dongcong':
                content = this.createDongcongContent();
                break;
            case 'lthg':
                content = this.createLthgContent();
                break;
            case 'dichly':
                content = this.createDichlyContent();
                break;
            case 'phuongphap':
                content = this.createPhuongphapContent();
                break;
        }

        contentDiv.innerHTML = content;
    }

    createGiolechContent() {
        return window.dataLoader.createTable('Giolech', 30, 15);
    }

    createSaototxauContent() {
        return window.dataLoader.createTable('Saototxau', 30, 20);
    }

    create28saoContent() {
        return window.dataLoader.createTable('28sao', 35, 10);
    }

    createGiohoangdaoContent() {
        return window.dataLoader.createTable('GioHoangDao', 30, 15);
    }

    createDongcongContent() {
        return window.dataLoader.createTable('DongCong-NgocHap', 65, 17);
    }

    createLthgContent() {
        return window.dataLoader.createTable('LTHG', 125, 13);
    }

    createDichlyContent() {
        const data = window.dataLoader.getData('DichlyLV');
        let content = '<div class="dichly-container">';
        content += '<h4>🔮 An Quẻ Lạc Việt - Dịch Lý Tử Vi</h4>';
        content += '<p class="mb-20">Hệ thống dịch lý truyền thống để xem tướng số và đoán định vận mệnh.</p>';
        content += window.dataLoader.createTable('DichlyLV', 50, 20);
        content += '</div>';
        return content;
    }

    createPhuongphapContent() {
        const data = window.dataLoader.getData('Phuongphap');
        let content = '<div class="phuongphap-container">';
        content += '<h4>📖 Phương Pháp Tính Toán Ngày Tốt Xấu</h4>';
        content += '<p class="mb-20">Các phương pháp và quy tắc tính toán trong phong thuỷ truyền thống.</p>';
        content += window.dataLoader.createTable('Phuongphap', 100, 30);
        content += '</div>';
        return content;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.tabManager = new TabManager();
});