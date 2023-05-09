import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import AddChocolate from './Components/AddChocolate.jsx';
import EditChocolate from './Components/EditChocolate.jsx';
import Layout from './Components/Layouts/Layout.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <App />,
        loader: () => fetch(`http://localhost:3000/chocolates`)
      },
      {
        path: '/AddChocolate',
        element: <AddChocolate />
      },
      {
        path: '/EditChocolate/:id',
        element: <EditChocolate />,
        loader: ({ params }) => fetch(`http://localhost:3000/chocolates/${params.id}`)
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);