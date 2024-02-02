import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
const { Configuration, OpenAIApi } = require("openai");

const Container = () => {
//   const openai = new OpenAIApi({
//     apiKey: process.env.REACT_APP_APIKEY,
//   });
  const key= process.env.REACT_APP_APIKEY

  const [prompt, setPrompt] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGetAnswer = async (e) => {
   // max_tokens:100,
    console.log(key)
    e.preventDefault();
    setLoading(true);

    try {
    //   const result = await openai.createCompletion({
    //     model: 'text-davinci-003',
    //     prompt: prompt,
    //     temperature: 0.5,
    //     max_tokens: 4000,
    //   });
      const result =await axios.post('https://api.openai.com/v1/engines/gpt-3.5-turbo-instruct/completions',{
        prompt:prompt,
        max_tokens:100,
      
      },
      {
        headers:{
            'Content-type': 'application/json',
            'Authorization': `Bearer ${key}`,
        },
      }
      
      );

    
      setApiResponse(result.data.choices[0].text);
    } catch (error) {
      console.error(error);
      setApiResponse('Something went wrong. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="main-cont d-flex flex-col">
      <div className="heading mb-3">ChatGPT</div>

      <div className="inner-cont d-flex flex-col">
        <div className="input-container d-flex flex-col">
          <span className="mt-2 mb-2">Ask ChatGPT</span>
          <div className="input-textarea">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            ></textarea>
          </div>

          <Button
            className="mt-3 mb-3"
            onClick={handleGetAnswer}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Get Answer'}
          </Button>
        </div>

        <div className="response-cont d-flex flex-col">
          <div className="d-flex flex-row w-100">
            <p>GPT Response</p> <hr className="ml-2" />
          </div>

          <div className="d-flex answer-cont">
            {/* Display the API response here */}
            <p>{apiResponse}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;
