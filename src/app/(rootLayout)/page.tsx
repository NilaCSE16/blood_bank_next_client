import WithNav from "@/components/Layout/WithNav";
import Home from "@/components/Pages/Home";
import PrivateRoute from "@/components/routes/PrivateRoute";

export default function Page({ children }: any) {
  return (
    <>
      <PrivateRoute>
        <WithNav>
          <Home></Home>
        </WithNav>
      </PrivateRoute>
    </>
  );
}
