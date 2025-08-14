import CreateLogForm from "../components/CreateLogForm";

const LogCreatePage = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-8">Create new Log</h1>
      <CreateLogForm />
    </div>
  );
};

export default LogCreatePage;