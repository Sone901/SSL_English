export interface ListeningQuestion {
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
  {
    id: 1,
    title: '1-2',
    titleVi: 'Câu 1-2',
    audioPath: '/audio/1-2.mp4',
    level: 'A1',
    duration: '2:30',
    questions: [
      {
        question: 'Mark your answer on your answer sheet.',
        questionVi: 'Câu hỏi 1: Mark your answer on your answer sheet.',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 0,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'Mark your answer on your answer sheet.',
        questionVi: 'Câu hỏi 2: Mark your answer on your answer sheet.',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 3,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 2,
    title: '3-4',
    titleVi: 'Câu 3-4',
    audioPath: '/audio/3-4.mp4',
    level: 'A1',
    duration: '2:30',
    questions: [
      {
        question: 'Mark your answer on your answer sheet.',
        questionVi: 'Câu hỏi 3: Mark your answer on your answer sheet.',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'Mark your answer on your answer sheet.',
        questionVi: 'Câu hỏi 4: Mark your answer on your answer sheet.',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 3,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 3,
    title: '5-6',
    titleVi: 'Câu 5-6',
    audioPath: '/audio/5-6.mp4',
    level: 'A1',
    duration: '2:30',
    questions: [
      {
        question: 'Mark your answer on your answer sheet.',
        questionVi: 'Câu hỏi 5: Mark your answer on your answer sheet.',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 3,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'Mark your answer on your answer sheet.',
        questionVi: 'Câu hỏi 6: Mark your answer on your answer sheet.',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 3,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 4,
    title: '7-8',
    titleVi: 'Câu 7-8',
    audioPath: '/audio/7-8.mp4',
    level: 'A1',
    duration: '2:30',
    questions: [
      {
        question: 'Mark your answer on your answer sheet.',
        questionVi: 'Câu hỏi 7: Mark your answer on your answer sheet.',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 3,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'Mark your answer on your answer sheet.',
        questionVi: 'Câu hỏi 8: Mark your answer on your answer sheet.',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 3,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 5,
    title: '9-10',
    titleVi: 'Câu 9-10',
    audioPath: '/audio/9-10.mp4',
    level: 'A1',
    duration: '2:30',
    questions: [
      {
        question: 'Mark your answer on your answer sheet.',
        questionVi: 'Câu hỏi 9: Mark your answer on your answer sheet.',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'Mark your answer on your answer sheet.',
        questionVi: 'Câu hỏi 10: Mark your answer on your answer sheet.',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 3,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 6,
    title: '11-12',
    titleVi: 'Câu 11-12',
    audioPath: '/audio/11-12.mp4',
    level: 'A1',
    duration: '2:30',
    questions: [
      {
        question: 'Mark your answer on your answer sheet.',
        questionVi: 'Câu hỏi 11: Mark your answer on your answer sheet.',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 0,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'Mark your answer on your answer sheet.',
        questionVi: 'Câu hỏi 12: Mark your answer on your answer sheet.',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 7,
    title: '13-14',
    titleVi: 'Câu 13-14',
    audioPath: '/audio/13-14.mp4',
    level: 'A1',
    duration: '2:30',
    questions: [
      {
        question: 'Mark your answer on your answer sheet.',
        questionVi: 'Câu hỏi 13: Mark your answer on your answer sheet.',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 2,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'Mark your answer on your answer sheet.',
        questionVi: 'Câu hỏi 14: Mark your answer on your answer sheet.',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 8,
    title: '15-16',
    titleVi: 'Câu 15-16',
    audioPath: '/audio/15-16.mp4',
    level: 'A1',
    duration: '2:30',
    questions: [
      {
        question: 'Mark your answer on your answer sheet.',
        questionVi: 'Câu hỏi 15: Mark your answer on your answer sheet.',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 2,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'Mark your answer on your answer sheet.',
        questionVi: 'Câu hỏi 16: Mark your answer on your answer sheet.',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 2,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 9,
    title: '17-18',
    titleVi: 'Câu 17-18',
    audioPath: '/audio/17-18.mp4',
    level: 'A1',
    duration: '2:30',
    questions: [
      {
        question: 'Mark your answer on your answer sheet.',
        questionVi: 'Câu hỏi 17: Mark your answer on your answer sheet.',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 2,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'Mark your answer on your answer sheet.',
        questionVi: 'Câu hỏi 18: Mark your answer on your answer sheet.',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 0,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 10,
    title: '19-20',
    titleVi: 'Câu 19-20',
    audioPath: '/audio/19-20.mp4',
    level: 'A1',
    duration: '2:30',
    questions: [
      {
        question: 'Mark your answer on your answer sheet.',
        questionVi: 'Câu hỏi 19: Mark your answer on your answer sheet.',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 0,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'Mark your answer on your answer sheet.',
        questionVi: 'Câu hỏi 20: Mark your answer on your answer sheet.',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 2,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 11,
    title: '21-22',
    titleVi: 'Câu 21-22',
    audioPath: '/audio/21-22.mp4',
    level: 'A2',
    duration: '2:30',
    questions: [
      {
        question: 'Mark your answer on your answer sheet.',
        questionVi: 'Câu hỏi 21: Mark your answer on your answer sheet.',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 0,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'Mark your answer on your answer sheet.',
        questionVi: 'Câu hỏi 22: Mark your answer on your answer sheet.',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 0,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 12,
    title: '23-24',
    titleVi: 'Câu 23-24',
    audioPath: '/audio/23-24.mp4',
    level: 'A2',
    duration: '2:30',
    questions: [
      {
        question: 'Mark your answer on your answer sheet.',
        questionVi: 'Câu hỏi 23: Mark your answer on your answer sheet.',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'Mark your answer on your answer sheet.',
        questionVi: 'Câu hỏi 24: Mark your answer on your answer sheet.',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 2,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 13,
    title: '25-26',
    titleVi: 'Câu 25-26',
    audioPath: '/audio/25-26.mp4',
    level: 'A2',
    duration: '2:30',
    questions: [
      {
        question: 'Mark your answer on your answer sheet.',
        questionVi: 'Câu hỏi 25: Mark your answer on your answer sheet.',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 0,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'Mark your answer on your answer sheet.',
        questionVi: 'Câu hỏi 26: Mark your answer on your answer sheet.',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 2,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 14,
    title: '27-28',
    titleVi: 'Câu 27-28',
    audioPath: '/audio/27-28.mp4',
    level: 'A2',
    duration: '2:30',
    questions: [
      {
        question: 'Mark your answer on your answer sheet.',
        questionVi: 'Câu hỏi 27: Mark your answer on your answer sheet.',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'Mark your answer on your answer sheet.',
        questionVi: 'Câu hỏi 28: Mark your answer on your answer sheet.',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 15,
    title: '29-30',
    titleVi: 'Câu 29-30',
    audioPath: '/audio/29-30.mp4',
    level: 'A2',
    duration: '2:30',
    questions: [
      {
        question: 'Mark your answer on your answer sheet.',
        questionVi: 'Câu hỏi 29: Mark your answer on your answer sheet.',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 0,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'Mark your answer on your answer sheet.',
        questionVi: 'Câu hỏi 30: Mark your answer on your answer sheet.',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 16,
    title: '31-32',
    titleVi: 'Câu 31-32',
    audioPath: '/audio/31-32.mp4',
    level: 'A2',
    duration: '2:30',
    questions: [
      {
        question: 'Mark your answer on your answer sheet.',
        questionVi: 'Câu hỏi 31: Mark your answer on your answer sheet.',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 0,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'Mark your answer on your answer sheet.',
        questionVi: 'Câu hỏi 32: Mark your answer on your answer sheet.',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 2,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 17,
    title: '33-34',
    titleVi: 'Câu 33-34',
    audioPath: '/audio/33-34.mp4',
    level: 'A2',
    duration: '2:30',
    questions: [
      {
        question: 'Mark your answer on your answer sheet.',
        questionVi: 'Câu hỏi 33: Mark your answer on your answer sheet.',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 0,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'Mark your answer on your answer sheet.',
        questionVi: 'Câu hỏi 34: Mark your answer on your answer sheet.',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 18,
    title: '35-36',
    titleVi: 'Câu 35-36',
    audioPath: '/audio/35-36.mp4',
    level: 'A2',
    duration: '2:30',
    questions: [
      {
        question: 'Mark your answer on your answer sheet.',
        questionVi: 'Câu hỏi 35: Mark your answer on your answer sheet.',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 0,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'Mark your answer on your answer sheet.',
        questionVi: 'Câu hỏi 36: Mark your answer on your answer sheet.',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 19,
    title: '37-38',
    titleVi: 'Câu 37-38',
    audioPath: '/audio/37-38.mp4',
    level: 'A2',
    duration: '2:30',
    questions: [
      {
        question: 'Mark your answer on your answer sheet.',
        questionVi: 'Câu hỏi 37: Mark your answer on your answer sheet.',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'Mark your answer on your answer sheet.',
        questionVi: 'Câu hỏi 38: Mark your answer on your answer sheet.',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 20,
    title: '39-40',
    titleVi: 'Câu 39-40',
    audioPath: '/audio/39-40.mp4',
    level: 'A2',
    duration: '2:30',
    questions: [
      {
        question: 'Mark your answer on your answer sheet.',
        questionVi: 'Câu hỏi 39: Mark your answer on your answer sheet.',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 2,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'Mark your answer on your answer sheet.',
        questionVi: 'Câu hỏi 40: Mark your answer on your answer sheet.',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 2,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 21,
    title: '41-42-43',
    titleVi: 'Câu 41-42-43',
    audioPath: '/audio/41-42-43.mp4',
    level: 'B1',
    duration: '2:30',
    questions: [
      {
        question: 'Why is the woman going to the camera store?',
        questionVi: 'Câu hỏi 41: Why is the woman going to the camera store?',
        options: ['To have her camera repaired.', 'To purchase a camera.', 'To have some film developed.', 'To buy a battery.'],
        correctAnswer: 2,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What does she need her camera for tonight?',
        questionVi: 'Câu hỏi 42: What does she need her camera for tonight?',
        options: ['Going to a photography seminar.', 'Taking photos at the press conference.', 'Taking photos of her family.', 'Testing out her camera in a workshop.'],
        correctAnswer: 3,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What is Mike asking about tonight\'s event?',
        questionVi: 'Câu hỏi 43: What is Mike asking about tonight\'s event?',
        options: ['He is wondering whether the woman\'s coming.', 'He is wondering if the speaker is coming.', 'He is wondering who is in charge of taking pictures.', 'He is wondering who is invited as a speaker for tonight.'],
        correctAnswer: 0,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 22,
    title: '44-46',
    titleVi: 'Câu 44-46',
    audioPath: '/audio/44-46.mp4',
    level: 'B1',
    duration: '2:30',
    questions: [
      {
        question: 'Where are the speakers?',
        questionVi: 'Câu hỏi 44: Where are the speakers?',
        options: ['At an airport.', 'At a theater ticket office.', 'At a baseball stadium.', 'At a zoo.'],
        correctAnswer: 0,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'Where does the man\'s family want to sit?',
        questionVi: 'Câu hỏi 45: Where does the man\'s family want to sit?',
        options: ['On the 2nd level seats.', 'On the balcony seats.', 'On the front seats.', 'On the back seats.'],
        correctAnswer: 2,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'Why is the man hesitating to buy the tickets?',
        questionVi: 'Câu hỏi 46: Why is the man hesitating to buy the tickets?',
        options: ['He is not sure if his parents still want the front seats.', 'He is not sure if he and his wife want to sit on the front seats.', 'He is not sure if his parents still want to sit on the balcony seats.', 'He is not sure if his wife want to sit in the back seats.'],
        correctAnswer: 3,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 23,
    title: '47-48-49',
    titleVi: 'Câu 47-48-49',
    audioPath: '/audio/47-48-49.mp4',
    level: 'B1',
    duration: '2:30',
    questions: [
      {
        question: 'What is the man hoping to get?',
        questionVi: 'Câu hỏi 47: What is the man hoping to get?',
        options: ['A better price.', 'A better hotel room.', 'A first-class ticket.', 'In-flight meals.'],
        correctAnswer: 2,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What does the woman inform the man?',
        questionVi: 'Câu hỏi 48: What does the woman inform the man?',
        options: ['The prices will decline.', 'The plane will take off in time.', 'She has gotten plane tickets.', 'To wait while talking a shower.'],
        correctAnswer: 2,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What will the man probably do next?',
        questionVi: 'Câu hỏi 49: What will the man probably do next?',
        options: ['He will not go to Los Angeles.', 'He will go ahead and buy the fare.', 'He will wait for the better fares.', 'He will look for other transportation.'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 24,
    title: '50-51-52',
    titleVi: 'Câu 50-51-52',
    audioPath: '/audio/50-51-52.mp4',
    level: 'B1',
    duration: '2:30',
    questions: [
      {
        question: 'When will the speakers meet the guest?',
        questionVi: 'Câu hỏi 50: When will the speakers meet the guest?',
        options: ['At 2 o\'clock.', 'At 5 o\'clock.', 'At 7 o\'clock.', 'At 8 o\'clock.'],
        correctAnswer: 0,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'Where are the speakers?',
        questionVi: 'Câu hỏi 51: Where are the speakers?',
        options: ['They are in Florida.', 'They are at the hotel.', 'They are in the Pick\'em Up car.', 'They are in the director\'s house.'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What does the woman advise the man to do?',
        questionVi: 'Câu hỏi 52: What does the woman advise the man to do?',
        options: ['Get a suntan on the beach.', 'To buy her a gift.', 'To have dinner with the director.', 'To buy a souvenir.'],
        correctAnswer: 2,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 25,
    title: '53-54-55',
    titleVi: 'Câu 53-54-55',
    audioPath: '/audio/53-54-55.mp4',
    level: 'B1',
    duration: '2:30',
    questions: [
      {
        question: 'Where do the speakers probably work?',
        questionVi: 'Câu hỏi 53: Where do the speakers probably work?',
        options: ['In an advertising agency.', 'In a grocery store.', 'In a shoe store.', 'In a child-care center.'],
        correctAnswer: 3,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What is one of their sales strategies?',
        questionVi: 'Câu hỏi 54: What is one of their sales strategies?',
        options: ['Putting out brochures about their new items.', 'Putting up signs about the discount.', 'Getting rid of the showcase to have more space in the store.', 'Putting a commercial on TV.'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What will they use to boost sales?',
        questionVi: 'Câu hỏi 55: What will they use to boost sales?',
        options: ['A catalog.', 'A free gift.', 'A show window.', 'A coupon.'],
        correctAnswer: 2,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 26,
    title: '56-57-58',
    titleVi: 'Câu 56-57-58',
    audioPath: '/audio/56-57-58.mp4',
    level: 'B1',
    duration: '2:30',
    questions: [
      {
        question: 'What is the woman looking for?',
        questionVi: 'Câu hỏi 56: What is the woman looking for?',
        options: ['Looking for her wallet.', 'Looking for her new project proposal.', 'Looking for her memo.', 'Looking for the report.'],
        correctAnswer: 2,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'Where is the report?',
        questionVi: 'Câu hỏi 57: Where is the report?',
        options: ['In the man\'s hand.', 'In a filing cabinet.', 'On the shelf.', 'On the desk.'],
        correctAnswer: 2,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What does the man say is the cause for the woman\'s memory loss?',
        questionVi: 'Câu hỏi 58: What does the man say is the cause for the woman\'s memory loss?',
        options: ['Her age.', 'Her car accident a few days ago.', 'Her personality.', 'Her busy schedule.'],
        correctAnswer: 0,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 27,
    title: '59-60-61',
    titleVi: 'Câu 59-60-61',
    audioPath: '/audio/59-60-61.mp4',
    level: 'B1',
    duration: '2:30',
    questions: [
      {
        question: 'What are the speakers discussing?',
        questionVi: 'Câu hỏi 59: What are the speakers discussing?',
        options: ['A management change.', 'A cleaning service.', 'A financial problem.', 'A redecorating plan.'],
        correctAnswer: 0,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'How did the company change?',
        questionVi: 'Câu hỏi 60: How did the company change?',
        options: ['People were fired.', 'The office is clean and more organized.', 'They moved because of some financial problems.', 'They installed a security camera.'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What do they say about the custodian?',
        questionVi: 'Câu hỏi 61: What do they say about the custodian?',
        options: ['His wages aren\'t very high.', 'He is new to this job.', 'He used to work for their company.', 'He does his job perfectly.'],
        correctAnswer: 0,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 28,
    title: '62-63-64',
    titleVi: 'Câu 62-63-64',
    audioPath: '/audio/62-63-64.mp4',
    level: 'B1',
    duration: '2:30',
    questions: [
      {
        question: 'How soon will the next bus come?',
        questionVi: 'Câu hỏi 62: How soon will the next bus come?',
        options: ['In five minutes.', 'In ten minutes.', 'In half an hour.', 'In an hour.'],
        correctAnswer: 2,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What is the man worrying about?',
        questionVi: 'Câu hỏi 63: What is the man worrying about?',
        options: ['Being late to his doctor\'s appointment.', 'Being late to his job interview.', 'Being late picking his wife up from the airport.', 'Being late to his Biology class.'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What does the woman think about the traffic?',
        questionVi: 'Câu hỏi 64: What does the woman think about the traffic?',
        options: ['The traffic will be heavy because of rush hour.', 'She heard about an accident on the radio.', 'The traffic is a bit lighter.', 'She is worried about the rise in gas prices.'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 29,
    title: '65-66-67',
    titleVi: 'Câu 65-66-67',
    audioPath: '/audio/65-66-67.mp4',
    level: 'B1',
    duration: '2:30',
    questions: [
      {
        question: 'What is the topic of the conversation?',
        questionVi: 'Câu hỏi 65: What is the topic of the conversation?',
        options: ['The coming of the inspector.', 'New equipment.', 'Construction of a factory.', 'Factory tour.'],
        correctAnswer: 3,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What are the details the man says?',
        questionVi: 'Câu hỏi 66: What are the details the man says?',
        options: ['He will arrange the tour for the assembly.', 'The tour for the assembly will be arranged by next week.', 'They allow you to photograph the assembly line part.', 'Their assembly line is not updated to the newest version.'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What is the restriction for the outsiders?',
        questionVi: 'Câu hỏi 67: What is the restriction for the outsiders?',
        options: ['They are not allowed to see the inspection process.', 'They are not allowed to have a tour of the factory.', 'They have to pay money and sign a contract in order to see everything.', 'D'],
        correctAnswer: 2,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 30,
    title: '68-69-70',
    titleVi: 'Câu 68-69-70',
    audioPath: '/audio/68-69-70.mp4',
    level: 'B1',
    duration: '2:30',
    questions: [
      {
        question: 'When is the awards ceremony?',
        questionVi: 'Câu hỏi 68: When is the awards ceremony?',
        options: ['December 2nd.', 'December 20th.', 'December 22nd.', 'December 28th.'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'Why was the ceremony moved up two days?',
        questionVi: 'Câu hỏi 69: Why was the ceremony moved up two days?',
        options: ['The conference room is not available until 8 p.m. that night.', 'The banquet hall costs more that night.', 'The attendance record is low.', 'The banquet hall is already taken for that day.'],
        correctAnswer: 0,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What does the woman suggest to the man?',
        questionVi: 'Câu hỏi 70: What does the woman suggest to the man?',
        options: ['Be prepared for the presentation.', 'Bring a partner.', 'Be sure to attend the next ceremony.', 'Come even if you\'re late.'],
        correctAnswer: 0,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 31,
    title: '71-72-73',
    titleVi: 'Câu 71-72-73',
    audioPath: '/audio/71-72-73.mp4',
    level: 'B2',
    duration: '2:30',
    questions: [
      {
        question: 'What is the purpose of the announcement?',
        questionVi: 'Câu hỏi 71: What is the purpose of the announcement?',
        options: ['To have a business meeting.', 'To vote for a new president.', 'To collaborate for a product invention.', 'To conclude a conference.'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What anniversary is the conference celebrating?',
        questionVi: 'Câu hỏi 72: What anniversary is the conference celebrating?',
        options: ['Five years.', 'Eight years.', 'Ten years.', 'Twenty years.'],
        correctAnswer: 0,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What was the subject of the keynote speech?',
        questionVi: 'Câu hỏi 73: What was the subject of the keynote speech?',
        options: ['Computer engineering.', 'Business laws.', 'Conducting research.', 'New designs.'],
        correctAnswer: 2,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 32,
    title: '74-75-76',
    titleVi: 'Câu 74-75-76',
    audioPath: '/audio/74-75-76.mp4',
    level: 'B2',
    duration: '2:30',
    questions: [
      {
        question: 'Who is the speaker?',
        questionVi: 'Câu hỏi 74: Who is the speaker?',
        options: ['Tour guide.', 'Farmer.', 'Company owner.', 'Worker.'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'Who presently owns the farm?',
        questionVi: 'Câu hỏi 75: Who presently owns the farm?',
        options: ['Speaker\'s family.', 'Museum.', 'Fado Produce Company.', 'The government.'],
        correctAnswer: 0,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'Where are they going to next?',
        questionVi: 'Câu hỏi 76: Where are they going to next?',
        options: ['To a greenhouse.', 'To a garden.', 'To a farmhouse.', 'To a park.'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 33,
    title: '77-78-79',
    titleVi: 'Câu 77-78-79',
    audioPath: '/audio/77-78-79.mp4',
    level: 'B2',
    duration: '2:30',
    questions: [
      {
        question: 'What will the staff be trained to do?',
        questionVi: 'Câu hỏi 77: What will the staff be trained to do?',
        options: ['Keep computerized schedules.', 'Use bookkeeping software.', 'Manage their time.', 'Write progress reports.'],
        correctAnswer: 0,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What have the employees received already?',
        questionVi: 'Câu hỏi 78: What have the employees received already?',
        options: ['A bookkeeping manual.', 'A software sample.', 'A training schedule.', 'A price estimate.'],
        correctAnswer: 3,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What does the speaker ask for?',
        questionVi: 'Câu hỏi 79: What does the speaker ask for?',
        options: ['A weekly statement.', 'Sales figures.', 'A timetable.', 'Bank statements.'],
        correctAnswer: 3,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 34,
    title: '80-81-82',
    titleVi: 'Câu 80-81-82',
    audioPath: '/audio/80-81-82.mp4',
    level: 'B2',
    duration: '2:30',
    questions: [
      {
        question: 'Who is this advertisement intended for?',
        questionVi: 'Câu hỏi 80: Who is this advertisement intended for?',
        options: ['Small-business owners.', 'University students.', 'Bank employees.', 'Retired business people.'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What is being advertised?',
        questionVi: 'Câu hỏi 81: What is being advertised?',
        options: ['A book.', 'A course.', 'A bank.', 'A store.'],
        correctAnswer: 2,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What will happen on Friday morning?',
        questionVi: 'Câu hỏi 82: What will happen on Friday morning?',
        options: ['Some prices will be reduced.', 'The store will open early.', 'Job applications will be accepted.', 'Registration will take place.'],
        correctAnswer: 0,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 35,
    title: '83-84-85',
    titleVi: 'Câu 83-84-85',
    audioPath: '/audio/83-84-85.mp4',
    level: 'B2',
    duration: '2:30',
    questions: [
      {
        question: 'When is this show being broadcast?',
        questionVi: 'Câu hỏi 83: When is this show being broadcast?',
        options: ['On Monday.', 'On Tuesday.', 'On Thursday.', 'On Saturday.'],
        correctAnswer: 3,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What topic does Mr. Hernandez write about?',
        questionVi: 'Câu hỏi 84: What topic does Mr. Hernandez write about?',
        options: ['Art.', 'Food.', 'Clothing.', 'Animals.'],
        correctAnswer: 2,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What is stated about Mr. Hernandez?',
        questionVi: 'Câu hỏi 85: What is stated about Mr. Hernandez?',
        options: ['He hosts a radio show.', 'He won an award.', 'He trains cats and dogs.', 'He works at a bookstore.'],
        correctAnswer: 0,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 36,
    title: '86-87-88',
    titleVi: 'Câu 86-87-88',
    audioPath: '/audio/86-87-88.mp4',
    level: 'B2',
    duration: '2:30',
    questions: [
      {
        question: 'Why is the flight delayed?',
        questionVi: 'Câu hỏi 86: Why is the flight delayed?',
        options: ['The plane is still getting inspected for the flight.', 'The other planes are currently arriving.', 'They are waiting for a customer to catch the flight.', 'The weather is bad in the area.'],
        correctAnswer: 3,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'When is the flight expected to start boarding?',
        questionVi: 'Câu hỏi 87: When is the flight expected to start boarding?',
        options: ['In 45 minutes.', 'In an hour.', 'In an hour and a quarter.', 'In an hour and a half.'],
        correctAnswer: 0,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'Who is asked to go to the ticket counter?',
        questionVi: 'Câu hỏi 88: Who is asked to go to the ticket counter?',
        options: ['Passengers with children.', 'Passengers who lost their tickets.', 'Passengers with connecting flights.', 'Passengers who have heavy baggage.'],
        correctAnswer: 3,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 37,
    title: '89-90-91',
    titleVi: 'Câu 89-90-91',
    audioPath: '/audio/89-90-91.mp4',
    level: 'B2',
    duration: '2:30',
    questions: [
      {
        question: 'Who most likely is the speaker?',
        questionVi: 'Câu hỏi 89: Who most likely is the speaker?',
        options: ['An athlete.', 'A computer technician.', 'A doctor.', 'A salesperson.'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What does the machine do?',
        questionVi: 'Câu hỏi 90: What does the machine do?',
        options: ['It measures the heart rate.', 'It monitors the entrance to the building.', 'It forecasts the weather.', 'It regulates the temperature.'],
        correctAnswer: 0,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What is an advertised feature of the machine?',
        questionVi: 'Câu hỏi 91: What is an advertised feature of the machine?',
        options: ['It has an extra-strong frame.', 'It is easily portable.', 'It is highly stable.', 'It has a digital display panel.'],
        correctAnswer: 3,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 38,
    title: '92-93-94',
    titleVi: 'Câu 92-93-94',
    audioPath: '/audio/92-93-94.mp4',
    level: 'B2',
    duration: '2:30',
    questions: [
      {
        question: 'What is the purpose of this talk?',
        questionVi: 'Câu hỏi 92: What is the purpose of this talk?',
        options: ['To recruit new employees.', 'To explain telephone procedures.', 'To propose solutions to a problem.', 'To sell a new telephone system.'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What are employees told to do?',
        questionVi: 'Câu hỏi 93: What are employees told to do?',
        options: ['Record a message for callers.', 'Write a memo to their supervisors.', 'Call the telephone operator.', 'Remain at their desks.'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'When will the training session take place?',
        questionVi: 'Câu hỏi 94: When will the training session take place?',
        options: ['Today.', 'Tomorrow.', 'Next week.', 'Next month.'],
        correctAnswer: 2,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 39,
    title: '95-96-97',
    titleVi: 'Câu 95-96-97',
    audioPath: '/audio/95-96-97.mp4',
    level: 'B2',
    duration: '2:30',
    questions: [
      {
        question: 'Why does the caller apologize to Frank?',
        questionVi: 'Câu hỏi 95: Why does the caller apologize to Frank?',
        options: ['For interrupting his lunch.', 'For leaving a message on his home telephone.', 'For asking him to return to the warehouse.', 'For requesting that he work overtime.'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What does the caller want Frank to do?',
        questionVi: 'Câu hỏi 96: What does the caller want Frank to do?',
        options: ['Examine a white substance on the wall.', 'Repair a broken ventilation fan.', 'Leave a message for the warehouse manager.', 'Bring a plaster mold to the warehouse.'],
        correctAnswer: 2,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What does the caller suspect is the cause of the problem?',
        questionVi: 'Câu hỏi 97: What does the caller suspect is the cause of the problem?',
        options: ['Cracks in the wall.', 'Faulty electrical wiring.', 'Inadequate lighting.', 'Poor air circulation.'],
        correctAnswer: 2,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  },
  {
    id: 40,
    title: '98-99-100',
    titleVi: 'Câu 98-99-100',
    audioPath: '/audio/98-99-100.mp4',
    level: 'B2',
    duration: '2:30',
    questions: [
      {
        question: 'How long will the photographer be at the company?',
        questionVi: 'Câu hỏi 98: How long will the photographer be at the company?',
        options: ['One day.', 'Three days.', 'One week.', 'Three weeks.'],
        correctAnswer: 1,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'What are volunteers asked to do?',
        questionVi: 'Câu hỏi 99: What are volunteers asked to do?',
        options: ['Contact the speaker.', 'Notify their managers.', 'Call the photographer.', 'Arrive early on Friday.'],
        correctAnswer: 3,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      },
      {
        question: 'Why will the report have pictures of employees?',
        questionVi: 'Câu hỏi 100: Why will the report have pictures of employees?',
        options: ['To save money.', 'To reward good workers.', 'To impress customers.', 'To improve morale.'],
        correctAnswer: 3,
        explanation: 'Check the correct answer.',
        explanationVi: 'Kiểm tra đáp án đúng.'
      }
    ]
  }
]
