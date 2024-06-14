import moment from 'moment'
import { useTypedSelector } from '@/store'
import MdgJusticeLog from '@/assets/Justice.svg'
import React, { useEffect, useState } from 'react'
import presidenceLog from '@/assets/Presidence.svg'
import { Role, UserDto } from '@/features/admin/types'
import { capitalizeFirst } from '@/features/judgement/utils'
import { JudgmentRequestDto, Requester } from '@/features/judgement/state/types'
import DefaultSignatureStamp from '@/assets/RegistrarSignatureStamp.png'
import {
    Box,
    Grid,
    Paper,
    SimpleGrid,
    Stack,
    Image,
    Title,
    Text,
} from '@mantine/core'
import { useLazyGetUserByRoleAndCommuneAndEnabledQuery } from '@/features/admin/adminApi'
import {
    customizeOffice,
    setDateCustomStringWithFrLanguage,
} from '@/core/dateManagement'

interface ConclusionCivilCertificateProps {
    judgementRequest?: JudgmentRequestDto
}

const ConclusionCivilCertificate: React.FC<ConclusionCivilCertificateProps> = ({
    judgementRequest,
}) => {
    const [prosecutorSignature, setProsecutorSignature] = useState(null)
    const [currentProsecutor, setCurrentProsecutor] =
        useState<Omit<UserDto, 'password'>>()
    const { currentUser } = useTypedSelector(
        (state: { authentication: any }) => state.authentication
    )
    const [getUserByRoleAndCommuneAndEnabled] =
        useLazyGetUserByRoleAndCommuneAndEnabledQuery()

    const displaySignature = async () => {
        try {
            const prosecutor = await getUserByRoleAndCommuneAndEnabled({
                role: Role.PROSECUTOR,
                communeId: currentUser?.commune.id || 210103,
                enabled: true,
            }).unwrap()
            setCurrentProsecutor(prosecutor)
            setProsecutorSignature(prosecutor.signature)
        } catch (error: any) {}
    }

    useEffect(() => {
        displaySignature()
    }, [])

    const currentProsecutorSignature =
        prosecutorSignature &&
        (prosecutorSignature as unknown as string)
            .toString()
            .includes('data:image/png;base64,')
            ? prosecutorSignature
            : prosecutorSignature &&
              'data:image/png;base64,' + prosecutorSignature

    const handleTypeRequesterLabel = (): string => {
        let typeRequesterLabel = ''
        if (judgementRequest?.typeRequester?.toString() === Requester.FATHER)
            typeRequesterLabel = 'est son père'
        if (judgementRequest?.typeRequester?.toString() === Requester.MOTHER)
            typeRequesterLabel = 'est sa mère'
        if (
            judgementRequest?.typeRequester?.toString() ===
            Requester.FIRST_WITNESS
        )
            typeRequesterLabel = 'son premier témoin'
        if (
            judgementRequest?.typeRequester?.toString() ===
            Requester.SECOND_WITNESS
        )
            typeRequesterLabel = 'son deuxième témoin'

        return typeRequesterLabel
    }

    return (
        <React.Fragment>
            <Box component={'div'}>
                <Paper
                    variant="outlined"
                    p="xl"
                    sx={{
                        marginLeft: 30,
                        marginRight: 5,
                        marginBottom: 5,
                    }}
                >
                    <Grid gutter={5} gutterXs="md" gutterMd="xl" gutterLg={20}>
                        <Grid.Col span={11}>
                            <Box sx={{ pl: 4, pr: 4 }}>
                                <Stack>
                                    <SimpleGrid
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
                                                src={presidenceLog}
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
                                                <Title
                                                    order={6}
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent:
                                                            'center',
                                                        marginLeft: 20,
                                                        fontWeight: 'bold',
                                                        color: 'black',
                                                    }}
                                                >
                                                    REPOBLIKAN'I MADAGASIKARA
                                                </Title>
                                                <Title
                                                    order={6}
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent:
                                                            'center',
                                                        fontSize: 10,
                                                        marginLeft: 20,
                                                        fontWeight: 'bold',
                                                        color: 'black',
                                                    }}
                                                >
                                                    Fitiavana - Tanindrazana -
                                                    Fandrosoana
                                                </Title>
                                            </Text>
                                        </Grid.Col>
                                        <Grid.Col
                                            span={2}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'end',
                                                marginLeft: -120,
                                            }}
                                        >
                                            <Image
                                                src={MdgJusticeLog}
                                                width={66}
                                                height={66}
                                            />
                                        </Grid.Col>
                                    </SimpleGrid>
                                </Stack>
                                <Grid
                                    gutter={5}
                                    gutterXs="md"
                                    gutterMd="xl"
                                    gutterLg={20}
                                >
                                    <Grid.Col span={12}>
                                        <Stack
                                            sx={{
                                                display: 'flex',
                                                alignContent: 'center',
                                            }}
                                            style={{
                                                marginLeft: 110,
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            FITSARANA AMBARATONGA VOALOHANY ETO{' '}
                                            {judgementRequest?.grosse?.tpiNamePlace
                                                .toString()
                                                .toUpperCase()}{' '}
                                        </Stack>
                                    </Grid.Col>
                                </Grid>
                                <Grid
                                    gutter={5}
                                    gutterXs="md"
                                    gutterMd="xl"
                                    gutterLg={20}
                                >
                                    <Grid.Col span={12}>
                                        <Stack
                                            sx={{
                                                display: 'flex',
                                                alignContent: 'center',
                                            }}
                                            style={{
                                                marginLeft: 236,
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            CONCLUSION CIVILE
                                        </Stack>
                                    </Grid.Col>
                                </Grid>
                                <Stack>
                                    <div>
                                        <p>
                                            <span
                                                style={{ paddingLeft: '60px' }}
                                            >
                                                Nous,
                                            </span>{' '}
                                            {currentProsecutor?.firstName}{' '}
                                            {currentProsecutor?.lastName},{' '}
                                            Procureur de la République prés le
                                            Tribunal de Première Instance d'{' '}
                                            {currentProsecutor?.workPlace};
                                        </p>
                                        <span
                                            style={{
                                                textDecoration: 'underline',
                                                paddingLeft: '60px',
                                            }}
                                        >
                                            Sur les faits:
                                        </span>
                                        <br />
                                        <span>
                                            <span
                                                style={{ paddingLeft: '60px' }}
                                            >
                                                {' '}
                                                Attendu que{' '}
                                            </span>{' '}
                                            {
                                                judgementRequest?.requester
                                                    ?.fullName
                                            }{' '}
                                            {
                                                judgementRequest?.requester
                                                    ?.fullLastName
                                            }{' '}
                                            , demeurant à{' '}
                                            {judgementRequest?.fokontany?.name!}{' '}
                                            ,
                                            {customizeOffice(
                                                judgementRequest?.commune?.name!
                                            )}{' '}
                                            {/* et {" "} {customizeOffice(judgementRequest?.district?.name!) } */}{' '}
                                            , par le biais de sa requête en date
                                            du{' '}
                                            {setDateCustomStringWithFrLanguage(
                                                moment(
                                                    judgementRequest?.createdAt
                                                ).format('YYYY-MM-DD')
                                            )}{' '}
                                            a demandé l'octroi du jugement
                                            supplétif d'acte de naissance de{' '}
                                            {
                                                judgementRequest?.applicant
                                                    ?.fullName
                                            }{' '}
                                            {
                                                judgementRequest?.applicant
                                                    ?.fullLastName
                                            }{' '}
                                            ;
                                            <br />
                                        </span>
                                        <span>
                                            <span
                                                style={{ paddingLeft: '60px' }}
                                            >
                                                {' '}
                                                Au motifs de sa demande,{' '}
                                            </span>{' '}
                                            {judgementRequest?.requester?.gender
                                                .toLowerCase()
                                                .includes('male')
                                                ? 'le requérant'
                                                : 'la requérante'}{' '}
                                            expose que{' '}
                                            {
                                                judgementRequest?.requester
                                                    ?.fullName
                                            }{' '}
                                            {
                                                judgementRequest?.requester
                                                    ?.fullLastName
                                            }{' '}
                                            {handleTypeRequesterLabel()} dont le
                                            père est{' '}
                                            {judgementRequest?.father
                                                ?.fullName ?? 'Néant'}{' '}
                                            {
                                                judgementRequest?.father
                                                    ?.fullLastName
                                            }{' '}
                                            .
                                            <br />
                                        </span>
                                        <span>
                                            <span
                                                style={{ paddingLeft: '60px' }}
                                            >
                                                {' '}
                                                Que{' '}
                                            </span>{' '}
                                            {judgementRequest?.requester?.gender
                                                .toLowerCase()
                                                .includes('male')
                                                ? 'il'
                                                : 'elle'}{' '}
                                            sollicite le jugement supplétif
                                            d'acte de naissance de l'enfant en
                                            raison qu'{' '}
                                            {judgementRequest?.requester?.gender
                                                .toLowerCase()
                                                .includes('male')
                                                ? 'il'
                                                : 'elle'}{' '}
                                            n'a pas pu le déclarer dans le délai
                                            légal de trente jours à compter de
                                            sa date de naissance, <br />
                                        </span>
                                        <span>
                                            <span
                                                style={{ paddingLeft: '60px' }}
                                            >
                                                {' '}
                                                {judgementRequest?.requester?.gender
                                                    .toLowerCase()
                                                    .includes('male')
                                                    ? 'il'
                                                    : 'elle'}{' '}
                                            </span>
                                            verse à l'appui de sa demande:{' '}
                                            <br />{' '}
                                            <span
                                                style={{ paddingLeft: '60px' }}
                                            >
                                                - Le certificat de résidence
                                            </span>{' '}
                                            <br />
                                            <span
                                                style={{ paddingLeft: '60px' }}
                                            >
                                                - Le certificat de recherche
                                                infructueuse
                                            </span>{' '}
                                            <br />
                                            <span
                                                style={{ paddingLeft: '60px' }}
                                            >
                                                - L'examen somatique.
                                            </span>
                                            <br />
                                            <br />{' '}
                                        </span>
                                        <span
                                            style={{
                                                textDecoration: 'underline',
                                                paddingLeft: '60px',
                                            }}
                                        >
                                            Motifs:
                                        </span>
                                        <br />
                                        <span>
                                            <span
                                                style={{ paddingLeft: '60px' }}
                                            >
                                                Aux termes{' '}
                                            </span>{' '}
                                            de l'article 45 loi n° 2018-027 du
                                            08 février rélative à l'état civil,
                                            les déclarations de naissance
                                            doivent être faites dans le trente
                                            jours de la naissance.
                                            <br />
                                        </span>

                                        {judgementRequest?.prosecution
                                            ?.isAccepted && (
                                            <span>
                                                <span
                                                    style={{
                                                        paddingLeft: '60px',
                                                    }}
                                                >
                                                    Que l'article{' '}
                                                </span>{' '}
                                                111 de ladite loi dispose que
                                                toute personne qui voudra faire
                                                suppléer à l'inexistence d'un
                                                acte de naissance ou de décès
                                                par un jugement peut introduire
                                                à cette fin, une action devant
                                                le Tribunal de Première Instance
                                                du lieu de la survenance des
                                                faits d'état civil ou de sa
                                                résidence. Le Ministre public
                                                peut également agir d'office;
                                                <br />
                                            </span>
                                        )}

                                        <span>
                                            <span
                                                style={{ paddingLeft: '60px' }}
                                            >
                                                Qu'en l'espèce{' '}
                                            </span>
                                            , il y a lieu constater que{' '}
                                            {
                                                judgementRequest?.applicant
                                                    ?.fullName
                                            }{' '}
                                            {
                                                judgementRequest?.applicant
                                                    ?.fullLastName
                                            }{' '}
                                            n'a pas été declaré dans le délai
                                            légal et ne dispose pas encore
                                            d'acte de naissance;
                                            <br />
                                        </span>
                                        <span>
                                            <span
                                                style={{ paddingLeft: '60px' }}
                                            >
                                                Qu'il y{' '}
                                            </span>
                                            a lieu de faire droit à sa demande;
                                        </span>
                                    </div>
                                    <Grid
                                        gutter={5}
                                        gutterXs="md"
                                        gutterMd="xl"
                                    >
                                        <Grid.Col span={12}>
                                            <Stack
                                                sx={{
                                                    display: 'flex',
                                                    alignContent: 'center',
                                                }}
                                                style={{
                                                    marginLeft: 290,
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                PAR CES MOTIFS
                                            </Stack>
                                        </Grid.Col>
                                    </Grid>
                                    <Stack>
                                        <div>
                                            <span>
                                                <span
                                                    style={{
                                                        paddingLeft: '60px',
                                                    }}
                                                >
                                                    Concluons{' '}
                                                </span>{' '}
                                                que les moyens avancés par{' '}
                                                {judgementRequest?.requester?.gender
                                                    .toLowerCase()
                                                    .includes('male')
                                                    ? 'le requérant'
                                                    : 'la requérante'}{' '}
                                                {judgementRequest?.prosecution
                                                    ?.isAccepted && (
                                                    <span>
                                                        {' '}
                                                        sont fondés; <br />
                                                    </span>
                                                )}
                                                {!judgementRequest?.prosecution
                                                    ?.isAccepted && (
                                                    <span>
                                                        {' '}
                                                        ne sont pas justifiés et
                                                        de le débouter en sa
                                                        demande; <br />
                                                    </span>
                                                )}
                                            </span>
                                            {judgementRequest?.prosecution
                                                ?.isAccepted && (
                                                <span>
                                                    <span
                                                        style={{
                                                            paddingLeft: '60px',
                                                        }}
                                                    >
                                                        Concluons{' '}
                                                    </span>{' '}
                                                    qu'il plaise à
                                                    Monsieur/Madame le Président
                                                    du Tribunal de déclarer la
                                                    demande fondée et d'octroyer
                                                    le jugement supplétif d'acte
                                                    de naissance de{' '}
                                                    {
                                                        judgementRequest
                                                            ?.applicant
                                                            ?.fullName
                                                    }{' '}
                                                    {
                                                        judgementRequest
                                                            ?.applicant
                                                            ?.fullLastName
                                                    }
                                                    . <br />
                                                </span>
                                            )}
                                        </div>
                                    </Stack>
                                    <Grid
                                        gutter={5}
                                        gutterXs="md"
                                        gutterMd="xl"
                                    >
                                        <Grid.Col span={12}>
                                            <Stack
                                                sx={{
                                                    display: 'flex',
                                                    alignContent: 'center',
                                                }}
                                            >
                                                <div>
                                                    <span
                                                        style={{
                                                            marginLeft: 220,
                                                        }}
                                                    >
                                                        Fait au parquet de{' '}
                                                        {
                                                            currentProsecutor?.workPlace
                                                        }{' '}
                                                        , le {'10 Janvier 2023'}{' '}
                                                        .
                                                    </span>
                                                    <br />
                                                    <span
                                                        style={{
                                                            marginLeft: 220,
                                                        }}
                                                    >
                                                        {' '}
                                                        LE PROCURERUR DE LA
                                                        REPUBLIQUE{' '}
                                                    </span>
                                                    <br />
                                                    <div>
                                                        <Image
                                                            src={
                                                                currentProsecutorSignature ||
                                                                DefaultSignatureStamp
                                                            }
                                                            width={100}
                                                            height={90}
                                                            style={{
                                                                marginLeft: 350,
                                                            }}
                                                        />
                                                    </div>
                                                    <span
                                                        style={{
                                                            marginLeft: 300,
                                                        }}
                                                    >
                                                        {`${currentProsecutor?.firstName?.toUpperCase()} 
                                                        ${
                                                            currentProsecutor?.lastName &&
                                                            capitalizeFirst(
                                                                currentProsecutor.lastName
                                                            )
                                                        }
                                                     `}
                                                    </span>
                                                </div>
                                            </Stack>
                                        </Grid.Col>
                                    </Grid>
                                </Stack>
                            </Box>
                        </Grid.Col>
                    </Grid>
                </Paper>
            </Box>
        </React.Fragment>
    )
}

ConclusionCivilCertificate.displayName = 'ConclusionCivilCertificate Component'

export default ConclusionCivilCertificate
