import type { PostSubject } from '../types/database';

export const subjectLabelByValue: Record<PostSubject, string> = {
  math: 'Math',
  physics: 'Physics',
  chemistry: 'Chemistry',
  programming: 'CS',
  biology: 'Biology',
  general: 'General',
};

export interface MockPostFile {
  id: string;
  file_name: string;
  mime_type: string;
  size_bytes: number;
  ipfs_cid: string;
  gateway_url: string;
}

export interface MockComment {
  id: string;
  author_username: string;
  body: string;
  created_at_label: string;
}

export interface MockPost {
  id: string;
  author_username: string;
  title: string;
  description: string;
  vote_score: number;
  comment_count: number;
  subject: PostSubject;
  files: MockPostFile[];
  comments: MockComment[];
}

export const mockPosts: MockPost[] = [
  {
    id: 'analytic-geometry-midterm',
    author_username: 'Tiko99',
    title: 'Analytic geometry midterm question set',
    description:
      'Does anyone have solved examples for lines, planes, and distance formulas? I am trying to compare approaches before the midterm.',
    vote_score: 809,
    comment_count: 2,
    subject: 'math',
    files: [
      {
        id: 'analytic-geometry-file',
        file_name: 'analytic_geometry_midterm.pdf',
        mime_type: 'application/pdf',
        size_bytes: 1_800_000,
        ipfs_cid: 'bafy-demo-analyticgeometrymidterm',
        gateway_url: 'https://ipfs.io/ipfs/bafy-demo-analyticgeometrymidterm',
      },
    ],
    comments: [
      {
        id: 'analytic-comment-1',
        author_username: 'MathLilit',
        body: 'I can share last semester examples for plane equations.',
        created_at_label: '2 ժամ առաջ',
      },
      {
        id: 'analytic-comment-2',
        author_username: 'ArmanCalc',
        body: 'Distance formulas are the main tricky part, start there.',
        created_at_label: '35 րոպե առաջ',
      },
    ],
  },
  {
    id: 'physics-lab-3',
    author_username: 'Anna_Phys',
    title: 'Physics lab 3 data table template',
    description:
      'Sharing the structure I used for the optics lab report. Please check the uncertainty column before submitting your own version.',
    vote_score: 24,
    comment_count: 1,
    subject: 'physics',
    files: [
      {
        id: 'physics-lab-file',
        file_name: 'physics_lab_3_template.pdf',
        mime_type: 'application/pdf',
        size_bytes: 2_400_000,
        ipfs_cid: 'bafy-demo-physicslabthree',
        gateway_url: 'https://ipfs.io/ipfs/bafy-demo-physicslabthree',
      },
    ],
    comments: [
      {
        id: 'physics-comment-1',
        author_username: 'QuantumLearner',
        body: 'The uncertainty column format is exactly what I needed.',
        created_at_label: '1 ժամ առաջ',
      },
    ],
  },
  {
    id: 'react-state-study-group',
    author_username: 'CodeNarek',
    title: 'React state management study group',
    description:
      'Looking for two or three students to review hooks, reducers, and API calls together before the frontend exam.',
    vote_score: 137,
    comment_count: 0,
    subject: 'programming',
    files: [],
    comments: [],
  },
  {
    id: 'biology-flashcards',
    author_username: 'BioMariam',
    title: 'Cell biology flashcards for finals',
    description:
      'I made a compact set of flashcards for organelles, membranes, and transport mechanisms. Feedback is welcome.',
    vote_score: 62,
    comment_count: 1,
    subject: 'biology',
    files: [
      {
        id: 'biology-flashcards-file',
        file_name: 'cell_biology_flashcards.png',
        mime_type: 'image/png',
        size_bytes: 740_000,
        ipfs_cid: 'bafy-demo-biologyflashcards',
        gateway_url: 'https://ipfs.io/ipfs/bafy-demo-biologyflashcards',
      },
    ],
    comments: [
      {
        id: 'biology-comment-1',
        author_username: 'MedAni',
        body: 'Please add membrane transport examples too.',
        created_at_label: 'երեկ',
      },
    ],
  },
  {
    id: 'quiet-campus-spots',
    author_username: 'AramStudy',
    title: 'Quiet places on campus after 6 PM',
    description:
      'Which buildings stay open late and are still comfortable for group study? Anonymous suggestions are fine.',
    vote_score: 45,
    comment_count: 0,
    subject: 'general',
    files: [],
    comments: [],
  },
];
