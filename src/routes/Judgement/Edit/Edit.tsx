import React, { useEffect, useRef, useState } from 'react'
import { useTypedSelector } from '@/store'
import { Form, Formik, FormikProps } from 'formik'
import { Button, Group, Modal, Stepper, Title } from '@mantine/core'
import {
    CitizenDto,
    JudgmentRequestDto,
    MaritalStatus,
    Requester,
    applicationValidationSchema,
    appliquantValidationSchema,
    attachementValidationSchema,
    parentValidationSchema,
    validationValidationSchema,
    witnessValidationSchema,
} from '@/features/judgement/state/types'
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom'
import { useDisclosure } from '@mantine/hooks'
import { Role, UserDto } from '@/features/admin/types'
import { ApplicationForm } from '../Create/components/applicationForm'
import { ApplicantForm } from '../Create/components'
import { ApplicantsParentForm } from '../Create/components/applicantsParentForm'
import { WitnessForm } from '../Create/components/witnessForm'
import { AttachmentForm } from '../Create/components/attachmentForm'
import { ConfirmationForm } from '../Create/components/confirmationForm'
import { useLazyGetJudgmentByIdQuery } from '@/features/judgement/judgementApi'
import { handleCitizenBirthDate } from '@/features/judgement/utils'

const Edit: React.FC = (): JSX.Element => {
    const witnessFormData = [
        {
            name: 'firstWitness',
            title: 'Vavolombelona voalohany',
            knownBirthDate: 'knownFirstWitnessBirthDate',
        },
        {
            name: 'secondWitness',
            title: 'Vavolombelona faharoa',
            knownBirthDate: 'knownSecondWitnessBirthDate',
        },
    ]
    const applicantParentFormData = [
        {
            name: 'father',
            title: 'Ray',
            knownBirthDate: 'knownApplicantFatherBirthDate',
        },
        {
            name: 'mother',
            title: 'Reny',
            knownBirthDate: 'knownApplicantMotherBirthDate',
        },
    ]

    const [maritalStatusValue, setMaritalStatusValue] =
        useState<MaritalStatus | null>(MaritalStatus.SINGLE)

    const [typeRequesterValue, setTypeRequesterValue] =
        useState<Requester | null>(Requester.FATHER)

    const setRawMaritalStatus = (maritalStatus: MaritalStatus | null) => {
        setMaritalStatusValue(maritalStatus)
    }

    const setRawTypeRequester = (typeRequester: Requester | null) => {
        setTypeRequesterValue(typeRequester)
    }

    const [knownApplicantBirthDate, setKnownApplicantBirthDate] =
        useState('true')
    const [knownCitizenBirthDate, setKnownCitizenBirthDate] = useState<
        string[]
    >([])

    const setRawKnownCitizenBirthDate = (rawKnownBirthDate: string) => {
        if (knownCitizenBirthDate.includes(rawKnownBirthDate)) {
            return
        }

        setKnownCitizenBirthDate((prevState) => {
            return [...prevState, rawKnownBirthDate]
        })
    }

    const setRawKnownApplicantBirthDate = (
        rawKnownApplicantBirthDate: string
    ) => {
        setKnownApplicantBirthDate(rawKnownApplicantBirthDate)
    }

    const { judgement } = useTypedSelector((state) => state.judgement)
    const [active, setActive] = useState(0)
    const [isNextBtnDisplayed, displayNextBtn] = useState(true)
    const [isPrevBtnDisplayed, displayPrevBtn] = useState(false)
    const [opened, { open, close }] = useDisclosure(false)
    const navigate: NavigateFunction = useNavigate()

    const { accessToken, currentUser } = useTypedSelector(
        (state) => state.authentication
    )

    const { judgmentRequestId } = useParams()
    const [getJudgmentById] = useLazyGetJudgmentByIdQuery()
    const [judgmentRequestDetail, setJudgmentRequestDetail] =
        useState<JudgmentRequestDto>(judgement)

    const nextStep = async (props: FormikProps<JudgmentRequestDto>) => {
        props.validateForm().then(() => {
            if (props.isValid) {
                setActive((current) => {
                    displayPrevBtn(true)
                    if (
                        current >= 4 ||
                        (currentUser?.role === Role.COMMUNITY_AGENT &&
                            current >= 2)
                    ) {
                        displayNextBtn(false)
                        open()
                    }
                    return current < 5 ? current + 1 : current
                })
                props.setTouched({}, true)
            } else {
                console.log(JSON.stringify(props.errors))
            }
        })
    }

    const prevStep = () => {
        setActive((current) => {
            displayNextBtn(true)
            if (current < 0) {
                displayPrevBtn(false)
            }

            return current > 0 ? current - 1 : current
        })
    }

    const handleSubmit = (values: JudgmentRequestDto) => {
        console.log(JSON.stringify(values, null, 2))
    }

    const schemaArray = [
        applicationValidationSchema(Role.COMMUNITY_AGENT),
        appliquantValidationSchema(Role.COMMUNITY_AGENT),
        parentValidationSchema(Role.COMMUNITY_AGENT),
        witnessValidationSchema,
        attachementValidationSchema,
        validationValidationSchema,
    ]

    const [isInitialValid, setIsInitialValid] = useState(false)

    useEffect(() => {
        const fetchJudgmentRequestDetail = async () => {
            const judgmentRequest = await getJudgmentById(
                judgmentRequestId ?? '1'
            ).unwrap()

            const judgmentRequestCopy: JudgmentRequestDto = {
                ...Object.freeze(judgmentRequest),
            }

            const applicant: CitizenDto = {
                ...{
                    unspecifiedBirthDate: '',
                    knownBirthDate: '',
                },
                ...judgmentRequestCopy.applicant,
            }

            handleCitizenBirthDate(applicant)
            judgmentRequestCopy.applicant = applicant
            const mother: CitizenDto = {
                ...{
                    unspecifiedBirthDate: '',
                    knownBirthDate: '',
                },
                ...judgmentRequestCopy.mother,
            }
            handleCitizenBirthDate(mother)
            judgmentRequestCopy.mother = mother

            if (currentUser?.role !== Role.COMMUNITY_AGENT) {
                if (judgmentRequest.firstWitness === null)
                    judgmentRequestCopy.firstWitness = judgement.firstWitness
                else {
                    const firstWitness: CitizenDto = {
                        ...{
                            unspecifiedBirthDate: '',
                            knownBirthDate: '',
                        },
                        ...judgmentRequestCopy.mother,
                    }

                    handleCitizenBirthDate(firstWitness)
                    judgmentRequestCopy.firstWitness = firstWitness
                }

                if (judgmentRequest.secondWitness === null)
                    judgmentRequestCopy.secondWitness = judgement.secondWitness
                else {
                    const secondWitness: CitizenDto = {
                        ...{
                            unspecifiedBirthDate: '',
                            knownBirthDate: '',
                        },
                        ...judgmentRequestCopy.secondWitness,
                    }

                    handleCitizenBirthDate(secondWitness)
                    judgmentRequestCopy.secondWitness = secondWitness
                }

                if (
                    judgmentRequest.attachedFiles === null ||
                    judgmentRequest.attachedFiles.length === 0
                )
                    judgmentRequestCopy.attachedFiles = judgement.attachedFiles
            }

            if (judgmentRequest.requester === null)
                judgmentRequestCopy.requester = judgement.requester

            if (judgmentRequest.father === null)
                judgmentRequestCopy.father = judgement.father
            else {
                const father: CitizenDto = {
                    ...{
                        unspecifiedBirthDate: '',
                        knownBirthDate: '',
                    },
                    ...judgmentRequestCopy.father,
                }

                handleCitizenBirthDate(father)
                judgmentRequestCopy.father = father
            }

            setJudgmentRequestDetail(judgmentRequestCopy)

            schemaArray[active]
                .validate(judgmentRequestCopy)
                .then(() => setIsInitialValid(true))
                .catch(() => setIsInitialValid(false))
        }

        fetchJudgmentRequestDetail()
    }, [active, isInitialValid])

    return (
        <>
            <Title mb="xl">Hanova ny fangatahana</Title>
            <Formik
                initialValues={judgmentRequestDetail}
                onSubmit={handleSubmit}
                validationSchema={schemaArray[active]}
                isInitialValid={isInitialValid}
                enableReinitialize
            >
                {(props) => (
                    <Form>
                        <Stepper
                            active={active}
                            onStepClick={setActive}
                            breakpoint="sm"
                        >
                            <Stepper.Step
                                label="Mpanao fangatahana"
                                allowStepClick={false}
                                allowStepSelect={false}
                                mb="xl"
                            >
                                {active == 0 && (
                                    <ApplicationForm
                                        form={props}
                                        setRawTypeRequester={
                                            setRawTypeRequester
                                        }
                                    />
                                )}
                            </Stepper.Step>

                            <Stepper.Step
                                label="Ilay hanaovana fangatahana"
                                allowStepClick={false}
                                allowStepSelect={false}
                                mb="xl"
                            >
                                {active == 1 && (
                                    <ApplicantForm
                                        form={props}
                                        setRawKnownApplicantBirthDate={
                                            setRawKnownApplicantBirthDate
                                        }
                                    />
                                )}
                            </Stepper.Step>

                            <Stepper.Step
                                label="Ray aman-dreny"
                                allowStepClick={false}
                                allowStepSelect={false}
                                mb="xl"
                            >
                                {active == 2 && (
                                    <ApplicantsParentForm
                                        parentFormData={applicantParentFormData}
                                        form={props}
                                        setRawKnownCitizenBirthDate={
                                            setRawKnownCitizenBirthDate
                                        }
                                        setRawMaritalStatus={
                                            setRawMaritalStatus
                                        }
                                    />
                                )}
                            </Stepper.Step>

                            {currentUser?.role !== Role.COMMUNITY_AGENT && (
                                <Stepper.Step
                                    label="Vavolombelona"
                                    allowStepClick={false}
                                    allowStepSelect={false}
                                    mb="xl"
                                >
                                    {active == 3 && (
                                        <WitnessForm
                                            witnessFormData={witnessFormData}
                                            form={props}
                                            setRawKnownCitizenBirthDate={
                                                setRawKnownCitizenBirthDate
                                            }
                                        />
                                    )}
                                </Stepper.Step>
                            )}

                            {currentUser?.role !== Role.COMMUNITY_AGENT && (
                                <Stepper.Step
                                    label="Fanampin-taratasy"
                                    allowStepClick={false}
                                    allowStepSelect={false}
                                    mb="xl"
                                >
                                    {active == 4 && (
                                        <AttachmentForm form={props} />
                                    )}
                                </Stepper.Step>
                            )}

                            <Stepper.Completed>
                                <Modal
                                    opened={opened}
                                    onClose={close}
                                    closeOnClickOutside={true}
                                    centered
                                    size="lg"
                                >
                                    <ConfirmationForm
                                        navigate={navigate}
                                        onClose={close}
                                        form={props}
                                        rawTypeRequester={typeRequesterValue}
                                        rawMaritalStatus={maritalStatusValue}
                                        knownBirthDate={{
                                            knownApplicantBirthDate:
                                                knownApplicantBirthDate,
                                            knownCitizenBirthDate:
                                                knownCitizenBirthDate,
                                        }}
                                        currentUser={currentUser as UserDto}
                                    />
                                </Modal>
                            </Stepper.Completed>
                        </Stepper>

                        <Group position="right" mt="xl">
                            {isPrevBtnDisplayed && (
                                <Button
                                    variant="outline"
                                    size="lg"
                                    onClick={() => prevStep()}
                                >
                                    Hiverina
                                </Button>
                            )}
                            {isNextBtnDisplayed && (
                                <Button
                                    variant="filled"
                                    size="lg"
                                    disabled={
                                        active != 4 &&
                                        Object.keys(props.errors).length > 0
                                    }
                                    onClick={() => nextStep(props)}
                                >
                                    Manaraka
                                </Button>
                            )}
                        </Group>
                    </Form>
                )}
            </Formik>
        </>
    )
}

Edit.displayName = 'Edit judgement page'

export default Edit
