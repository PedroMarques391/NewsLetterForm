import './App.css'
import Form from './components/Form'

function App() {
  

  return (
    <>
     <div className='bg-gradient-to-br from-slate-300 to-slate-500 min-h-screen w-full flex flex-col items-center justify-center'>
        <h1 className='font-bold text-[2em] text-white'>Inscreva-se</h1>
        <p className='text-white'>Assine nossa NewsLetter e mantenha-se informado.</p>
        <div>
          <Form/>
        </div>
        <p className='text-slate-100 text-xs w-96 mt-2 text-center'>Ao se inscrever, você passará a receber os nossos e-mails com as melhores dicas, novidades e ofertas</p>
     </div>
     
    </>
  )
}

export default App
