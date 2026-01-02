const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

// Đọc trực tiếp từ file Excel
const workbook = XLSX.readFile(path.join(__dirname, '../public/reading_data.xlsx'));
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet);

console.log('Đang đọc file Excel...');
console.log(`Tổng số câu hỏi: ${data.length}`);

// Nhóm các câu hỏi theo đoạn văn
const passageMap = new Map();

data.forEach(item => {
  const passage = item['Đoạn văn'];
  const level = item['Bậc'];
  
  if (!passageMap.has(passage)) {
    passageMap.set(passage, {
      passage: passage,
      level: level,
      questions: []
    });
  }
  
  const answerLetter = item['Đáp án'];
  const answerIndex = answerLetter === 'A' ? 0 : answerLetter === 'B' ? 1 : answerLetter === 'C' ? 2 : 3;
  
  passageMap.get(passage).questions.push({
    question: item['Nội dung câu hỏi (Question Text)'],
    optionA: item['(A)'],
    optionB: item['(B)'],
    optionC: item['(C)'],
    optionD: item['(D)'],
    correctAnswer: answerIndex
  });
});

// Chuyển map thành array và sắp xếp theo level
const passages = Array.from(passageMap.values());
console.log(`Tổng số đoạn văn: ${passages.length}`);

// Đếm số lượng theo level
const levelCount = {};
passages.forEach(p => {
  levelCount[p.level] = (levelCount[p.level] || 0) + 1;
});
console.log('Phân bổ theo cấp độ:', levelCount);

// Tạo TypeScript code
let tsCode = `export interface ReadingQuestion {
  question: string
  questionVi: string
  options: string[]
  correctAnswer: number
  explanation: string
  explanationVi: string
}

export interface ReadingLesson {
  id: number
  title: string
  titleVi: string
  passage: string
  passageVi?: string
  level: 'A1' | 'A2' | 'B1' | 'B2'
  questions: ReadingQuestion[]
}

export const READING_LESSONS: ReadingLesson[] = [
`;

passages.forEach((item, index) => {
  const questionsList = item.questions.map((q, qIdx) => {
    const questionNum = qIdx + 1; // Đánh số từ 1-4
    const question = String(q.question || '').replace(/'/g, "\\'");
    const optionA = String(q.optionA || '').replace(/'/g, "\\'");
    const optionB = String(q.optionB || '').replace(/'/g, "\\'");
    const optionC = String(q.optionC || '').replace(/'/g, "\\'");
    const optionD = String(q.optionD || '').replace(/'/g, "\\'");
    
    return `      {
        question: '${question}',
        questionVi: 'Câu hỏi ${questionNum}: ${question}',
        options: ['${optionA}', '${optionB}', '${optionC}', '${optionD}'],
        correctAnswer: ${q.correctAnswer},
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }`;
  }).join(',\n');

  tsCode += `  {
    id: ${index + 1},
    title: 'Passage ${index + 1}',
    titleVi: 'Đoạn văn ${index + 1}',
    passage: '${item.passage.replace(/'/g, "\\'").replace(/\n/g, ' ')}',
    level: '${item.level}',
    questions: [
${questionsList}
    ]
  }${index < passages.length - 1 ? ',' : ''}
`;
});

tsCode += `]\n`;

// Lưu file
fs.writeFileSync(
  path.join(__dirname, '../src/data/readingData.ts'),
  tsCode,
  'utf8'
);

console.log('✅ Đã tạo file readingData.ts với dữ liệu từ Excel!');
console.log(`📊 Tổng số bài đọc: ${passages.length}`);
console.log(`📝 Tổng số câu hỏi: ${data.length}`);
console.log('📚 Phân bổ:', Object.entries(levelCount).map(([k, v]) => `${k} (${v} bài)`).join(', '));
