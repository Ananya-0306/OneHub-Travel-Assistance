import React, { useState, useEffect } from "react";

const Wallet = () => {
    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState("");

    // ✅ Fetch Wallet Balance on Load
    useEffect(() => {
        fetch("http://localhost:5000/api/wallet/balance")
            .then((res) => res.json())
            .then((data) => setBalance(data.balance))
            .catch((error) => console.error("Error fetching balance:", error));
    }, []);

    // ✅ Function to Add Money to Wallet
    const addMoney = async () => {
        if (!amount || amount <= 0) {
            alert("Enter a valid amount!");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/wallet/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: Number(amount) }),
            });

            if (!response.ok) {
                throw new Error("Failed to add money");
            }

            const data = await response.json();
            setBalance(data.balance);
            alert("Money added successfully!");
            setAmount("");
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong!");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-6">
            <h1 className="text-3xl font-bold mb-6">💰 Wallet</h1>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
                <p className="text-lg mb-4">Current Balance: ₹{balance}</p>
                <input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-2 rounded bg-gray-700 text-white mb-4"
                />
                <button
                    onClick={addMoney}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded"
                >
                    Add Money
                </button>
            </div>
        </div>
    );
};

export default Wallet;
