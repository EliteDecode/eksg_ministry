import {
  BrowserRouter,
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import { HelmetProvider } from "react-helmet-async";
import Login from "./pages/auth/Login";
import DashboardLayout from "./layouts/dashboard/DashboardLayout";
import DashboardHomePage from "./pages/dashboard/DashboardHomePage";
import DashboardSchoolPage from "./pages/dashboard/SchoolsPage";
import DashboardProfilePage from "./pages/dashboard/DashboardProfilePage";
import DashboardTransactionPage from "./pages/dashboard/DashboardTransactionPage";
import DashboardSettingsPage from "./pages/dashboard/DashboardSettingsPage";
import Page404 from "./pages/notFound/Page404";
import DashboardSingleTransactionPage from "./pages/dashboard/DashboardSingleTransactionPage";
import TeachersPage from "./pages/dashboard/SchoolsPage";
import SchoolsPage from "./pages/dashboard/SchoolsPage";
import StudentsPage from "./pages/dashboard/StudentsPage";
import ClassesPage from "./pages/dashboard/ClassesPage";
import SubjectPage from "./pages/dashboard/SubjectPage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import ResultsPage from "./pages/dashboard/ResultsPage";
import SingleSchoolPage from "./pages/dashboard/SingleSchoolPage";
import SingleStudentPage from "./pages/dashboard/SingleStudentPage";
import { useSelector } from "react-redux";
import AddSchoolPage from "./pages/dashboard/AddSchoolPage";
import AdminPage from "./pages/dashboard/AdminPage";

// routes

export default function App() {
  const { user } = useSelector((state) => state.adminAuth);
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/dashboard" />,
    },
    {
      element: user ? <DashboardLayout /> : <Navigate to="/login" />,

      path: "/dashboard",
      children: [
        { element: <Navigate to="/dashboard/home" />, index: true },
        {
          path: "home",
          element: <DashboardHomePage />,
        },
        {
          path: "admin",
          element: <AdminPage />,
        },
        {
          path: "schools",
          element: <SchoolsPage />,
        },
        {
          path: "students",
          element: <StudentsPage />,
        },
        {
          path: "classes",
          element: <ClassesPage />,
        },
        {
          path: "settings",
          element: <SettingsPage />,
        },
        {
          path: "results",
          element: <ResultsPage />,
        },
        {
          path: "subjects",
          element: <SubjectPage />,
        },
        {
          path: "schools/:schoolId",
          element: <SingleSchoolPage />,
        },
        {
          path: "students/:studentId",
          element: <SingleStudentPage />,
        },
        {
          path: "schools/add-school",
          element: <AddSchoolPage />,
        },
        {
          path: "profile",
          element: <DashboardProfilePage />,
        },
        {
          path: "transactions",
          element: <DashboardTransactionPage />,
        },
        {
          path: "transactions/:transactionId",
          element: <DashboardSingleTransactionPage />,
        },
        {
          path: "settings",
          element: <DashboardSettingsPage />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    { path: "/404", element: <Page404 /> },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);
  return <RouterProvider router={routes} />;
}
