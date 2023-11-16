import { useState, FormEvent, useEffect } from "react"
import { User } from "../types/User";
import { validate } from "../utils/validate";

const Form = () => {

  const baseURL = "http://localhost:3000/users";
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [agree, setAgree] = useState(false);
  const [topClass, setTopClass] = useState(true)

  const [errors, setErrors] = useState<User | null>(null);
 
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(baseURL);
      const data = await res.json()
      setUsers(data)
    }

    fetchData()

  }, [])

  const handleClass = () => {
    setTopClass(!topClass);
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setErrors(null);

    const data: User = {
      name,
      email,
      agree,
    }

    const validateErrors = validate(data);

    if(Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors)
      return;
    }

      const res = await fetch(baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }, 
        body: JSON.stringify(data)
      }) 
        
      const addUser = await res.json()
  
      setUsers((prevUsers) => [...prevUsers, addUser]);
  
    
    
    setName('');
    setEmail('');
    setAgree(false);
    
  }

  const deleteUser = async (userId: number | undefined) => {
     await fetch(`${baseURL}/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      
  };


  return (
    <>
    <div className="text-center text-3xl ">
      <button onClick={handleClass}><i className="fa-sharp fa-solid fa-down-long fa-beat-fade"></i></button>
    </div>
    <div className={topClass ? "top-[-800px] fixed z-50 bg-slate-500 w-96 rounded-xl flex flex-col duration-700 h-[650px] overflow-y-auto justify-between md:mt-24 mt-2" : "top-0 fixed z-50 bg-slate-500 w-96 rounded-xl flex flex-col duration-700 h-[650px] overflow-y-auto justify-between md:mt-24 mt-2"}>
    <div className="text-center text-3xl ">
      <button onClick={handleClass}><i className="fa-sharp fa-solid fa-up-long fa-beat-fade"></i></button>
    </div>
      {users.map((user) => (
        <div key={user.id} className="border-b-2 border-slate-600 p-5 text-lg flex flex-col text-white">
            <p className="text-center">Nome: {user.name}</p>
            <p className="text-center">E-mail: {user.email}</p>
            <button onClick={() => deleteUser(user.id)} className="border w-[100%] mt-5 p-2 hover:bg-red-600 hover:text-slate-50 duration-700">EXCLUIR</button>
        </div>
    ))}
    </div>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <div className='w-96 mt-4 bg-gradient-to-r from-slate-300 to-slate-500 px-4 py-6 rounded-t-2xl'>
        <div className="flex flex-col">
            <input type="text" placeholder="NOME" className="rounded-sm py-3 px-5 text-sm placeholder:text-lg placeholder:text-slate-500 bg-transparent border-b-2 border-slate-500" value={name} onChange={(e) => setName(e.target.value)}/>
        </div>
        {errors?.name && (
          <small className="text-xs text-red-500 mt-1">{errors.name}</small>
        )}
        <div className="flex flex-col">
            <input type="email" placeholder="E-MAIL" className="rounded-sm py-3 mt-5 px-5 text-sm placeholder:text-lg placeholder:text-slate-500 bg-transparent border-b-2 border-slate-500" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        {errors?.email && (
          <small className="text-xs text-red-500 mt-1">{errors.email}</small>
        )}
        <div className="flex flex-col">
          <a href="#" className="text-xs underline mb-2 mt-2">Leia os termos</a>
            <div className="flex gap-2 items-center">
                <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                <label htmlFor='agree'>Concordo com os termos.</label>
            </div>
            {errors?.agree && (
          <small className="text-xs text-red-500 mt-1">{errors.agree}</small>
        )}
        </div>
        </div>
        <div className='w-96 mt-[1px] bg-gradient-to-t from-slate-300 to-slate-500 px-4 py-6 rounded-b-2xl text-center'>
            <button type="submit" className="hover:text-white font-mono text-2xl py-2 px-4 rounded-lg text-slate-500 duration-500">CADASTRAR</button>
        </div>
    </form>   
    
    </>
    
  )
}

export default Form