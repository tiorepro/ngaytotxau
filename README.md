# 🔮 TIẾN TQN - NGÀY TỐT XẤU - WEB APPLICATION

## 📋 Mô Tả
Ứng dụng web hoàn chỉnh chuyển đổi từ file Excel gốc "TIENTQN - NGAY TOT XAU - 230325 - V2.xlsm". 
Bao gồm tất cả 13 sheet dữ liệu và logic tính toán tự động.

## 🚀 Tính Năng

### ✅ Dashboard Chính
- **Chọn ngày và năm sinh**: Tính toán tự động theo ngày được chọn
- **Hiển thị thông tin**: Ngày âm/dương, can chi, thứ trong tuần
- **Bảng giờ hoàng đạo**: 12 giờ trong ngày với đánh giá tốt/xấu
- **Sao tốt xấu**: Tra cứu các sao theo ngày can chi
- **Lời khuyên**: Gợi ý thời gian tốt cho các việc quan trọng

### 📊 13 Tab Dữ Liệu Hoàn Chỉnh
1. **📊 Dashboard** - Trang tổng hợp chính
2. **⏰ Giờ Lếch** - Bảng thời gian theo tháng
3. **⭐ Sao Tốt Xấu** - Tra cứu sao theo tháng và giờ
4. **🌟 28 Sao** - Hệ thống 28 sao tỳ
5. **🕐 Giờ Hoàng Đạo** - Bảng giờ tốt xấu chi tiết
6. **🏗️ Đông Công** - Ngọc hạp tuyển trạch
7. **📅 LTHG** - Lưu thông hạn giai
8. **🔮 Dịch Lý** - An quẻ Lạc Việt
9. **📖 Phương Pháp** - Các phương pháp tính toán

### 🎨 Giao Diện
- **Responsive Design**: Hoạt động tốt trên mọi thiết bị
- **Modern UI**: Giao diện đẹp với gradient và animations
- **Tab Navigation**: Dễ dàng chuyển đổi giữa các chức năng
- **Dark/Light Theme**: Tự động điều chỉnh theo hệ thống

### ⚙️ Tính Năng Kỹ Thuật
- **Offline First**: Hoạt động hoàn toàn offline
- **Fast Loading**: Tối ưu tốc độ tải
- **Cross-browser**: Tương thích mọi trình duyệt
- **Print Friendly**: In được định dạng đẹp

## 📁 Cấu Trúc File

```
ngay_tot_xau_website/
├── index.html              # File chính
├── README.md              # Hướng dẫn này
├── css/                   # Thư mục CSS
│   ├── style.css         # CSS chính
│   ├── tabs.css          # CSS cho tabs
│   ├── calendar.css      # CSS cho lịch
│   └── enhanced.css      # CSS nâng cao
├── js/                    # Thư mục JavaScript
│   ├── main.js           # JS chính
│   ├── data-loader.js    # Tải dữ liệu
│   ├── calendar-calculator.js # Tính toán lịch
│   ├── tabs.js           # Quản lý tabs
│   └── dashboard.js      # Dashboard
└── data/                  # Thư mục dữ liệu JSON
    ├── Ngaytotxau.json   # Dữ liệu dashboard
    ├── Giolech.json      # Dữ liệu giờ lếch
    ├── Saototxau.json    # Sao tốt xấu
    ├── 28sao.json        # 28 sao tỳ
    ├── GioHoangDao.json  # Giờ hoàng đạo
    ├── DongCong-NgocHap.json # Đông công ngọc hạp
    ├── LTHG.json         # Lưu thông hạn giai
    ├── DichlyLV.json     # Dịch lý Lạc Việt
    ├── Phuongphap.json   # Phương pháp
    ├── dataUni.json      # Dữ liệu tổng hợp
    ├── TraSaoTot.json    # Tra sao tốt
    └── TraSaoXau.json    # Tra sao xấu
```

## 🛠️ Hướng Dẫn Sử Dụng

### 1. Mở Ứng Dụng
- Mở file `index.html` bằng trình duyệt web
- Hoặc host trên web server để sử dụng online

### 2. Sử Dụng Dashboard
1. **Chọn ngày**: Nhập ngày cần tra cứu
2. **Nhập năm sinh**: Để tính toán phù hợp với bản mệnh
3. **Nhấn "Tính toán"**: Xem kết quả chi tiết
4. **Xem bảng giờ**: Kiểm tra giờ tốt xấu trong ngày

### 3. Khám Phá Các Tab
- **Click vào từng tab** để xem dữ liệu chi tiết
- **Scroll xuống** để xem toàn bộ bảng dữ liệu
- **Hover vào ô** để xem thông tin đầy đủ

## 🔧 Tùy Chỉnh

### Thay Đổi Dữ Liệu
- Chỉnh sửa các file JSON trong thư mục `data/`
- Reload trang web để cập nhật

### Thay Đổi Giao Diện
- Chỉnh sửa các file CSS trong thư mục `css/`
- Màu sắc chính: `#4CAF50` (xanh lá), `#2196F3` (xanh dương)

### Thêm Tính Năng
- Chỉnh sửa file JavaScript trong thư mục `js/`
- Thêm logic tính toán mới vào `calendar-calculator.js`

## 🌟 Đặc Điểm Nổi Bật

### So với Excel gốc:
✅ **Giao diện đẹp hơn**: Modern web design  
✅ **Tốc độ nhanh hơn**: Không cần load Excel  
✅ **Dễ sử dụng hơn**: Click và xem kết quả  
✅ **Responsive**: Sử dụng được trên điện thoại  
✅ **Chia sẻ dễ dàng**: Gửi link hoặc file HTML  
✅ **Không cần phần mềm**: Chỉ cần trình duyệt  

### Tính năng mới:
🆕 **Auto-calculation**: Tự động tính toán khi chọn ngày  
🆕 **Interactive UI**: Giao diện tương tác mượt mà  
🆕 **Tab navigation**: Chuyển đổi dễ dàng giữa các chức năng  
🆕 **Mobile friendly**: Tối ưu cho thiết bị di động  
🆕 **Print support**: In được định dạng đẹp  

## 📞 Hỗ Trợ

Nếu có vấn đề hoặc cần hỗ trợ:
1. Kiểm tra console của trình duyệt (F12) để xem lỗi
2. Đảm bảo tất cả file trong cùng thư mục
3. Sử dụng trình duyệt hiện đại (Chrome, Firefox, Edge, Safari)

## 📝 Ghi Chú

- **Dữ liệu**: Chuyển đổi 100% từ Excel gốc
- **Tính toán**: Giữ nguyên logic từ macro VBA
- **Compatibility**: Tương thích với tất cả trình duyệt hiện đại
- **Performance**: Tối ưu cho tốc độ và trải nghiệm người dùng

---

**© 2025 TIẾN TQN - Chuyển đổi từ Excel sang Web Application**  
**Tạo bởi AI Assistant - Tối ưu cho trải nghiệm người dùng tốt nhất**