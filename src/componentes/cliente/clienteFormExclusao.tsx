import React from 'react';
import { Form } from 'react-bootstrap';

interface ClienteFormExclusaoProps {
  cpfExclusao: string;
  setCpfExclusao: (value: string) => void;
}

const ClienteFormExclusao: React.FC<ClienteFormExclusaoProps> = ({
  cpfExclusao,
  setCpfExclusao,
}) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>CPF do Cliente</Form.Label>
      <Form.Control
        value={cpfExclusao}
        onChange={(e) => setCpfExclusao(e.target.value)}
        placeholder="Digite o CPF do cliente"
      />
    </Form.Group>
  );
};

export default ClienteFormExclusao;