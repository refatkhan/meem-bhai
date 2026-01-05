import React from "react";

const ResultCard = ({ result }) => {
    if (!result || !Array.isArray(result.results)) {
        return null;
    }

    return (
        <div className="mt-6 border rounded-md p-6 bg-white">
            <h2 className="text-xl font-bold text-(--brand-700)">
                Student Result
            </h2>

            {/* Student Info */}
            <div className="mt-4 space-y-1">
                <p>
                    <strong>Name:</strong> {result.name}
                </p>
                <p>
                    <strong>Student ID:</strong> {result.studentId}
                </p>
                <p>
                    <strong>Class:</strong> {result.class}
                </p>
                <p>
                    <strong>GPA:</strong> {result.gpa}
                </p>
            </div>

            {/* Result Table */}
            <div className="mt-6">
                <table className="w-full border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2 text-left">Subject</th>
                            <th className="border p-2 text-left">Marks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result.results.map((item, index) => (
                            <tr key={index}>
                                <td className="border p-2">{item.subject}</td>
                                <td className="border p-2">{item.marks}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ResultCard;
