import { TWO_MONTHS } from '@utils/date'

export type OrderConcept = 'MONTHLY'
export type OrderStatus = 'DUE' | 'PAID' | 'OUTSTANDING'

export class Order {
  id: string
  concept: OrderConcept
  name: string
  price: number
  priceCurrency: string
  due: Date
  status: OrderStatus
  interest: number
  savings: number
  payin: {
    id: string
    created: Date
  }

  constructor(data: any) {
    this.id = data.id
    this.concept = data.concept
    this.name = data.name
    this.price = Number(data.price)
    this.priceCurrency = data.price_currency
    this.due = new Date(data.due)
    this.status = data.status
    this.interest = Number(data.interest) || 0
    this.payin =  {
      id: data.payin?.id,
      created: new Date(data.payin?.created)
    }

    const now = new Date().getTime()
    const due = this.due.getTime()
    this.savings = due > now + TWO_MONTHS ? 100 : 0
  }

  get dueText(): string {
    if (this.status === 'PAID') {
      const dateString = this.payin.created.toLocaleDateString('es', {
        day: 'numeric',
        month: 'short'
      })
      return  `Pagado el ${dateString}.`
    }

    const now = new Date().getTime()
    const due = this.due.getTime()

    let text = 'Vence el'
    if (this.status === 'DUE') text = 'Vencido el'
    if (due > now + TWO_MONTHS) text = 'Ahora hasta el'

    const dateString = this.due.toLocaleDateString('es', {
      day: 'numeric',
      month: 'short'
    })

    return `${text} ${dateString}.`
  }
}
