import { useState, useEffect } from "react";

const Wallet = ({ userId }) => {
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [amount, setAmount] = useState("");

    useEffect(() => {
        fetch(`/api/wallet/balance/${userId}`)
            .then(res => res.json())
            .then(data => setBalance(data.balance));

        fetch(`/api/wallet/transactions/${userId}`)
            .then(res => res.json())
            .then(data => setTransactions(data));
    }, [userId]);

    const addMoney = async () => {
        const res = await fetch("/api/wallet/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, amount: parseInt(amount) }),
        });
        const data = await res.json();
        setBalance(data.balance);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h2 className="text-3xl font-bold mb-4">💰 Wallet Balance: ₹{balance}</h2>
            <input
                type="number"
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mb-3 p-2 text-black"
            />
            <button onClick={addMoney} className="bg-green-500 px-4 py-2 rounded">Add Money</button>

            <h3 className="text-xl font-bold mt-6">📜 Transaction History</h3>
            <ul className="bg-gray-800 p-4 rounded-lg w-96">
                {transactions.map((txn, index) => (
                    <li key={index} className="border-b border-gray-700 p-2">
                        {txn.type === "credit" ? "➕" : "➖"} ₹{txn.amount} on {new Date(txn.date).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Wallet;
