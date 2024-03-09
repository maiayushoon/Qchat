import React, { useState } from "react";

import axios from "axios";

export const GenerateAns = () => {

    const apiKey = import.meta.env.VITE_API_KEY;

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const fetchData = async () => {
        setAnswer("Loading...");

        try {
            const result = await axios({
                method: "post",
                url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
                data: {
                    contents: [
                        { parts: [{ text: question }] },
                    ],
                },
            });

            const generatedText = result.data?.candidates?.[0]?.content?.parts?.[0]?.text;
            setAnswer(generatedText || "No answer generated.");
        } catch (error) {
            console.error("Error:", error);
            setAnswer("Error occurred while generating answer.");
        }
    };

    return (
        <>
            <div className="p-4">
                <div className="flex justify-center">
                    <h1 className="font-bold mb-4">Qchat</h1>
                </div>
                <div className="flex justify-center" >
                    <textarea
                        className="border border-gray-300 p-2 rounded mb-2"
                        rows="10"
                        cols={"80"}
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    ></textarea>
                </div><br />
                <span className="flex justify-center mt-3">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
                        onClick={fetchData}
                    >
                        Generate Answer
                    </button>
                </span>
                <pre
                    className="p-2 rounded mt-2 w-full overflow-x-auto"
                    style={{ maxWidth: '100%' }}
                >
                    {answer}
                </pre>
            </div>
        </>
    );
};
