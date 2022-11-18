import React from 'react'
import { useGlobalContext } from '../store/Context'

const Modal = () => {
  const {isModalOpen, closeModal, correctAnswers, inputData} = useGlobalContext()
  console.log(isModalOpen);
  return (
    <div className={`modal ${isModalOpen ? 'modal-open' : null}`}>
      <div className="modal-box flex flex-col px-12 space-y-4 items-center">
        <h2 className='text-3xl text-center font-bold'>
          Congrats
        </h2>
         <p className='text-3xl'>You answered {(correctAnswers / inputData.amount) * 100}% of the questions correctlty</p>
        <button className="btn" onClick={closeModal}>Play again</button>
      </div>
    </div>
  )
}

export default Modal