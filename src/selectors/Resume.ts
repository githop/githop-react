import { compareDesc } from 'date-fns';
import { createSelector } from 'reselect';
import {
  CardAccomplishment,
  CardContent,
  CardTypes,
  createInstance,
  ICardAccomplishmentsStore,
  ICardsStore,
  ResumeCard,
} from '../models';
import { IState } from '../reducers';

const getCards = (state: IState): ICardsStore => state.resume.cards;
const getAccomplishments = (state: IState): ICardAccomplishmentsStore =>
  state.resume.accomplishments;
export const gatherCardAccomplishments = createSelector(
  getCards,
  getAccomplishments,
  (cards: ICardsStore, accomplishments: ICardAccomplishmentsStore): CardContent[] => {
    if (cards == null) {
      return [];
    }
    return Object.keys(cards).reduce((newCards: CardContent[], cardKey) => {
      const newCard = createInstance(CardContent, cards[cardKey]);
      newCard.key = cardKey;
      newCard.accomplishments = Object.keys(accomplishments).reduce(
        (accm: CardAccomplishment[], accmpKey: string) => {
          if (accomplishments[accmpKey].parentKey === cardKey) {
            accm.push(accomplishments[accmpKey]);
          }
          return accm;
        },
        []
      );
      newCards.push(newCard);
      return newCards;
    }, []);
  }
);

type GroupedCards = { [K in CardTypes]: CardContent[] };

const sortCardContents = (contents: CardContent[]): CardContent[] => {
  return contents.sort((a, b) => {
    return compareDesc(a.sortDate, b.sortDate);
  });
};

export const groupByCardType = createSelector(
  gatherCardAccomplishments,
  (cards: CardContent[]): ResumeCard[] => {
    const grouped = cards.reduce((resumeCard: GroupedCards, card: CardContent) => {
      if (resumeCard[card.type] && resumeCard[card.type].length) {
        resumeCard[card.type].push(card);
      } else {
        resumeCard[card.type] = [card];
      }
      return resumeCard;
    }, {});
    return Object.keys(grouped).map((key: string) =>
      createInstance(ResumeCard, { type: key, content: sortCardContents(grouped[key]) })
    );
  }
);

const sortCards = (cards: ResumeCard[]): ResumeCard[] => {
  return cards.sort((a, b) => {
    if (a.type === 'experience') {
      return -1;
    } else if (b.type === 'experience') {
      return 1;
    } else if (a.type === 'sideProjects') {
      return -1;
    } else if (b.type === 'sideProjects') {
      return 1;
    } else if (a.type === 'talks') {
      return -1;
    } else if (b.type === 'talks') {
      return 1;
    } else if (a.type === 'startup') {
      return -1;
    } else if (b.type === 'startup') {
      return 1;
    } else if (a.type === 'education') {
      return -1;
    } else if (b.type === 'education') {
      return 1;
    } else if (a.type === 'other') {
      return -1;
    } else if (b.type === 'other') {
      return 1;
    }
    return 0;
  });
};

export const makeGetResumeCards = () => {
  return createSelector(groupByCardType, (cards: ResumeCard[]) => {
    return sortCards(cards);
  });
};

export const getCard = (state: IState, contentId: string) => {
  return {
    contentId,
    card: state.resume.cards[contentId],
  };
};

export const makeGetAccomplishmentsForCard = () => {
  return createSelector(
    getCard,
    getAccomplishments,
    ({ contentId, card }, accomplishments) => {
      const newCard = createInstance(CardContent, card);
      newCard.key = contentId;
      Object.keys(accomplishments).forEach(accmpKey => {
        if (contentId === accomplishments[accmpKey].parentKey) {
          newCard.accomplishments = newCard.accomplishments || [];
          newCard.accomplishments.push(accomplishments[accmpKey]);
        }
      });
      return newCard;
    }
  );
};

export const makeGetAccomplishmentsForEditor = () => {
  return createSelector(
    getCard,
    getAccomplishments,
    ({ contentId, card }, accomplishments) => {
      const newCard = createInstance(CardContent, card);
      newCard.key = contentId;
      Object.keys(accomplishments).forEach(accmpKey => {
        if (contentId === accomplishments[accmpKey].parentKey) {
          newCard.accomplishments = newCard.accomplishments || [];
          newCard.accomplishments.push(accomplishments[accmpKey]);
        }
      });
      return newCard.accomplishments;
    }
  );
};
