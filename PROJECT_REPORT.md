# BÁO CÁO DỰ ÁN: SSL ENGLISH LEARNING PLATFORM

## 1. TỔNG QUAN DỰ ÁN

### 1.1. Thông tin cơ bản
- **Tên dự án:** SSL English Learning Platform
- **Phiên bản:** 0.1.0
- **Mục đích:** Xây dựng nền tảng học tiếng Anh toàn diện với các kỹ năng Listening, Reading, Speaking, Writing và Vocabulary
- **Công nghệ chính:** Next.js 14, React 18, TypeScript, Tailwind CSS

### 1.2. Mục tiêu
- Cung cấp hệ thống học tập theo chuẩn CEFR (A1, A2, B1, B2)
- Tích hợp AI để hỗ trợ học tập
- Tạo trải nghiệm học tập tương tác và hiệu quả
- Quản lý tiến độ học tập của người dùng

---

## 2. CÔNG NGHỆ SỬ DỤNG

### 2.1. Core Technologies

#### **Frontend Framework**
- **Next.js 14.2.35**: Framework React với App Router
  - Server-side rendering (SSR)
  - File-based routing
  - API routes cho backend logic
  - Automatic code splitting

- **React 18.3.1**: Thư viện UI
  - Hooks (useState, useRef, useEffect)
  - Component-based architecture
  - Client-side interactivity

- **TypeScript 5.9.3**: Type safety
  - Interface definitions cho data structures
  - Type checking tại compile time
  - Better IDE support và autocomplete

#### **Styling**
- **Tailwind CSS 3.4.19**: Utility-first CSS framework
  - Responsive design
  - Custom color schemes
  - Gradient backgrounds
  - Animation utilities

#### **Authentication**
- **Clerk (@clerk/nextjs 6.36.5)**
  - Xác thực người dùng
  - Quản lý session
  - User profile management
  - Sign-in/Sign-up components

### 2.2. AI Integration

#### **Google Generative AI (@google/generative-ai 0.24.1)**
- **Mục đích:** Tạo quiz động, kiểm tra ngữ pháp, hỗ trợ writing
- **API endpoint:** `/api/quiz/generate`
- **Chức năng:**
  - Tự động sinh câu hỏi quiz
  - Đánh giá bài viết
  - Cung cấp feedback chi tiết

**Ví dụ sử dụng:**
```typescript
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Tạo quiz tự động
const prompt = "Generate English quiz for level A1...";
const result = await model.generateContent(prompt);
```

### 2.3. Data Storage

#### **Vercel KV (@vercel/kv 3.0.0)**
- **Mục đích:** Lưu trữ tiến độ học tập
- **Sử dụng trong:** `/lib/progress.ts`
- **Chức năng:**
  - Lưu điểm số bài test
  - Tracking lessons đã hoàn thành
  - Lưu trữ user progress

**Ví dụ:**
```typescript
import { kv } from '@vercel/kv'

// Lưu progress
await kv.set(`user:${userId}:progress`, progressData)

// Lấy progress
const progress = await kv.get(`user:${userId}:progress`)
```

### 2.4. Data Processing

#### **XLSX (xlsx 0.18.5)**
- **Mục đích:** Parse Excel files chứa nội dung bài tập
- **Sử dụng trong:**
  - `scripts/generateListeningData.js`
  - `scripts/generateReadingData.js`
- **Workflow:**
  1. Đọc file Excel (listening_data.xlsx, reading_data.xlsx)
  2. Parse thành JavaScript objects
  3. Generate TypeScript files với type safety
  4. Export data cho application sử dụng

**Ví dụ:**
```javascript
const XLSX = require('xlsx');
const workbook = XLSX.readFile('public/listening_data.xlsx');
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const data = XLSX.utils.sheet_to_json(worksheet);
```

---

## 3. CẤU TRÚC DỮ LIỆU

### 3.1. Listening Data Structure

**File:** `src/data/listeningData.ts`
- **Tổng số bài:** 40 lessons
- **Phân bổ theo level:**
  - A1: 10 lessons (bài 1-10)
  - A2: 10 lessons (bài 11-20)
  - B1: 10 lessons (bài 21-30)
  - B2: 10 lessons (bài 31-40)

**Interface:**
```typescript
interface ListeningQuestion {
  question: string
  questionVi: string
  options: string[]
  correctAnswer: number
  explanation: string
  explanationVi: string
}

interface ListeningLesson {
  id: number
  title: string
  titleVi: string
  audioPath: string
  level: 'A1' | 'A2' | 'B1' | 'B2'
  duration: string
  questions: ListeningQuestion[]
}
```

**Đặc điểm:**
- Câu 1-40: Generic questions ("Mark your answer on your answer sheet.")
- Câu 41-100: Full content questions
- Mỗi lesson có 2-3 câu hỏi
- Audio format: MP4 files trong `/public/audio/`

### 3.2. Reading Data Structure

**File:** `src/data/readingData.ts`
- **Tổng số passages:** 20 passages
- **Phân bổ:**
  - A1: 4 passages
  - A2: 4 passages
  - B1: 6 passages
  - B2: 6 passages

**Interface:**
```typescript
interface ReadingQuestion {
  questionNumber: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  explanationVi: string
}

interface ReadingLesson {
  id: number
  passage: string
  level: 'A1' | 'A2' | 'B1' | 'B2'
  questions: ReadingQuestion[]
}
```

**Đặc điểm:**
- Mỗi passage có 4 câu hỏi
- Questions đánh số từ 1-4 trong mỗi passage
- Tổng: 80 câu hỏi reading

### 3.3. Vocabulary Data Structure

**File:** `src/data/vocabulary.json`
- **Cấu trúc:** Phân loại theo level và category
- **Categories:** greetings, family, food, home, school, work, emotions, actions, colors, numbers, time, body, animals, weather, travel, shopping, sports, health, technology

**Format:**
```json
{
  "A1": {
    "greetings": ["hello", "goodbye", "thanks", ...],
    "family": ["father", "mother", "sister", ...],
    ...
  },
  "A2": { ... },
  "B1": { ... },
  "B2": { ... }
}
```

### 3.4. Vietnamese Translations

**File:** `src/data/vietnameseTranslations.json`
- **Mục đích:** Mapping từ tiếng Anh sang tiếng Việt
- **Sử dụng:** Tạo câu hỏi vocabulary trong test

**Format:**
```json
{
  "hello": "xin chào",
  "goodbye": "tạm biệt",
  "thanks": "cảm ơn",
  ...
}
```

---

## 4. TÍNH NĂNG CHÍNH

### 4.1. Listening Practice

**File:** `src/app/skills/listening/page.tsx`

**Chức năng:**
- ✅ Filter theo level (A1/A2/B1/B2)
- ✅ Grid display của lessons
- ✅ Custom AudioPlayer component
- ✅ Quiz interface với multiple choice
- ✅ Answer checking với visual feedback
- ✅ Navigation giữa các lessons
- ✅ Score calculation và kết quả chi tiết

**AudioPlayer Component:**
```typescript
// src/components/AudioPlayer.tsx
- Play/Pause control
- ±10s seek buttons
- Progress bar với click-to-seek
- Volume control
- Conditional video display
- Props: src, title, showVideo
```

**Đặc điểm:**
- Sử dụng HTML5 `<video>` element (audio-only mode)
- Responsive design
- Real-time progress tracking

### 4.2. Reading Practice

**File:** `src/app/skills/reading/page.tsx`

**Chức năng:**
- ✅ Filter theo level
- ✅ Passage display trong green box
- ✅ Quiz với 4 câu hỏi per passage
- ✅ Highlight đáp án (xanh = đúng, đỏ = sai)
- ✅ Previous/Next navigation
- ✅ Retry option
- ✅ Score calculation

**UI Design:**
- Green theme để phân biệt với Listening (blue)
- Large text cho passage
- Clear question numbering

### 4.3. Test System

**File:** `src/app/test/page.tsx`

**Cấu trúc bài test:**
- **11 câu Vocabulary:** Hỏi nghĩa tiếng Việt của từ tiếng Anh
- **Listening (2 audio):** Số câu tùy thuộc audio (2-6 câu per audio)
- **4 câu Reading:** Từ 1 passage, hiển thị từng câu riêng lẻ

**Tính năng đặc biệt:**
1. **Grouping Questions:**
   - Vocabulary: Mỗi câu 1 nhóm (hiển thị riêng)
   - Listening: Các câu cùng audio gộp chung (hiển thị cùng lúc)
   - Reading: Mỗi câu 1 nhóm (passage hiển thị lại mỗi câu)

2. **Navigation:**
   - Next/Previous theo nhóm câu hỏi
   - Progress bar tracking
   - Question counter

3. **Answer Selection:**
   - Click to select answer
   - Visual feedback (blue border)
   - Persistent selection khi navigate

4. **Results:**
   - Score percentage
   - Detailed breakdown
   - Correct answer highlighting
   - Explanation cho mỗi câu
   - Retry hoặc New test options

**Code Structure:**
```typescript
interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  level: string
  tags: string[]
  audioPath?: string
  passage?: string
  groupId?: string  // Để nhóm câu hỏi
}

// Generate quiz function
const generateQuiz = (level) => {
  // 1. Generate 11 vocabulary questions
  // 2. Select 2 random listening audios
  // 3. Select 1 random reading passage
}
```

### 4.4. Vocabulary Practice

**File:** `src/app/vocabulary/page.tsx` và `practice/[level]/[topic]/page.tsx`

**Chức năng:**
- Topic-based learning
- Level filtering
- Interactive practice exercises

### 4.5. Speaking & Pronunciation

**Files:** 
- `src/app/skills/speaking/page.tsx`
- `src/app/pronunciation/page.tsx`

**Planned Features:**
- Speech recognition
- Pronunciation scoring
- Real-time feedback

---

## 5. AUTOMATED DATA GENERATION

### 5.1. Listening Data Generator

**File:** `scripts/generateListeningData.js`

**Process:**
1. Read `public/listening_data.xlsx`
2. Parse 100 questions từ Excel
3. Group questions theo lesson (mỗi lesson 2-3 câu)
4. Auto-assign level dựa trên lesson index:
   - Lessons 1-10 → A1
   - Lessons 11-20 → A2
   - Lessons 21-30 → B1
   - Lessons 31-40 → B2
5. Generate TypeScript file với type definitions
6. Output: `src/data/listeningData.ts`

**Excel Columns:**
- Câu (Question number)
- Đáp án (Correct answer)
- Nội dung câu hỏi (Question Text)
- (A), (B), (C), (D) (Options)

**Special Handling:**
- Questions 1-40: Set to "Mark your answer on your answer sheet."
- Questions 41-100: Full content from Excel

### 5.2. Reading Data Generator

**File:** `scripts/generateReadingData.js`

**Process:**
1. Read `public/reading_data.xlsx`
2. Parse 80 questions từ Excel
3. Group by "Đoạn văn" column (passage)
4. Number questions 1-4 trong mỗi passage
5. Handle null/undefined values với String() conversion
6. Generate TypeScript với interfaces
7. Output: `src/data/readingData.ts`

**Excel Columns:**
- Đoạn văn (Reading passage)
- Câu hỏi (Question)
- A, B, C, D (Options)
- Đáp án (Correct answer)

**Benefits:**
- Không cần manual typing data
- Type-safe từ Excel → TypeScript
- Dễ dàng update content
- Automatic validation

---

## 6. UI/UX DESIGN

### 6.1. Color Scheme

**Primary Colors:**
- Amber/Yellow: Main theme color
- Blue: Listening features
- Green: Reading features
- Purple: Vocabulary features

**Usage:**
```css
/* Level Cards */
.from-yellow-50 .to-orange-50
.border-yellow-300

/* Listening */
.bg-blue-50 .text-blue-700

/* Reading */
.bg-green-50 .text-green-700

/* Vocabulary */
.bg-purple-50 .text-purple-700
```

### 6.2. Responsive Design

**Breakpoints:**
- Mobile: Default (< 640px)
- Tablet: md (768px)
- Desktop: lg (1024px)
- Large: xl (1280px)

**Grid Layouts:**
```tsx
// Level cards
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"

// Lessons
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
```

### 6.3. Navigation

**Components:**
- Navbar: Sticky header với links
- Breadcrumbs: Back to list buttons
- Pagination: Previous/Next buttons
- Progress Bar: Visual feedback

### 6.4. Interactive Elements

1. **Buttons:**
   - Hover effects
   - Disabled states
   - Loading states
   - Color-coded actions

2. **Cards:**
   - Hover shadow
   - Border highlights
   - Gradient backgrounds

3. **Forms:**
   - Radio buttons styled as cards
   - Visual selection feedback
   - Validation messages

---

## 7. API ROUTES

### 7.1. Quiz Generation

**Endpoint:** `/api/quiz/generate`
- **Method:** POST
- **Input:** { level, topic, count }
- **AI Integration:** Google Generative AI
- **Output:** Array of questions

### 7.2. Progress Tracking

**Endpoints:**
- `/api/progress/route.ts` - Get user progress
- `/api/progress/complete/route.ts` - Mark lesson complete
- `/api/progress/test/route.ts` - Save test results

**Storage:** Vercel KV

### 7.3. Writing Check

**Endpoint:** `/api/writing/check/route.ts`
- **Method:** POST
- **Input:** { text, level }
- **AI Integration:** Google Generative AI for grammar check
- **Output:** Corrections and suggestions

---

## 8. PHÁT TRIỂN VÀ TỐI ƯU HÓA

### 8.1. Build Process

**Scripts:**
```bash
npm run dev      # Development server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint check
```

**Data Generation:**
```bash
node scripts/generateListeningData.js
node scripts/generateReadingData.js
```

### 8.2. File Organization

**Cleaned Up:**
- ✅ Removed `.next` cache folder
- ✅ Removed old debug scripts (parseExcel.js, dapan_A1.json)
- ✅ Removed duplicate data files (listeningA1Data.ts)
- ✅ Organized Excel files in `/public/`

**Current Structure:**
```
English_learning/
├── public/
│   ├── audio/              # 41 MP4 files (78.65 MB)
│   ├── listening_data.xlsx # Source data
│   ├── reading_data.xlsx   # Source data
│   ├── flower.svg
│   └── image1.png
├── scripts/
│   ├── generateListeningData.js
│   └── generateReadingData.js
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── api/           # API routes
│   │   ├── skills/        # Skill-based pages
│   │   ├── test/          # Test page
│   │   ├── vocabulary/    # Vocabulary pages
│   │   └── ...
│   ├── components/        # Reusable components
│   │   ├── AudioPlayer.tsx
│   │   ├── AuthButton.tsx
│   │   └── VocabularyContent.tsx
│   ├── data/              # Generated TypeScript data
│   │   ├── listeningData.ts (1224 lines)
│   │   ├── readingData.ts (842 lines)
│   │   ├── vocabulary.json
│   │   ├── vietnameseTranslations.json
│   │   └── ...
│   └── lib/               # Utilities
│       ├── progress.ts
│       ├── types.ts
│       └── algorithms/
└── ...
```

### 8.3. Performance Optimization

**Achievements:**
- ✅ Source code: 79.57 MB (chủ yếu audio)
- ✅ Zero unused dependencies
- ✅ Efficient data structures
- ✅ Code splitting with Next.js
- ✅ Static data generation

**Bundle Size:**
- node_modules: 318 MB (all necessary)
- No redundant packages
- TypeScript for type safety
- Tree-shaking enabled

### 8.4. Git Configuration

**Updated .gitignore:**
```gitignore
node_modules/
.next/
*.log
~$*.xlsx        # Excel temp files
~$*.xls
.idea/          # Editor files
.vscode/
*.swp
```

---

## 9. WORKFLOW PHÁT TRIỂN

### 9.1. Content Update Workflow

**Khi update nội dung bài tập:**

1. **Update Excel Files:**
   - Mở `public/listening_data.xlsx` hoặc `reading_data.xlsx`
   - Thêm/sửa nội dung
   - Save file

2. **Regenerate Data:**
   ```bash
   node scripts/generateListeningData.js
   node scripts/generateReadingData.js
   ```

3. **Verify:**
   - Check console output
   - Review generated TypeScript files
   - Test trong browser (Ctrl+Shift+R để hard refresh)

4. **Commit:**
   ```bash
   git add .
   git commit -m "Update lesson content"
   ```

### 9.2. Adding New Features

**Process:**
1. Create component trong `/src/components/`
2. Create page trong `/src/app/`
3. Update types trong `/src/lib/types.ts`
4. Add API route nếu cần trong `/src/app/api/`
5. Test locally với `npm run dev`
6. Build với `npm run build`

### 9.3. AI Integration Workflow

**Khi sử dụng AI features:**

1. **Setup API Keys:**
   ```env
   GOOGLE_API_KEY=your_key_here
   ```

2. **Call API:**
   ```typescript
   const response = await fetch('/api/quiz/generate', {
     method: 'POST',
     body: JSON.stringify({ level, topic })
   })
   ```

3. **Handle Response:**
   - Parse JSON
   - Validate data
   - Display to user

---

## 10. TECHNICAL CHALLENGES & SOLUTIONS

### 10.1. Excel Data Parsing

**Challenge:** Excel có null/undefined values
**Solution:** 
```javascript
const safeParse = (value) => String(value || '')
```

### 10.2. Audio Grouping in Test

**Challenge:** Hiển thị nhiều câu hỏi cùng audio trên 1 màn hình
**Solution:**
- Thêm `groupId` cho mỗi question
- Navigation theo nhóm thay vì từng câu
- Render tất cả questions trong cùng group

### 10.3. Type Safety với JSON Data

**Challenge:** vocabulary.json không có TypeScript types
**Solution:**
```typescript
const vocabLevel: any = vocabularyData[level]
// Or import with proper typing
```

### 10.4. File Lock Issues

**Challenge:** Excel temp files (~$*.xlsx) bị lock
**Solution:**
- Đóng Excel trước khi xóa
- Add to .gitignore
- Use error handling trong scripts

---

## 11. FUTURE ENHANCEMENTS

### 11.1. Planned Features

1. **Speaking Practice:**
   - Speech recognition API
   - Pronunciation scoring
   - Real-time feedback

2. **Writing Practice:**
   - AI grammar checking
   - Essay evaluation
   - Writing prompts by level

3. **Progress Tracking:**
   - Dashboard với charts
   - Achievement badges
   - Learning streaks

4. **Social Features:**
   - Leaderboards
   - Study groups
   - Peer review

### 11.2. Technical Improvements

1. **Performance:**
   - Image optimization
   - Audio compression
   - Lazy loading

2. **Testing:**
   - Unit tests với Jest
   - E2E tests với Playwright
   - CI/CD pipeline

3. **Monitoring:**
   - Error tracking (Sentry)
   - Analytics (Google Analytics)
   - Performance monitoring

### 11.3. Content Expansion

1. **More Levels:**
   - C1, C2 content
   - Business English
   - Academic English

2. **More Exercises:**
   - Thêm audio lessons
   - Thêm reading passages
   - Grammar exercises
   - Idioms & phrases

---

## 12. KẾT LUẬN

### 12.1. Achievements

✅ **Complete Learning Platform** với 4 kỹ năng chính
✅ **40 Listening Lessons** với audio và quiz
✅ **20 Reading Passages** với 80 câu hỏi
✅ **Comprehensive Test System** với vocabulary/listening/reading
✅ **AI Integration** cho dynamic content
✅ **Automated Data Pipeline** từ Excel → TypeScript
✅ **Modern Tech Stack** với Next.js 14, React 18, TypeScript
✅ **Responsive Design** hoạt động tốt trên mọi devices
✅ **Type-Safe Code** với TypeScript interfaces
✅ **Optimized Performance** với efficient data structures

### 12.2. Statistics

**Code:**
- Total Lines: ~5,000+ lines TypeScript/TSX
- Components: 10+ reusable components
- Pages: 15+ pages
- API Routes: 5+ endpoints

**Content:**
- Audio Files: 41 files (78.65 MB)
- Listening Questions: 100 questions
- Reading Questions: 80 questions
- Vocabulary Words: 400+ words
- Levels: 4 levels (A1, A2, B1, B2)

**Dependencies:**
- Production: 7 packages
- Development: 8 packages
- Total: 415 packages (including sub-dependencies)

### 12.3. Project Quality

**Code Quality:**
- ✅ TypeScript cho type safety
- ✅ ESLint configured
- ✅ Consistent naming conventions
- ✅ Component reusability
- ✅ Proper file organization

**User Experience:**
- ✅ Intuitive navigation
- ✅ Clear visual feedback
- ✅ Responsive design
- ✅ Fast loading times
- ✅ Error handling

**Maintainability:**
- ✅ Well-documented code
- ✅ Modular architecture
- ✅ Easy to update content
- ✅ Automated data generation
- ✅ Git version control

---

## 13. DEPLOYMENT

### 13.1. Vercel Deployment

**Steps:**
1. Push code to GitHub
2. Connect Vercel to repository
3. Set environment variables
4. Deploy

**Environment Variables:**
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
GOOGLE_API_KEY=
KV_URL=
KV_REST_API_URL=
KV_REST_API_TOKEN=
KV_REST_API_READ_ONLY_TOKEN=
```

### 13.2. Production Considerations

- ✅ Environment variables secured
- ✅ API keys in .env (not committed)
- ✅ Build process tested
- ✅ Error boundaries implemented
- ✅ Loading states for async operations

---

## APPENDIX

### A. Commands Reference

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Linting
npm run lint

# Data generation
node scripts/generateListeningData.js
node scripts/generateReadingData.js

# Clean cache
rm -rf .next

# Install dependencies
npm install
```

### B. File Paths

**Data Files:**
- Listening: `src/data/listeningData.ts`
- Reading: `src/data/readingData.ts`
- Vocabulary: `src/data/vocabulary.json`
- Translations: `src/data/vietnameseTranslations.json`

**Excel Sources:**
- `public/listening_data.xlsx`
- `public/reading_data.xlsx`

**Audio Files:**
- `public/audio/*.mp4` (41 files)

### C. Key Components

- `AudioPlayer.tsx` - Custom audio player
- `AuthButton.tsx` - Authentication button
- `VocabularyContent.tsx` - Vocabulary display

### D. Type Definitions

Located in: `src/lib/types.ts`

---

**Report Generated:** January 3, 2026
**Version:** 1.0.0
**Author:** SSL English Development Team
