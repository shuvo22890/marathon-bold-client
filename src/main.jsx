import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Root from './Root';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import PrivateRoute from './components/reusuable/PrivateRoute';
import Dashboard from './pages/Dashboard/Dashboard';
import AddMarathon from './pages/AddMarathon/AddMarathon';
import MyMarathons from './pages/MyMarathons/MyMarathons';
import MyApplies from './pages/MyApplies/MyApplies';
import Marathons from './pages/Marathons/Marathons';
import Details from './pages/Details/Details';
import Apply from './pages/Apply/Apply';
import Error404 from './pages/Error404/Error404';
import DashboardHome from './pages/DashboardHome/DashboardHome';
import { HelmetProvider } from 'react-helmet-async';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <Error404/>,
    children: [
      {
        path: "/",
        element: <Navigate to="/home"/>
      },
      {
        path: "/home",
        element: <Home/>
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register/>
      },
      {
        path: "/marathons",
        element: <Marathons/>
      },
      {
        path: "/marathons/:id",
        element: <PrivateRoute><Details/></PrivateRoute>
      },
      {
        path: "/marathon/apply/:id",
        element: <PrivateRoute><Apply/></PrivateRoute>
      },
      {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard/></PrivateRoute>,
        children: [
          {
            path: "/dashboard",
            element: <DashboardHome/>
          },
          {
            path: "/dashboard/add-marathon",
            element: <AddMarathon/>
          },
          {
            path: "/dashboard/my-marathons",
            element: <MyMarathons/>
          },
          {
            path: "/dashboard/my-applies",
            element: <MyApplies/>
          }
        ]
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
    <RouterProvider router={router} />
    </HelmetProvider>
  </StrictMode>,
)