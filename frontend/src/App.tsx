import './App.scss'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import MainLayout from './components/Layout/MainLayout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/About/AboutPage'
import WelcomeLocation from './pages/About/subpages/WelcomeLocation'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '/', element: <Navigate to='/home' /> },
        { path: '/home', element: <HomePage /> },
        {
          path: '/about/*',
          element: <AboutPage />,
          children: [
            { index: true, element: <Navigate to='welcome-location' /> },
            { path: 'welcome-location', element: <WelcomeLocation /> },
          ],
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}

export default App
