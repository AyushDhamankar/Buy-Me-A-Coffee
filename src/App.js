import abi from "./abi.json";
import moment from "moment";
import { useState, useEffect } from "react";
import Web3 from "web3";
function App() {
  const [acc, setacc] = useState("Account is not connected");
  const [state, setState] = useState({
    web3: null,
    contract: null,
  });
  useEffect(() => {
    const init = async () => {
      try {
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setacc(accounts[0]);
        const contract = new web3.eth.Contract(
          abi,
          "0x8abaDF7e4D45C4BAa1E092ddBa85535D1CB8cd96"
        );
        setState({ web3: web3, contract: contract });
        console.log(state);
      } catch (error) {
        alert("Please Install Metamask");
      }
    };
    init();
  }, []);

  const [name, setName] = useState();
  const [message, setMessage] = useState();
  const donateEth = async () => {
    try {
      console.log("Hii");
      const { contract, web3 } = state;
      const eth = "0.001";
      const weiValue = web3.utils.toWei(eth, "ether");
      const date = moment().format("MMMM Do YYYY, h:mm:ss a");
      await contract.methods
        .DonateMatic(date, name, message)
        .send({ from: acc, value: weiValue, gas: 480000 });
      window.location.reload(false);
    } catch (error) {
      console.log("Bye");
    }
  };

  const [detail, setDetail] = useState("");
  useEffect(() => {
    const { contract } = state;
    const getDetail = async () => {
      const nameText = await contract.methods.getUser().call();
      setDetail(nameText);
      console.log(nameText);
      console.log(nameText[0][0]);
    };
    contract && getDetail();
  }, [state]);
  return (
    <>
      <section class="text-gray-400 bg-gray-900 body-font">
        <div class="container mx-auto flex px-5 py-10 items-center justify-center flex-col">
          <img
            class="w-10 h-10 p-1 rounded-full ring-2 ring-[#c52a92] dark:ring-[#c52a92]"
            src="https://plus.unsplash.com/premium_photo-1669888245224-8fe296e1bc60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmxvYXRpbmd8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
            alt="Bordered avatar"
            style={{ width: "125px", height: "125px", marginBottom: "15px" }}
          />
          <div class="text-center lg:w-2/3 w-full">
            <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
              Hii, I am Ayush
            </h1>
            <p class="leading-relaxed">
              Passionate and driven IT student with a love for technology and problem-solving. Equipped with a solid foundation in programming and web development.
            </p>
          </div>
        </div>
      </section>

      <section class="text-gray-400 bg-gray-900 body-font">
        <div
          class="container px-5 mx-auto flex flex-wrap items-center"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div class="lg:w-2/6 md:w-1/2 bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0">
            <h2 class="text-white text-lg font-medium title-font mb-5">
              Buy Ayush a coffee ☕
            </h2>
            <div class="relative mb-4">
              <label for="full-name" class="leading-7 text-sm text-gray-400">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={(e) => setName(e.target.value)}
                class="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="relative mb-4">
              <label for="email" class="leading-7 text-sm text-gray-400">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                onChange={(e) => setMessage(e.target.value)}
                class="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              ></textarea>
            </div>
            <button
              onClick={donateEth}
              class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Support <br/> (0.001 Matic)
            </button>
          </div>
        </div>
      </section>

      <section class="text-gray-400 bg-gray-900 body-font overflow-hidden">
        <div class="container px-5 py-24 mx-auto">
          <div class="-my-8 divide-y-2 divide-gray-800">
            {detail !== "" &&
              detail.map((detail) => {
                console.log(detail);
                return (
                  <div class="py-8 flex flex-wrap md:flex-nowrap">
                    <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                      <span class="font-semibold title-font text-white">
                        Date & Time
                      </span>
                      <span class="mt-1 text-gray-500 text-sm">
                        {detail[0]} 
                      </span>
                    </div>
                    <div class="md:flex-grow">
                      <h2 class="text-2xl font-medium text-white title-font mb-2">
                        {detail[1]} bought a coffee ☕
                      </h2>
                      <p class="leading-relaxed">{detail[2]}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
