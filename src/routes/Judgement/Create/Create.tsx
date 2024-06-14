import React from 'react'
import { Title, Table, Badge, Group, ActionIcon } from '@mantine/core'
import { IconDots } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

enum Status{
    Done="Terminé",
    Abord="Annulé"

}

export default function Create() {
    const navigate = useNavigate()
    const elements = [
        {
            Numero: '00001',
            Nom: 'RAFALIMANANA',
            Prenom: ' Jean Sebastien',
            Demande: 'Copy de naissance',
            Status: Status.Abord,
        },
        {
            Numero: '00001',
            Nom: 'Ravaoavy',
            Prenom: 'Aina soa',
            Demande: 'Certificat de décé',
            Status: Status.Done,
        },
    ]
    const rows = elements.map((element) => (
        <tr key={element.Numero}>
            <td>{element.Numero}</td>
            <td>{element.Nom}</td>
            <td>{element.Prenom}</td>
            <td>{element.Demande}</td>
            <td>
                <Group>
                    <Badge color={element.Status==Status.Done?"teal":"red"} variant="filled">
                        {element.Status}
                    </Badge>
                    <ActionIcon onClick={()=>navigate("residence-crt/15")}>
                        <IconDots></IconDots>
                    </ActionIcon>
                </Group>
            </td>
        </tr>
    ))
    return (
        <>
            <Title mb={24}>Liste des demandes à effectués</Title>
            <Table striped>
                <thead>
                    <tr>
                        <th>Numero</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Demande</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </>
    )
}
