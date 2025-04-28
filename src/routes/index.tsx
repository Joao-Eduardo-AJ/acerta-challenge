import { createBrowserRouter } from "react-router";
import LeadListPage from "../pages/LeadListPage";
import LeadFormPage from "../pages/LeadFormPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LeadListPage />,
  },
  {
    path: "/leads",
    element: <LeadListPage />,
  },
  {
    path: "/leads/new",
    element: <LeadFormPage />,
  },
  {
    path: "/leads/:id/edit",
    element: <LeadFormPage />,
  },
]);