import { useParams } from "react-router-dom";
import UserInfo from "../components/UserInfo";

const UserDetails = () => {
  const { id } = useParams();

  return (
    <div className="w-[90%]">
      <UserInfo userId={id} />
    </div>
  );
};

export default UserDetails;
