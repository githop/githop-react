import { IState } from '../reducers';
import { createSelector } from 'reselect';
import {
  CardAccomplishment, CardContent, CardTypes, ICardAccomplishmentsStore, ICardsStore,
  ResumeCard
} from '../models';

const getCards = (state: IState): ICardsStore => state.resume.cards;
const getAccomplishments = (state: IState): ICardAccomplishmentsStore => state.resume.accomplishments;

export const gatherCardAccomplishments = createSelector(
    getCards,
    getAccomplishments,
    (cards: ICardsStore, accomplishments: ICardAccomplishmentsStore): CardContent[] => {
      return Object.keys(cards).reduce(
          (newCards: CardContent[], cardKey) => {
            const newCard = Object.assign(new CardContent(), cards[cardKey]);
            newCard.key = cardKey;
            if (newCard.accomplishmentKeys != null) {
              newCard.accomplishments = Object.keys(accomplishments).reduce(
                  (accm: CardAccomplishment[], accmpKey: string) => {
                    if (accomplishments[accmpKey].parentKey === cardKey) {
                      accm.push(accomplishments[accmpKey]);
                    }
                    return accm;
                  },
                  []
              );
            }
            newCards.push(newCard);
            return newCards;
          },
          []
      );
    }
);

type GroupedCards = {
  [K in CardTypes]: CardContent[];
};

export const groupByCardType = createSelector(
    gatherCardAccomplishments,
    (cards: CardContent[]): ResumeCard[] => {
      const grouped = cards.reduce(
          (resumeCard: GroupedCards, card: CardContent) => {
            if (resumeCard[card.type] && resumeCard[card.type].length) {
              resumeCard[card.type].push(card);
            } else {
              resumeCard[card.type] = [card];
            }
            return resumeCard;
          },
          {}
      );
      return Object.keys(grouped)
          .map((key: string) => {
            return Object.assign(new ResumeCard(), {type: key, content: grouped[key]});
          });
    }
);

export const getResumeCards = createSelector(
    groupByCardType,
    (cards: ResumeCard[]) => {
      return cards;
    }
);

export const getCard = (state: IState, contentId: string) => {
  return {
    contentId,
    card: state.resume.cards[contentId]
  };
};

export const makeGetAccomplishmentsForCard = () => {
  return createSelector(
      getCard,
      getAccomplishments,
      ({contentId, card}, accomplishments) => {
        const newCard = Object.assign(new CardContent(), card);
        newCard.key = contentId;
        if (newCard.accomplishmentKeys != null) {
          newCard.accomplishments = Object.keys(accomplishments).reduce(
              (accm: CardAccomplishment[], accmpKey: string) => {
                if (accomplishments[accmpKey].parentKey === contentId) {
                  accm.push(accomplishments[accmpKey]);
                }
                return accm;
              },
              []
          );
        }
        return newCard;
      }
  );
};