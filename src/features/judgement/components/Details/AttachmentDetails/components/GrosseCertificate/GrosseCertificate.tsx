import React, { useEffect, useState } from 'react'
import MdgJusticeLog from '@/assets/Justice.svg'
import presidenceLog from '@/assets/Presidence.svg'
import { setLocaleDateCustomString, setDateCustomString } from '@/core/dateManagement'
import { JudgmentRequestDto } from '@/features/judgement/state/types'
import { Box, Grid, Paper, SimpleGrid, Stack, Image, Text } from '@mantine/core'
import DefaultSignatureStamp from '@/assets/RegistrarSignatureStamp.png'
import { Role, UserDto } from '@/features/admin/types'
import { useLazyGetUserByRoleAndCommuneAndEnabledQuery } from '@/features/admin/adminApi'
import { useTypedSelector } from '@/store'
import { capitalizeFirst } from '@/features/judgement/utils'

interface GrosseCertificateProps {
    judgementRequest?: JudgmentRequestDto
}

const GrosseCertificate: React.FC<GrosseCertificateProps> = ({
    judgementRequest,
}): JSX.Element => {
    const applicantGender = judgementRequest?.applicant?.gender
        .toLowerCase()
        .includes('male')
        ? 'Lahy'
        : 'Vavy'
    const applicantFullname = `${judgementRequest?.applicant?.fullName} ${judgementRequest?.applicant?.fullLastName}`
    const applicantBirthDate = judgementRequest?.applicant.birthDate
    const applicantBirthPlace = judgementRequest?.applicant.birthPlace
    const motherFullname = `${judgementRequest?.mother?.fullName} ${judgementRequest?.mother?.fullLastName}`

    const [courtClerkSignature, setCourtClerkSignature] = useState(null)
    const [currentCourtClerk, setCurrentCourtClerk] =
        useState<Omit<UserDto, 'password'>>()

    const [magistrateSignature, setMagistrateSignature] = useState(null)
    const [currentMagistrate, setCurrentMagistrate] =
        useState<Omit<UserDto, 'password'>>()

    const { currentUser } = useTypedSelector(
        (state: { authentication: any }) => state.authentication
    )

    const doesCurrentUserRoleISClerk = currentUser?.role.toString().toLowerCase()===Role.COURT_CLERK.toString().toLowerCase()

    const yearOfJudgment: string = judgementRequest!.grosse.dateVerdict!.toString().split("-").length > 2
    ? judgementRequest!.grosse.dateVerdict!.toString().split("-")[0]
    : ""

    const [getUserByRoleAndCommuneAndEnabled] =
        useLazyGetUserByRoleAndCommuneAndEnabledQuery()

    const displaySignature = async () => {
        try {
            const courtClerk = await getUserByRoleAndCommuneAndEnabled({
                role: Role.COURT_CLERK,
                communeId: currentUser?.commune.id || 210103,
                enabled: true,
            }).unwrap()

            setCurrentCourtClerk(courtClerk)

            setCourtClerkSignature(courtClerk.signature)

            const magistrate = await getUserByRoleAndCommuneAndEnabled({
                role: Role.MAGISTRATE,
                communeId: currentUser?.commune.id || 210103,
                enabled: true,
            }).unwrap()

            setCurrentMagistrate(magistrate)

            setMagistrateSignature(magistrate.signature)
        } catch (error: any) {
            console.log(error)
            console.log('error: ' + error.toString())
            console.log(JSON.stringify(error))
        }
    }

    useEffect(() => {
        displaySignature()
    }, [])

    const currentCourtClerkSignature =
        courtClerkSignature &&
        (courtClerkSignature as unknown as string)
            .toString()
            .includes('data:image/png;base64,')
            ? courtClerkSignature
            : courtClerkSignature &&
              'data:image/png;base64,' + courtClerkSignature
    const currentMagistrateSignature =
        magistrateSignature &&
        (magistrateSignature as unknown as string)
            .toString()
            .includes('data:image/png;base64,')
            ? magistrateSignature
            : magistrateSignature &&
              'data:image/png;base64,' + magistrateSignature

    return (
        <React.Fragment>
            <Box component={'div'}>
                <Paper
                    variant="outlined"
                    p="xl"
                    sx={{
                        marginTop: 5,
                        marginLeft: 19,
                        marginRight: -60,
                        marginBottom: 5,
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
                                        >
                                            <div>
                                                <span
                                                    style={{ marginLeft: 220 }}
                                                >
                                                    {' '}
                                                    FITSARANA AMBARATONGA <br />
                                                </span>
                                                <span
                                                    style={{ marginLeft: 220 }}
                                                >
                                                    VOALOHANY ETO{' '}
                                                    {judgementRequest?.grosse?.tpiNamePlace
                                                        .toString()
                                                        .toUpperCase()}{' '}
                                                    <br />
                                                </span>
                                            </div>
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
                                        >
                                            <div>
                                                <span
                                                    style={{ marginLeft: 140 }}
                                                >
                                                    {' '}
                                                    DIDIM-PITSARANA MISOLO
                                                    SORA-PAHATERAHANA{' '}
                                                </span>
                                                <br />
                                                <span
                                                    style={{ marginLeft: 220 }}
                                                >
                                                    RAHARAHA FAHA: JSN/TPI/
                                                    {yearOfJudgment}/{judgementRequest?.grosse?.courtClerk?.workPlace}/{judgementRequest?.grosse?.id}
                                                    {' '}
                                                </span>
                                                <br />
                                                <span
                                                    style={{ marginLeft: 240 }}
                                                >
                                                    LAHARANA FAHA:{' '}
                                                    {
                                                        judgementRequest?.grosse
                                                            ?.identityNumber
                                                    }{' '}
                                                </span>
                                            </div>
                                        </Stack>
                                    </Grid.Col>
                                </Grid>
                                <br />
                                <Stack>
                                    <div>
                                        <p>
                                            <span>
                                                Fitsarana notarihin’i{' '}
                                                {
                                                    judgementRequest?.grosse
                                                        .tribunalPresidentFullName
                                                }
                                            </span>
                                            {/* <br /> */}
                                            <span>
                                                {' '}Mpitsara eto amin’ny Fitsarana
                                                Ambaratonga Voalohany{' '}
                                                {
                                                    judgementRequest?.grosse
                                                        .tpiNamePlace
                                                }{' '}
                                                .
                                            </span>
                                            {/* <br /> */}
                                            <span>
                                                {' '}Notronin’i{' '}
                                                {`${judgementRequest?.grosse.courtClerk?.firstName
                                                    ?.toString()
                                                    .toUpperCase()} ${judgementRequest?.grosse.courtClerk?.lastName?.toString()}`}{' '}
                                                - mpiraki-draharaha.
                                            </span>
                                            {/* <br /> */}
                                            <span>
                                                {' '}Fitsarana ady madio ampahibemaso
                                                natao ny{' '}
                                                { setDateCustomString(judgementRequest?.grosse?.dateVerdict!)}
                                                {/* {setLocaleDateCustomString(judgementRequest?.grosse?.dateVerdict!)} */}
                                                .
                                            </span>
                                            <br/>
                                            <span>
                                                Ny Fitsarana Ambaratonga
                                                Voalohany{' '}
                                                {
                                                    judgementRequest?.grosse
                                                        ?.tpiNamePlace
                                                }{' '}
                                                teto amin’ny efitrano fitsarana
                                                andavan’andro;{' '}
                                            </span>
                                            <span>
                                                Namoaka izao didim-pitsarana
                                                manaraka izao:
                                            </span>
                                        </p>
                                        <strong>NY FITSARANA</strong>
                                        <br />
                                        <span>
                                            Hita ny antontan-taratasin’ady; Hita
                                            ny fehinten’ny Fampanoavana; Heno ny
                                            mpangataka; Heno ny fanambaran’ny
                                            vavolombelona;
                                            {/* <br /> */}
                                            Rehefa nidinika araka ny lalàna;
                                        </span>
                                        <br/>
                                        <span>
                                            Araka ny fangatahana tamin’ny{' '}
                                                { setDateCustomString(judgementRequest?.createdAt!)}
                                                {/* {setLocaleDateCustomString(judgementRequest?.createdAt!)}{' '} */}
                                                dia mangataka ny Fitsarana etoana i{' '}
                                                {`${judgementRequest?.applicant?.fullName} ${judgementRequest?.applicant?.fullLastName}`}{' '}
                                                mba hamoaka didim-pitsarana misolo
                                                sora-pahaterahana
                                                {judgementRequest?.applicant
                                                    ?.fullName ===
                                                    judgementRequest?.requester
                                                        ?.fullName &&
                                                    judgementRequest?.applicant
                                                        ?.fullLastName ===
                                                        judgementRequest?.requester
                                                            ?.fullLastName && (
                                                        <> ho azy </>
                                                    )}
                                                {judgementRequest?.applicant
                                                    ?.fullName !=
                                                    judgementRequest?.requester
                                                        ?.fullName &&
                                                    judgementRequest?.applicant
                                                        ?.fullLastName !=
                                                        judgementRequest?.requester
                                                            ?.fullLastName && (
                                                        <>
                                                            {' '}
                                                            ho an’i{' '}
                                                            {
                                                                applicantFullname
                                                            },{' '}
                                                        </>
                                                    )}
                                                {applicantGender}.
                                        </span>
                                        <p>
                                            Daty sy toerana nahaterahana :
                                            Teraka ny { setDateCustomString(applicantBirthDate!) }
                                            {/* {applicantBirthDate}  */}
                                            tao{' '}
                                            {applicantBirthPlace} Kaominina:{' '}
                                            {judgementRequest?.commune?.name}{' '}
                                            Distrika:{' '}
                                            {judgementRequest?.district?.name}.
                                            {/* <br /> */}
                                            Anaran’ny Ray aman-dReny:{' '}
                                            {(judgementRequest?.father
                                                ?.fullName ||
                                                judgementRequest?.father?.numCIN.toString()) && (
                                                <>
                                                    {
                                                        judgementRequest?.father
                                                            ?.fullName
                                                    }{' '}
                                                    {
                                                        judgementRequest?.father
                                                            ?.fullLastName
                                                    }{' '}
                                                    sy{' '}
                                                </>
                                            )}
                                            {motherFullname}
                                        </p>
                                        <p>
                                            <span>
                                                Araka ny antontan-taratasin’ady
                                                sy ny fanambarann’ny
                                                vavolombelona dia hita fa
                                                mitombona ny fangatahana ary
                                                omena rariny;
                                            </span>
                                        </p>
                                        <strong>
                                            NOHO IREO ANTONY IREO
                                            <br />
                                        </strong>
                                        <span>
                                            Mitsara ampahibemaso amin’ny ady
                                            madio, azo anaovana Fampakarana;
                                        </span>
                                        <p>
                                            Lazaina fa i {applicantFullname} ,
                                            {applicantGender} dia teraka ny{' '}
                                            { setDateCustomString(applicantBirthDate!) }
                                            {/* {applicantBirthDate}  */}
                                            tao{' '}
                                            {applicantBirthPlace} ,{' '}
                                            <span>
                                                kaominina{' '}
                                                {
                                                    judgementRequest?.commune
                                                        ?.name
                                                }
                                                , distrika{' '}
                                                {
                                                    judgementRequest?.district
                                                        ?.name
                                                }
                                            </span>{' '}
                                            , zanak’i{' '}
                                            {(judgementRequest?.father
                                                ?.fullName ||
                                                judgementRequest?.father?.numCIN.toString()) && (
                                                <>
                                                    {
                                                        judgementRequest?.father
                                                            ?.fullName
                                                    }{' '}
                                                    {
                                                        judgementRequest?.father
                                                            ?.fullLastName
                                                    }{' '}
                                                    sy{' '}
                                                </>
                                            )}
                                            {motherFullname}.
                                        </p>
                                        <p>
                                            Didiana ny fandikana ny matoan’izao
                                            didy izao ao amin’ny rejistry ny
                                            sora-piankohonana;
                                        </p>
                                        <p>
                                            Notsaraina sy nambara araka izany
                                            nandritra ny fotoam-pitsarana
                                            ampahibemaso tamin’ny andro, volana,
                                            taona voalaza ery ambony ary
                                            nosoniavin’ny Filoha sy ny
                                            Mpiraki-draharaha.
                                        </p>
                                    </div>
                                    <SimpleGrid cols={4}>
                                        <div>
                                            <div style={{ marginLeft: 50 }}>
                                                Greffier
                                            </div>
                                            <div style={{ marginLeft: 30 }}>
                                                <Image
                                                    src={
                                                        currentCourtClerkSignature ??
                                                        DefaultSignatureStamp
                                                    }
                                                    width={120}
                                                    height={120}
                                                />
                                            </div>
                                            <div style={{ marginLeft: 50 }}>
                                                {`${currentCourtClerk?.firstName?.toUpperCase()} ${
                                                    currentCourtClerk?.lastName &&
                                                    capitalizeFirst(
                                                        currentCourtClerk.lastName
                                                    )
                                                }`}
                                            </div>
                                        </div>
                                        { !doesCurrentUserRoleISClerk &&
                                            <div>
                                                <div style={{ marginLeft: 250 }}>
                                                    Président
                                                </div>
                                                <div style={{ marginLeft: 200 }}>
                                                    <Image
                                                        src={
                                                            currentMagistrateSignature ||
                                                            DefaultSignatureStamp
                                                        }
                                                        width={120}
                                                        height={120}
                                                    />
                                                </div>
                                                <div style={{ marginLeft: 250 }}>
                                                    {`${currentMagistrate?.firstName?.toUpperCase()} ${
                                                        currentMagistrate?.lastName &&
                                                        capitalizeFirst(
                                                            currentMagistrate.lastName
                                                        )
                                                    }`}
                                                </div>
                                            </div>
                                        }
                                    </SimpleGrid>
                                </Stack>
                            </Box>
                        </Grid.Col>
                    </Grid>
                </Paper>
            </Box>
        </React.Fragment>
    )
}

GrosseCertificate.displayName = 'GrosseCertificate component'

export default GrosseCertificate
