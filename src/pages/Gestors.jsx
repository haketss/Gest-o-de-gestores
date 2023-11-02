import {
    Container,
    Col,
    Modal,
    Form,
    Button,
    Dropdown,
    Table,
} from "react-bootstrap";

import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import "../index.css";
import { Gestor } from "../components/Gestor";
import { Bar } from "../components/bar";
import { Input } from "../components/Input";

import {
    createGestor,
    deleteGestor,
    getGestors,
    updateGestor,
} from "../services/gestor-service";

export function Gestors() {
    const [gestors, setGestors] = useState([]);
    const [isCreated, setIsCreated] = useState(false);

    const [orderBy, setOrderBy] = useState("nome");
    const [selectedCRM, setSelectedCRM] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        findGestors(searchTerm);
    }, [searchTerm]);

    async function findGestors(searchTerm) {
        try {
            console.log("Searching with term:", searchTerm);
            const result = await getGestors(searchTerm);
            setGestors(result.data);
            console.log("Search result:", result.data);
        } catch (error) {
            console.error(error);
            navigate("/");
        }
    }

    async function removeGestor(id) {
        try {
            await deleteGestor(id);
            await findGestors();
        } catch (error) {
            console.error(error);
        }
    }

    async function addGestor(data) {
        try {
            await createGestor(data);
            setIsCreated(false);
            await findGestors();
        } catch (error) {
            console.error(error);
        }
    }

    async function editGestor(data) {
        try {
            console.log("Editing gestor with data:", data);
            // ...
            await updateGestor({
                id: data.id,
                nomeGestor: data.nomeGestor,
                sobrenomeGestor: data.sobrenomeGestor,
                idadeGestor: data.idadeGestor,
                generoGestor: data.generoGestor,
                dataDeNascimentoGestor: data.dataDeNascimentoGestor,
                localDeTrabalhoGestor: data.localDeTrabalhoGestor,
                CRMGestor: data.CRMGestor,
                tipoDeContratoGestor: data.tipoDeContratoGestor,
                formacaoGestor: data.formacaoGestor,
                senhaProvisoriaGestor: data.senhaProvisoriaGestor,
                metasGestor: data.metasGestor,
                atendimentosGestor: data.atendimentosGestor,
            });
            console.log("gestor updated successfully.");
            await findGestors();
        } catch (error) {
            console.error(error);
        }
    }

    async function handleSearch() {
        try {
            const result = await getGestors();
            // Filtra a lista de funcionários com base no termo de pesquisa
            const filteredGestors = result.data.filter((gestor) =>
                gestor.nome.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setGestors(filteredGestors);
        } catch (error) {
            console.error(error);
            navigate("/");
        }
    }

    return (
        <Container fluid>
            <Bar />

            <Container>
                <Col className="w-5 m-auto mb-5">
                    <li>
                        {" "}
                        <input
                            id="inpsharch"
                            type="text"
                            placeholder="Pesquisar por nome"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button id="chartt" onClick={handleSearch}>
                            <a id="letra">Pesquisar</a>
                        </Button>{" "}
                        <Button id="charttA">
                            <Link id="tituloto" to="/gestorse">
                                Adicionar
                                <svg
                                    id="bibi"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    fill="currentColor"
                                    class="bi bi-file-earmark-plus"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z" />
                                    <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
                                </svg>
                            </Link>
                        </Button>
                    </li>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nome</th>
                                <th>genero</th>
                                <th>idade</th>
                                <th>local de trabalho</th>
                                <th>CRM</th>
                                <th>Formação</th>
                                <th>Tipo de contrato</th>
                                <th>Senha provisoria</th>
                                <th>Meta</th>
                                <th>Atendimento</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {gestors.map((gestor) => (
                                <tr key={gestor.id}>
                                    <td>😀</td>
                                    <td>{gestor.nome}</td>
                                    <td>{gestor.genero}</td>
                                    <td>{gestor.idade}</td>
                                    <td>{gestor.localDeTrabalho}</td>
                                    <td>{gestor.CRM}</td>
                                    <td>{gestor.formacao}</td>
                                    <td>{gestor.tipoDeContrato}</td>
                                    <td>{gestor.senhaProvisoria}</td>
                                    <td>{gestor.metas}</td>
                                    <td>{gestor.atendimentos}</td>
                                    <td>
                                        <Gestor
                                            gestor={gestor}
                                            removeGestor={async () =>
                                                await removeGestor(gestor.id)
                                            }
                                            editGestor={editGestor}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>

                <Modal show={isCreated} onHide={() => setIsCreated(false)}>
                    <Modal.Header>
                        <Modal.Title>Cadastrar novo gestor</Modal.Title>
                    </Modal.Header>
                    <Form
                        noValidate
                        onSubmit={handleSubmit(addGestor)}
                        validated={!!errors}
                    >
                        <Modal.Footer>
                            <Button variant="primary" type="submit">
                                Adicionar
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => setIsCreated(false)}
                            >
                                Fechar
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </Container>
        </Container>
    );
}
