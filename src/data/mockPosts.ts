export type PostTag = 'Math' | 'Physics' | 'CS' | 'Biology' | 'General';

export interface MockPost {
  id: string;
  author: string;
  title: string;
  content: string;
  upvotes: number;
  tag: PostTag;
}

export const mockPosts: MockPost[] = [
  {
    id: 'analytic-geometry-midterm',
    author: 'Tiko99',
    title: 'Analytic geometry midterm question set',
    content:
      'Does anyone have solved examples for lines, planes, and distance formulas? I am trying to compare approaches before the midterm.',
    upvotes: 809,
    tag: 'Math',
  },
  {
    id: 'physics-lab-3',
    author: 'Anna_Phys',
    title: 'Physics lab 3 data table template',
    content:
      'Sharing the structure I used for the optics lab report. Please check the uncertainty column before submitting your own version.',
    upvotes: 24,
    tag: 'Physics',
  },
  {
    id: 'react-state-study-group',
    author: 'CodeNarek',
    title: 'React state management study group',
    content:
      'Looking for two or three students to review hooks, reducers, and API calls together before the frontend exam.',
    upvotes: 137,
    tag: 'CS',
  },
  {
    id: 'biology-flashcards',
    author: 'BioMariam',
    title: 'Cell biology flashcards for finals',
    content:
      'I made a compact set of flashcards for organelles, membranes, and transport mechanisms. Feedback is welcome.',
    upvotes: 62,
    tag: 'Biology',
  },
  {
    id: 'quiet-campus-spots',
    author: 'AramStudy',
    title: 'Quiet places on campus after 6 PM',
    content:
      'Which buildings stay open late and are still comfortable for group study? Anonymous suggestions are fine.',
    upvotes: 45,
    tag: 'General',
  },
];
