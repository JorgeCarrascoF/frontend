import Loader from "../components/Loader";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <h1 className="mb-4 text-5xl">Buggle</h1>
      <div
        className="border border-gray-300 rounded-lg"
      >
        <Loader />
      </div>
    </div>
  );
};

export default Home;
