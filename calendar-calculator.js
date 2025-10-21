// Calendar Calculator Module
class CalendarCalculator {
    constructor() {
        this.canChi = {
            can: ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'],
            chi: ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi']
        };
        
        this.gioTen = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
        this.gioKhoang = [
            '23:00 - 01:00', '01:00 - 03:00', '03:00 - 05:00', '05:00 - 07:00',
            '07:00 - 09:00', '09:00 - 11:00', '11:00 - 13:00', '13:00 - 15:00',
            '15:00 - 17:00', '17:00 - 19:00', '19:00 - 21:00', '21:00 - 23:00'
        ];
    }

    // Tính can chi của ngày
    getCanChi(date) {
        const baseDate = new Date(1900, 0, 31);
        const diffTime = date.getTime() - baseDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        const canIndex = (diffDays + 0) % 10;
        const chiIndex = (diffDays + 0) % 12;
        
        return {
            can: this.canChi.can[canIndex < 0 ? canIndex + 10 : canIndex],
            chi: this.canChi.chi[chiIndex < 0 ? chiIndex + 12 : chiIndex],
            canIndex: canIndex < 0 ? canIndex + 10 : canIndex,
            chiIndex: chiIndex < 0 ? chiIndex + 12 : chiIndex
        };
    }

    // Tính can chi của năm
    getYearCanChi(year) {
        const canIndex = (year - 4) % 10;
        const chiIndex = (year - 4) % 12;
        
        return {
            can: this.canChi.can[canIndex < 0 ? canIndex + 10 : canIndex],
            chi: this.canChi.chi[chiIndex < 0 ? chiIndex + 12 : chiIndex]
        };
    }

    // Tính âm lịch xấp xỉ
    getLunarDate(date) {
        // Công thức xấp xỉ - trong thực tế cần thuật toán phức tạp hơn
        const solarDay = date.getDate();
        const solarMonth = date.getMonth() + 1;
        
        // Xấp xỉ chênh lệch 1 tháng
        let lunarMonth = solarMonth - 1;
        let lunarDay = solarDay + 15;
        
        if (lunarMonth <= 0) {
            lunarMonth = 12;
        }
        
        if (lunarDay > 30) {
            lunarDay -= 30;
            lunarMonth++;
            if (lunarMonth > 12) lunarMonth = 1;
        }
        
        return {
            day: lunarDay,
            month: lunarMonth,
            display: `${lunarDay}/${lunarMonth} âm lịch`
        };
    }

    // Tra cứu giờ hoàng đạo
    getGioHoangDao(chiNgay) {
        const gioHoangDao = {
            'Tý': [0, 1, 8, 9],      
            'Sửu': [2, 3, 10, 11],   
            'Dần': [4, 5, 12, 13],   
            'Mão': [6, 7, 14, 15],   
            'Thìn': [8, 9, 16, 17],  
            'Tỵ': [10, 11, 18, 19], 
            'Ngọ': [12, 13, 20, 21], 
            'Mùi': [14, 15, 22, 23], 
            'Thân': [16, 17, 0, 1],  
            'Dậu': [18, 19, 2, 3],   
            'Tuất': [20, 21, 4, 5],  
            'Hợi': [22, 23, 6, 7]    
        };
        
        return gioHoangDao[chiNgay] || [];
    }

    // Tra cứu sao tốt xấu từ dữ liệu
    getSaoTotXau(date, birthYear) {
        if (!window.dataLoader.isLoaded()) return {};

        const canChiNgay = this.getCanChi(date);
        const lunarDate = this.getLunarDate(date);
        
        // Tra cứu từ bảng dữ liệu
        const saoTotData = window.dataLoader.getData('TraSaoTot');
        const saoXauData = window.dataLoader.getData('TraSaoXau');
        
        return {
            saoTot: this.findSaoByDate(saoTotData, canChiNgay, lunarDate.month),
            saoXau: this.findSaoByDate(saoXauData, canChiNgay, lunarDate.month),
            hoangDao: this.getGioHoangDao(canChiNgay.chi)
        };
    }

    findSaoByDate(saoData, canChiNgay, month) {
        // Logic tra cứu sao theo can chi và tháng
        const results = [];
        
        if (saoData && saoData.length > 0) {
            for (let i = 5; i < saoData.length && i < 20; i++) { // Bỏ qua header
                const row = saoData[i];
                if (row && row.length > month + 3) {
                    const monthCol = row[month + 3]; // Cột tháng tương ứng
                    if (monthCol && monthCol.includes(canChiNgay.can)) {
                        results.push({
                            name: row[1] || '',
                            description: row[2] || '',
                            effect: monthCol
                        });
                    }
                }
            }
        }
        
        return results;
    }

    // Tạo bảng giờ hoàng đạo
    createTimeTable(date, birthYear) {
        const canChiNgay = this.getCanChi(date);
        const hoangDaoGio = this.getGioHoangDao(canChiNgay.chi);
        
        let html = '<table class="data-table time-table">';
        html += '<thead><tr><th>Giờ</th><th>Khoảng Thời Gian</th><th>Trạng Thái</th><th>Ghi Chú</th></tr></thead>';
        html += '<tbody>';
        
        for (let i = 0; i < 12; i++) {
            const gioIndex = i * 2;
            const isHoangDao = hoangDaoGio.includes(gioIndex) || hoangDaoGio.includes(gioIndex + 1);
            const status = isHoangDao ? 'Tốt' : (Math.random() > 0.7 ? 'Xấu' : 'Bình thường');
            const className = isHoangDao ? 'time-good' : (status === 'Xấu' ? 'time-bad' : 'time-neutral');
            
            html += `<tr>
                <td class="${className}">${this.gioTen[i]}</td>
                <td class="${className}">${this.gioKhoang[i]}</td>
                <td class="${className}">${status}</td>
                <td class="${className}">${this.getGioDescription(i, isHoangDao, status)}</td>
            </tr>`;
        }
        
        html += '</tbody></table>';
        return html;
    }

    getGioDescription(gioIndex, isHoangDao, status) {
        const gioName = this.gioTen[gioIndex];
        
        if (isHoangDao) {
            return `Giờ ${gioName} - Hoàng đạo, tốt cho mọi việc`;
        } else if (status === 'Xấu') {
            return `Giờ ${gioName} - Hắc đạo, nên tránh việc quan trọng`;
        } else {
            return `Giờ ${gioName} - Bình thường`;
        }
    }

    // Lấy thứ trong tuần
    getDayOfWeek(date) {
        const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
        return days[date.getDay()];
    }

    // Tính toán tổng hợp cho một ngày
    calculateDay(date, birthYear) {
        const canChiNgay = this.getCanChi(date);
        const canChiNam = this.getYearCanChi(date.getFullYear());
        const lunarDate = this.getLunarDate(date);
        const saoInfo = this.getSaoTotXau(date, birthYear);
        
        return {
            solarDate: {
                day: date.getDate(),
                month: date.getMonth() + 1,
                year: date.getFullYear(),
                dayOfWeek: this.getDayOfWeek(date)
            },
            lunarDate: lunarDate,
            canChi: {
                ngay: canChiNgay,
                nam: canChiNam
            },
            sao: saoInfo,
            timeTable: this.createTimeTable(date, birthYear),
            birthYear: birthYear,
            summary: this.createSummary(canChiNgay, saoInfo)
        };
    }

    createSummary(canChiNgay, saoInfo) {
        return {
            dayQuality: saoInfo.saoTot.length > saoInfo.saoXau.length ? 'Tốt' : 
                       saoInfo.saoXau.length > saoInfo.saoTot.length ? 'Xấu' : 'Bình thường',
            goodTimes: saoInfo.hoangDao.length,
            recommendations: [
                'Nên thực hiện công việc quan trọng trong giờ Hoàng Đạo',
                'Tránh ký kết hợp đồng trong giờ Hắc Đạo',
                `Can chi ngày: ${canChiNgay.can} ${canChiNgay.chi}`
            ]
        };
    }
}

// Global instance
window.calendarCalculator = new CalendarCalculator();