export type CardTypes = 'experience' | 'sideProjects' | 'talks' | 'startup' | 'education' | 'other';

export class CardContent {
  key?: string;
  type: CardTypes;
  title: string;
  link?: string;
  date: string;
  description: string;
  position?: string;
  accomplishments?: CardAccomplishment[];
  accomplishmentKeys?: string[];
}

export class ResumeCard {
  type: CardTypes;
  content: CardContent[];
}

export class CardAccomplishment {
  parentKey: string;
  text: string;
}

export interface ICardsStore {
  [fbKey: string]: CardContent;
}

export interface ICardAccomplishmentsStore {
  [fbKey: string]: CardAccomplishment;
}

export interface IResumeState {
  cards: ICardsStore;
  accomplishments: ICardAccomplishmentsStore;
}

type TitleMap = {
  [P in CardTypes]: string;
};

export const titleMap: TitleMap = {
  'experience': 'Professional Experience',
  'sideProjects': 'Side Projects',
  'talks': 'Community / Talks',
  'startup': 'Hackathons',
  'education': 'Education',
  'other': 'Other'
};