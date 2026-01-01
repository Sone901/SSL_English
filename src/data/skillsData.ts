export interface SkillContent {
  category: string
  title: string
  description: string
  items: Array<{
    id: number
    title: string
    subtitle?: string
    description: string
    videoUrl?: string
    audioUrl?: string
    transcript?: string
    viTranslation?: string
    duration: string
    level: 'A1' | 'A2' | 'B1' | 'B2'
    tips?: string[]
  }>
}

export const LISTENING_CONTENTS: Record<string, SkillContent> = {
  lessons: {
    category: 'lessons',
    title: 'Bài Học Nghe Hiểu',
    description: 'Luyện nghe qua các video bài giảng tiếng Anh theo từng cấp độ',
    items: [
      {
        id: 1,
        title: 'English Listening Practice - Level A1',
        description: 'Bài học nghe cơ bản cho người mới bắt đầu',
        videoUrl: 'https://www.youtube.com/embed/XGcErXnw9_Y',
        transcript: 'Practice listening with simple conversations and everyday situations. Perfect for beginners learning English.',
        viTranslation: 'Luyện nghe với các hội thoại đơn giản và tình huống hàng ngày. Hoàn hảo cho người mới bắt đầu học tiếng Anh.',
        duration: '30:00',
        level: 'A1'
      },
      {
        id: 2,
        title: 'English Listening Practice - Level A2',
        description: 'Bài học nghe sơ cấp cho người đã có nền tảng',
        videoUrl: 'https://www.youtube.com/embed/ny1wb1nUPEE',
        transcript: 'Improve your listening skills with practical conversations and common topics. Suitable for elementary level learners.',
        viTranslation: 'Cải thiện kỹ năng nghe với các hội thoại thực tế và chủ đề phổ biến. Phù hợp cho học viên cấp độ sơ cấp.',
        duration: '30:00',
        level: 'A2'
      },
      {
        id: 3,
        title: 'English Listening Practice - Level B1',
        description: 'Bài học nghe trung cấp',
        videoUrl: 'https://www.youtube.com/embed/Cbn5-8jXT6A',
        transcript: 'Enhance your listening comprehension with intermediate level content. Covers various topics and situations.',
        viTranslation: 'Nâng cao khả năng nghe hiểu với nội dung trung cấp. Bao gồm nhiều chủ đề và tình huống khác nhau.',
        duration: '30:00',
        level: 'B1'
      },
      {
        id: 4,
        title: 'English Listening Practice - Level B2',
        description: 'Bài học nghe trung cấp cao',
        videoUrl: 'https://www.youtube.com/embed/qQrW0ncxsxc',
        transcript: 'Advanced listening practice with complex conversations and diverse topics. Challenge yourself with upper-intermediate content.',
        viTranslation: 'Luyện nghe nâng cao với các hội thoại phức tạp và chủ đề đa dạng. Thử thách bản thân với nội dung trung cấp cao.',
        duration: '30:00',
        level: 'B2'
      }
    ]
  }
}

// ============================================
// AI INTEGRATION: Text-to-Speech API
// ============================================
// Text-to-Speech function for Listening
// Sử dụng Web Speech API để đọc văn bản thành giọng nói
export const speakText = (text: string, lang: string = 'en-US') => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel() // Stop any ongoing speech
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    utterance.rate = 0.9 // Slightly slower for learning
    window.speechSynthesis.speak(utterance)
  } else {
    alert('Trình duyệt không hỗ trợ Text-to-Speech')
  }
}
// ============================================

// ============================================
// AUTO-GENERATED LISTENING COMPREHENSION QUESTIONS
// ============================================
export interface ListeningQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
}

// Function to automatically generate listening comprehension questions
export const generateListeningQuestions = (transcript: string): ListeningQuestion[] => {
  // Simple pattern-based question generation
  // In a real application, this could use AI (Gemini API) for better questions
  
  const sentences = transcript.split(/[.!?]+/).filter(s => s.trim().length > 0)
  const questions: ListeningQuestion[] = []
  
  // Generate different types of questions based on content
  
  // Question 1: Main topic/idea
  questions.push({
    id: 1,
    question: 'What is the main topic of this conversation?',
    options: generateTopicOptions(transcript),
    correctAnswer: generateTopicOptions(transcript)[0],
    explanation: 'This question tests your understanding of the main topic discussed.'
  })

  // Question 2: Specific detail
  if (sentences.length > 0) {
    const detailSentence = sentences[Math.floor(sentences.length / 2)]
    questions.push({
      id: 2,
      question: 'According to the conversation, what was mentioned?',
      options: generateDetailOptions(detailSentence),
      correctAnswer: generateDetailOptions(detailSentence)[0],
      explanation: 'This question tests your ability to remember specific details.'
    })
  }

  // Question 3: Inference/understanding
  questions.push({
    id: 3,
    question: 'What can you infer from this conversation?',
    options: generateInferenceOptions(transcript),
    correctAnswer: generateInferenceOptions(transcript)[0],
    explanation: 'This question tests your ability to understand implied meaning.'
  })

  // Question 4: Vocabulary in context
  const keywords = extractKeywords(transcript)
  if (keywords.length > 0) {
    questions.push({
      id: 4,
      question: `What does "${keywords[0]}" mean in this context?`,
      options: generateVocabOptions(keywords[0]),
      correctAnswer: generateVocabOptions(keywords[0])[0],
      explanation: 'This question tests your vocabulary understanding in context.'
    })
  }

  return questions
}

// Helper function: Generate topic options
const generateTopicOptions = (transcript: string): string[] => {
  const lower = transcript.toLowerCase()
  
  if (lower.includes('coffee') || lower.includes('restaurant') || lower.includes('food')) {
    return [
      'Ordering food or drinks',
      'Discussing weather',
      'Talking about sports',
      'Planning a vacation'
    ]
  } else if (lower.includes('hotel') || lower.includes('room') || lower.includes('booking')) {
    return [
      'Booking accommodation',
      'Shopping for clothes',
      'Going to the hospital',
      'Learning a language'
    ]
  } else if (lower.includes('weather') || lower.includes('sunny') || lower.includes('rain')) {
    return [
      'Weather and climate',
      'Business meeting',
      'Sports competition',
      'School subjects'
    ]
  } else if (lower.includes('technology') || lower.includes('computer') || lower.includes('ai')) {
    return [
      'Technology and innovation',
      'Cooking recipes',
      'Garden design',
      'Fashion trends'
    ]
  } else {
    return [
      'Daily life conversation',
      'Business negotiation',
      'Medical consultation',
      'Legal advice'
    ]
  }
}

// Helper function: Generate detail options
const generateDetailOptions = (sentence: string): string[] => {
  const words = sentence.trim().split(' ')
  const keyPhrase = words.slice(0, Math.min(5, words.length)).join(' ')
  
  return [
    keyPhrase,
    'Something completely different',
    'The opposite of what was said',
    'A topic not mentioned'
  ]
}

// Helper function: Generate inference options
const generateInferenceOptions = (transcript: string): string[] => {
  const lower = transcript.toLowerCase()
  
  if (lower.includes('please') || lower.includes('thank')) {
    return [
      'The speakers are polite and friendly',
      'The speakers are arguing',
      'The speakers are confused',
      'The speakers are in a hurry'
    ]
  } else if (lower.includes('need') || lower.includes('want') || lower.includes('like')) {
    return [
      'Someone is making a request or expressing a desire',
      'Someone is refusing help',
      'Someone is giving orders',
      'Someone is complaining'
    ]
  } else {
    return [
      'The conversation is casual and informal',
      'The conversation is very formal',
      'The speakers don\'t understand each other',
      'The speakers are angry'
    ]
  }
}

// Helper function: Extract keywords
const extractKeywords = (transcript: string): string[] => {
  const commonWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'have', 'has', 'do', 'does', 'will', 'would', 'can', 'could', 'should', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'this', 'that', 'what', 'where', 'when', 'who', 'how', 'my', 'your', 'his', 'her', 'our', 'their'])
  
  const words = transcript.toLowerCase()
    .replace(/[^a-z\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 3 && !commonWords.has(w))
  
  // Return unique words, limit to first 3
  return [...new Set(words)].slice(0, 3)
}

// Helper function: Generate vocabulary options
const generateVocabOptions = (keyword: string): string[] => {
  // This is a simplified version. In production, use a dictionary API or AI
  const meanings: Record<string, string[]> = {
    'coffee': ['A hot beverage made from roasted beans', 'A type of fruit', 'A cold dessert', 'A vegetable dish'],
    'booking': ['Making a reservation', 'Reading a book', 'Cooking food', 'Playing sports'],
    'weather': ['The state of the atmosphere', 'A type of leather', 'Old and worn', 'A news report'],
    'technology': ['The application of scientific knowledge', 'Ancient history', 'Natural resources', 'Physical exercise'],
    'conversation': ['A talk between people', 'A written document', 'A mathematical formula', 'A building structure']
  }
  
  return meanings[keyword.toLowerCase()] || [
    'The meaning based on context',
    'Something unrelated',
    'The opposite meaning',
    'A different word entirely'
  ]
}
// ============================================

// ============================================
// READING CONTENTS
// ============================================
export const READING_CONTENTS: Record<string, SkillContent> = {
  short_texts: {
    category: 'short_texts',
    title: 'Văn Bản Ngắn',
    description: 'Đọc và hiểu các đoạn văn ngắn',
    items: [
      {
        id: 1,
        title: 'My Daily Routine',
        description: 'Đọc về thói quen hàng ngày',
        transcript: 'I wake up at 7 AM every day. First, I brush my teeth and wash my face. Then I have breakfast with my family. I usually eat bread and drink milk. After that, I go to school.',
        viTranslation: 'Tôi thức dậy lúc 7 giờ sáng mỗi ngày. Đầu tiên, tôi đánh răng và rửa mặt. Sau đó tôi ăn sáng với gia đình. Tôi thường ăn bánh mì và uống sữa. Sau đó, tôi đi học.',
        duration: '5 phút',
        level: 'A1'
      },
      {
        id: 2,
        title: 'A Visit to the Zoo',
        description: 'Đọc về chuyến tham quan sở thú',
        transcript: 'Last Sunday, my family went to the zoo. We saw many animals like lions, elephants, and monkeys. The monkeys were very funny. They jumped and played together. My little brother liked the penguins the most. We had a great time.',
        viTranslation: 'Chủ nhật tuần trước, gia đình tôi đi sở thú. Chúng tôi thấy nhiều động vật như sư tử, voi và khỉ. Những con khỉ rất buồn cười. Chúng nhảy và chơi cùng nhau. Em trai tôi thích chim cánh cụt nhất. Chúng tôi đã có khoảng thời gian tuyệt vời.',
        duration: '5 phút',
        level: 'A2'
      },
      {
        id: 3,
        title: 'The Benefits of Reading',
        description: 'Lợi ích của việc đọc sách',
        transcript: 'Reading is one of the most beneficial activities for the mind. It improves vocabulary, enhances concentration, and reduces stress. Studies show that people who read regularly have better memory and analytical thinking skills. Reading before bed can also help you sleep better.',
        viTranslation: 'Đọc sách là một trong những hoạt động có lợi nhất cho trí óc. Nó cải thiện vốn từ vựng, tăng cường khả năng tập trung và giảm căng thẳng. Các nghiên cứu cho thấy người đọc sách thường xuyên có trí nhớ và kỹ năng tư duy phân tích tốt hơn. Đọc sách trước khi ngủ cũng có thể giúp bạn ngủ ngon hơn.',
        duration: '8 phút',
        level: 'B1'
      }
    ]
  },
  stories: {
    category: 'stories',
    title: 'Truyện Ngắn',
    description: 'Đọc các câu chuyện thú vị',
    items: [
      {
        id: 1,
        title: 'The Ant and the Grasshopper',
        description: 'Câu chuyện về con kiến và con châu chấu',
        transcript: 'One summer, a grasshopper was singing and playing all day. An ant was working hard, collecting food. The grasshopper laughed at the ant. But when winter came, the grasshopper had no food. The ant had plenty to eat because he worked hard.',
        viTranslation: 'Một mùa hè, một con châu chấu hát và chơi cả ngày. Một con kiến đang làm việc chăm chỉ, thu thập thức ăn. Con châu chấu cười con kiến. Nhưng khi mùa đông đến, con châu chấu không có thức ăn. Con kiến có nhiều thức ăn vì nó đã làm việc chăm chỉ.',
        duration: '7 phút',
        level: 'A2'
      }
    ]
  }
}

// ============================================
// SPEAKING CONTENTS  
// ============================================
export interface SpeakingContent {
  category: string
  title: string
  description: string
  items: Array<{
    id: number
    title: string
    description: string
    prompt: string
    sampleAnswer?: string
    viSample?: string
    duration: string
    level: 'A1' | 'A2' | 'B1' | 'B2'
  }>
}

export const SPEAKING_CONTENTS: Record<string, SpeakingContent> = {
  self_introduction: {
    category: 'self_introduction',
    title: 'Giới Thiệu Bản Thân',
    description: 'Luyện nói về bản thân',
    items: [
      {
        id: 1,
        title: 'Tell me about yourself',
        description: 'Giới thiệu tên, tuổi và sở thích',
        prompt: 'Introduce yourself: your name, age, and hobbies.',
        sampleAnswer: 'Hello, my name is John. I am 20 years old. I like reading books and playing football.',
        viSample: 'Xin chào, tên tôi là John. Tôi 20 tuổi. Tôi thích đọc sách và chơi bóng đá.',
        duration: '1-2 phút',
        level: 'A1'
      },
      {
        id: 2,
        title: 'Describe your family',
        description: 'Nói về gia đình của bạn',
        prompt: 'Tell me about your family members and what they do.',
        sampleAnswer: 'I have a small family. My father is a teacher and my mother is a nurse. I have one younger sister who is still in high school.',
        viSample: 'Tôi có một gia đình nhỏ. Bố tôi là giáo viên và mẹ tôi là y tá. Tôi có một em gái đang học cấp ba.',
        duration: '2-3 phút',
        level: 'A2'
      }
    ]
  },
  daily_topics: {
    category: 'daily_topics',
    title: 'Chủ Đề Hàng Ngày',
    description: 'Thảo luận về các chủ đề thường gặp',
    items: [
      {
        id: 1,
        title: 'Your favorite food',
        description: 'Nói về món ăn yêu thích',
        prompt: 'What is your favorite food and why do you like it?',
        sampleAnswer: 'My favorite food is pizza. I love it because it has many different toppings and tastes delicious. I usually eat pizza with my friends on weekends.',
        viSample: 'Món ăn yêu thích của tôi là pizza. Tôi thích nó vì có nhiều loại nhân khác nhau và rất ngon. Tôi thường ăn pizza với bạn bè vào cuối tuần.',
        duration: '2-3 phút',
        level: 'A2'
      }
    ]
  }
}

// ============================================
// WRITING CONTENTS
// ============================================
export interface WritingContent {
  category: string
  title: string
  description: string
  items: Array<{
    id: number
    title: string
    description: string
    prompt: string
    sampleAnswer?: string
    viSample?: string
    wordCount: string
    level: 'A1' | 'A2' | 'B1' | 'B2'
  }>
}

export const WRITING_CONTENTS: Record<string, WritingContent> = {
  sentences: {
    category: 'sentences',
    title: 'Viết Câu',
    description: 'Luyện viết câu đơn giản',
    items: [
      {
        id: 1,
        title: 'Write about yourself',
        description: 'Viết 3-5 câu về bản thân',
        prompt: 'Write 3-5 sentences about yourself: your name, age, job/school, and hobbies.',
        sampleAnswer: 'My name is Sarah. I am 18 years old. I am a student at ABC High School. I like drawing and listening to music. My favorite subject is English.',
        viSample: 'Tên tôi là Sarah. Tôi 18 tuổi. Tôi là học sinh trường THPT ABC. Tôi thích vẽ và nghe nhạc. Môn học yêu thích của tôi là tiếng Anh.',
        wordCount: '30-50 từ',
        level: 'A1'
      },
      {
        id: 2,
        title: 'Describe your daily routine',
        description: 'Viết về thói quen hàng ngày',
        prompt: 'Write 5-7 sentences about your daily routine from morning to evening.',
        sampleAnswer: 'I wake up at 6:30 every morning. After washing my face and brushing my teeth, I have breakfast. Then I go to school at 7:00. I have lunch at 12:00. After school, I do my homework and help my mom. In the evening, I watch TV and go to bed at 10:00.',
        viSample: 'Tôi thức dậy lúc 6:30 mỗi sáng. Sau khi rửa mặt và đánh răng, tôi ăn sáng. Sau đó tôi đi học lúc 7:00. Tôi ăn trưa lúc 12:00. Sau giờ học, tôi làm bài tập và giúp mẹ. Buổi tối, tôi xem TV và đi ngủ lúc 10:00.',
        wordCount: '50-70 từ',
        level: 'A2'
      }
    ]
  },
  paragraphs: {
    category: 'paragraphs',
    title: 'Viết Đoạn Văn',
    description: 'Luyện viết đoạn văn',
    items: [
      {
        id: 1,
        title: 'My Best Friend',
        description: 'Viết về người bạn thân nhất',
        prompt: 'Write a paragraph (80-100 words) describing your best friend.',
        sampleAnswer: 'My best friend is Tom. We have been friends for five years. He is very kind and funny. Tom always helps me when I have problems. He is good at math and often explains difficult lessons to me. We like playing basketball together after school. Tom wants to become a doctor in the future. I am lucky to have such a good friend.',
        viSample: 'Bạn thân nhất của tôi là Tom. Chúng tôi là bạn được năm năm. Anh ấy rất tốt bụng và vui tính. Tom luôn giúp tôi khi tôi gặp khó khăn. Anh ấy giỏi toán và thường giải thích những bài học khó cho tôi. Chúng tôi thích chơi bóng rổ cùng nhau sau giờ học. Tom muốn trở thành bác sĩ trong tương lai. Tôi may mắn khi có một người bạn tốt như vậy.',
        wordCount: '80-100 từ',
        level: 'B1'
      }
    ]
  }
}
