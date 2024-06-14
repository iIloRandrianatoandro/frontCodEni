import React from 'react'
import { Text, Group, Box, Paper, em, Image, Button } from '@mantine/core'
import { useReactToPrint } from 'react-to-print'
import { useRef } from 'react'

export default function Residence() {
    return (
        <Box>
            <Certificat></Certificat>
        </Box>
    )
}

const Certificat = () => {
    const componentRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })
    return (
        <>
            <Paper ref={componentRef} shadow="xs" p="md" w={em(950)}>
                <Group>
                    <Text size={em(15)}>
                        MINISTERE DE L'INTERIEUR <br />
                        <Text span>FARITRA MATSIATRA AMBONY </Text>
                        <br />
                        <Text span>DISTRICT FIANARANTSOA</Text>
                        <br />
                        <Text span>COMMUNE ANDRAINJATO</Text>
                        <br />
                        <Text span>FOKOTANY SOATSIHADINO</Text>
                        <br />
                    </Text>
                    <Image
                        ml={em(150)}
                        maw={em(150)}
                        src={
                            'https://www.samifin.gov.mg/fr/sites/default/files/inline-images/presidence-logo_3.jpg'
                        }
                    ></Image>
                </Group>
                <Text align="center" size={em(20)} mt={em(15)} weight={'bold'}>
                    CERTIFICAT DE RESIDENCE
                </Text>
                <Box mt={em(15)}>
                    <Text mb={em(5)} ml={em(30)}>
                        Le CHET DE FOKONTANY Soatsihadino soussigné que:
                    </Text>
                    <Text>
                        Mr/Mme/Mlle:{' '}
                        <Text span>Rafalimanana Jean Sébastien</Text>{' '}
                    </Text>
                    <Text>
                        Né(e) le: <Text span>15 janvier 2002 à Ihosy</Text>{' '}
                    </Text>
                    <Text>
                        Fils (fille) de: <Text span>Nom du pere</Text>{' '}
                        <Text span>et de Nom du mere</Text>{' '}
                    </Text>
                    <Text>
                        Profession: <Text span>Mpianatra</Text>{' '}
                        <Text ml={em(60)} span>
                            de nationalité Malagasy
                        </Text>
                    </Text>
                    <Text>
                        CIN N° : xxx xxx xxx xxx du dd MMMM aaaa à Ihosy
                    </Text>
                    <Text>
                        Réside à: Soatsiadino, Fokontany Soatsihadino sous N°
                        xxx du resistre
                    </Text>
                    <Text mt={30}>
                        En foi de quoi, le présent cetificat lui est délicrée
                        pour servir et valoir ce que de droit.
                    </Text>
                    <Text align="right" mt={em(30)} mr={em(120)}>
                        Fait à Fianarantsoa, le dd MMMM aaaa
                    </Text>
                    <Text
                        align="right"
                        mt={em(30)}
                        mr={em(140)}
                        weight={'bold'}
                        mb={em(75)}
                    >
                        LE CHEF FOKONTANY
                    </Text>
                </Box>
            </Paper>
            <Button mt={em(30)} onClick={handlePrint} size="md" bg={'cadet'}>
                Imprimer
            </Button>
        </>
    )
}
