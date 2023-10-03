import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.jsx';
import Error from './pages/Signup.jsx';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup.jsx';
import SearchResults from './pages/SearchResults';
import ReadingPreferences from './pages/ReadingPreferences';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/users/:id',
        element: <Profile />
      },
      {
        path: '/me',
        element: <Profile />
      },
      {
        path: '/search-results',
        element: <SearchResults />
      },
      {
        path: '/reading-preferences',
        element: <ReadingPreferences />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
