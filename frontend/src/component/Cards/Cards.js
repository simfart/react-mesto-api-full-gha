import { useMemo } from 'react'
import { useCards } from '../../hooks'
import { Card } from '../Card/Card'


export const Cards = () => {
  const { data: cards } = useCards()

  const cardsContent = useMemo(() => {
    if (cards) {
      return cards.toReversed().map((card) => (
        <Card
          //   onCardClick={onCardClick}
          //   onCardLike={onCardLike}
          //   onCardDelete={onCardDelete}
          card={card}
          key={card._id}
        />
      ))
    }
    return null
  }, [cards])

  return <section className="elements">{cardsContent}</section>
}
