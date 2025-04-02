import { ActionFunctionArgs } from 'react-router-dom'
import { getContact, getContacts } from '@/services/contacts'

export async function GetContactLoader({ params }: ActionFunctionArgs) {
  const contact = await getContact(params.contactId)
  if (!contact) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    })
  }
  return { contact }
}

export async function GetContactsLoader({ request }: ActionFunctionArgs) {
  const url = new URL(request.url)
  const q = url.searchParams.get('q')
  const contacts = await getContacts(q)
  return { contacts, q }
}
