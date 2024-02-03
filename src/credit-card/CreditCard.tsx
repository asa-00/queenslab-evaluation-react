import { useContext } from "react"
import { CrediCardContext } from "../context/CardContext"

type CreditCardProps = {
  cardNumber: string
  cardHolder: string
}

const CreditCard = ({ cardNumber, cardHolder }: CreditCardProps) => {
  const card = useContext(CrediCardContext);
  return (
    <>{card.cardNumber}</>
  )
}

export default CreditCard;
