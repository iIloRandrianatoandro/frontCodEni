import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Box, Grid, Paper, SimpleGrid, Stack, Text, Image } from '@mantine/core'
import { Gender, JudgmentRequestDto } from '@/features/judgement/state/types'
import { customizeOffice, setDateCustomString } from '@/core/dateManagement'
import presidenceLogo from '@/assets/Presidence.svg'
import MdgHealthLogo from '@/assets/Sante.svg'
import { useTypedSelector } from '@/store'
import { capitalizeFirst } from '@/features/judgement/utils'
import DoctorSignatureStamp from '@/assets/RegistrarSignatureStamp.png'
import { Role, UserDto } from '@/features/admin/types'
import { useLazyGetUserByRoleAndCommuneAndEnabledQuery } from '@/features/admin/adminApi'

interface SomaticExamCertificateProps {
    judgementRequest?: JudgmentRequestDto
}

const SomaticExamCertificate: React.FC<SomaticExamCertificateProps> = ({
    judgementRequest,
}): JSX.Element => {
    const actualDate: string = new Date()
        .toISOString()
        .split('T')[0]
        .split('.')[0]

    const [doctorSignature, setDoctorSignature] = useState(null)
    const [currentDoctor, setCurrentDoctor] =
        useState<Omit<UserDto, 'password'>>()

    const { accessToken, currentUser } = useTypedSelector(
        (state: { authentication: any }) => state.authentication
    )

    const [getUserByRoleAndCommuneAndEnabled] =
        useLazyGetUserByRoleAndCommuneAndEnabledQuery()

    const displaySignature = async () => {
        try {
            const doctor = await getUserByRoleAndCommuneAndEnabled({
                role: Role.DOCTOR,
                communeId: currentUser?.commune.id || 210103,
                enabled: true,
            }).unwrap()

            setCurrentDoctor(doctor)

            setDoctorSignature(doctor.signature)
        } catch (error: any) {
            console.log(error)
            console.log('error: ' + error.toString())
            console.log(JSON.stringify(error))
        }
    }

    useEffect(() => {
        displaySignature()
    }, [])

    const signature =
        doctorSignature &&
        (doctorSignature as unknown as string)
            .toString()
            .includes('data:image/png;base64,')
            ? doctorSignature
            : doctorSignature && 'data:image/png;base64,' + doctorSignature

    const fatherName = judgementRequest?.father?.fullName ?? 'Néant'

    return (
        <React.Fragment>
            <Box component={'div'}>
                <Paper
                    variant="outlined"
                    p="xl"
                    sx={{
                        marginLeft: 60,
                        marginRight: 60,
                        marginBottom: 60,
                        width: '21cm',
                        height: '29.7cm',
                    }}
                >
                    <Grid gutter={5} gutterXs="md" gutterMd="xl" gutterLg={20}>
                        <Grid.Col span={11}>
                            <Box sx={{ pl: 4, pr: 4 }}>
                                <Stack>
                                    <SimpleGrid
                                        cols={3}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <Grid.Col
                                            span={2}
                                            style={{
                                                width: 100,
                                            }}
                                        >
                                            <Image
                                                src={presidenceLogo}
                                                width={66}
                                                height={66}
                                            />
                                        </Grid.Col>
                                        <Grid.Col
                                            span={8}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'start',
                                            }}
                                        >
                                            <Text
                                                variant="h6"
                                                sx={{
                                                    textTransform: 'uppercase',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                <b>
                                                    <span
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent:
                                                                'center',
                                                            marginLeft: 82,
                                                        }}
                                                    >
                                                        REPOBLIKAN'I
                                                        MADAGASIKARA
                                                    </span>
                                                    <span
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent:
                                                                'center',
                                                            fontSize: 10,
                                                            marginLeft: 82,
                                                        }}
                                                    >
                                                        Fitiavana-Tanindrazana-Fandrosoana
                                                    </span>
                                                </b>
                                            </Text>
                                        </Grid.Col>
                                        <Grid.Col
                                            span={2}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'end',
                                            }}
                                        >
                                            <Image
                                                src={MdgHealthLogo}
                                                width={66}
                                                height={66}
                                            />
                                        </Grid.Col>
                                    </SimpleGrid>
                                </Stack>
                                <br />
                                <Grid
                                    gutter={5}
                                    gutterXs="md"
                                    gutterMd="xl"
                                    gutterLg={20}
                                >
                                    <Grid.Col
                                        span={8}
                                        style={{ lineHeight: 0.5 }}
                                    >
                                        <Stack sx={{ display: 'flex' }}>
                                            <span>
                                                {' '}
                                                MINISTERE DE LA SANTE PUBLIQUE{' '}
                                            </span>
                                            <span> SECRETARIAT GENERAL </span>
                                            <span>
                                                {' '}
                                                DIRECTION REGIONALE DE SANTE
                                                PUBLIQUE{' '}
                                            </span>
                                            <span>
                                                {' '}
                                                SERVICE DE DISTRICT DE SANTE
                                                PUBLIQUE{' '}
                                            </span>
                                        </Stack>
                                    </Grid.Col>
                                    <Grid.Col span={4}>
                                        <Stack sx={{ display: 'flex' }}>
                                            <b>
                                                <span
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'end',
                                                        marginTop: '50px',
                                                    }}
                                                >
                                                    EXAMEN SOMATIQUE
                                                </span>
                                            </b>
                                        </Stack>
                                    </Grid.Col>
                                </Grid>
                                <br />
                                <Stack>
                                    <div>
                                        <p>
                                            N°{' '}
                                            {judgementRequest?.somaticExam
                                                ?.identity || 0}
                                        </p>
                                        Je soussigné, Docteur{' '}
                                        {`${
                                            judgementRequest?.somaticExam
                                                ?.doctor?.firstName ||
                                            'Dokotera'
                                        } ${
                                            judgementRequest?.somaticExam
                                                ?.doctor?.lastName || 'Dokotera'
                                        }`}
                                        <br />
                                        Médecin Diplômé(e) d’Etat IM :
                                        {
                                            judgementRequest?.somaticExam
                                                ?.doctor?.matriculation
                                        }
                                        <br />
                                        en service au{' '}
                                        {
                                            judgementRequest?.somaticExam
                                                ?.doctor?.workPlace
                                        }
                                        , certifie avoir examiné :
                                        <br />
                                        Le nommé :{' '}
                                        {`${judgementRequest?.applicant.fullName} ${judgementRequest?.applicant.fullLastName}`}
                                        <br />
                                        Né(e) le :{' '}
                                        {judgementRequest?.applicant.birthDate.includes(
                                            'vers'
                                        )
                                            ? judgementRequest?.applicant
                                                  .birthDate
                                            : `Vers ${
                                                  judgementRequest?.applicant.birthDate.split(
                                                      '-'
                                                  )[0]
                                              }`}
                                        <br />
                                        Fils/Fille de :{' '}
                                        {`${fatherName} ${judgementRequest?.father?.fullLastName}`}
                                        <br />
                                        Et de :{' '}
                                        {`${judgementRequest?.mother?.fullName} ${judgementRequest?.mother?.fullLastName}`}
                                        <br />
                                        Domicile à :{' '}
                                        {judgementRequest?.applicant?.address}
                                    </div>
                                    <p>
                                        L’ensemble des constatations ainsi que
                                        la morphologie générale permettant de
                                        lui donner actuellement un age
                                        approximatif{' '}
                                        {judgementRequest?.somaticExam
                                            ?.applicantAge || 0}{' '}
                                        révolu.
                                    </p>
                                    <div>
                                        En foi de quoi le présent certificat lui
                                        est délivré en main propre pour servir
                                        et valoir ce que de droit.{' '}
                                    </div>
                                    <br />
                                    <div style={{ marginLeft: 350 }}>
                                        Fait à{' '}
                                        {customizeOffice(
                                            judgementRequest?.commune?.name!
                                        )}
                                        {', le '}
                                        {actualDate
                                            .replaceAll('-', '/')
                                            .split('/')
                                            .reverse()
                                            .join('/')}
                                        .
                                    </div>
                                    <div style={{ marginLeft: 350 }}>
                                        <Image
                                            src={
                                                signature ||
                                                DoctorSignatureStamp
                                            }
                                            width={200}
                                            height={200}
                                        />
                                    </div>
                                    <div style={{ marginLeft: 350 }}>
                                        {`${currentDoctor?.firstName?.toUpperCase()} ${
                                            currentDoctor?.lastName &&
                                            capitalizeFirst(
                                                currentUser.lastName
                                            )
                                        }`}
                                    </div>
                                </Stack>
                            </Box>
                        </Grid.Col>
                    </Grid>
                </Paper>
            </Box>
        </React.Fragment>
    )
}

SomaticExamCertificate.displayName = 'SomaticExamCertificate component'

export default SomaticExamCertificate
