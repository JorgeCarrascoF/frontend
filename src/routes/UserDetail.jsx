import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserIcon from "../components/UserIcon";

const UserDetails = () => {
  const { id } = useParams(); 
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Error al obtener usuario");
        const data = await res.json();
        setUserData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!userData) return <p className="p-6">Usuario no encontrado</p>;

  return (
    <div className="w-[90%]">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">
          {userData?.username || "User Details"}
        </h1>
      </div>
      <div className="flex items-center justify-between m-2.5 rounded-2xl h-[90%]">
        <div className="border-[1px] border-gray-200 bg-white rounded-2xl h-full w-[27%] flex flex-col items-center justify-start gap-20 py-20">
          <div className="w-full flex items-center flex-col">
            <div className="rounded-full w-[40%] aspect-square flex items-center justify-center">
              <UserIcon name={userData?.fullName} />
            </div>
            <div className="text-center mt-2 flex flex-col items-center gap-1">
              <p className="text-2xl font-medium">
                {userData?.fullName || "Default Username"}
              </p>
              <p className="text-md text-gray-500">{userData?.email}</p>
              <p className="text-md text-black">{userData?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
