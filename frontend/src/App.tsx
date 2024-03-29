import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import MainLayout from './components/Layout/MainLayout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/About/AboutPage'
import WelcomeLocation from './pages/About/subpages/WelcomeLocation'
import Staff from './pages/About/subpages/Staff/Staff'
import EditMember from './pages/Members/EditMember'
import MemberPage from './pages/Members/MemberPage'
import Expect from './pages/About/subpages/Expect/Expect'
import EditArticle from './pages/Articles/EditArticle'
import Beliefs from './pages/About/subpages/Beliefs/Beliefs'
import ChurchLife from './pages/ChurchLife/ChurchLife'
import Events from './pages/ChurchLife/subpages/Events/Events'
import EditEvent from './pages/Events/EditEvent/EditEvent'
import EventPage from './pages/Events/EventPage/EventPage'
import EditGroup from './pages/Groups/EditGroup/EditGroup'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '/', element: <Navigate replace to='/home' /> },
        { path: '/home', element: <HomePage /> },
        {
          path: '/about',
          element: <AboutPage />,
          children: [
            {
              index: true,
              element: <Navigate replace to='welcome-location' />,
            },
            { path: 'welcome-location', element: <WelcomeLocation /> },
            { path: 'our-pastors-and-staff', element: <Staff /> },
            { path: 'what-to-expect', element: <Expect /> },
            { path: 'what-we-believe', element: <Beliefs /> },
          ],
        },
        { path: 'staff/:memberId', element: <MemberPage /> },
        { path: 'staff/edit-member', element: <EditMember /> },
        { path: 'staff/edit-member/:memberId', element: <EditMember /> },
        { path: '/edit-article/:page', element: <EditArticle /> },
        {
          path: '/church-life',
          element: <ChurchLife />,
          children: [{ path: 'upcoming-events', element: <Events /> }],
        },
        { path: 'events/edit-event', element: <EditEvent /> },
        { path: 'events/edit-event/:eventId', element: <EditEvent /> },
        { path: 'events/:eventId', element: <EventPage /> },
        { path: 'groups/edit-group', element: <EditGroup /> },
        { path: 'groups/edit-group/:groupId', element: <EditGroup /> },
      ],
    },
  ])

  return <RouterProvider router={router} />
}

export default App
