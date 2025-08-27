import CreateLogForm from "../components/CreateLogForm";

const LogCreatePage = () => {
  return (
    <div className="mt-10 h-[90%]">
      <div className="flex flex-col text-left ms-5 mb-10">
        <h1 className="mb-3 text-4xl font-bold #">New log</h1>
        <h1 className="ms-1 text-md text-[#737373]">Manually Enter New Log</h1>
      </div>
      <div className="flex flex-col items-center m-2.5 rounded-2xl border border-gray-200 bg-white h-[90%] py-3 px-6">
        <CreateLogForm />
      </div>
    </div>
  );
};

export default LogCreatePage;