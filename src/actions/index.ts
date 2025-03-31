import { ActionFunctionArgs, redirect } from 'react-router-dom'
import { createContact, deleteContact, updateContact } from '../services/contacts'

export async function CreateContactAction() {
  const contact = await createContact()
  return redirect(`/contacts/${contact.id}/edit`)
}

export async function UpdateContactAction({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData()
  const updates = Object.fromEntries(formData)
  await updateContact(params.contactId, updates)
  return redirect(`/contacts/${params.contactId}`)
}

export async function MarkFavoriteContactAction({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData()
  return updateContact(params.contactId, {
    favorite: formData.get('favorite') === 'true',
  })
}

export async function DeleteContactAction({ params }: ActionFunctionArgs) {
  // throw new Error("oh dang!");
  await deleteContact(params.contactId)
  return redirect('/')
}
