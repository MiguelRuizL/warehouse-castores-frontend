import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className='flex flex-row min-h-screen w-full bg-gray-100 dark:bg-gray-900 p-5'>
      <Outlet />
    </div>
  );
}