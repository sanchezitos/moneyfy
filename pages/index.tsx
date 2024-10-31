
import withAuth from "@/libs/WithAuth";
import { useSession } from "next-auth/react";
import React from "react";

const Home = () => {
  const { data: session } = useSession();
  return (
    <>
      <div className="p-4">
        <h1 className="text-xl font-bold">Bienvenido a MONEYFY, {session.user?.name}</h1>


      </div>
    </>

  );
};
export default withAuth(Home, ["admin", "user"])