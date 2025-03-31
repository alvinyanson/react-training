import { ActionFunctionArgs } from 'react-router-dom'

export type ContactAction = {
  action: ActionFunctionArgs
  params: {
    contactId?: string
  }
}

export type Contact = {
  id?: string
  first?: string
  last?: string
  twitter?: string
  avatar?: string
  notes?: string
  favorite?: boolean
  createdAt?: number
}

export type FavoriteProps = {
  contact: Contact
}
