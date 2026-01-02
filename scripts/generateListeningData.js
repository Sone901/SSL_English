const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

// Đọc trực tiếp từ file Excel
const workbook = XLSX.readFile(path.join(__dirname, '../public/listening_data.xlsx'));
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const answers = XLSX.utils.sheet_to_json(worksheet);

console.log('Đang đọc file Excel...');
console.log(`Tổng số dòng: ${answers.length}`);

// Danh sách các file audio và số câu hỏi tương ứng
const audioFiles = [
  { file: '1-2.mp4', questions: [1, 2] },
  { file: '3-4.mp4', questions: [3, 4] },
  { file: '5-6.mp4', questions: [5, 6] },
  { file: '7-8.mp4', questions: [7, 8] },
  { file: '9-10.mp4', questions: [9, 10] },
  { file: '11-12.mp4', questions: [11, 12] },
  { file: '13-14.mp4', questions: [13, 14] },
  { file: '15-16.mp4', questions: [15, 16] },
  { file: '17-18.mp4', questions: [17, 18] },
  { file: '19-20.mp4', questions: [19, 20] },
  { file: '21-22.mp4', questions: [21, 22] },
  { file: '23-24.mp4', questions: [23, 24] },
  { file: '25-26.mp4', questions: [25, 26] },
  { file: '27-28.mp4', questions: [27, 28] },
  { file: '29-30.mp4', questions: [29, 30] },
  { file: '31-32.mp4', questions: [31, 32] },
  { file: '33-34.mp4', questions: [33, 34] },
  { file: '35-36.mp4', questions: [35, 36] },
  { file: '37-38.mp4', questions: [37, 38] },
  { file: '39-40.mp4', questions: [39, 40] },
  { file: '41-42-43.mp4', questions: [41, 42, 43] },
  { file: '44-46.mp4', questions: [44, 45, 46] },
  { file: '47-48-49.mp4', questions: [47, 48, 49] },
  { file: '50-51-52.mp4', questions: [50, 51, 52] },
  { file: '53-54-55.mp4', questions: [53, 54, 55] },
  { file: '56-57-58.mp4', questions: [56, 57, 58] },
  { file: '59-60-61.mp4', questions: [59, 60, 61] },
  { file: '62-63-64.mp4', questions: [62, 63, 64] },
  { file: '65-66-67.mp4', questions: [65, 66, 67] },
  { file: '68-69-70.mp4', questions: [68, 69, 70] },
  { file: '71-72-73.mp4', questions: [71, 72, 73] },
  { file: '74-75-76.mp4', questions: [74, 75, 76] },
  { file: '77-78-79.mp4', questions: [77, 78, 79] },
  { file: '80-81-82.mp4', questions: [80, 81, 82] },
  { file: '83-84-85.mp4', questions: [83, 84, 85] },
  { file: '86-87-88.mp4', questions: [86, 87, 88] },
  { file: '89-90-91.mp4', questions: [89, 90, 91] },
  { file: '92-93-94.mp4', questions: [92, 93, 94] },
  { file: '95-96-97.mp4', questions: [95, 96, 97] },
  { file: '98-99-100.mp4', questions: [98, 99, 100] },
];

// Tạo map câu hỏi chi tiết
const questionDetails = {};
answers.forEach(item => {
  const questionNum = item['Câu'];
  const answerLetter = item['Đáp án'];
  const answerIndex = answerLetter === 'A' ? 0 : answerLetter === 'B' ? 1 : answerLetter === 'C' ? 2 : 3;
  
  // Nếu có nội dung câu hỏi (từ câu 41 trở đi)
  if (item['Nội dung câu hỏi (Question Text)']) {
    questionDetails[questionNum] = {
      question: item['Nội dung câu hỏi (Question Text)'],
      optionA: item['(A)'] || 'A',
      optionB: item['(B)'] || 'B',
      optionC: item['(C)'] || 'C',
      optionD: item['(D)'] || 'D',
      correctAnswer: answerIndex
    };
  } else {
    // Câu 1-40: chỉ có đáp án
    questionDetails[questionNum] = {
      question: null,
      optionA: 'A',
      optionB: 'B',
      optionC: 'C',
      optionD: 'D',
      correctAnswer: answerIndex
    };
  }
});

// Tạo TypeScript code
let tsCode = `export interface ListeningQuestion {
  question: string
  questionVi: string
  options: string[]
  correctAnswer: number
  explanation: string
  explanationVi: string
}

export interface ListeningLesson {
  id: number
  title: string
  titleVi: string
  audioPath: string
  level: 'A1' | 'A2' | 'B1' | 'B2'
  duration: string
  transcript?: string
  transcriptVi?: string
  questions: ListeningQuestion[]
}

export const LISTENING_LESSONS: ListeningLesson[] = [
`;

audioFiles.forEach((item, index) => {
  const fileName = item.file.replace('.mp4', '');
  
  // Xác định cấp độ dựa trên số thứ tự bài học (10 bài mỗi cấp)
  let level = 'A1';
  if (index >= 30) level = 'B2';
  else if (index >= 20) level = 'B1';
  else if (index >= 10) level = 'A2';
  
  const questionsList = item.questions.map((qNum, qIndex) => {
    const detail = questionDetails[qNum];
    
    // Nếu có nội dung câu hỏi
    if (detail && detail.question) {
      return `      {
        question: '${detail.question.replace(/'/g, "\\'")}',
        questionVi: 'Câu hỏi ${qNum}: ${detail.question.replace(/'/g, "\\'")}',
        options: ['${detail.optionA.replace(/'/g, "\\'")}', '${detail.optionB.replace(/'/g, "\\'")}', '${detail.optionC.replace(/'/g, "\\'")}', '${detail.optionD.replace(/'/g, "\\'")}'],
        correctAnswer: ${detail.correctAnswer},
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }`;
    } else {
      // Không có nội dung câu hỏi (câu 1-40)
      return `      {
        question: 'Mark your answer on your answer sheet.',
        questionVi: 'Câu hỏi ${qNum}: Mark your answer on your answer sheet.',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: ${detail ? detail.correctAnswer : 0},
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }`;
    }
  }).join(',\n');

  tsCode += `  {
    id: ${index + 1},
    title: '${fileName}',
    titleVi: 'Câu ${fileName}',
    audioPath: '/audio/${item.file}',
    level: '${level}',
    duration: '2:30',
    questions: [
${questionsList}
    ]
  }${index < audioFiles.length - 1 ? ',' : ''}
`;
});

tsCode += `]\n`;

// Lưu file
fs.writeFileSync(
  path.join(__dirname, '../src/data/listeningData.ts'),
  tsCode,
  'utf8'
);

console.log('✅ Đã tạo file listeningData.ts với đáp án từ Excel!');
console.log(`📊 Tổng số bài học: ${audioFiles.length}`);
console.log(`📝 Tổng số câu hỏi: ${answers.length}`);
console.log('📚 Phân phối cấp độ: A1 (1-10), A2 (11-20), B1 (21-30), B2 (31-40)');
