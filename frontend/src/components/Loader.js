function Loader() {
  return (
    <div className="h-screen pt-52">
      <div className="animate-spin rounded-full mx-auto h-12 w-12 border-b-2 border-gray-900"></div>
      <h3 className="text-md font-semibold mx-auto text-center mt-6">
        Loading...
      </h3>
    </div>
  );
}

export default Loader;
