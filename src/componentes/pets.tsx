import { useState, useEffect, ChangeEvent, Dispatch, SetStateAction } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ModalGenerico from "./modalBase";


import { Pet, Cliente } from './types'; 


import PetFormCadastro from "./pet/petFormCadastro";
import PetListagemConteudo from "./pet/petListagemConteudo";
import PetFormAtualizacao from "./pet/petFormAtualizacao";
import PetFormExclusao from "./pet/petFormExclusao";


const AZUL_PRINCIPAL = "#003366";
const AZUL_ESCURO = "#003366";
const FUNDO_CLARO = "#f0f8ff";

export default function Pets() {
  const [mostrarModalCadastro, setMostrarModalCadastro] = useState(false);
  const [mostrarModalAtualizar, setMostrarModalAtualizar] = useState(false);
  const [mostrarModalExclusao, setMostrarModalExclusao] = useState(false);
  const [mostrarModalListagem, setMostrarModalListagem] = useState(false);

  const [step, setStep] = useState(1);

  const [idPet, setIdPet] = useState("");

  const [petEmEdicao, setPetEmEdicao] = useState<Pet>({
    id: "",
    nome: "",
    genero: "",
    raca: "",
    especie: "", 
    cpfDono: "", 
  });

  const [cpfPesquisa, setCpfPesquisa] = useState("");

  const [pets, setPets] = useState<Pet[]>([
    {
      id: "101",
      nome: "Belinha",
      genero: "Fêmea",
      raca: "Poodle",
      especie: "Cachorro",
      cpfDono: "00112233445",
    },
    {
      id: "102",
      nome: "Felix",
      genero: "Macho",
      raca: "Siamês",
      especie: "Gato",
      cpfDono: "55667788990",
    },
    {
      id: "103",
      nome: "Lola",
      genero: "Fêmea",
      raca: "Golden Retriever",
      especie: "Cachorro",
      cpfDono: "00112233445",
    },
    {
      id: "104",
      nome: "Pingo",
      genero: "Macho",
      raca: "Hamster Sírio",
      especie: "Roedor",
      cpfDono: "11223344556",
    },
    {
      id: "105",
      nome: "Kiwi",
      genero: "Indefinido",
      raca: "Calopsita",
      especie: "Pássaro",
      cpfDono: "99887766554",
    },
  ]);

  const [clientes, setClientes] = useState<Cliente[]>([
    { nome: "João Silva", cpf: "00112233445", ddd: "11", telefone: "987654321" }, 
    { nome: "Maria Oliveira", cpf: "55667788990", ddd: "21", telefone: "998877665" },
    { nome: "Carlos Souza", cpf: "11223344556", ddd: "31", telefone: "976543210" },
    { nome: "Ana Santos", cpf: "99887766554", ddd: "41", telefone: "965432109" },
  ]);

  const nextStep = () => {
    if (mostrarModalCadastro && step === 1) {
      setPetEmEdicao((prevPet: Pet) => ({ ...prevPet, cpfDono: cpfPesquisa }));
    }
    setStep((prev) => prev + 1);
  };
  const backStep = () => setStep((prev) => prev - 1);

  const handlePetChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setPetEmEdicao({ ...petEmEdicao, [e.target.name]: e.target.value });
  };

  const handleCpfPesquisaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCpfPesquisa(e.target.value);
  };

  const handleIdPetChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIdPet(e.target.value);
  };

  const fecharModal = (setter: Dispatch<SetStateAction<boolean>>) => {
    setter(false);
    resetarEstadoModal();
  };

  const resetarEstadoModal = () => {
    setStep(1);
    setIdPet("");
    setCpfPesquisa("");
    setPetEmEdicao({ id: "", nome: "", genero: "", raca: "", especie: "", cpfDono: "" });
  };

  const salvarPet = () => {
    if (!petEmEdicao.nome || !petEmEdicao.genero || !petEmEdicao.raca || !petEmEdicao.especie || !petEmEdicao.cpfDono) {
        alert("Por favor, preencha todos os campos do pet e selecione o CPF do dono.");
        return;
    }

    const maxId = pets.reduce((max, pet) => {
        const petIdNum = parseInt(pet.id);
        return petIdNum > max ? petIdNum : max;
    }, 100); 

    const novoId = (maxId + 1).toString();

    const novoPet: Pet = {
      ...petEmEdicao,
      id: novoId,
    };

    setPets([...pets, novoPet]);
    console.log("Pet Cadastrado:", novoPet);
    fecharModal(setMostrarModalCadastro);
  };

  const atualizarPet = () => {
    const petExistente = pets.find((p) => p.id === idPet);

    if (!petExistente) {
      alert("Pet não encontrado com o ID fornecido.");
      return;
    }

    const petsAtualizados = pets.map((p) =>
      p.id === idPet ? { ...p, ...petEmEdicao } : p
    );
    setPets(petsAtualizados);
    console.log("Pet Atualizado:", petEmEdicao);
    fecharModal(setMostrarModalAtualizar);
  };

  const excluirPet = () => {
    const petParaExcluir = pets.find((p) => p.id === idPet);
    if (!petParaExcluir) {
      alert("Pet não encontrado com o ID fornecido para exclusão.");
      return;
    }

    setPets(pets.filter((pet) => pet.id !== idPet));
    console.log(`Pet com ID ${idPet} excluído.`);
    fecharModal(setMostrarModalExclusao);
  };

  const cardData = [
    {
      title: "Cadastrar Pet",
      text: "Preencha os dados do novo pet",
      image: "cadastro.png",
      buttonText: "📝 Cadastrar Pet",
      buttonColor: AZUL_ESCURO,
      onClick: () => { setMostrarModalCadastro(true); resetarEstadoModal(); },
    },
    {
      title: "Listar Pets",
      text: "Veja todos os pets cadastrados",
      image: "listagem.png",
      buttonText: "🔍 Listar Pets",
      buttonColor: AZUL_ESCURO,
      onClick: () => { setMostrarModalListagem(true); resetarEstadoModal(); },
    },
    {
      title: "Atualizar Pet",
      text: "Atualize os dados de um pet existente",
      image: "update.png",
      buttonText: "✏ Atualizar Pet",
      buttonColor: AZUL_ESCURO,
      onClick: () => { setMostrarModalAtualizar(true); resetarEstadoModal(); },
    },
    {
      title: "Excluir Pet",
      text: "Remova um pet cadastrado",
      image: "delete.png",
      buttonText: "🗑 Excluir Pet",
      buttonColor: "red",
      onClick: () => { setMostrarModalExclusao(true); resetarEstadoModal(); },
    },
  ];

  return (
    <div
      className="container-fluid"
      style={{
        backgroundColor: FUNDO_CLARO,
        minHeight: "82vh",
        paddingBottom: "3rem",
      }}
    >
      <div className="d-flex align-items-center justify-content-center gap-3 title pt-5">
        <img src="/pets.png" style={{ width: "70px" }} alt="Ícone de Pets" />
        <h1 style={{ fontSize: "300%", color: AZUL_ESCURO, fontWeight: "700" }}>
          Menu - Pets
        </h1>
      </div>
      <hr className="line" style={{ borderColor: AZUL_PRINCIPAL }} />
      <h5 className="subtitle mt-5" style={{ color: AZUL_ESCURO }}>
        Abaixo estão todas as ferramentas de gerenciamento de dados dos pets.
      </h5>

      <div className="container mt-5">
        <div className="row justify-content-center">
          {cardData.map((card, index) => (
            <div className="col-md-3 col-sm-12 mb-4" key={index}>
              <div
                className="card shadow border-0"
                style={{ borderColor: AZUL_ESCURO, backgroundColor: FUNDO_CLARO }}
              >
                <div className="card-body d-flex flex-column justify-content-between align-items-center">
                  <h5
                    className="card-title text-center titleCard"
                    style={{ color: AZUL_ESCURO }}
                  >
                    {card.title}
                  </h5>
                  <p
                    className="card-text text-center subtitleCard flex-grow-1"
                    style={{ color: AZUL_ESCURO }}
                  >
                    {card.text}
                  </p>
                  <div className="text-center mb-3">
                    <img
                      src={card.image}
                      style={{ width: "70%" }}
                      className="d-block mx-auto"
                      alt={card.title}
                    />
                  </div>
                  <Button
                    variant="primary"
                    className="mt-3 btn text-white"
                    style={{
                      backgroundColor: card.buttonColor,
                      borderColor: AZUL_PRINCIPAL,
                    }}
                    onClick={card.onClick}
                  >
                    {card.buttonText}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ModalGenerico
        show={mostrarModalCadastro}
        onHide={() => fecharModal(setMostrarModalCadastro)}
        title="Cadastrar Pet"
        azulEscuro={AZUL_PRINCIPAL}
        fundoClaro={FUNDO_CLARO}
        size="lg"
        footerButtons={[
          {
            text: "⬅ Voltar",
            onClick: backStep,
            style: { backgroundColor: AZUL_ESCURO, borderColor: AZUL_ESCURO, display: step > 1 ? 'inline-block' : 'none' }
          },
          {
            text: "Próximo ➡️",
            onClick: nextStep,
            style: { backgroundColor: AZUL_ESCURO, borderColor: AZUL_ESCURO, display: step < 3 ? 'inline-block' : 'none' },
            disabled: (step === 1 && !cpfPesquisa) || (step === 2 && (!petEmEdicao.nome || !petEmEdicao.genero || !petEmEdicao.raca || !petEmEdicao.especie || !petEmEdicao.cpfDono))
          },
          {
            text: "Salvar Pet",
            onClick: salvarPet,
            style: { backgroundColor: AZUL_ESCURO, borderColor: AZUL_ESCURO, display: step === 3 ? 'inline-block' : 'none' }
          }
        ]}
      >
        <PetFormCadastro
          step={step}
          petEmEdicao={petEmEdicao}
          handleChange={handlePetChange}
          cpfPesquisa={cpfPesquisa}
          handleCpfPesquisaChange={handleCpfPesquisaChange}
          clientes={clientes}
        />
      </ModalGenerico>

      <ModalGenerico
        show={mostrarModalListagem}
        onHide={() => fecharModal(setMostrarModalListagem)}
        title="Todos os Pets"
        azulEscuro={AZUL_PRINCIPAL}
        fundoClaro={FUNDO_CLARO}
        size="lg"
      >
        <PetListagemConteudo pets={pets} clientes={clientes} />
      </ModalGenerico>

      <ModalGenerico
        show={mostrarModalAtualizar}
        onHide={() => fecharModal(setMostrarModalAtualizar)}
        title="Atualizar Pet"
        azulEscuro={AZUL_PRINCIPAL}
        fundoClaro={FUNDO_CLARO}
        size="lg"
        footerButtons={[
          {
            text: "⬅ Voltar",
            onClick: backStep,
            style: { backgroundColor: AZUL_ESCURO, borderColor: AZUL_ESCURO, display: step > 1 ? 'inline-block' : 'none' }
          },
          {
            text: "Próximo ➡️",
            onClick: nextStep,
            style: { backgroundColor: AZUL_ESCURO, borderColor: AZUL_ESCURO, display: step < 3 ? 'inline-block' : 'none' },
            disabled: (step === 1 && !cpfPesquisa) || (step === 2 && !idPet)
          },
          {
            text: "Atualizar Pet",
            onClick: atualizarPet,
            style: { backgroundColor: AZUL_ESCURO, borderColor: AZUL_ESCURO, display: step === 3 ? 'inline-block' : 'none' }
          }
        ]}
      >
        <PetFormAtualizacao
          step={step}
          idPet={idPet}
          setIdPet={setIdPet}
          petEmEdicao={petEmEdicao}
          setPetEmEdicao={setPetEmEdicao}
          handleChange={handlePetChange}
          pets={pets}
          cpfPesquisa={cpfPesquisa}
          handleCpfPesquisaChange={handleCpfPesquisaChange}
        />
      </ModalGenerico>

      <ModalGenerico
        show={mostrarModalExclusao}
        onHide={() => fecharModal(setMostrarModalExclusao)}
        title="Excluir Pet"
        azulEscuro={AZUL_PRINCIPAL}
        fundoClaro={FUNDO_CLARO}
        footerButtons={[
          {
            text: "Cancelar",
            onClick: () => fecharModal(setMostrarModalExclusao),
            variant: "outline-secondary",
            style: { backgroundColor: FUNDO_CLARO, borderColor: AZUL_ESCURO, color: AZUL_ESCURO }
          },
          {
            text: "🗑️ Confirmar Exclusão",
            onClick: excluirPet,
            style: { backgroundColor: "red", borderColor: "red" },
            disabled: !idPet
          }
        ]}
      >
        <PetFormExclusao
          idPet={idPet}
          handleIdPetChange={handleIdPetChange}
        />
      </ModalGenerico>
    </div>
  );
}