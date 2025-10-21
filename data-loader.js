// Data Loader Module
class DataLoader {
    constructor() {
        this.data = {};
        this.loaded = false;
    }

    async loadAllData() {
        const dataFiles = [
            'Ngaytotxau',
            'Giototdichly', 
            'Giolech',
            'Saototxau',
            'DichlyLV',
            'Phuongphap',
            'DongCong-NgocHap',
            '28sao',
            'dataUni',
            'LTHG',
            'GioHoangDao',
            'TraSaoTot',
            'TraSaoXau'
        ];

        try {
            for (const file of dataFiles) {
                const response = await fetch(`data/${file}.json`);
                if (response.ok) {
                    this.data[file] = await response.json();
                    console.log(`✅ Loaded: ${file}.json`);
                } else {
                    console.warn(`⚠️ Could not load: ${file}.json`);
                    this.data[file] = [];
                }
            }
            this.loaded = true;
            return true;
        } catch (error) {
            console.error('❌ Error loading data:', error);
            return false;
        }
    }

    getData(sheetName) {
        return this.data[sheetName] || [];
    }

    isLoaded() {
        return this.loaded;
    }

    // Tìm kiếm trong dữ liệu
    search(sheetName, searchTerm, columnIndex = -1) {
        const data = this.getData(sheetName);
        if (!data.length) return [];

        return data.filter(row => {
            if (columnIndex >= 0 && row[columnIndex]) {
                return row[columnIndex].toString().toLowerCase().includes(searchTerm.toLowerCase());
            } else {
                return row.some(cell => 
                    cell && cell.toString().toLowerCase().includes(searchTerm.toLowerCase())
                );
            }
        });
    }

    // Lấy dữ liệu theo hàng và cột
    getCell(sheetName, row, col) {
        const data = this.getData(sheetName);
        if (data[row] && data[row][col] !== undefined) {
            return data[row][col];
        }
        return '';
    }

    // Tạo bảng HTML từ dữ liệu
    createTable(sheetName, maxRows = 50, maxCols = 20) {
        const data = this.getData(sheetName);
        if (!data.length) return '<p>Không có dữ liệu</p>';

        let html = '<table class="data-table">';
        
        // Header
        if (data[0]) {
            html += '<thead><tr>';
            for (let i = 0; i < Math.min(data[0].length, maxCols); i++) {
                html += `<th>Cột ${i + 1}</th>`;
            }
            html += '</tr></thead>';
        }

        // Body
        html += '<tbody>';
        for (let row = 0; row < Math.min(data.length, maxRows); row++) {
            html += '<tr>';
            for (let col = 0; col < Math.min(data[row].length, maxCols); col++) {
                const cellValue = data[row][col] || '';
                html += `<td>${this.escapeHtml(cellValue.toString())}</td>`;
            }
            html += '</tr>';
        }
        html += '</tbody></table>';

        return html;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Global instance
window.dataLoader = new DataLoader();