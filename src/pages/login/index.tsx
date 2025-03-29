import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/Input"

import { auth } from '../../services/firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth'

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

   if(email === '' || password === ''){
    alert("Preencha todos os campos!")
    return;

   }

   signInWithEmailAndPassword(auth, email, password)
   .then(() => {
    console.log("LOGADO COM SUCESSO!")
    navigate("/admin", {replace : true})
   })
   .catch((error) => {
    console.log("ERRO AO FAZER O LOGIN:")
    console.log(error);
   })


  }

  return (
    <div className="flex w-full h-screen items-center justify-center flex-col bg-gray-900">
      <Link to="/">
        <h1 className="mt-11 text-white mb-7 font-bold text-5xl">
          Dev
          <span className="bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">
            Link
          </span>
        </h1>
      </Link>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl flex flex-col px-9 bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        <Input
          placeholder="Digite o seu email..."
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <Input
          placeholder="Digite a sua senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 mt-4"
        />

        <button
          type="submit"
          className="h-10 mt-5 bg-yellow-500 rounded-lg border-0 text-lg font-medium text-gray-900 hover:bg-yellow-600 transition-all"
        >
          Acessar
        </button>
      </form>
    </div>
  );
}
