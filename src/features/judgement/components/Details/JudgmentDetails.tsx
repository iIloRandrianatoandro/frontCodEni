import { FormikProps } from 'formik'
import React, { useEffect, useState } from 'react'
import { ApplicantDetails } from './ApplicantDetails'
import { Role, UserDto } from '@/features/admin/types'
import { CitizenForm } from '@/features/judgement/components/Form'
import { JudgmentRequestDto } from '@/features/judgement/state/types'
import { Button, Flex, Grid, Group, Modal, Paper, Title } from '@mantine/core'
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom'
import { useLazyProfileQuery } from '@/features/authentication/authenticationApi'
import {
    IconGavel,
    IconPrinter,
    IconReportMedical,
    IconSearch,
} from '@tabler/icons-react'
import { AttachmentDetails } from '@/features/judgement/components/Details/AttachmentDetails'
import { JudgmentCertificateForm } from '@/features/judgement/components/Details/JudgmentCertificate/components/JudgmentCertificateForm'
import { JudgmentCertificate } from './JudgmentCertificate'
import { generateUUIDKey } from '../../utils'
import { Judgement } from '@/routes'
import { useDisclosure } from '@mantine/hooks'
import { ConfirmOrNotJudgmentProcuration } from './Procuration'

type FormData = {
    name: string
    title: string
}
interface FormProps {
    parentFormData?: FormData[]
    witnessFormData?: FormData[]
    judgmentData?: JudgmentRequestDto
    form?: FormikProps<JudgmentRequestDto>
    disabled?: boolean
}

interface JudgmentRequestDtoProps {
    judgment: JudgmentRequestDto
}

const HandleConfirmProcuration: React.FC<JudgmentRequestDtoProps> = ({
    judgment,
}): JSX.Element => {
    const [opened, { open, close }] = useDisclosure(false)
    return (
        <>
            <Button
                leftIcon={<IconGavel />}
                onClick={open}
                size="md"
                display={'flex'}
                sx={{ justifyContent: 'flex-end', padding: 5 }}
            >
                Manaraka
            </Button>
            <Modal
                opened={opened}
                onClose={close}
                closeOnClickOutside={true}
                centered
                size="lg"
                title="Hevitry ny fampanoavana"
            >
                <ConfirmOrNotJudgmentProcuration
                    onClose={close}
                    judgment={judgment}
                ></ConfirmOrNotJudgmentProcuration>
            </Modal>
        </>
    )
}

const JudgmentDetails: React.FC<FormProps> = ({
    parentFormData,
    witnessFormData,
    judgmentData,
    form,
    disabled = true,
}): JSX.Element => {
    const printRef: React.RefObject<HTMLDivElement> =
        React.useRef<HTMLDivElement>(null)

    const { judgementRequestId } = useParams()

    const currentJudgmentRequestId =
        judgementRequestId || judgmentData?.id?.toString() || '0'

    const [openBirthCertificateModal, setOpenBirthCertificateModal] =
        useState(false)

    const onOpenBirthCertificateModal = () => {
        setOpenBirthCertificateModal(true)
    }
    const onCloseBirthCertificateModal = () => {
        setOpenBirthCertificateModal(false)
    }

    const navigate: NavigateFunction = useNavigate()
    const goToLaunchJudgmentPage = () => {
        navigate(`/judgement/launch/${currentJudgmentRequestId}`)
    }
    const goToSomaticExaminationPage = () => {
        navigate(`/judgement/examinate/${currentJudgmentRequestId}`)
    }
    const goToFruitlessSearchPage = () => {
        navigate(`/judgement/fruitlessSearch/${currentJudgmentRequestId}`)
    }
    const goToJudgmentPage = async () => {
        const judgmentPageUrl: string = '/judgement'
        navigate(judgmentPageUrl, { replace: true })
    }

    const [user, setUser] = useState<UserDto>()
    const [profile] = useLazyProfileQuery()
    useEffect(() => {
        const fetchCurrentUser = async () => {
            const currentUser: UserDto = await profile(null).unwrap()
            setUser(currentUser)
        }
        fetchCurrentUser()
    }, [])

    return (
        <React.Fragment>
            <Flex mb="xl" align="center" justify="space-between">
                <Title order={3}>
                    Momba ny fangatahana:{' '}
                    {judgmentData
                        ? judgmentData?.applicant?.fullName +
                          ' ' +
                          judgmentData?.applicant?.fullLastName
                        : ''}
                </Title>
                {user?.role.toString() === Role.SEC &&
                    judgmentData?.applicant &&
                    judgmentData.progression &&
                    judgmentData.progression.step.toLowerCase() === 'tpi' &&
                    judgmentData.progression.state.toLowerCase() === 'done' &&
                    judgmentData.grosse &&
                    judgmentData.somaticExam &&
                    judgmentData.unsuccessfulSearch && (
                        <Button
                            leftIcon={<IconPrinter />}
                            onClick={() => {
                                onOpenBirthCertificateModal()
                            }}
                            size="lg"
                        >
                            Hanonta kopia
                        </Button>
                    )}
            </Flex>

            <Paper p="xl" withBorder mb="xl" className="judgment-detail-view">
                <Title order={3} mb="xl">
                    Mahakasika ny olona hanaovana fangatahana
                </Title>
                <ApplicantDetails
                    disabled={disabled}
                    formId={'detailsForm_applicant'}
                    judgmentData={judgmentData}
                />
            </Paper>

            <Paper p="xl" withBorder mb="xl" className="judgment-detail-view">
                <Title order={3} mb="xl">
                    Mahakasika ny ray aman-dreny
                </Title>
                <Grid gutter={4} gutterXs="sm" gutterMd="md" gutterSm={30}>
                    {parentFormData?.map((parentForm, index) => {
                        if (
                            parentForm.name === 'father' &&
                            judgmentData?.father?.fullName === ''
                        )
                            return
                        return (
                            <CitizenForm
                                disabled={disabled}
                                citizen={parentForm.name}
                                form={form!}
                                title={parentForm.title}
                                key={`${parentForm.name}-${generateUUIDKey()}`}
                                judgmentDetail={judgmentData}
                            />
                        )
                    })}
                </Grid>
            </Paper>

            {judgmentData?.firstWitness !== null &&
                judgmentData?.secondWitness !== null && (
                    <Paper
                        p="xl"
                        withBorder
                        mb="xl"
                        className="judgment-detail-view"
                        style={{
                            display:
                                judgmentData?.firstWitness !== null &&
                                judgmentData?.secondWitness !== null
                                    ? 'block'
                                    : 'none',
                        }}
                    >
                        <Title order={3} mb="xl">
                            Mahakasika ny vavolombelona
                        </Title>
                        <Grid
                            gutter={4}
                            gutterXs="sm"
                            gutterMd="md"
                            gutterSm={30}
                        >
                            {witnessFormData?.map((witnessForm, index) => {
                                return (
                                    <CitizenForm
                                        disabled={disabled}
                                        citizen={witnessForm.name}
                                        form={form!}
                                        title={witnessForm.title}
                                        key={`${
                                            witnessForm.name
                                        }-${generateUUIDKey()}`}
                                        judgmentDetail={judgmentData}
                                    />
                                )
                            })}
                        </Grid>
                    </Paper>
                )}

            {judgmentData?.attachedFiles &&
                judgmentData?.attachedFiles.length > 0 && (
                    <Paper p="xl" withBorder>
                        <Title order={3} mb="xl">
                            Taratasy fanamarinana
                        </Title>
                        <AttachmentDetails
                            judgementRequestId={currentJudgmentRequestId}
                        />
                    </Paper>
                )}

            <Group position="right" mt="xl">
                <Button
                    onClick={goToJudgmentPage}
                    size="lg"
                    display={'flex'}
                    variant={'outline'}
                >
                    Hiverina
                </Button>
                {user?.role.toString() === Role.DOCTOR &&
                    judgmentData?.unsuccessfulSearch?.id &&
                    judgmentData?.unsuccessfulSearch?.id > 0 &&
                    currentJudgmentRequestId &&
                    currentJudgmentRequestId.length > 0 &&
                    judgmentData?.progression?.step &&
                    ['commune'].includes(
                        judgmentData?.progression?.step?.toLowerCase()
                    ) &&
                    !judgmentData?.somaticExam && (
                        <Button
                            leftIcon={<IconReportMedical />}
                            onClick={goToSomaticExaminationPage}
                            size="lg"
                            display={'flex'}
                            sx={{ justifyContent: 'flex-end', padding: 5 }}
                            style={{
                                visibility:
                                    currentJudgmentRequestId &&
                                    currentJudgmentRequestId.length > 0 &&
                                    judgmentData?.progression?.step &&
                                    ['commune'].includes(
                                        judgmentData?.progression?.step?.toLowerCase()
                                    ) &&
                                    !judgmentData?.somaticExam
                                        ? 'visible'
                                        : 'hidden',
                            }}
                        >
                            Hanao fitsirihana
                        </Button>
                    )}
                {user?.role.toString() === Role.SEC &&
                    !judgmentData?.unsuccessfulSearch && (
                        <Button
                            leftIcon={<IconSearch />}
                            onClick={goToFruitlessSearchPage}
                            size="lg"
                            display={'flex'}
                            sx={{ justifyContent: 'flex-end', padding: 5 }}
                        >
                            Valim-pikarohana
                        </Button>
                    )}
                {user?.role.toString() === Role.COURT_CLERK &&
                    currentJudgmentRequestId &&
                    currentJudgmentRequestId.length > 0 &&
                    !judgmentData?.grosse && (
                        <Button
                            leftIcon={<IconGavel />}
                            onClick={goToLaunchJudgmentPage}
                            size="lg"
                            display={'flex'}
                            sx={{ justifyContent: 'flex-end', padding: 5 }}
                            style={{
                                visibility:
                                    currentJudgmentRequestId &&
                                    currentJudgmentRequestId.length > 0 &&
                                    !judgmentData?.grosse
                                        ? 'visible'
                                        : 'hidden',
                            }}
                        >
                            Hanao fitsarana
                        </Button>
                    )}
                {user?.role.toString() === Role.PROSECUTOR &&
                    judgmentData?.prosecution === null && (
                        <HandleConfirmProcuration judgment={judgmentData!} />
                    )}
            </Group>

            {judgmentData?.registrationDate !== null &&
            judgmentData?.registrationNumber !== null &&
            judgmentData?.registrationTime !== null ? (
                <JudgmentCertificate
                    form={form!}
                    printRef={printRef}
                    currentUser={user!}
                    registryNumber={judgmentData?.registrationNumber}
                    registryStoredDate={null}
                    registryStoredTime={judgmentData?.registrationTime}
                    registryDate={judgmentData?.registrationDate}
                    openedBirthCertifModal={openBirthCertificateModal}
                    onCloseBirthCertifModal={onCloseBirthCertificateModal}
                />
            ) : (
                <JudgmentCertificateForm
                    form={form!}
                    printRef={printRef}
                    currentUser={user!}
                    openedBirthCertifModal={openBirthCertificateModal}
                    onCloseBirthCertifModal={onCloseBirthCertificateModal}
                />
            )}
        </React.Fragment>
    )
}

JudgmentDetails.displayName = 'JudgmentDetails feature'

export default JudgmentDetails
