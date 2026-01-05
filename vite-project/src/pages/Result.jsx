import { useState } from "react";
import ResultSearchForm from "../components/ResultSearchForm";
import ResultCard from "../components/ResultCard";

const Result = () => {
    const [result, setResult] = useState(null);

    return (
        <div className="max-w-6xl w-[90%] mx-auto px-6 mt-16">
            <ResultSearchForm onResultFound={setResult} />

            {/* DEBUG */}
            {console.log("STATE RESULT:", result)}

            {result && <ResultCard result={result} />}
        </div>
    );
};

export default Result;
