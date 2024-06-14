import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Box, Grid, Paper, SimpleGrid, Stack, Text, Image } from '@mantine/core'
import { Gender, JudgmentRequestDto } from '@/features/judgement/state/types'
import {
    customizeOffice,
    setDateCustomString,
    setDateCustomStringWithFrLanguage,
    setNumberToLetterWithFrLanguage,
} from '@/core/dateManagement'
import presidenceLogo from '@/assets/Presidence.svg'
import midLogo from '@/assets/MID.svg'
import { useTypedSelector } from '@/store'
import { capitalizeFirst } from '@/features/judgement/utils'
import { Role, UserDto } from '@/features/admin/types'
import { useLazyGetUserByRoleAndCommuneAndEnabledQuery } from '@/features/admin/adminApi'
import RegistrarSignatureStamp from '@/assets/RegistrarSignatureStamp.png'

interface FruitlessSearchCertificateProps {
    judgementRequest?: JudgmentRequestDto
}

const FruitlessSearchCertificate: React.FC<FruitlessSearchCertificateProps> = ({
    judgementRequest,
}): JSX.Element => {
    const actualDate: string = new Date()
        .toISOString()
        .split('T')[0]
        .split('.')[0]
    const { accessToken, currentUser } = useTypedSelector(
        (state: { authentication: any }) => state.authentication
    )
    const [registrarSignature, setRegistrarSignature] = useState(null)
    const [currentRegistrar, setCurrentRegistrar] =
        useState<Omit<UserDto, 'password'>>()

    const [getUserByRoleAndCommuneAndEnabled] =
        useLazyGetUserByRoleAndCommuneAndEnabledQuery()

    const displaySignature = async () => {
        try {
            const registrar = await getUserByRoleAndCommuneAndEnabled({
                role: Role.REGISTRAR,
                communeId: currentUser?.commune.id || 210103,
                enabled: true,
            }).unwrap()

            setCurrentRegistrar(registrar)

            setRegistrarSignature(registrar.signature)
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
        registrarSignature &&
        (registrarSignature as unknown as string)
            .toString()
            .includes('data:image/png;base64,')
            ? registrarSignature
            : registrarSignature &&
              'data:image/png;base64,' + registrarSignature
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
                                                src={midLogo}
                                                width={66}
                                                height={66}
                                            />
                                        </Grid.Col>
                                    </SimpleGrid>
                                </Stack>
                                <br />
                                <Stack
                                    sx={{ display: 'flex', lineHeight: 0.5 }}
                                >
                                    <span>
                                        {' '}
                                        Région:{' '}
                                        {customizeOffice(
                                            judgementRequest?.region?.name!
                                        )}
                                    </span>
                                    <span>
                                        {' '}
                                        District:{' '}
                                        {customizeOffice(
                                            judgementRequest?.district?.name!
                                        )}
                                    </span>
                                    <span>
                                        {' '}
                                        Commune:{' '}
                                        {customizeOffice(
                                            judgementRequest?.commune?.name!
                                        )}
                                    </span>
                                </Stack>
                                <br />
                                <Stack>
                                    <b>
                                        <span
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            CERTIFICAT DE RECHERCHE INFRUCTUEUSE
                                        </span>
                                    </b>
                                    <div style={{ textAlign: 'justify' }}>
                                        Je soussigné, Maire ou Adjoint au maire,
                                        de la commune{' '}
                                        {customizeOffice(
                                            judgementRequest?.commune?.name!
                                        )}
                                        , certifie que les recherches faites
                                        dans nos registres d'état civil tenus
                                        pour l'année{' '}
                                        <span>
                                            {' '}
                                            {judgementRequest?.applicant.birthDate
                                                .toLowerCase()
                                                .includes('vers')
                                                ? setNumberToLetterWithFrLanguage(
                                                      parseInt(
                                                          judgementRequest?.applicant.birthDate
                                                              .toLowerCase()
                                                              .split('vers')[1]
                                                      )
                                                  )
                                                : setDateCustomStringWithFrLanguage(
                                                      moment(
                                                          judgementRequest
                                                              ?.applicant
                                                              ?.birthDate
                                                      ).format('YYYY-MM-DD')
                                                  )}{' '}
                                        </span>
                                        , en vue de retrouver la naissance de{' '}
                                        <span>
                                            {' '}
                                            {
                                                judgementRequest?.applicant
                                                    ?.fullName
                                            }{' '}
                                            {
                                                judgementRequest?.applicant
                                                    ?.fullLastName
                                            }{' '}
                                            de sexe{' '}
                                        </span>
                                        {judgementRequest?.applicant?.gender ===
                                        Gender.MALE
                                            ? 'masculin'
                                            : 'feminin'}{' '}
                                        presumé être né le {''}{' '}
                                        {judgementRequest?.applicant.birthDate
                                            .toLowerCase()
                                            .includes('vers')
                                            ? `vers ${setNumberToLetterWithFrLanguage(
                                                  parseInt(
                                                      judgementRequest?.applicant.birthDate
                                                          .toLowerCase()
                                                          .split('vers')[1]
                                                  )
                                              )}`
                                            : setDateCustomStringWithFrLanguage(
                                                  moment(
                                                      judgementRequest
                                                          ?.applicant?.birthDate
                                                  ).format('YYYY-MM-DD')
                                              )}{' '}
                                        à{' '}
                                        {
                                            judgementRequest?.applicant
                                                ?.birthPlace
                                        }{' '}
                                        commune de{' '}
                                        {customizeOffice(
                                            judgementRequest?.commune?.name!
                                        )}{' '}
                                        , district{' '}
                                        {customizeOffice(
                                            judgementRequest?.district?.name!
                                        )}{' '}
                                        fils de{' '}
                                        {(judgementRequest?.father?.fullName ||
                                            judgementRequest?.father?.numCIN.toString()) && (
                                            <>
                                                {fatherName}{' '}
                                                {
                                                    judgementRequest?.father
                                                        ?.fullLastName
                                                }{' '}
                                                et de{' '}
                                            </>
                                        )}
                                        {judgementRequest?.mother?.fullName}{' '}
                                        {judgementRequest?.mother?.fullLastName}{' '}
                                        demeurent vaines et infructueuses.
                                    </div>
                                    <div>
                                        En foi de quoi,le présent certificat lui
                                        est delivré pour servir et valoir ce que
                                        de droit.{' '}
                                    </div>
                                    <br />
                                    <div style={{ marginLeft: 350 }}>
                                        {customizeOffice(
                                            judgementRequest?.commune?.name!
                                        )}
                                        {', '}
                                        {actualDate
                                            .replaceAll('-', '/')
                                            .split('/')
                                            .reverse()
                                            .join('/')}
                                        .
                                    </div>
                                    <br />
                                    <div style={{ marginLeft: 250 }}>
                                        <Image
                                            src={
                                                signature ||
                                                RegistrarSignatureStamp
                                            }
                                            width={200}
                                            height={200}
                                        />
                                    </div>
                                    <div style={{ marginLeft: 150 }}>
                                        {`${currentRegistrar?.firstName.toUpperCase()} ${
                                            currentRegistrar?.lastName &&
                                            capitalizeFirst(
                                                currentRegistrar.lastName
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

FruitlessSearchCertificate.displayName = 'FruitlessSearchCertificate component'

export default FruitlessSearchCertificate
