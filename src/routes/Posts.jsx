
import NavButton from "../components/NavButton";
import PaginatedPostDashboard from "../components/PaginatedPostDashboard";
import PostDashboard from "../components/PostDashboard";

const Posts = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start",justifySelf: "flex-start", alignItems: "center" }}>
      <h1>Posts</h1>
      <NavButton text="Go to Home" route="/" />
      {/* <PostDashboard /> */}
      <PaginatedPostDashboard />
    </div>
  );
};

export default Posts;
