import {
    ActionIcon,
    Box,
    Divider,
    Grid,
    Modal,
    Paper,
    Stack,
    Text,
    TextInput,
    Group,
    Button,
} from '@mantine/core'
import { FormikProps } from 'formik'
import React, { useRef, useState } from 'react'
import { IconClock } from '@tabler/icons-react'
import { UserDto } from '@/features/admin/types'
import { IconPrinter } from '@tabler/icons-react'
import { DateInput, TimeInput } from '@mantine/dates'
import {
    JudgmentRequestDto,
    SuppletiveRegistrationDto,
} from '@/features/judgement/state/types'
import { JudgmentCertificate } from '@/features/judgement/components/Details/JudgmentCertificate'
import { useLazyUpdateJudgmentRegistrationRequestQuery } from '@/features/judgement/judgementApi'
import { useParams } from 'react-router-dom'

interface JudgmentCertificateFormProps {
    printRef?: React.RefObject<HTMLDivElement>
    form: FormikProps<JudgmentRequestDto>
    currentUser?: UserDto
    openedBirthCertifModal: boolean
    onCloseBirthCertifModal: () => void
}

const JudgmentCertificateForm: React.FC<JudgmentCertificateFormProps> = ({
    printRef,
    form,
    currentUser,
    openedBirthCertifModal,
    onCloseBirthCertifModal,
}): JSX.Element => {
    const { judgementRequestId } = useParams()
    const [updateJudgmentRegistrationRequest] =
        useLazyUpdateJudgmentRegistrationRequestQuery()

    const [registryNumber, setRegistryNumber] = useState('')
    const [registryStoredDate, setRegistryStoredDate] = useState<Date | null>(
        null
    )
    const [registryStoredTime, setRegistryStoredTime] = useState('')
    const registryDate: string =
        registryStoredDate?.toISOString().split('T')[0]?.split('-')[0] +
        '-' +
        registryStoredDate?.toISOString().split('T')[0]?.split('-')[1] +
        '-' +
        String(
            Number(
                registryStoredDate?.toISOString().split('T')[0]?.split('-')[2]
            ) + 1
        ).padStart(2, '0')
    const ref = useRef<HTMLInputElement>(null)
    const [openBirthCertificateModal, setOpenBirthCertificateModal] =
        useState(false)

    const handleGoToBirthCertificateModal = async () => {
        const suppletiveRegistrationDto: SuppletiveRegistrationDto = {
            suppletiveRegistrationDto: {
                registrationNumber: registryNumber,
                registrationDate: registryDate,
                registrationTime: registryStoredTime,
            },
            judgmentRequestId: parseInt(judgementRequestId || '1'),
        }

        await updateJudgmentRegistrationRequest(
                suppletiveRegistrationDto
            ).unwrap()
        setOpenBirthCertificateModal(true)
    }
    const handleCloseToBirthCertificateModal = () => {
        setOpenBirthCertificateModal(false)
    }

    return (
        <React.Fragment>
            <Modal
                opened={openedBirthCertifModal}
                onClose={handleCloseToBirthCertificateModal}
                title="Ireo tsara ho fantatra mialoha ny fanontana kopia"
                size="30rem"
            >
                <Divider sx={{ margin: 1 }} />
                <Box component={'div'} ref={printRef}>
                    <Paper variant="outlined" p="md" sx={{ marginTop: 60 }}>
                        <Grid
                            gutter={5}
                            gutterXs="md"
                            gutterMd="md"
                            gutterLg={20}
                        >
                            <Grid.Col span={12}>
                                <Stack>
                                    <Text
                                        variant="h6"
                                        sx={{
                                            textTransform: 'uppercase',
                                            textAlign: 'center',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        Hanonta Kopia
                                    </Text>
                                    <br />
                                    <br />
                                    <TextInput
                                        id={`registryNumber`}
                                        name={`registryNumber`}
                                        placeholder="002439"
                                        value={registryNumber}
                                        onChange={(event) =>
                                            setRegistryNumber(
                                                event.currentTarget.value
                                            )
                                        }
                                        label="Laharana nandraiketana ny kopia ao anaty rejistra"
                                        type={'number'}
                                        max={999999}
                                        maxLength={999999}
                                    />
                                </Stack>
                            </Grid.Col>
                        </Grid>
                        <br />
                        <Grid
                            gutter={5}
                            gutterXs="md"
                            gutterMd="md"
                            gutterLg={20}
                        >
                            <Grid.Col span={6}>
                                <DateInput
                                    id={`registryStoredDate`}
                                    name={`registryStoredDate`}
                                    variant="default"
                                    size="sm"
                                    clearable
                                    required={false}
                                    withAsterisk={false}
                                    valueFormat="DD/MM/YYYY"
                                    placeholder="02/03/2023"
                                    label="Daty nandraiketana ny kopia"
                                    onBlur={form.handleBlur(
                                        `registryStoredDate`
                                    )}
                                    value={registryStoredDate}
                                    onChange={setRegistryStoredDate}
                                />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <TimeInput
                                    id={`registryStoredHour`}
                                    name={`registryStoredHour`}
                                    label="Ora nandraiketana ny kopia"
                                    ref={ref}
                                    value={registryStoredTime}
                                    onChange={(event) =>
                                        setRegistryStoredTime(
                                            event.currentTarget.value
                                        )
                                    }
                                    rightSection={
                                        <ActionIcon
                                            onClick={() =>
                                                ref.current &&
                                                ref.current.showPicker()
                                            }
                                        >
                                            <IconClock
                                                size="1rem"
                                                stroke={1.5}
                                            />
                                        </ActionIcon>
                                    }
                                    maw={400}
                                    mx="auto"
                                />
                            </Grid.Col>
                        </Grid>
                    </Paper>
                </Box>
                <Group position="right">
                    <Button
                        variant="outline"
                        onClick={onCloseBirthCertifModal}
                        size="lg"
                    >
                        Hiala
                    </Button>
                    <Button
                        leftIcon={<IconPrinter />}
                        variant="filled"
                        onClick={handleGoToBirthCertificateModal}
                        size="lg"
                    >
                        Atonta
                    </Button>
                </Group>
            </Modal>

            <JudgmentCertificate
                form={form!}
                printRef={printRef}
                currentUser={currentUser!}
                registryNumber={registryNumber}
                registryStoredDate={registryStoredDate}
                registryStoredTime={registryStoredTime}
                registryDate={registryDate}
                openedBirthCertifModal={openBirthCertificateModal}
                onCloseBirthCertifModal={handleCloseToBirthCertificateModal}
            />
        </React.Fragment>
    )
}
JudgmentCertificateForm.displayName = 'JudgmentCertificateForm component'

export default JudgmentCertificateForm
