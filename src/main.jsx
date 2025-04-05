import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import ViewAll from './Pages/ViewAll.jsx';
import Homepage from './Pages/Homepage.jsx';
import PreviousReadingsPage from './Pages/PreviousReadingsPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: 'view-all-cards',
        element: <ViewAll />,
      },
      {
        path: 'view-prev-read',
        element: <PreviousReadingsPage />,
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

