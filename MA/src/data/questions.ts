import { Question } from '../types';

export const questions: Question[] = [
  // Grammar Questions
  {
    id: 'g1',
    question: 'Which sentence is grammatically correct?',
    options: [
      'She don\'t like apples.',
      'She doesn\'t like apples.',
      'She not like apples.',
      'She no like apples.'
    ],
    correctAnswer: 1,
    section: 'grammar',
    level: 1
  },
  {
    id: 'g2',
    question: 'Choose the correct past tense form:',
    options: [
      'He go to the store yesterday.',
      'He went to the store yesterday.',
      'He gone to the store yesterday.',
      'He going to the store yesterday.'
    ],
    correctAnswer: 1,
    section: 'grammar',
    level: 1
  },
  {
    id: 'g3',
    question: 'Select the correct sentence:',
    options: [
      'They was happy about the news.',
      'They were happy about the news.',
      'They is happy about the news.',
      'They be happy about the news.'
    ],
    correctAnswer: 1,
    section: 'grammar',
    level: 1
  },
  {
    id: 'g4',
    question: 'Which sentence uses the correct article?',
    options: [
      'I saw a elephant at the zoo.',
      'I saw an elephant at the zoo.',
      'I saw the elephant at a zoo.',
      'I saw elephant at the zoo.'
    ],
    correctAnswer: 1,
    section: 'grammar',
    level: 1
  },
  {
    id: 'g5',
    question: 'Choose the correct form:',
    options: [
      'She have been working all day.',
      'She has been working all day.',
      'She had been working all day.',
      'She is been working all day.'
    ],
    correctAnswer: 1,
    section: 'grammar',
    level: 2
  },
  // Reading Questions
  {
    id: 'r1',
    question: 'Read the passage and answer:\n\n"Sarah loves reading. Every morning, she reads for 30 minutes before work. Her favorite genre is mystery novels."\n\nWhat does Sarah love?',
    options: [
      'Writing',
      'Reading',
      'Cooking',
      'Traveling'
    ],
    correctAnswer: 1,
    section: 'reading',
    level: 1
  },
  {
    id: 'r2',
    question: 'Read and answer:\n\n"The Amazon rainforest produces about 20% of the world\'s oxygen. It is home to millions of species of plants and animals."\n\nWhat percentage of oxygen does the Amazon produce?',
    options: [
      '10%',
      '20%',
      '30%',
      '50%'
    ],
    correctAnswer: 1,
    section: 'reading',
    level: 1
  },
  {
    id: 'r3',
    question: 'Read and answer:\n\n"John works as a software engineer. He starts his day at 8 AM and usually finishes by 6 PM. He enjoys solving complex problems."\n\nWhat is John\'s profession?',
    options: [
      'Doctor',
      'Teacher',
      'Software Engineer',
      'Lawyer'
    ],
    correctAnswer: 2,
    section: 'reading',
    level: 1
  },
  {
    id: 'r4',
    question: 'Read and answer:\n\n"The Great Wall of China is over 13,000 miles long. It was built over many centuries to protect against invasions."\n\nWhy was the Great Wall built?',
    options: [
      'For decoration',
      'For transportation',
      'To protect against invasions',
      'As a tourist attraction'
    ],
    correctAnswer: 2,
    section: 'reading',
    level: 1
  },
  // Listening Questions
  {
    id: 'l1',
    question: 'Listen and choose the correct response:\n\n🔊 "Good morning! How are you today?"',
    options: [
      'I\'m fine, thank you!',
      'Good night!',
      'See you later!',
      'Thank you for dinner!'
    ],
    correctAnswer: 0,
    section: 'listening',
    level: 1
  },
  {
    id: 'l2',
    question: 'Listen and answer:\n\n🔊 "Excuse me, where is the nearest train station?"',
    options: [
      'It\'s 5 dollars.',
      'It\'s two blocks away.',
      'The train leaves at 9.',
      'I don\'t have a ticket.'
    ],
    correctAnswer: 1,
    section: 'listening',
    level: 1
  },
  {
    id: 'l3',
    question: 'Listen and choose:\n\n🔊 "I would like to order a cup of coffee, please."',
    options: [
      'That will be $3.50.',
      'The coffee shop is closed.',
      'I don\'t like coffee.',
      'Coffee comes from Brazil.'
    ],
    correctAnswer: 0,
    section: 'listening',
    level: 1
  },
  {
    id: 'l4',
    question: 'Listen and answer:\n\n🔊 "Can you help me find the bookstore?"',
    options: [
      'I\'m looking for books too.',
      'Sure! It\'s on the second floor.',
      'The book is interesting.',
      'I bought a book yesterday.'
    ],
    correctAnswer: 1,
    section: 'listening',
    level: 1
  }
];