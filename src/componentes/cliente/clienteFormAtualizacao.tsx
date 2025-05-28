import React from 'react';
import { Form } from 'react-bootstrap';

interface ClienteFormAtualizacaoProps {
  cpfPesquisa: string;
  cliente: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCpfPesquisaChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ClienteFormAtualizacao: React.FC<ClienteFormAtualizacaoProps> = ({
  cpfPesquisa,
  cliente,
  handleChange,
  handleCpfPesquisaChange,
}) => {
  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>CPF do Cliente</Form.Label>
        <Form.Control
          value={cpfPesquisa}
          onChange={handleCpfPesquisaChange}
          placeholder="Digite o CPF do cliente"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Nome</Form.Label>
        <Form.Control name="nome" value={cliente.nome} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Nome Social</Form.Label>
        <Form.Control name="nomeSocial" value={cliente.nomeSocial} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>DDD</Form.Label>
        <Form.Control name="ddd" value={cliente.ddd} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Telefone</Form.Label>
        <Form.Control name="telefone" value={cliente.telefone} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Pets</Form.Label>
        <Form.Control name="pets" value={cliente.pets} onChange={handleChange} />
      </Form.Group>
    </>
  );
};

export default ClienteFormAtualizacao;