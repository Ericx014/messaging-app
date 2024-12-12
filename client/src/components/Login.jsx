import { useRef } from "react";
// import { v4 as uuidV4 } from "uuid";

const Login = ({ onIdSubmit }) => {
  const idRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onIdSubmit(idRef.current.value);
  };

  // const createNewId = () => {
  //   onIdSubmit(uuidV4());
  // };

  return (
    <section className="flex justify-center items-center h-screen bg-[#778da941]">
      <form
        onSubmit={handleSubmit}
        className="border-[2px] bg-white p-[30px] w-[400px] rounded-xl hover:shadow-xl transition-shadow duration-300"
      >
        <div className="flex flex-row justify-center w-full items-center">
          <h1 className="font-bold mb-5 text-lg capitalize">Welcome</h1>
        </div>
        <input
          type="text"
          placeholder="Enter your ID."
          className="focus:outline-none focus:placeholder-transparent focus:ring-[#778da9] focus:ring-2 bg-gray-200 text-black px-4 py-3 rounded-lg w-full mb-3"
          id="email"
          ref={idRef}
          required
        />
        <div className="flex flex-row gap-5">
          {/* <button
            type="button"
            onClick={createNewId}
            className="bg-[#4a68a0] text-white px-4 py-3 rounded-lg w-full mb-2"
          >
            Create a new ID
          </button> */}
          <button
            type="submit"
            className="bg-[#1b263b] text-white px-4 py-3 rounded-lg w-full mb-2"
          >
            Login
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
