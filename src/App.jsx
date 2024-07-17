import { useState, useCallback, useEffect, useRef } from "react";

function App() {
    // State variables for password length, and character type inclusion
    const [length, setLength] = useState(10);
    const [numberAllowed, setNumberAllowed] = useState(false);
    const [charAllowed, setCharAllowed] = useState(false);
    const [password, setPassword] = useState("");

    // useRef for clipboard operations
    const passwordRef = useRef(null);

    // Function to copy the generated password to the clipboard
    const copyPasswordClipboard = useCallback(() => {
        passwordRef.current?.select();
        if (password) {
            window.navigator.clipboard.writeText(password).then(() => {
                alert("Password Copied Successfully 😎");
            });
        }
    }, [password]);

    // Function to generate a random password based on the selected criteria
    const passwordGenerator = useCallback(() => {
        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        if (numberAllowed) str += "0123456789";
        if (charAllowed) str += "!#$%&'()*+,-./:;<=>?@[]^_`{|}~";

        for (let i = 0; i < length; i++) {
            let char = Math.floor(Math.random() * str.length);
            pass += str.charAt(char);
        }

        setPassword(pass);
    }, [length, numberAllowed, charAllowed]);

    // Regenerate the password whenever the length, numberAllowed, or charAllowed changes
    useEffect(() => {
        passwordGenerator();
    }, [length, numberAllowed, charAllowed, passwordGenerator]);

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-5">
            <div className="w-full max-w-md mx-auto bg-gray-800 text-white rounded-xl shadow-lg p-6">
                <h1 className="text-center text-2xl font-bold mb-4">
                    Password Generator
                </h1>
                <div className="flex mb-4">
                    <input
                        type="text"
                        value={password}
                        className="flex-1 py-2 px-3 rounded-l-lg bg-gray-700 text-white outline-none"
                        readOnly
                        ref={passwordRef}
                    />
                    <button
                        onClick={copyPasswordClipboard}
                        className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-500 active:bg-blue-700 focus:outline-none"
                    >
                        Copy
                    </button>
                </div>
                <div className="mb-4">
                    <label className="block mb-2">
                        Password Length: {length}
                    </label>
                    <input
                        type="range"
                        min={8}
                        max={30}
                        value={length}
                        className="w-full"
                        onChange={(e) => setLength(Number(e.target.value))}
                    />
                </div>
                <div className="mb-4">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={numberAllowed}
                            className="mr-2"
                            onChange={() => setNumberAllowed((prev) => !prev)}
                        />
                        Include Numbers
                    </label>
                </div>
                <div className="mb-4">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={charAllowed}
                            className="mr-2"
                            onChange={() => setCharAllowed((prev) => !prev)}
                        />
                        Include Special Characters
                    </label>
                </div>
            </div>
        </div>
    );
}

export default App;
