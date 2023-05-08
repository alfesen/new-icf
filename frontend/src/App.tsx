import './App.scss'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom'
import MainLayout from './components/Layout/MainLayout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/About/AboutPage'
import WelcomeLocation from './pages/About/subpages/WelcomeLocation'
import Staff from './pages/About/subpages/Staff/Staff'
import EditMember from './pages/Members/EditMember'
import MemberPage from './pages/Members/MemberPage'
import Expect from './pages/About/subpages/Expect/Expect'
import ArticleForm from './components/shared/ArticleForm/ArticleForm'

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
          ],
        },
        { path: 'staff/:memberId', element: <MemberPage /> },
        { path: 'staff/edit-member', element: <EditMember /> },
        { path: 'staff/edit-member/:memberId', element: <EditMember /> },
        { path: '/edit-page-article/:page', element: <ArticleForm /> },
      ],
    },
  ])

  return <RouterProvider router={router} />
}

export default App
