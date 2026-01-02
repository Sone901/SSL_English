export interface ReadingQuestion {
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
  {
    id: 1,
    title: 'Passage 1',
    titleVi: 'Đoạn văn 1',
    passage: 'Elisa Gonzalez moved to Dublin, Ireland in 2013. A famous poet named Seamus Heaney died a few weeks before she arrived. Elisa visited his house and the countryside. She wanted to see the places in his poems.',
    level: 'A1',
    questions: [
      {
        question: 'Where did Elisa Gonzalez move to in 2013?',
        questionVi: 'Câu hỏi 1: Where did Elisa Gonzalez move to in 2013?',
        options: ['London', 'Dublin', 'New York', 'Paris'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'Who was Seamus Heaney?',
        questionVi: 'Câu hỏi 2: Who was Seamus Heaney?',
        options: ['A doctor', 'A pilot', 'A famous poet', 'A teacher'],
        correctAnswer: 2,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'When did Seamus Heaney die?',
        questionVi: 'Câu hỏi 3: When did Seamus Heaney die?',
        options: ['Before Elisa arrived', 'After Elisa arrived', 'In 2024', 'Many years ago'],
        correctAnswer: 0,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'Why did Elisa visit the countryside?',
        questionVi: 'Câu hỏi 4: Why did Elisa visit the countryside?',
        options: ['To buy a house', 'To see poem places', 'To go swimming', 'To find a job'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 2,
    title: 'Passage 2',
    titleVi: 'Đoạn văn 2',
    passage: 'When Elisa moved to Dublin, she felt Seamus Heaney’s presence everywhere. She did not go to Ireland to find the man himself, but to find the country from his books. She traveled to places like Glanmore and Bellaghy. She learned that a poet’s world is made of language.',
    level: 'A2',
    questions: [
      {
        question: 'How did Elisa feel about Heaney in Dublin?',
        questionVi: 'Câu hỏi 1: How did Elisa feel about Heaney in Dublin?',
        options: ['She forgot him', 'He was everywhere', 'He was a stranger', 'She was afraid'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What was Elisa looking for in Ireland?',
        questionVi: 'Câu hỏi 2: What was Elisa looking for in Ireland?',
        options: ['A new friend', 'A dead man', 'The country in books', 'A gold mine'],
        correctAnswer: 2,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'Where did Elisa travel to?',
        questionVi: 'Câu hỏi 3: Where did Elisa travel to?',
        options: ['Only Dublin', 'Glanmore & Bellaghy', 'To the mountains', 'To another country'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What is a poet\'s world made of, according to Elisa?',
        questionVi: 'Câu hỏi 4: What is a poet\'s world made of, according to Elisa?',
        options: ['Money and fame', 'Earth and water', 'Only silence', 'Language'],
        correctAnswer: 3,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 3,
    title: 'Passage 3',
    titleVi: 'Đoạn văn 3',
    passage: 'In the autumn of 2013, the author sought the country Heaney’s poems had built in her mind. Her "searching" became a literal map of the island, from the Glanmore cottage to the soil of Bellaghy. She wanted to verify if the "black butter" of the bogs and the "slap and plop" of the water were real or just poetic imagination.',
    level: 'B1',
    questions: [
      {
        question: 'What does the "country" in the text represent?',
        questionVi: 'Câu hỏi 1: What does the "country" in the text represent?',
        options: ['A political state', 'A map Elisa bought', 'An internal mental image', 'A travel guide'],
        correctAnswer: 2,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What was the purpose of Elisa\'s "literal map"?',
        questionVi: 'Câu hỏi 2: What was the purpose of Elisa\'s "literal map"?',
        options: ['To find a new home', 'To track Heaney\'s life', 'To hide from people', 'To study history'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'The author uses "black butter" to describe:',
        questionVi: 'Câu hỏi 3: The author uses "black butter" to describe:',
        options: ['A type of food', 'The peat bogs', 'The humid air', 'The ocean water'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'Why did the author mention "slap and plop"?',
        questionVi: 'Câu hỏi 4: Why did the author mention "slap and plop"?',
        options: ['To describe a noise', 'To show she was lost', 'To complain about rain', 'To talk about cooking'],
        correctAnswer: 0,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 4,
    title: 'Passage 4',
    titleVi: 'Đoạn văn 4',
    passage: 'Heaney’s presence in Dublin felt like a physical weight in the humid air. Gonzalez suggests that searching for a deceased poet is an attempt to find where language survives the speaker. The landscape is not merely geographical; it is a linguistic legacy that persists in the damp soil and the collective memory of the island.',
    level: 'B2',
    questions: [
      {
        question: 'What is implied by the phrase "physical weight"?',
        questionVi: 'Câu hỏi 1: What is implied by the phrase "physical weight"?',
        options: ['Dublin was very hot', 'A heavy statue', 'A strong influence', 'Many heavy books'],
        correctAnswer: 2,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What is the main paradox in the author’s search?',
        questionVi: 'Câu hỏi 2: What is the main paradox in the author’s search?',
        options: ['Searching for a dead man', 'Finding a map', 'Moving in autumn', 'Living in a cottage'],
        correctAnswer: 0,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'According to the text, how does a poet survive?',
        questionVi: 'Câu hỏi 3: According to the text, how does a poet survive?',
        options: ['Through their family', 'Through their language', 'By living in Ireland', 'In the humid air'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What is the author\'s view on the Irish landscape?',
        questionVi: 'Câu hỏi 4: What is the author\'s view on the Irish landscape?',
        options: ['It\'s just earth', 'It\'s hard to find', 'It\'s a linguistic legacy', 'It\'s only for tourists'],
        correctAnswer: 2,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 5,
    title: 'Passage 5',
    titleVi: 'Đoạn văn 5',
    passage: 'Seamus Heaney was a very famous man in Ireland. He wrote many beautiful poems. He won the Nobel Prize in 1995. Many people in Dublin love his books and remember him.',
    level: 'A1',
    questions: [
      {
        question: 'What was Seamus Heaney\'s job?',
        questionVi: 'Câu hỏi 1: What was Seamus Heaney\'s job?',
        options: ['Doctor', 'Writer/Poet', 'Farmer', 'Teacher'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'Where was he very famous?',
        questionVi: 'Câu hỏi 2: Where was he very famous?',
        options: ['England', 'America', 'Ireland', 'France'],
        correctAnswer: 2,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'When did he win the Nobel Prize?',
        questionVi: 'Câu hỏi 3: When did he win the Nobel Prize?',
        options: ['1995', '2013', '2026', '1985'],
        correctAnswer: 0,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What do people in Dublin think of his books?',
        questionVi: 'Câu hỏi 4: What do people in Dublin think of his books?',
        options: ['They hate them', 'They love them', 'They don\'t know them', 'They lost them'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 6,
    title: 'Passage 6',
    titleVi: 'Đoạn văn 6',
    passage: 'Elisa went to a small house in Glanmore. This house is called a cottage. It is very quiet and peaceful there. Seamus Heaney lived and wrote poems in this house for a long time.',
    level: 'A1',
    questions: [
      {
        question: 'What kind of house did Elisa visit?',
        questionVi: 'Câu hỏi 1: What kind of house did Elisa visit?',
        options: ['A big hotel', 'A tall building', 'A small cottage', 'A school'],
        correctAnswer: 2,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'Where is the house located?',
        questionVi: 'Câu hỏi 2: Where is the house located?',
        options: ['In Dublin city', 'In Glanmore', 'In a library', 'On a boat'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'How is the atmosphere at the house?',
        questionVi: 'Câu hỏi 3: How is the atmosphere at the house?',
        options: ['Noisy', 'Scary', 'Quiet and peaceful', 'Very hot'],
        correctAnswer: 2,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What did Heaney do in this house?',
        questionVi: 'Câu hỏi 4: What did Heaney do in this house?',
        options: ['He played football', 'He wrote poems', 'He fixed cars', 'He sold food'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 7,
    title: 'Passage 7',
    titleVi: 'Đoạn văn 7',
    passage: 'The ground in Ireland is often wet. Heaney wrote about the water and the earth. He called the wet ground "bogs". Elisa wanted to see these bogs with her own eyes.',
    level: 'A1',
    questions: [
      {
        question: 'How is the ground in Ireland usually?',
        questionVi: 'Câu hỏi 1: How is the ground in Ireland usually?',
        options: ['Dry', 'Wet', 'Sandy', 'Hard'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What did Heaney write about?',
        questionVi: 'Câu hỏi 2: What did Heaney write about?',
        options: ['Space and stars', 'Cats and dogs', 'Water and earth', 'Cars and planes'],
        correctAnswer: 2,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What is "bog"?',
        questionVi: 'Câu hỏi 3: What is "bog"?',
        options: ['A type of cloud', 'A wet ground', 'A big mountain', 'A fast river'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What did Elisa want to see?',
        questionVi: 'Câu hỏi 4: What did Elisa want to see?',
        options: ['The bogs', 'A movie', 'A new car', 'A stadium'],
        correctAnswer: 0,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 8,
    title: 'Passage 8',
    titleVi: 'Đoạn văn 8',
    passage: 'Seamus Heaney grew up on a farm with his family. He often saw his father working in the fields. Later, he used his pen to write about his memories. He felt that writing was his own way of working.',
    level: 'A2',
    questions: [
      {
        question: 'Where did Heaney grow up?',
        questionVi: 'Câu hỏi 1: Where did Heaney grow up?',
        options: ['In a large city', 'On a farm', 'In a museum', 'At a university'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'Who did Heaney watch working in the fields?',
        questionVi: 'Câu hỏi 2: Who did Heaney watch working in the fields?',
        options: ['His mother', 'His teacher', 'His father', 'His friend'],
        correctAnswer: 2,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What tool did Heaney use for his work?',
        questionVi: 'Câu hỏi 3: What tool did Heaney use for his work?',
        options: ['A spade', 'A pen', 'A tractor', 'A camera'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What did Heaney write about?',
        questionVi: 'Câu hỏi 4: What did Heaney write about?',
        options: ['His memories', 'The future', 'How to cook', 'New technology'],
        correctAnswer: 0,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 9,
    title: 'Passage 9',
    titleVi: 'Đoạn văn 9',
    passage: 'Dublin is the capital of Ireland. Many people there still talk about Heaney even though he is gone. They remember his voice and his kind personality. He is like a hero to the Irish people.',
    level: 'A2',
    questions: [
      {
        question: 'What is Dublin?',
        questionVi: 'Câu hỏi 1: What is Dublin?',
        options: ['A small village', 'The capital of Ireland', 'A park', 'A bookstore'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'Do people still talk about Heaney?',
        questionVi: 'Câu hỏi 2: Do people still talk about Heaney?',
        options: ['No, they forgot him', 'Yes, they still do', 'Only on holidays', 'Never'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What do people remember about him?',
        questionVi: 'Câu hỏi 3: What do people remember about him?',
        options: ['His car', 'His voice and kindness', 'His money', 'His house'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'How do Irish people feel about him?',
        questionVi: 'Câu hỏi 4: How do Irish people feel about him?',
        options: ['He is a hero', 'He is a stranger', 'He is a worker', 'He is a student'],
        correctAnswer: 0,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 10,
    title: 'Passage 10',
    titleVi: 'Đoạn văn 10',
    passage: 'Elisa traveled across the island by car. She saw the green grass and the grey sky of Ireland. Everything looked like the descriptions in Heaney\'s poems. She felt very happy to be there.',
    level: 'A2',
    questions: [
      {
        question: 'How did Elisa travel across the island?',
        questionVi: 'Câu hỏi 1: How did Elisa travel across the island?',
        options: ['By plane', 'By car', 'By boat', 'By bike'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What colors did she see in the landscape?',
        questionVi: 'Câu hỏi 2: What colors did she see in the landscape?',
        options: ['Red and blue', 'Yellow and pink', 'Green and grey', 'Black and white'],
        correctAnswer: 2,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What did the landscape look like?',
        questionVi: 'Câu hỏi 3: What did the landscape look like?',
        options: ['A modern city', 'Heaney\'s poems', 'A desert', 'A jungle'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'How did Elisa feel during her trip?',
        questionVi: 'Câu hỏi 4: How did Elisa feel during her trip?',
        options: ['Bored', 'Sad', 'Happy', 'Angry'],
        correctAnswer: 2,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 11,
    title: 'Passage 11',
    titleVi: 'Đoạn văn 11',
    passage: 'Heaney’s poetry often explored the deep connection between the past and the present. He used powerful images of the Irish landscape to explain the country\'s difficult history. For Elisa, reading his work was like taking a journey through time.',
    level: 'B1',
    questions: [
      {
        question: 'What was a major theme in Heaney’s poetry?',
        questionVi: 'Câu hỏi 1: What was a major theme in Heaney’s poetry?',
        options: ['Science fiction', 'Past and present connection', 'Cooking recipes', 'Sports news'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'Why did Heaney use landscape images?',
        questionVi: 'Câu hỏi 2: Why did Heaney use landscape images?',
        options: ['To sell paintings', 'To describe history', 'To build a map', 'To find water'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'How did Elisa feel when reading his poems?',
        questionVi: 'Câu hỏi 3: How did Elisa feel when reading his poems?',
        options: ['Like a journey through time', 'Confused and lost', 'Tired of reading', 'Interested in farming'],
        correctAnswer: 0,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What kind of history did Heaney explain?',
        questionVi: 'Câu hỏi 4: What kind of history did Heaney explain?',
        options: ['A simple one', 'A difficult one', 'A short one', 'A boring one'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 12,
    title: 'Passage 12',
    titleVi: 'Đoạn văn 12',
    passage: 'In Bellaghy, the author visited the poet’s final resting place. The grave was simple and quiet, but it was very moving for her. She realized that Heaney’s influence remained very strong in his local community even after his death.',
    level: 'B1',
    questions: [
      {
        question: 'What did the author visit in Bellaghy?',
        questionVi: 'Câu hỏi 1: What did the author visit in Bellaghy?',
        options: ['A new library', 'A poet\'s grave', 'A busy market', 'A large farm'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'How did the author describe the grave?',
        questionVi: 'Câu hỏi 2: How did the author describe the grave?',
        options: ['Rich and gold', 'Simple and quiet', 'Old and broken', 'Big and noisy'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What did she realize about Heaney\'s influence?',
        questionVi: 'Câu hỏi 3: What did she realize about Heaney\'s influence?',
        options: ['It was gone', 'It was weak', 'It was very strong', 'It was only for family'],
        correctAnswer: 2,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'When did she visit this place?',
        questionVi: 'Câu hỏi 4: When did she visit this place?',
        options: ['Before he died', 'After his death', 'In her childhood', 'Last week'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 13,
    title: 'Passage 13',
    titleVi: 'Đoạn văn 13',
    passage: 'The article in The Yale Review discusses how literature can change our view of a country. Before visiting Ireland, Elisa only knew the island through Heaney’s verses. She wanted to see if the real world was the same as her imagination.',
    level: 'B1',
    questions: [
      {
        question: 'What is the main topic of the Yale Review article?',
        questionVi: 'Câu hỏi 1: What is the main topic of the Yale Review article?',
        options: ['How to travel cheaply', 'Literature\'s effect on our views', 'Irish politics', 'Famous artists in London'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'How did Elisa know Ireland before her trip?',
        questionVi: 'Câu hỏi 2: How did Elisa know Ireland before her trip?',
        options: ['Through the news', 'Through Heaney\'s poems', 'Through her family', 'Through movies'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What did Elisa want to compare?',
        questionVi: 'Câu hỏi 3: What did Elisa want to compare?',
        options: ['Prices of books', 'Real world vs imagination', 'Ireland vs England', 'Two different poets'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'Verses in the text most likely means:',
        questionVi: 'Câu hỏi 4: Verses in the text most likely means:',
        options: ['Houses', 'Poems', 'Stories', 'Maps'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 14,
    title: 'Passage 14',
    titleVi: 'Đoạn văn 14',
    passage: 'The concept of "home" is central to Heaney’s artistic vision. He often grappled with the complex tensions of his Northern Irish identity. Gonzalez observes that his unique language acts as a vital bridge between two conflicting worlds.',
    level: 'B2',
    questions: [
      {
        question: 'What concept is very important in Heaney\'s work?',
        questionVi: 'Câu hỏi 1: What concept is very important in Heaney\'s work?',
        options: ['Adventure', 'Home', 'Wealth', 'Technology'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What does "grappled with" mean in this context?',
        questionVi: 'Câu hỏi 2: What does "grappled with" mean in this context?',
        options: ['Avoided', 'Struggled with', 'Ignored', 'Fixed easily'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What serves as a "bridge" in Heaney\'s poetry?',
        questionVi: 'Câu hỏi 3: What serves as a "bridge" in Heaney\'s poetry?',
        options: ['His money', 'His family', 'His language', 'His travels'],
        correctAnswer: 2,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What were the "conflicting worlds"?',
        questionVi: 'Câu hỏi 4: What were the "conflicting worlds"?',
        options: ['North and South', 'His identity tensions', 'Earth and Space', 'Past and Future'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 15,
    title: 'Passage 15',
    titleVi: 'Đoạn văn 15',
    passage: 'To read Heaney’s work is to experience a total mastery of sound and rhythm. He captured the physical sensations of the Irish bogland with incredible precision. The sounds like "slap and plop" are essential elements of his poetic craft.',
    level: 'B2',
    questions: [
      {
        question: 'What can a reader experience in Heaney\'s work?',
        questionVi: 'Câu hỏi 1: What can a reader experience in Heaney\'s work?',
        options: ['Confusion', 'Mastery of sound/rhythm', 'Only simple stories', 'Political news'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'How did he describe the sensations of the bogland?',
        questionVi: 'Câu hỏi 2: How did he describe the sensations of the bogland?',
        options: ['Vaguely', 'With precision', 'Loudly', 'Incorrectly'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What are "slap and plop" considered here?',
        questionVi: 'Câu hỏi 3: What are "slap and plop" considered here?',
        options: ['Mistakes', 'Essential craft elements', 'Random noises', 'Lies'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'Precision is closest in meaning to:',
        questionVi: 'Câu hỏi 4: Precision is closest in meaning to:',
        options: ['Speed', 'Accuracy', 'Weight', 'Size'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 16,
    title: 'Passage 16',
    titleVi: 'Đoạn văn 16',
    passage: 'Searching for a writer in their native country can sometimes be a disappointing task. However, Gonzalez finds that the atmosphere of Ireland is deeply filled with Heaney’s metaphors. His legacy lives in the very air of the island.',
    level: 'B2',
    questions: [
      {
        question: 'What does the author say about searching for writers?',
        questionVi: 'Câu hỏi 1: What does the author say about searching for writers?',
        options: ['It\'s always easy', 'It can be disappointing', 'It\'s illegal', 'It\'s boring'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What did Gonzalez find in the Irish atmosphere?',
        questionVi: 'Câu hỏi 2: What did Gonzalez find in the Irish atmosphere?',
        options: ['Pollution', 'Heaney\'s metaphors', 'New writers', 'Sadness'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'Where does Heaney\'s legacy live?',
        questionVi: 'Câu hỏi 3: Where does Heaney\'s legacy live?',
        options: ['In museums only', 'In the air of the island', 'In London', 'Nowhere'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'Native refers to:',
        questionVi: 'Câu hỏi 4: Native refers to:',
        options: ['The place of birth', 'A foreign country', 'A holiday spot', 'A workplace'],
        correctAnswer: 0,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 17,
    title: 'Passage 17',
    titleVi: 'Đoạn văn 17',
    passage: 'When Elisa Gonzalez arrived in Dublin in the autumn of 2013, she felt a strange connection to the city. Seamus Heaney, Ireland’s most beloved poet, had passed away only a few weeks earlier. His influence was so strong that it felt like a physical weight in the humid air. Elisa didn\'t go there to find the man himself, but rather to discover the landscape that his poems had created in her imagination. She spent her days exploring the damp soil and quiet cottages, trying to see if the real Ireland matched the beautiful words Heaney had written over his long career.',
    level: 'B1',
    questions: [
      {
        question: 'What was the atmosphere in Dublin like when Elisa arrived?',
        questionVi: 'Câu hỏi 1: What was the atmosphere in Dublin like when Elisa arrived?',
        options: ['The city was celebrating a festival.', 'The city felt heavy with the poet\'s memory.', 'The city was empty and quiet.', 'The city was very dry and hot.'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'Why did Elisa decide to travel to Ireland?',
        questionVi: 'Câu hỏi 2: Why did Elisa decide to travel to Ireland?',
        options: ['To meet Seamus Heaney in person.', 'To write her own book about Dublin.', 'To see the places described in Heaney\'s poetry.', 'To study the history of Irish agriculture.'],
        correctAnswer: 2,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'According to the text, how long had Heaney been dead?',
        questionVi: 'Câu hỏi 3: According to the text, how long had Heaney been dead?',
        options: ['For many years.', 'Only a few weeks.', 'Exactly one year.', 'He died while Elisa was there.'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What was Elisa\'s primary activity during her stay?',
        questionVi: 'Câu hỏi 4: What was Elisa\'s primary activity during her stay?',
        options: ['Interviewing Heaney\'s family.', 'Building a new house in Glanmore.', 'Searching for physical signs of Heaney\'s poems.', 'Teaching literature at a university.'],
        correctAnswer: 2,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 18,
    title: 'Passage 18',
    titleVi: 'Đoạn văn 18',
    passage: 'The journey to Bellaghy was a significant part of the author\'s search for the poet\'s roots. She visited the local churchyard where Heaney was buried under a simple grave. This simplicity was surprising given his international fame as a Nobel Prize winner. However, the quiet environment of the village helped her understand why he wrote so much about the earth and the common people. The local community still speaks of him with great respect, showing that a writer’s legacy is not just in books, but also in the memories of the people who live in the places they wrote about.',
    level: 'B1',
    questions: [
      {
        question: 'Why was the author surprised by Heaney\'s grave?',
        questionVi: 'Câu hỏi 1: Why was the author surprised by Heaney\'s grave?',
        options: ['It was located in a very busy city.', 'It was very simple despite his great fame.', 'It was difficult to find the churchyard.', 'It was covered in many complicated statues.'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What did the author learn from the quiet village environment?',
        questionVi: 'Câu hỏi 2: What did the author learn from the quiet village environment?',
        options: ['The village was too boring for a famous poet.', 'Why Heaney focused on earth and ordinary life.', 'That Heaney wanted to move to a bigger city.', 'How to become a famous writer herself.'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'Where is Heaney’s legacy found, according to the passage?',
        questionVi: 'Câu hỏi 3: Where is Heaney’s legacy found, according to the passage?',
        options: ['Only in the books he published.', 'In both books and the community\'s memory.', 'In a museum in Dublin.', 'In the government records of Ireland.'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'The word "roots" in the text refers to:',
        questionVi: 'Câu hỏi 4: The word "roots" in the text refers to:',
        options: ['The literal trees in Bellaghy.', 'Heaney\'s family origins and early life.', 'The scientific study of Irish soil.', 'The physical parts of a plant.'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 19,
    title: 'Passage 19',
    titleVi: 'Đoạn văn 19',
    passage: 'In the essay "Searching for Seamus Heaney," Elisa Gonzalez reflects on the profound nature of a poet\'s survival. She argues that to search for a writer like Heaney is to recognize that their landscape is never merely geographical. Instead, it is a complex linguistic structure that persists long after the speaker has gone. The humid air of Dublin and the "black butter" of the peat bogs become metaphors for the way language can preserve a culture\'s identity. Her exploration suggests that while the person is mortal, the specific sounds and rhythms of their words can effectively immortalize a place in the minds of readers worldwide.',
    level: 'B2',
    questions: [
      {
        question: 'What is the author\'s main argument regarding a "poet\'s landscape"?',
        questionVi: 'Câu hỏi 1: What is the author\'s main argument regarding a "poet\'s landscape"?',
        options: ['It is a physical map that never changes.', 'It is a linguistic structure that outlasts the poet.', 'It is only accessible to people living in Ireland.', 'It is a distraction from the poet\'s real message.'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'How does the author view the relationship between language and identity?',
        questionVi: 'Câu hỏi 2: How does the author view the relationship between language and identity?',
        options: ['Language is a tool that destroys cultural history.', 'Language can preserve and protect a culture\'s identity.', 'Identity is independent of the language we speak.', 'Only famous poets can have a cultural identity.'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'The phrase "black butter" serves as a metaphor for:',
        questionVi: 'Câu hỏi 3: The phrase "black butter" serves as a metaphor for:',
        options: ['The literal food products of rural Ireland.', 'The dark and rich texture of the Irish bogland.', 'The sadness felt after the poet\'s death.', 'The difficulty of traveling through the countryside.'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What does the text suggest about the power of poetic "sounds and rhythms"?',
        questionVi: 'Câu hỏi 4: What does the text suggest about the power of poetic "sounds and rhythms"?',
        options: ['They are only understood by experts.', 'They can make a place live forever for readers.', 'They are less important than the meaning of the words.', 'They change every time a new person reads them.'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 20,
    title: 'Passage 20',
    titleVi: 'Đoạn văn 20',
    passage: 'Gonzalez’s meditation on Heaney often touches upon the intricate tensions of his Northern Irish background. Heaney was a master of capturing the "slap and plop" of water and the tactile reality of the soil, using these precise physical sensations to navigate the difficult political history of his home. By grounding his poetry in the literal earth, he was able to address universal themes of belonging and conflict. Gonzalez finds that walking through Ireland is like walking through his stanzas; the environment is so saturated with his descriptions that it becomes impossible to separate the land from the language used to describe it.',
    level: 'B2',
    questions: [
      {
        question: 'How did Heaney use physical sensations in his poetry?',
        questionVi: 'Câu hỏi 1: How did Heaney use physical sensations in his poetry?',
        options: ['To distract readers from political issues.', 'To explore complex themes of history and belonging.', 'To teach people how to farm the land.', 'To prove that Northern Ireland is a peaceful place.'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What does the author mean by saying the land is "saturated" with Heaney\'s descriptions?',
        questionVi: 'Câu hỏi 2: What does the author mean by saying the land is "saturated" with Heaney\'s descriptions?',
        options: ['The land is physically wet from the rain.', 'Heaney\'s words have become an inseparable part of the landscape\'s identity.', 'There are signs with his poems all over the country.', 'The environment has changed because of his fame.'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'Which of the following best describes Heaney\'s poetic technique?',
        questionVi: 'Câu hỏi 3: Which of the following best describes Heaney\'s poetic technique?',
        options: ['Using abstract ideas without any physical detail.', 'Grounding universal themes in literal, physical realities.', 'Focusing only on the future of Northern Ireland.', 'Avoiding the mention of his personal background.'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'Tactile reality in the passage refers to:',
        questionVi: 'Câu hỏi 4: Tactile reality in the passage refers to:',
        options: ['The way things feel to the touch.', 'The truth of a political situation.', 'The visual beauty of a painting.', 'The sound of a person speaking.'],
        correctAnswer: 0,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  }
]
