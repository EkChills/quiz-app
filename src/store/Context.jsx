import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'


 const AppContext = React.createContext()

 const table = {
  sports: 21,
  history: 23,
  politics: 24,
}
const AppProvider = ({children}) => {
  const [questions, setQuestions] = useState([])
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const [inputData, setInputData] = useState({
    amount: 10,
    category: 'sports',
    difficulty: 'easy'
  })
  const [loading, setLoading] = useState(false)
  const [waiting, setWaiting] = useState(true)
  const [error, setError] = useState(false)

  const handleChange = (e) => {
    const {name, value} = e.target
    setInputData(prev => {
      return {...prev, [name]: value}
    })
  }

  const fetchQuestions = async(url) => {
    setLoading(true)
    setWaiting(false)
    setError(false)
    try {
      const response = await axios.get(url)
      const data = await response.data
      if(response) {
        if(data.results.length > 0) {
          setQuestions(data.results)
          setWaiting(false)
          setLoading(false)
          setError(false)
        } else {
          setError(true)
          setWaiting(true)
          setLoading(false)
        } 
      } else {
        setWaiting(true)
        setError(true)
      }
    } catch (err) {
      console.log(err.response);
    }
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const {amount, category, difficulty} = inputData
    const url = `https://opentdb.com/api.php?amount=${amount}&category=${table[category]}&difficulty=${difficulty}&type=multiple`  
    fetchQuestions(url);
  }

  

  const openModal = () => {
    setIsModalOpen(true)
  }

  
  const closeModal = () => {
    setIsModalOpen(false)
    setWaiting(true)
    setLoading(false)
    setError(false)
    setCorrectAnswers(0)
  }

  const nextQuestion = () => {
    setIndex(prev => {
      let nextPage = prev + 1
      if(index >= questions.length - 1) {
        openModal()
        return 0
      }
      return nextPage
    })
  }

  

  const checkAnswer = value => {
    if(value) {
      setCorrectAnswers(prev => prev + 1)
    }
    nextQuestion()
  }



  return (
   <AppContext.Provider value={{inputData, loading, waiting, handleChange,
     onSubmitHandler,correctAnswers,index, nextQuestion,checkAnswer, isModalOpen,closeModal,
    questions, error}}>
    {children}
   </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export {  AppProvider, AppContext}