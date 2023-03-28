import './App.scss'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import MainLayout from './components/Layout/MainLayout'
import HomePage from './pages/HomePage'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '/', element: <Navigate to='/home' /> },
        { path: '/home', element: <HomePage /> },
      ],
    },
  ])

  return <RouterProvider router={router} />
}

export default App
