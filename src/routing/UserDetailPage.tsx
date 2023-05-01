import { useParams } from "react-router-dom";

const UserDetailPage = () => {
  const { id } = useParams();
  return <p>User {id}</p>;
};

export default UserDetailPage;
