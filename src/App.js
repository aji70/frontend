import { useState } from "react";
import { ethers } from "ethers";
import contractABI from "./abi.json";

function App() {
  const contractAddress = "0x6C747Ed0405c44f789DabA22db9a33645637F103";

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  const [inputMessage, setInputMessage] = useState(""); // Renamed state variable
  const [getmsg, setGetmsg] = useState("display Here");
  async function sendMessageToContract() {
    // Renamed function
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      try {
        const transaction = await contract.setMessage(inputMessage);
        await transaction.wait();
        console.log("msg sent");
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }

  async function getMessageToContract() {
    // Renamed function
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      try {
        const transaction = await contract.getMessage();
        setGetmsg(transaction);
        console.log(transaction);
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }

  const handleMessageChange = (e) => {
    setInputMessage(e.target.value);
  };

  return (
    <div className="App">
      <div>
        <input
          type="text"
          placeholder="Enter your message"
          value={inputMessage}
          onChange={handleMessageChange}
        />
        <br /> <br />
        <button onClick={sendMessageToContract}>Set Message</button>
        <br /> <br />
        <button onClick={getMessageToContract}>Get Message</button>
      </div>
      <div>
        <p>{getmsg}</p>
      </div>
    </div>
  );
}

export default App;
