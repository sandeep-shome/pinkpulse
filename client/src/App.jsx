import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Navbar, Footer } from "./components/created";
import { Toaster } from "./components/ui";
import { Home, Login, Periods } from "./screens";
import UserContextProider from "./context/userContext";

const App = () => {
  const RootLayout = () => (
    <>
      <Toaster />
      <Navbar />
      <main className="pt-20 w-full min-h-screen px-5 md:px-36">
        <Outlet />
      </main>
      <Footer />
    </>
  );
  const AuthLayout = () => (
    <>
      <Toaster />
      <main className="w-full min-h-screen px-5 md:px-36 flex items-center justify-center flex-col">
        <Outlet />
      </main>
    </>
  );

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/periods",
          element: <Periods />,
        },
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element: <Login />,
        },
      ],
    },
  ]);

  return (
    <UserContextProider>
      <RouterProvider router={router} />
    </UserContextProider>
  );
};

export default App;
