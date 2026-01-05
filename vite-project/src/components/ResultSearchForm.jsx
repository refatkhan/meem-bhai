import { useState } from "react";
import axios from "axios";

export default function ResultSearchForm({ onResultFound }) {
    const [studentId, setStudentId] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async () => {

        if (!studentId.trim()) {
            setError("Please enter Student ID");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const res = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/api/v1/results/${studentId}`
            );
            console.log("API RESPONSE:", res.data);

            onResultFound(res.data);
        } catch (err) {
            setError(
                err.response?.data?.message || "Result not found"
            );
            onResultFound(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="border p-6 rounded-md bg-white">
            <h2 className="text-xl font-semibold mb-4 text-(--brand-700)">
                Check Your Result
            </h2>

            <input
                type="text"
                placeholder="Enter Student ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full border p-2 rounded"
            />

            {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
            )}

            <button
                onClick={handleSearch}
                disabled={loading}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
            >
                {loading ? "Searching..." : "Search Result"}
            </button>

        </div>
    );
}
