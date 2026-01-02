# Setup Vercel KV Database

## Bước 1: Tạo Vercel KV Database

1. Truy cập: https://vercel.com/dashboard
2. Chọn project hoặc tạo mới
3. Vào tab **Storage** → **Create Database**
4. Chọn **KV (Redis)** → **Continue**
5. Đặt tên database (ví dụ: `ssl-english-kv`)
6. Chọn region gần nhất → **Create**

## Bước 2: Lấy Environment Variables

Sau khi tạo database, Vercel sẽ hiển thị các biến môi trường:

```bash
KV_REST_API_URL=https://xxx.upstash.io
KV_REST_API_TOKEN=Axxx
KV_REST_API_READ_ONLY_TOKEN=Axxx
```

## Bước 3: Thêm vào .env

Copy các biến trên và paste vào file `.env`:

```env
KV_REST_API_URL=your-actual-url
KV_REST_API_TOKEN=your-actual-token
KV_REST_API_READ_ONLY_TOKEN=your-actual-read-token
```

## Bước 4: Restart Server

```bash
npm run dev
```

## Cấu trúc dữ liệu lưu trữ

### Key Pattern:
- `user:{userId}:progress` - Toàn bộ progress của user

### Data Structure:
```typescript
{
  userId: string
  vocabulary: {
    "A1_animals": { score: 8, total: 10, completedAt: "2026-01-03", attempts: 3 }
  }
  listening: {
    "lesson-a1-1": { score: 7, total: 10, completedAt: "2026-01-03", attempts: 2 }
  }
  test: {
    "A1_2026-01-03": { score: 15, total: 20, completedAt: "2026-01-03" }
  }
}
```

## API Endpoints đã tạo

✅ `GET /api/user/progress` - Lấy toàn bộ progress
✅ `POST /api/user/vocabulary` - Lưu vocabulary progress
✅ `POST /api/user/listening` - Lưu listening progress
✅ `POST /api/user/test` - Lưu test results

## Cách sử dụng trong components

```typescript
// Lưu vocabulary progress
await fetch('/api/user/vocabulary', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    level: 'A1',
    topic: 'animals',
    score: 8,
    total: 10
  })
})

// Lấy progress
const res = await fetch('/api/user/progress')
const { progress } = await res.json()
```

## Development Mode (không có Vercel KV)

Nếu chưa setup Vercel KV, code sẽ fallback về localStorage như hiện tại.
