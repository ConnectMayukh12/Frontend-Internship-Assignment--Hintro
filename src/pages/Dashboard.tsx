import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardNavbar } from "../components/DashboardNavbar";
import { KanbanBoard } from "../components/KanbanBoard";
import { STORAGE_KEYS } from "../utils/storage";
import { Loader } from "../components/Loader";
import "../components/Loader.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    document.title = "Dashboard - Hintro";
  }, []);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (!isAuthenticated) {
      navigate("/signin", { replace: true });
    } else {
      setIsChecking(false);
    }
  }, [navigate]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <DashboardNavbar>
      <div className="p-8 md:p-[60px]">
        <h1 className="text-4xl font-bold mb-2">Welcome to Dashboard</h1>
        <p className="text-gray-600 mb-8">
          Manage your tasks efficiently with our Kanban board.
        </p>
        <KanbanBoard />
      </div>
    </DashboardNavbar>
  );
}
