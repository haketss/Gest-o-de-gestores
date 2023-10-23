import { useState } from "react";

import { Button, Card, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { Input } from "./Input";

export function Gestor(props) {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const [isUpdated, setIsUpdated] = useState(false);

    async function editGestor(data) {
        await props.editGestor({ ...data, id: props.gestor.id });

        // Adiciona um alerta para informar que o gestor foi alterado com sucesso
        alert("O gestor foi alterado com sucesso!");

        setIsUpdated(false);
    }

    async function confirmDelete() {
        const shouldDelete = window.confirm(
            "Tem certeza que deseja apagar um gestor"
        );

        if (shouldDelete) {
            // Chama a função para remover o gestor
            props.removeGestor();

            // Adiciona um alerta para informar que o gestor foi excluído
            alert("O gestor foi excluído com sucesso!");
        }
    }

    return (
        <>
            {" "}
            <Card id="Cardsgestors" className="mb-custon p-custon bg-custon">
                <Card.Title id="chardss">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        class="img-fluid"
                        alt="Imagem responsiva"
                        width={80}
                    />
                    <strong> </strong>
                    {props.gestor.nome} {props.gestor.sobrenome}{" "}
                    <strong></strong> {props.gestor.genero}
                </Card.Title>

                <Card.Text id="cardgestors">
                    {" "}
                    <strong>idade: </strong>
                    {props.gestor.idade} <strong>Data de nacimento:</strong>{" "}
                    {props.gestor.dataDeNascimento}
                    <strong>Local de trabalho: </strong>
                    {props.gestor.localDeTrabalho} <strong>CRM:</strong>{" "}
                    {props.gestor.CRM} <strong>Formaçao:</strong>{" "}
                    {props.gestor.formacao} <strong>tipo de contrato: </strong>
                    {props.gestor.tipoDeContrato}
                    <strong>senha provisoria: </strong>
                    {props.gestor.senhaProvisoria}
                    <strong>metas: </strong>
                    {props.gestor.metas}
                    <strong>atendimentos: </strong>
                    {props.gestor.atendimentos}
                    <strong>Eventos: </strong>
                    {props.gestor.eventosP}
                </Card.Text>

                <Row xs="auto" className="d-flex">
                    <Button
                        id="editeedele"
                        variant="secondary"
                        onClick={() => setIsUpdated(true)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            fill="currentColor"
                            class="bi bi-pen"
                            viewBox="0 0 16 16"
                        >
                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                        </svg>
                    </Button>
                    <Button
                        id="editeedelet"
                        variant="outline-danger"
                        className="ms-3"
                        onClick={confirmDelete}
                    >
                        Apagar
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            fill="currentColor"
                            class="bi bi-trash"
                            viewBox="0 0 16 16"
                        >
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                        </svg>
                    </Button>
                </Row>
            </Card>
            <Modal show={isUpdated} onHide={() => setIsUpdated(false)}>
                <Modal.Header>
                    <Modal.Title>
                        Editar gestores: {props.gestor.nome}
                    </Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit(editGestor)}>
                    <Modal.Body>
                        <Input
                            className="mb-3"
                            type="text"
                            defaultValue={props.gestor.nome}
                            label="Nome do Gestor"
                            placeholder=""
                            required={true}
                            name="nomeGestor"
                            error={errors.nomeGestor}
                            validations={register("nomeGestor", {
                                required: {
                                    value: true,
                                    message: "Nome do  é obrigatório.",
                                },
                            })}
                        />
                        <Input
                            className="mb-3"
                            type="text"
                            defaultValue={props.gestor.sobrenome}
                            label=" sobrenome"
                            placeholder=""
                            required={true}
                            name="sobrenomeGestor"
                            error={errors.sobrenomeGestor}
                            validations={register("sobrenomeGestor", {
                                required: {
                                    value: true,
                                    message:
                                        "Sovrenome do gestor é obrigatório.",
                                },
                            })}
                        />
                        <Input
                            className="mb-3"
                            type="text"
                            defaultValue={props.gestor.genero}
                            label="genero"
                            placeholder=""
                            required={true}
                            name="generoGestor"
                            error={errors.generoGestor}
                            validations={register("generoGestor", {
                                required: {
                                    value: true,
                                    message: "genero do gestor é obrigatório.",
                                },
                            })}
                        />
                        <Input
                            className="mb-3"
                            type="INTEGER"
                            defaultValue={props.gestor.idade}
                            label="idade"
                            placeholder=""
                            required={true}
                            name="idadeGestor"
                            error={errors.idadeGestor}
                            validations={register("idadeGestor", {
                                required: {
                                    value: true,
                                    message: "idade do gestor é obrigatório.",
                                },
                            })}
                        />

                        <Input
                            className="mb-3"
                            type="date"
                            defaultValue={props.gestor.dataDeNascimento}
                            label="Data de nacimento"
                            placeholder=""
                            required={true}
                            name="dataDeNascimentoGestor"
                            error={errors.dataDeNascimentoGestor}
                            validations={register("dataDeNascimentoGestor", {
                                required: {
                                    value: true,
                                    message:
                                        "Data de nacimento do gestor é obrigatório.",
                                },
                            })}
                        />
                        <Input
                            className="mb-3"
                            type="text"
                            defaultValue={props.gestor.localDeTrabalho}
                            label="local De Trabalho"
                            placeholder=""
                            required={true}
                            name="localDeTrabalhoGestor"
                            error={errors.localDeTrabalhoGestor}
                            validations={register("localDeTrabalhoGestor", {
                                required: {
                                    value: true,
                                    message:
                                        "Local de trabalho do gestor é obrigatório.",
                                },
                            })}
                        />
                        <Input
                            className="mb-3"
                            type="text"
                            defaultValue={props.gestor.CRM}
                            label="CRM"
                            placeholder=""
                            required={true}
                            name="CRMGestor"
                            error={errors.CRMGestor}
                            validations={register("CRMGestor", {
                                required: {
                                    value: true,
                                    message: "CRM do gestor é obrigatório.",
                                },
                            })}
                        />
                        <Input
                            className="mb-3"
                            type="text"
                            defaultValue={props.gestor.tipoDeContrato}
                            label=" tipo De Contrato"
                            placeholder=""
                            required={true}
                            name="tipoDeContratoGestor"
                            error={errors.tipoDeContratoGestor}
                            validations={register("tipoDeContratoGestor", {
                                required: {
                                    value: true,
                                    message:
                                        "Tipo de contrato do gestor é obrigatório.",
                                },
                            })}
                        />

                        <Input
                            className="mb-3"
                            type="text"
                            defaultValue={props.gestor.formacao}
                            label="Formação"
                            placeholder=""
                            required={true}
                            name="formacaoGestor"
                            error={errors.formacaoGestor}
                            validations={register("formacaoGestor", {
                                required: {
                                    value: true,
                                    message:
                                        "Formação do gestor é obrigatório.",
                                },
                            })}
                        />
                        <Input
                            className="mb-3"
                            type="text"
                            defaultValue={props.gestor.senhaProvisoria}
                            label="senha Provisoria"
                            placeholder=""
                            required={true}
                            name="senhaProvisoriaGestor"
                            error={errors.senhaProvisoriaGestor}
                            validations={register("senhaProvisoriaGestor", {
                                required: {
                                    value: true,
                                    message:
                                        "Senha Provisoria do gestor é obrigatório.",
                                },
                            })}
                        />
                        <Input
                            className="mb-3"
                            type="text"
                            defaultValue={props.gestor.metas}
                            label="Metas"
                            placeholder=""
                            required={true}
                            name="metasGestor"
                            error={errors.metasGestor}
                            validations={register("metasGestor", {
                                required: {
                                    value: true,
                                    message:
                                        "Senha Provisoria do gestor é obrigatório.",
                                },
                            })}
                        />
                        <Input
                            className="mb-3"
                            type="text"
                            defaultValue={props.gestor.atendimentos}
                            label="atendimentos"
                            placeholder=""
                            required={true}
                            name="atendimentosGestor"
                            error={errors.atendimentosGestor}
                            validations={register("atendimentosGestor", {
                                required: {
                                    value: true,
                                    message: "atendimentos do gestor.",
                                },
                            })}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit">
                            Editar
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => setIsUpdated(false)}
                        >
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}