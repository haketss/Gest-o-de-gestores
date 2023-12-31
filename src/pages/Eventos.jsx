import {
    Container,
    Row,
    Col,
    Modal,
    Form,
    Button,
    Dropdown,
} from "react-bootstrap";

import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import "../index.css";
import { Evento } from "../components/Evento";

import { Input } from "../components/Input";
import { Bar } from "../components/bar";

import {
    createEvento,
    deleteEvento,
    getEventos,
    updateEvento,
} from "../services/evento-service";

export function Eventos() {
    const [modalTest, setModalTest] = useState(false);
    const [eventos, setEventos] = useState([]);
    const [isCreated, setIsCreated] = useState(false);
    const nomesEventos = eventos.map((evento) => evento.nome);
    const [selectedid, setSelectedid] = useState("");
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    //Exemplo bacana de opções e variaves que posso fornecer
    const limiteDeItens = 6;
    const Teventos = [
        { id: 1, nome: "Evento 1" },
        { id: 2, nome: "Evento 2" },
        // Adicione outros eventos conforme necessário
    ];

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        findEventos();
        // eslint-disable-next-line
    }, []);

    async function findEventos() {
        try {
            const result = await getEventos();
            setEventos(result.data);
        } catch (error) {
            console.error(error);
            navigate("/");
        }
    }

    async function removeEvento(id) {
        try {
            await deleteEvento(id);
            await findEventos();
        } catch (error) {
            console.error(error);
        }
    }

    async function addEvento(data) {
        try {
            await createEvento(data);
            // Adiciona um alerta para informar que o gestor foi criado com sucesso
            alert("O evento foi criado com sucesso!");

            setIsCreated(false);
            await findEventos();
        } catch (error) {
            console.error("Error creat evento:", error);
        }
    }

    async function editEvento(data) {
        try {
            console.log("Editando o evento:", data);
            // ...
            await updateEvento({
                id: data.id,
                nomeEvento: data.nomeEvento,
                dataEvento: data.dataEvento,
                adendo: data.adendoEvento,
            });
            alert("O evento foi alterado com sucesso!");
            console.log("Evento alterado com sucesso.");
            await findEventos();
        } catch (error) {
            console.error("Error editing event:", error);
        }
    }

    async function handleSearch() {
        try {
            const result = await getEventos();
            // Filtra a lista de funcionários com base no termo de pesquisa
            const filteredEventos = result.data.filter((evento) =>
                evento.nome.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setEventos(filteredEventos);
        } catch (error) {
            console.error(error);
            navigate("/");
        }
    }

    return (
        <>
            <Bar />
            <p class="align-middle" id="barraColorida">
                a
            </p>
            <Container>
                <div class="container my-3 hstack gap-3">
                    <div class="p-2">
                        <input
                            id="inpsharch"
                            type="text"
                            placeholder="Pesquisar por nome"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div class="p-2">
                        <Button id="chartt" onClick={handleSearch}>
                            <a id="letra">Pesquisar</a>
                        </Button>
                    </div>
                    <div class="p-2">
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
                    </div>
                </div>

                {eventos && eventos.length > 0 ? (
                    <div class="eventos-list">
                        {eventos.map((evento, index) => (
                            <Evento
                                key={index}
                                evento={evento}
                                removeEvento={async () =>
                                    await removeEvento(evento.id)
                                }
                                editEvento={editEvento}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-center">
                        Não existe nenhum evento cadastrado!
                    </p>
                )}

                {/* Formulário dentro do Modal, ideal seria componentizar também, pois é parecido com o Modal de editar */}
                <Modal show={isCreated} onHide={() => setIsCreated(false)}>
                    <Modal.Header>
                        <Modal.Title>Cadastrar novo evento</Modal.Title>
                    </Modal.Header>
                    <Form
                        noValidate
                        onSubmit={handleSubmit(addEvento)}
                        validated={!!errors}
                    >
                        <Modal.Body>
                            <Input
                                className="mb-3"
                                type="text"
                                label="nome"
                                placeholder="Insira o nome do evento"
                                required={true}
                                error={errors.nomeEvento}
                                validations={register("nomeEvento", {
                                    required: {
                                        value: true,
                                        message:
                                            "Sovrenome do evento é obrigatório.",
                                    },
                                })}
                            />
                            <Input
                                className="mb-3"
                                type="datetime-local"
                                label="data do evento"
                                placeholder="Insira a data doevento"
                                required={true}
                                error={errors.dataEvento}
                                validations={register("dataEvento", {
                                    required: {
                                        value: true,
                                        message:
                                            "data do evento é obrigatório.",
                                    },
                                })}
                            />

                            <Input
                                className="mb-3"
                                type="text"
                                label="adendo"
                                placeholder="Insira um adendo do evento"
                                required={true}
                                error={errors.adendoEvento}
                                validations={register("adendoEvento", {
                                    required: {
                                        value: true,
                                        message: "erro?.",
                                    },
                                })}
                            />
                            <Dropdown>
                                <Dropdown.Toggle
                                    variant="success"
                                    id="dropdown-basic"
                                >
                                    Selecione um evento
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {eventos.map(
                                        (evento, index) =>
                                            index < limiteDeItens && (
                                                <Dropdown.Item
                                                    key={evento.id}
                                                    href={`#/action-${evento.id}`}
                                                >
                                                    {evento.nome}
                                                </Dropdown.Item>
                                            )
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" type="submit">
                                Criar
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
        </>
    );
}
