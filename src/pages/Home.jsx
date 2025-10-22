// src/pages/Home.jsx
import TaskManager from "../components/TaskManager";
import ApiPage from "./ApiPage";


export default function Home() {
  return (
    <>
  <h1 className="text-3xl font-bold">Welcome Home 🏠</h1>


  <TaskManager />
  <ApiPage/>
    </>
  
)}
