import { createBrowserRouter, json, redirect, RouterProvider } from 'react-router-dom'

import Root from './pages/Root';
import Home from './pages/Home';
import EventsRoot from './pages/EventsRoot';
import Events, { loader as eventsLoader } from './pages/Events';
import EventDetail, { deleteAction, loader as eventDetailLoader } from './pages/EventDetail';
import NewEvent, { action as eventManipulationAction } from './pages/NewEvent';
import EditEvent from './pages/EditEvent';
import Error from './pages/Error';
import NewsletterPage, { action as newsletterAction } from './pages/Newsletter';
import AuthenticationPage, { action as registerAction } from './pages/Authentication';
import { action as logoutAction } from './pages/Logout';
import { isAuthenLoader, tokenLoader } from './ulties/auth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    id: 'root',
    loader: tokenLoader,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'events',
        element: <EventsRoot />,
        children: [
          {
            index: true,
            element: <Events />,
            loader: eventsLoader
          },
          {
            path: ':id',
            id: 'event-detail',
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetail />,
                action: deleteAction
              },
              {
                path: 'edit',
                element: <EditEvent />,
                action: eventManipulationAction
              }
            ]
          },
          {
            path: 'new', element: <NewEvent />,
            action: eventManipulationAction
          },
        ]
      },
      {
        path: 'authen',
        element: <AuthenticationPage />,
        action: registerAction
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        loader: isAuthenLoader,
        action: newsletterAction,
      },
      {
        path: 'logout',
        action: logoutAction
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App;
