import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { Dashboard } from "../layouts/Dashboard";
import { Home } from "../Pages/Home";
import AdminRoute from "./AdminRoute";
import TeacherRoute from "./TeacherRoute";
import { Teachers } from "../Pages/Teachers";
import { PrivateRoute } from "./PrivateRoute";
import { ErrorPage } from "../Pages/ErrorPage";
import { SignIn } from "../Pages/SignIn";
import Overview from "../Pages/DashboardPages/Overview";
import { Notices } from "../Pages/Notices";
import Students from "../Pages/Students";
import ResultPDF from "../components/Dashboard/ResultPDF/ResultPDF";

import AddNotice from "../Pages/DashboardPages/AdminPages/AddNotice";
import { AddSubject } from "../Pages/DashboardPages/AdminPages/AddSubject";
import AllSubjects from "../Pages/DashboardPages/AdminPages/AllSubjects";
import AllUsers from "../Pages/DashboardPages/AdminPages/AllUsers";
import CreateUserPage from "../Pages/DashboardPages/AdminPages/CreateUser";
import CreateAdmitCard from "../Pages/DashboardPages/AdminPages/CreateAdmitCard";
import UpdateStudent from "../Pages/DashboardPages/AdminPages/UpdateStudent";
import UpdateUser from "../Pages/DashboardPages/AdminPages/UpdateUser";
import ClassAdmitCard from "../Pages/DashboardPages/ClassAdmitCard";
import { AddResult } from "../Pages/DashboardPages/TeacherPages/AddResult";
import { AddStudent } from "../Pages/DashboardPages/TeacherPages/AddStudent";
import StudentDetails from "../Pages/DashboardPages/StudentDetails";
import AddTeacher from "../Pages/DashboardPages/AdminPages/AddTeacher";
import AllTeachers from "../Pages/DashboardPages/AdminPages/AllTeachers";
import TeachersDetails from "../Pages/TeachersDetails";
import AllStudents from "../Pages/DashboardPages/AllStudents";
import Results from "../Pages/DashboardPages/Results";
import ClientAllSubjects from "../Pages/AllSubjects";
import AccountantRoute from "./AccountantRoutes";
import AllStudentsFees from "../Pages/DashboardPages/AccountantPages/AllStudentsFees";
import StuPaymentHistory from "../Pages/DashboardPages/AccountantPages/StuPaymentHistory";
import AddExamFee from "../Pages/DashboardPages/AccountantPages/AddExamFee";
import ClientResult from "../Pages/ClientResult";
import AddAllStudents from "../Pages/DashboardPages/AccountantPages/AddAllStudents";
import Management from "../Pages/Management";
import SpecialTask from "../Pages/DashboardPages/AdminPages/SpecialTask";
import DailyOfficeInOut from "../Pages/DashboardPages/AccountantPages/DailyOfficeInOut";
import OfficeLedgerStatement from "../Pages/DashboardPages/AccountantPages/OfficeLedgerStatement";

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MainLayout></MainLayout>,
      errorElement:<ErrorPage></ErrorPage>,
      children:[
        {
          path: '/',
          element: <Home></Home>
        },
        {
          path: '/all-notice',
          element: <Notices />,
        },
        {
          path: '/teachers',
          element: <Teachers />,
        },
        {
          path: '/management',
          element: <Management />,
        },
        {
          path: '/students',
          element: <Students />,
        },
        {
          path: '/client-result',
          element: <ClientResult />
        },
        {
          path: '/subjects',
          element: <ClientAllSubjects />
        },
        {
          path: "/teacher-details/:id",
          element: <TeachersDetails />
        },
      ]
    },
    {
      path: 'login',
      element:<SignIn></SignIn>
    },
    {
      path: "dashboard",
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      errorElement:<ErrorPage></ErrorPage>,
      children: [
        {
          index: true,
          element: <Overview></Overview>
        },
        // --------------------------admin routes-----------------------
         {
          path: "create-user",
          element: <AdminRoute><CreateUserPage /></AdminRoute>
        },
         {
          path: "all-user",
          element: <AdminRoute><AllUsers /></AdminRoute>
        },
         {
          path: "special-task",
          element: <SpecialTask />
        },
         {
          path: "update-user/:id",
          element: <AdminRoute><UpdateUser /></AdminRoute>
        },
        {
          path: "add-notice",
          element: <AdminRoute><AddNotice /></AdminRoute>
        },
        {
          path: "update-student/:id",
          element: <UpdateStudent />
        },
        {
          path: "add-subjects",
          element: <AdminRoute><AddSubject /></AdminRoute>
        },
        {
          path: "add-admit-card",
          element: <AdminRoute><CreateAdmitCard /></AdminRoute>
        },
        {
          path: "subjects",
          element: <AdminRoute><AllSubjects /></AdminRoute>
        },
        {
          path: "add-teacher",
          element: <AdminRoute><AddTeacher /></AdminRoute>
        },
        {
          path: "all-teacher",
          element: <AdminRoute><AllTeachers /></AdminRoute>
        },
        // --------------------teachers routes--------------------
        {
          path: "add-student",
          element: <TeacherRoute><AddStudent></AddStudent></TeacherRoute>
        },
       
        {
          path: "add-result",
          element: <TeacherRoute><AddResult></AddResult></TeacherRoute>
        },

        // accountant routes
        {
          path: "daily-inout",
          element: <AccountantRoute><DailyOfficeInOut /></AccountantRoute>
        },
        {
          path: "ledger-statement",
          element: <AccountantRoute><OfficeLedgerStatement /></AccountantRoute>
        }, 
        {
          path: "students-fees",
          element: <AccountantRoute><AllStudentsFees /></AccountantRoute>
        },
         {
          path: "student-payment-history/:id",
          element: <AccountantRoute><StuPaymentHistory /></AccountantRoute>
        },
         {
          path: "add-exam-fee",
          element: <AccountantRoute><AddExamFee /></AccountantRoute>
        },

        {
          path: "all-students-fees",
          element: <AccountantRoute><AddAllStudents /></AccountantRoute>
        },

        // all user routes
        {
          path: "students",
          element: <AllStudents></AllStudents>
        },
         
        {
          path: "class-admit-cards",
          element: <ClassAdmitCard />
        },
        
        {
          path: "dashboard-results",
          element: <Results></Results>
        },
        {
          path: "result/:id",
          element: <ResultPDF />
        },
      {
          path: "student-details/:id",
          element: <StudentDetails />
        },
        
      ]
    }
  ]
)

export default router;
