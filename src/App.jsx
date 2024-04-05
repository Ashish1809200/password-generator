import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += ":,@$%[]{},";
    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToclipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);
  return (
    <>
      <div className="w-full max-w-lg my-8 mx-auto px-4 py-3 rounded-2xl text-orange-500 bg-gray-900">
        <h1 className="text-4xl text-white text-center my-4">
          Password Generator
        </h1>
        <div className="flex rounded-xl overflow-hidden shadow">
          <input
            className="w-full py-1 px-3 font-medium text-xl text-orange-500"
            value={password}
            type="text"
            ref={passwordRef}
            readOnly
          />
          <button
            className="bg-blue-700 text-xl text-white shrink-0 px-2 py-1"
            onClick={copyPasswordToclipboard}
          >
            copy
          </button>
        </div>
        <div className="flex text-lg gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              value={numberAllowed}
              onClick={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label>Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              value={charAllowed}
              onClick={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label>Char</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
