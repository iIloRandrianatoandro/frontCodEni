import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { FormikProps } from 'formik'
import { Role, UserDto } from '@/features/admin/types'
import { useReactToPrint } from 'react-to-print'
import { IconPrinter } from '@tabler/icons-react'
import { Gender, JudgmentRequestDto } from '@/features/judgement/state/types'
import {
    Box,
    Button,
    Divider,
    Grid,
    Group,
    Image,
    Modal,
    Paper,
    Stack,
    Text,
} from '@mantine/core'
import {
    customizeOffice,
    setDateCustomString,
    setTimeToCustomString,
    setNumberToLetterForMalagasySpecificLanguageV2,
    setNumberToLetterForMalagasySpecificLanguage,
} from '@/core/dateManagement'
import { useLazyGetUserByRoleAndCommuneAndEnabledQuery } from '@/features/admin/adminApi'
import RegistrarSignatureStamp from '@/assets/RegistrarSignatureStamp.png'

interface JudgmentCertificateProps {
    printRef?: React.RefObject<HTMLDivElement>
    form: FormikProps<JudgmentRequestDto>
    currentUser?: UserDto
    registryNumber?: string
    registryStoredDate?: Date | null
    registryStoredTime?: string
    registryDate?: string
    openedBirthCertifModal: boolean
    onCloseBirthCertifModal: () => void
}

const JudgmentCertificate: React.FC<JudgmentCertificateProps> = ({
    printRef,
    form,
    currentUser,
    registryNumber,
    registryStoredTime,
    registryDate,
    openedBirthCertifModal,
    onCloseBirthCertifModal,
}): JSX.Element => {
    const actualDate: string = new Date().toISOString().split('T')[0]
    const registrationDate =
        (registryDate ?? form.values.registrationDate) || actualDate
    const [registrarSignature, setRegistrarSignature] = useState(null)
    const [currentRegistrar, setCurrentRegistrar] =
        useState<Omit<UserDto, 'password'>>()

    const regiqstrationTime =
        (registryStoredTime ?? form.values.registrationTime) || '10:30'
    const [getUserByRoleAndCommuneAndEnabled] =
        useLazyGetUserByRoleAndCommuneAndEnabledQuery()

    const displaySignature = async () => {
        try {
            const registrar = await getUserByRoleAndCommuneAndEnabled({
                role: Role.REGISTRAR,
                communeId: currentUser?.commune.id ?? 210103,
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

    const handlePrintBirthCertificate = useReactToPrint({
        content: () => printRef!.current,
    })

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

    return (
        <React.Fragment>
            <Modal
                opened={openedBirthCertifModal}
                onClose={onCloseBirthCertifModal}
                title="Mombamomba ny sora-piankohanana"
                size="55rem"
            >
                <Divider sx={{ margin: 1 }} />
                <Box component={'div'} ref={printRef}>
                    <Paper variant="outlined" p="xl" sx={{ margin: 60 }}>
                        <Grid
                            gutter={5}
                            gutterXs="md"
                            gutterMd="xl"
                            gutterLg={20}
                        >
                            <Grid.Col span={3}>
                                <Stack sx={{ display: 'flex' }}>
                                    <span className="float-center">
                                        <img
                                            src={'/toamasinaLogo.png'}
                                            alt="LOGO CU TOAMASINA"
                                            width={100}
                                        />
                                    </span>
                                    <span>
                                        {' '}
                                        FIRAISANA{' '}
                                        {customizeOffice(
                                            form.values.commune?.name
                                        )}
                                    </span>
                                    ---------------
                                    <span>{'FIANKOHONANA'}</span>
                                    ---------------
                                </Stack>
                                <Stack>
                                    <div>
                                        <br />
                                        laharana :{' '}
                                        <b>
                                            {registryNumber ??
                                                form.values?.registrationNumber}
                                        </b>{' '}
                                        <br />
                                        {registrationDate &&
                                            moment(
                                                registrationDate ||
                                                    form.values
                                                        ?.registrationDate
                                            ).format('DD/MM/YYYY')}
                                        <br />
                                    </div>
                                    <div>
                                        <br />
                                        <br />
                                        <h4>
                                            {' '}
                                            Fandikana didim-pitsarana misolo
                                            sora-pahaterahan'i{' '}
                                        </h4>
                                        <b>
                                            {form.values.applicant?.fullName}{' '}
                                            {''}
                                            {
                                                form.values.applicant
                                                    ?.fullLastName
                                            }
                                        </b>{' '}
                                        <br />
                                        NUI:
                                        <b>{form.values.applicant?.nui}</b>{' '}
                                        <br />
                                        Teraka tamin'ny <br />
                                        <b>
                                            {' '}
                                            {form?.values?.applicant?.birthDate
                                                ?.toString()
                                                .includes('vers')
                                                ? form?.values?.applicant
                                                      ?.birthDate
                                                : moment(
                                                      form.values.applicant
                                                          ?.birthDate
                                                  ).format('DD/MM/YYYY')}{' '}
                                        </b>{' '}
                                        <br />
                                    </div>
                                </Stack>
                            </Grid.Col>
                            <Grid.Col span={9}>
                                <Box sx={{ pl: 4, pr: 4 }}>
                                    <Stack>
                                        <Text
                                            variant="h6"
                                            sx={{
                                                textTransform: 'uppercase',
                                                textAlign: 'center',
                                            }}
                                        >
                                            Kopian'ny Sora-piakohonana
                                        </Text>
                                    </Stack>
                                    <br />
                                    <Stack>
                                        <div style={{ textAlign: 'justify' }}>
                                            Araka ny ventin'ny didim-pitsarana
                                            mitety vohitra laharana faha{' '}
                                            {setNumberToLetterForMalagasySpecificLanguage(
                                                Number(
                                                    form.values.grosse
                                                        ?.identityNumber
                                                )
                                            )}{' '}
                                            izay navoakan'ny Fitsarana
                                            Ambaratonga Voalohany eto amin'ny
                                            Firaisana{' '}
                                            {customizeOffice(
                                                form.values.commune?.name
                                            )}{' '}
                                            voarainay androany{' '}
                                            {setDateCustomString(actualDate)}{' '}
                                            tamin'ny{' '}
                                            {setTimeToCustomString(
                                                new Date()
                                                    .toISOString()
                                                    .split('T')[1]
                                                    .split('.')[0]
                                            )}
                                            .
                                        </div>
                                        <div style={{ textAlign: 'justify' }}>
                                            Ny fitsarana mitety vohitra eto{' '}
                                            {form.values?.province?.name
                                                .toString()
                                                .toLowerCase()}{' '}
                                            dia mamoaka izao didy manaraka izao:
                                        </div>
                                        <b>
                                            <span
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                NOHO IREO ANTONY IREO
                                            </span>
                                        </b>
                                        <div style={{ textAlign: 'justify' }}>
                                            Dia ambaraina fa teraka tao{' '}
                                            {customizeOffice(
                                                form.values?.commune?.name
                                            )}
                                            , Distrika{' '}
                                            {customizeOffice(
                                                form.values?.district?.name
                                            )}{' '}
                                            tamin'ny{' '}
                                            <span>
                                                {' '}
                                                {form?.values?.applicant?.birthDate
                                                    ?.toString()
                                                    .includes('vers')
                                                    ? 'taona ' +
                                                      setNumberToLetterForMalagasySpecificLanguageV2(
                                                          Number(
                                                              form?.values?.applicant?.birthDate
                                                                  ?.toString()
                                                                  .split(
                                                                      'vers'
                                                                  )[1]
                                                                  .trim()
                                                          )
                                                      )
                                                    : setDateCustomString(
                                                          moment(
                                                              form.values
                                                                  .applicant
                                                                  .birthDate
                                                          ).format('YYYY-MM-DD')
                                                      )}{' '}
                                            </span>{' '}
                                            , i{' '}
                                            <span>
                                                {' '}
                                                {
                                                    form.values.applicant
                                                        ?.fullName
                                                }{' '}
                                                {
                                                    form.values.applicant
                                                        ?.fullLastName
                                                }{' '}
                                            </span>
                                            {form.values.applicant?.gender ===
                                            Gender.MALE
                                                ? 'zazalahy'
                                                : 'zazavavy'}{' '}
                                            zanak'i {''}
                                            {(form.values?.father?.fullName ||
                                                form.values?.father?.numCIN.toString()) && (
                                                <>
                                                    {
                                                        form.values.father
                                                            ?.fullName
                                                    }{' '}
                                                    {
                                                        form.values.father
                                                            ?.fullLastName
                                                    }{' '}
                                                    teraka tamin'ny{' '}
                                                    {setDateCustomString(
                                                        moment(
                                                            form.values.father
                                                                .birthDate
                                                        ).format('YYYY-MM-DD')
                                                    )}
                                                    , tao{' '}
                                                    {
                                                        form.values.father
                                                            .birthPlace
                                                    }{' '}
                                                    sy{' '}
                                                </>
                                            )}
                                            {form.values.mother?.fullName}{' '}
                                            {form.values.mother?.fullLastName}{' '}
                                            teraka tamin'ny{''}{' '}
                                            {setDateCustomString(
                                                moment(
                                                    form.values.mother
                                                        ?.birthDate
                                                ).format('YYYY-MM-DD')
                                            )}
                                            , tao{' '}
                                            {form.values.mother?.birthPlace},
                                            monina ao amin'ny{' '}
                                            {form.values.mother?.address}.
                                        </div>
                                        <div style={{ textAlign: 'justify' }}>
                                            Didianay ny handikana ny ventin'izao
                                            ao amin'ny bokim-pahaterahana ao
                                            amin'ny{' '}
                                            {customizeOffice(
                                                form.values?.commune?.name
                                            )}{' '}
                                            amin'ny taona diavina.
                                        </div>
                                        <div style={{ textAlign: 'justify' }}>
                                            Natao androany{' '}
                                            {registrationDate &&
                                                setDateCustomString(
                                                    registrationDate ||
                                                        form.values
                                                            .registrationDate
                                                )}{' '}
                                            tamin'ny{' '}
                                            {regiqstrationTime &&
                                                setTimeToCustomString(
                                                    regiqstrationTime ||
                                                        form.values
                                                            .registrationTime
                                                )}
                                            .
                                        </div>
                                        <div style={{ textAlign: 'justify' }}>
                                            Fandikana nataonay{' '}
                                            {currentRegistrar?.firstName}{' '}
                                            {currentRegistrar?.lastName} ,{' '}
                                            Mpiandraikitra ny fiankohonana,{' '}
                                            androany{' '}
                                            {setDateCustomString(actualDate)} .
                                        </div>
                                        =============== MANARAKA NY SONIA
                                        ============
                                        <div style={{ textAlign: 'justify' }}>
                                            Kokipa manontolo nadika androany
                                            tamin'ny boky androany{' '}
                                            {setDateCustomString(actualDate)}.
                                        </div>
                                        <div style={{ marginLeft: 100 }}>
                                            Ny mpiandraikitra ny
                                            sora-piankohonana
                                        </div>
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
                                            {currentRegistrar?.firstName?.toUpperCase()}{' '}
                                            {currentRegistrar?.lastName}
                                        </div>
                                    </Stack>
                                </Box>
                            </Grid.Col>
                        </Grid>
                    </Paper>
                </Box>
                <Group position="right" mt="xl">
                    <Button
                        variant="outline"
                        onClick={onCloseBirthCertifModal}
                        size="lg"
                    >
                        Akatona
                    </Button>
                    <Button
                        leftIcon={<IconPrinter />}
                        variant="filled"
                        onClick={handlePrintBirthCertificate}
                        size="lg"
                    >
                        Hanatonta
                    </Button>
                </Group>
            </Modal>
        </React.Fragment>
    )
}

JudgmentCertificate.displayName = 'JudgmentCertificate component'

export default JudgmentCertificate
