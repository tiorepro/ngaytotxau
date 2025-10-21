// Dashboard Module
class Dashboard {
    constructor() {
        this.currentDate = new Date();
        this.birthYear = 1993;
        this.init();
    }

    init() {
        // Set initial date
        this.setDateInput();
        
        // Add event listeners
        document.getElementById('todayBtn').addEventListener('click', () => {
            this.setToday();
        });

        document.getElementById('calculateBtn').addEventListener('click', () => {
            this.calculate();
        });

        document.getElementById('selectedDate').addEventListener('change', (e) => {
            this.currentDate = new Date(e.target.value);
        });

        document.getElementById('birthYear').addEventListener('change', (e) => {
            this.birthYear = parseInt(e.target.value);
        });

        // Initial calculation when data is loaded
        if (window.dataLoader.isLoaded()) {
            this.calculate();
        }
    }

    setDateInput() {
        const dateInput = document.getElementById('selectedDate');
        const today = new Date();
        const dateString = today.toISOString().split('T')[0];
        dateInput.value = dateString;
        this.currentDate = today;
    }

    setToday() {
        this.setDateInput();
        this.calculate();
    }

    async calculate() {
        if (!window.dataLoader.isLoaded()) {
            document.getElementById('dateInfoDisplay').innerHTML = '<div class="loading">Đang tải dữ liệu...</div>';
            document.getElementById('dashboardTable').innerHTML = '<div class="loading">Đang tải dữ liệu...</div>';
            return;
        }

        try {
            const result = window.calendarCalculator.calculateDay(this.currentDate, this.birthYear);
            this.displayResults(result);
        } catch (error) {
            console.error('Error calculating:', error);
            document.getElementById('dateInfoDisplay').innerHTML = '<div class="text-center">❌ Lỗi tính toán</div>';
        }
    }

    displayResults(result) {
        // Display date info
        this.displayDateInfo(result);
        
        // Display dashboard table
        this.displayDashboardTable(result);
    }

    displayDateInfo(result) {
        const infoDiv = document.getElementById('dateInfoDisplay');
        
        const html = `
            <div class="date-info-grid">
                <div class="info-card">
                    <h4>📅 Ngày Dương Lịch</h4>
                    <p><strong>${result.solarDate.day}/${result.solarDate.month}/${result.solarDate.year}</strong></p>
                    <p>${result.solarDate.dayOfWeek}</p>
                </div>
                
                <div class="info-card">
                    <h4>🌙 Ngày Âm Lịch</h4>
                    <p><strong>${result.lunarDate.display}</strong></p>
                </div>
                
                <div class="info-card">
                    <h4>🔤 Can Chi Ngày</h4>
                    <p><strong>${result.canChi.ngay.can} ${result.canChi.ngay.chi}</strong></p>
                </div>
                
                <div class="info-card">
                    <h4>📊 Đánh Giá Ngày</h4>
                    <p class="status-${result.summary.dayQuality.toLowerCase()}">
                        <strong>${result.summary.dayQuality}</strong>
                    </p>
                </div>
                
                <div class="info-card">
                    <h4>⏰ Giờ Hoàng Đạo</h4>
                    <p><strong>${result.summary.goodTimes} giờ</strong></p>
                </div>
                
                <div class="info-card">
                    <h4>🎂 Năm Sinh</h4>
                    <p><strong>${result.birthYear}</strong></p>
                    <p>${result.canChi.nam.can} ${result.canChi.nam.chi}</p>
                </div>
            </div>
            
            <div class="recommendations">
                <h4>💡 Lời Khuyên</h4>
                <ul>
                    ${result.summary.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>
        `;
        
        infoDiv.innerHTML = html;
    }

    displayDashboardTable(result) {
        const tableDiv = document.getElementById('dashboardTable');
        
        const html = `
            <div class="dashboard-sections">
                <div class="time-section">
                    <h4>🕐 Bảng Giờ Trong Ngày</h4>
                    ${result.timeTable}
                </div>
                
                <div class="stars-section">
                    <h4>⭐ Sao Tốt Xấu</h4>
                    <div class="stars-grid">
                        <div class="stars-good">
                            <h5 class="status-good">🌟 Sao Tốt</h5>
                            ${this.createStarsList(result.sao.saoTot)}
                        </div>
                        <div class="stars-bad">
                            <h5 class="status-bad">⚠️ Sao Xấu</h5>
                            ${this.createStarsList(result.sao.saoXau)}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        tableDiv.innerHTML = html;
    }

    createStarsList(stars) {
        if (!stars || stars.length === 0) {
            return '<p class="text-neutral">Không có sao đặc biệt</p>';
        }
        
        return `
            <ul class="stars-list">
                ${stars.map(star => `
                    <li>
                        <strong>${star.name}</strong>
                        <br><small>${star.description}</small>
                    </li>
                `).join('')}
            </ul>
        `;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new Dashboard();
});