import CreateLogForm from "../components/CreateLogForm";

const LogCreatePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Crear nuevo log</h1>
      <CreateLogForm />
    </div>
  );
};

export default LogCreatePage;