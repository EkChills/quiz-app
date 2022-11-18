import React from 'react'
import Loading from './compoents/Loading'
import SetupForm from './compoents/SetupForm'
import { useGlobalContext } from './store/Context'
import Modal from './compoents/Modal'

const App = () => {
  const {waiting, loading, questions, correctAnswers, index, nextQuestion, checkAnswer} = useGlobalContext()
  if(waiting) {
    return <SetupForm />
  }

  if(loading) {
    return <Loading />
  }

  const {correct_answer:correct, incorrect_answers:incorrect, question } = questions[index]
  let answers = [...incorrect]
  let tempIndex = Math.floor(Math.random() * 4)
  if(tempIndex === 3) {
    answers.push(correct)
  } else {
    answers.push(answers[tempIndex])
    answers[tempIndex] = correct
  }
  console.log(questions);

  return (
   <main className='flex min-h-[100vh] bg-secondary w-full justify-center items-center'>
    <Modal />
    <div className='p-7 flex flex-col space-y-6 bg-secondary-content rounded-lg w-full max-w-[80vw]'>
      <div className='w-full flex'>
        <p className='ml-auto'>Correct Answers: {correctAnswers}/{index}</p>
      </div>
      <h2 className=' mx-auto text-[1.5rem] md:text-4xl font-bold' dangerouslySetInnerHTML={{__html:question}} />
      <div className="flex w-full flex-col space-y-3 justifu-center items-center">
        {
          answers.map((answer, index) => <button key={index}  className="btn min-w-[15rem] w-full max-w-[35rem]" dangerouslySetInnerHTML={{__html:answer}} onClick={() => checkAnswer(answer === correct)} />)
        }
      </div>
      <div className='w-full flex justify-end'>
        <button className="btn" onClick={nextQuestion}>Next question</button>
      </div>
    </div>
   </main>
  )
}

export default App