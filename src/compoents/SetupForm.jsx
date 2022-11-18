import React from 'react'
import { useGlobalContext } from '../store/Context'

const SetupForm = () => {
  const {inputData, handleChange, onSubmitHandler, error} = useGlobalContext()
  const {amount, category, difficulty} = inputData
  console.log(inputData);
  return (
    <div className='min-h-[100vh] flex container px-5 mx-auto w-full  justify-center items-center'>
      <div className='p-5 bg-primary-content rounded-lg min-w-[20rem] w-full md:w-full max-w-[30rem]'>
        <form className='flex flex-col space-y-6 ' onSubmit={onSubmitHandler}>
          <h2 className='text-3xl font-bold'>Setup Quiz</h2>
          {/* no of questions */}
          <div className='flex flex-col space-y-1'>
            <label htmlFor="amount">Number of Questions</label>
            <input type="number" name='amount' value={amount} onChange={handleChange} min={0} max={50} className="input" />
          </div>  
          {/* category */}
          <div className='flex flex-col space-y-1 w-full'>
            <label htmlFor="amount">Category</label>
            <select className="select w-full " value={category} name="category" onChange={handleChange}>
              <option value="sports">sports</option>
              <option value="history">history</option>
              <option value="politics">politics</option>
            </select>
          </div>  
          {/* difficulty */}
          <div className='flex flex-col space-y-1'>
            <label htmlFor="amount">Select Difficulty</label>
            <select className="select w-full" value={difficulty} name="difficulty" onChange={handleChange}>
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </div>

          <button className="btn">Start</button>
          {error && <p className='text-error'>Can't get questions with given parameters please change</p>}
        </form>
      </div>
    </div>
  )
}

export default SetupForm