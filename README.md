# SSL English - Nền Tảng Học Tiếng Anh Hiện Đại

Một nền tảng học tiếng Anh hiện đại được xây dựng bằng **Next.js 14** và **NextAuth v5** để xác thực người dùng.

## 📋 Tính Năng Chính

- 🔐 **Xác thực kép**: Google OAuth + Tên người dùng/Mật khẩu
- 📱 **Thiết kế hoàn toàn đáp ứng**: Tương thích trên tất cả thiết bị
- 🎨 **Giao diện đẹp**: Sử dụng Tailwind CSS cho design hiện đại
- 🗣️ **5 Kỹ năng học**: Từ vựng, Nghe hiểu, Đọc hiểu, Nói, Viết
- 👤 **Quản lý tài khoản người dùng**: Lưu trữ dữ liệu với Vercel KV
- 📊 **Theo dõi tiến độ**: Thống kê chi tiết, kiểm tra từng kỹ năng
- 🎯 **Lộ trình học**: Có sẵn bản đồ học tập để hướng dẫn
- 🔊 **Phát âm**: Hỗ trợ kiểm tra và cải thiện phát âm
- 📝 **Kiểm tra viết**: Hệ thống chấm điểm tự động
- 🚀 **Sẵn sàng sản xuất**: Có thể triển khai trên Vercel

## 🛠️ Thiết Lập & Cài Đặt

### Yêu Cầu Trước

- **Node.js**: Phiên bản 16.0 trở lên
- **npm** hoặc **yarn**: Trình quản lý gói

### Biến Môi Trường

Tạo file `.env.local` trong thư mục gốc:

```env
# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# NextAuth Configuration
NEXTAUTH_SECRET=your_secure_random_key
NEXTAUTH_URL=http://localhost:3000

# Vercel KV (Redis)
KV_REST_API_URL=your_kv_url
KV_REST_API_TOKEN=your_kv_token
KV_URL=your_redis_url
REDIS_URL=your_redis_url
```

### Cài Đặt Phụ Thuộc

```bash
npm install
```

### Chạy Ở Chế Độ Phát Triển

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) trong trình duyệt của bạn.

### Xây Dựng Cho Sản Xuất

```bash
npm run build
npm start
```

## 📁 Cấu Trúc Dự Án

```
English_learning/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Trang chủ
│   │   ├── sign-in/page.tsx        # Trang đăng nhập
│   │   ├── sign-up/page.tsx        # Trang đăng ký
│   │   ├── roadmap/page.tsx        # Lộ trình học
│   │   ├── test/page.tsx           # Trang kiểm tra
│   │   ├── pronunciation/page.tsx  # Kiểm tra phát âm
│   │   ├── skills/                 # Các kỹ năng học
│   │   │   ├── listening/          # Kỹ năng nghe
│   │   │   ├── reading/            # Kỹ năng đọc
│   │   │   ├── speaking/           # Kỹ năng nói
│   │   │   ├── writing/            # Kỹ năng viết
│   │   │   └── page.tsx            # Trang kỹ năng
│   │   ├── vocabulary/             # Bộ từ vựng
│   │   │   └── practice/           # Luyện tập từ vựng
│   │   └── api/                    # API endpoints
│   │       ├── auth/               # Xác thực
│   │       ├── user/               # Dữ liệu người dùng
│   │       ├── progress/           # Theo dõi tiến độ
│   │       └── writing/            # Kiểm tra bài viết
│   ├── components/
│   │   ├── AudioPlayer.tsx         # Trình phát âm thanh
│   │   ├── AuthButton.tsx          # Nút xác thực
│   │   └── VocabularyContent.tsx   # Nội dung từ vựng
│   ├── data/
│   │   ├── listeningData.ts        # Dữ liệu nghe
│   │   ├── readingData.ts          # Dữ liệu đọc
│   │   ├── skillsData.ts           # Dữ liệu kỹ năng
│   │   └── vocabulary.json         # Từ điển
│   ├── lib/
│   │   ├── kv.ts                   # Vercel KV client
│   │   ├── progress.ts             # Tiến độ học
│   │   ├── types.ts                # Các định nghĩa kiểu
│   │   └── algorithms/             # Các thuật toán
│   │       ├── spacedRepetition.ts # Lặp lại khoảng cách
│   │       ├── lessonSelector.ts   # Chọn bài học
│   │       ├── grading.ts          # Chấm điểm
│   │       └── quizGenerator.ts    # Tạo câu hỏi
│   ├── auth.ts                     # Cấu hình NextAuth
│   └── middleware.ts               # Bảo vệ các route
├── public/
│   └── audio/                      # Tệp âm thanh
├── scripts/
│   ├── generateListeningData.js    # Tạo dữ liệu nghe
│   └── generateReadingData.js      # Tạo dữ liệu đọc
├── package.json                    # Phụ thuộc dự án
├── tsconfig.json                   # Cấu hình TypeScript
├── tailwind.config.ts              # Cấu hình Tailwind CSS
├── next.config.js                  # Cấu hình Next.js
└── README.md                       # Tệp này
```

## 🚀 Công Nghệ Sử Dụng

| Công Nghệ | Phiên Bản | Mục Đích |
|-----------|-----------|---------|
| **Next.js** | 14 | React framework |
| **TypeScript** | Latest | Type safety |
| **NextAuth v5** | Latest | Xác thực người dùng |
| **Tailwind CSS** | Latest | Styling |
| **Vercel KV** | Latest | Redis storage |
| **Google OAuth** | Latest | Đăng nhập xã hội |

## 📡 API Endpoints

### Xác Thực
- `POST /api/auth/[...nextauth]` - NextAuth handler
- `POST /api/auth/register` - Đăng ký người dùng
- `POST /api/auth/signin` - Đăng nhập

### Dữ Liệu Người Dùng
- `GET /api/user/progress` - Lấy tiến độ
- `GET /api/user/vocabulary` - Lấy từ vựng
- `GET /api/user/attempts` - Lấy nỗ lực
- `POST /api/user/listening` - Lưu nghe
- `POST /api/user/reading` - Lưu đọc

### Tiến Độ
- `POST /api/progress/complete` - Hoàn thành bài học
- `POST /api/progress/test` - Nộp bài kiểm tra

### Kiểm Tra Viết
- `POST /api/writing/check` - Kiểm tra bài viết

## 💾 Lưu Trữ Dữ Liệu

Dự án sử dụng **Vercel KV** (Redis) để lưu trữ:
- Dữ liệu người dùng
- Tiến độ học
- Lịch sử câu hỏi
- Thống kê hoạt động

## 📊 Tính Năng Theo Dõi Tiến Độ

- Theo dõi số câu trả lời đúng/sai
- Ghi lại thời gian hoàn thành bài học
- Thống kê chi tiết cho mỗi kỹ năng
- Lặp lại khoảng cách (Spaced Repetition) cho từ vựng
- Phân tích tiến độ theo thời gian

## 🔐 Bảo Mật

- ✅ Protected routes với middleware
- ✅ NextAuth session management
- ✅ Secure password hashing
- ✅ HTTPS trong production
- ✅ Environment variables cho credentials

## 📝 Scripts Khả Dụng

```bash
# Phát triển
npm run dev

# Xây dựng
npm run build

# Chạy sản xuất
npm start

# Lint code
npm run lint

# Tạo dữ liệu nghe
npm run generate:listening

# Tạo dữ liệu đọc
npm run generate:reading
```

## 🌐 Triển Khai

### Vercel (Khuyến Nghị)

1. Đẩy code lên GitHub
2. Kết nối với Vercel
3. Thêm biến môi trường trong Vercel dashboard
4. Deploy tự động

```bash
vercel deploy
```

## 🤝 Đóng Góp

Chúng tôi chào đón các đóng góp! Vui lòng:

1. Fork dự án
2. Tạo branch feature (`git checkout -b feature/AmazingFeature`)
3. Commit thay đổi (`git commit -m 'Add some AmazingFeature'`)
4. Push đến branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📄 Giấy Phép

Dự án này được cấp phép dưới giấy phép MIT. Xem [LICENSE](LICENSE) để biết chi tiết.

## 📧 Liên Hệ

Nếu bạn có câu hỏi hoặc đề xuất, vui lòng mở issue hoặc liên hệ qua email.

---

**Được tạo và duy trì bởi SSL English Team** ❤️
