import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import {
  CreateContactAction,
  DeleteContactAction,
  MarkFavoriteContactAction,
  UpdateContactAction,
} from './actions'
import ErrorPage from './pages/error-page'
import { GetContactLoader, GetContactsLoader } from './loaders'
import Contact from './routes/contact'
import EditContact from './routes/edit'
import Index from './routes/index'
import Root from './routes/root'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: GetContactsLoader,
    action: CreateContactAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: 'contacts/:contactId',
            element: <Contact />,
            loader: GetContactLoader,
            action: MarkFavoriteContactAction,
          },
          {
            path: 'contacts/:contactId/edit',
            element: <EditContact />,
            loader: GetContactLoader,
            action: UpdateContactAction,
          },
          {
            path: 'contacts/:contactId/destroy',
            action: DeleteContactAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
        ],
      },
    ],
  },
])

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  )
}
