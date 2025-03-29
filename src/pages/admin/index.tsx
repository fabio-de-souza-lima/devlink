import { FormEvent, useState, useEffect } from 'react';
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { FiTrash } from 'react-icons/fi';
import { db } from '../../services/firebaseConnection';
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
} from 'firebase/firestore';

interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

export function Admin() {
  const [nameInput, setNameInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [textColorInput, setTextColorInput] = useState("#f1f1f1");
  const [backgroundColorInput, setBackgroundColorInput] = useState("#121212");
  const [links, setLinks] = useState<LinkProps[]>([]);

  useEffect(() => {
    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));

    const unsub = onSnapshot(queryRef, (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        url: doc.data().url,
        bg: doc.data().bg,
        color: doc.data().color,
      }));

      setLinks(lista);
    });

    return () => unsub();
  }, []);

  function handleRegister(e: FormEvent) {
    e.preventDefault();

    if (!nameInput || !urlInput) {
      alert("Preencha todos os campos");
      return;
    }

    addDoc(collection(db, "links"), {
      name: nameInput,
      url: urlInput,
      bg: backgroundColorInput,
      color: textColorInput,
      created: new Date(),
    })
      .then(() => {
        setNameInput("");
        setUrlInput("");
        console.log("Cadastrado com sucesso!");
      })
      .catch((error) => {
        console.log("Erro ao cadastrar no banco: " + error);
      });
  }

  async function handleDeleteLink(id: string) {
    if (window.confirm("Tem certeza que deseja excluir este link?")) {
      await deleteDoc(doc(db, "links", id));
    }
  }

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2 bg-gray-900 text-white">
      <Header />

      <form className="flex flex-col mt-8 mb-3 w-full max-w-xl bg-gray-800 p-4 rounded-lg shadow-lg" onSubmit={handleRegister}>
        <label className="font-medium mt-2 mb-2">Nome do Link</label>
        <Input
          className="bg-white text-black border border-gray-300 p-2 rounded"
          placeholder="Digite o nome do link..."
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />

        <label className="font-medium mt-2 mb-2">URL do Link</label>
        <Input
          type="url"
          className="bg-white text-black border border-gray-300 p-2 rounded"
          placeholder="Digite a URL..."
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />

        <section className="flex my-4 gap-5">
          <div className="flex gap-2 items-center">
            <label className="font-medium">Cor do link</label>
            <input type="color" value={textColorInput} onChange={(e) => setTextColorInput(e.target.value)} />
          </div>

          <div className="flex gap-2 items-center">
            <label className="font-medium">Fundo do link</label>
            <input type="color" value={backgroundColorInput} onChange={(e) => setBackgroundColorInput(e.target.value)} />
          </div>
        </section>

        {nameInput && (
          <div className="flex items-center justify-start flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
            <label className="font-medium mt-2 mb-3">Pré-visualização:</label>
            <article
              className="w-11/12 max-w-lg flex flex-col items-center justify-between rounded px-1 py-3"
              style={{ backgroundColor: backgroundColorInput }}
            >
              <p className="font-medium" style={{ color: textColorInput }}>{nameInput}</p>
            </article>
          </div>
        )}

        <button type="submit" className="mb-7 bg-blue-600 h-9 rounded-md text-white font-medium flex justify-center items-center hover:bg-blue-700 transition">
          Cadastrar
        </button>
      </form>

      <h2 className="font-bold mb-4 text-2xl">Meus Links</h2>

      {links.map((link) => (
        <article key={link.id} className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 shadow-md transition-transform transform hover:scale-105" style={{ backgroundColor: link.bg, color: link.color }}>
          <a href={link.url} target="_blank" rel="noopener noreferrer" className="font-medium underline">
            {link.name}
          </a>
          <button className="border border-dashed p-1 rounded bg-neutral-900 hover:bg-red-600 transition" onClick={() => handleDeleteLink(link.id)}>
            <FiTrash size={18} color="#FFF" />
          </button>
        </article>
      ))}
    </div>
  );
}
