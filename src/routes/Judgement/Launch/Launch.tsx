import { useTypedSelector } from '@/store'
import { useDisclosure } from '@mantine/hooks'
import { Flex, Modal, Title, Button, Group, Stepper, Text } from '@mantine/core'
import { Form, Formik, FormikProps } from 'formik'
import React, { useEffect, useState } from 'react'
import { Judge } from '@/routes/Judgement/Launch/components/judge'
import { Grosse } from '@/routes/Judgement/Launch/components/grosse'
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom'
import {
    useDisplayUserSignatureMutation,
    useLazyGetJudgmentByIdQuery,
    useLazyUpdateCitizenNuiQuery,
    useLazyUpdateCitizenQuery,
    useLazyUpdateJudgementRequestWithGrosseQuery,
} from '@/features/judgement/judgementApi'
import { JudgmentResult } from '@/routes/Judgement/Launch/components/judgmentResult'
import {
    grosseValidationSchema,
    judgeValidationSchema,
    JudgmentRequestDto,
    ProfileUserSignatureTag,
    shouldAcceptGrosseValidationSchema,
} from '@/features/judgement/state/types'

import { generateCitizenUniqueId } from '@/features/judgement/utils'

const Launch: React.FC = (): JSX.Element => {
    const { judgement } = useTypedSelector((state) => state.judgement)
    const [active, setActive] = useState(0)
    const [isNextBtnDisplayed, displayNextBtn] = useState(true)
    const [isPrevBtnDisplayed, displayPrevBtn] = useState(false)
    const [opened, { open, close }] = useDisclosure(false)
    const navigate: NavigateFunction = useNavigate()
    const { judgementRequestId } = useParams()
    const [judgmentRequest, setJudgmentRequest] =
        useState<JudgmentRequestDto | null>(null)
    const [getJudgmentById] = useLazyGetJudgmentByIdQuery()
    const [updateJudgementRequestWithGrosse, { isLoading }] =
        useLazyUpdateJudgementRequestWithGrosseQuery()
    const [updateCitizenNui] = useLazyUpdateCitizenNuiQuery()
    const [updateCitizen] = useLazyUpdateCitizenQuery()
    const [displayUserSignature] = useDisplayUserSignatureMutation()

    const nextStep = async (props: FormikProps<JudgmentRequestDto>) => {
        props.validateForm().then(() => {
            if (props.isValid) {
                setActive((current) => {
                    displayPrevBtn(true)
                    if (current >= 2) {
                        displayNextBtn(false)
                        open()
                    }
                    return current < 3 ? current + 1 : current
                })
                props.setTouched({}, true)
            } else
                console.log('validation error: ', JSON.stringify(props.errors))
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
    const closeDialogBox = () => {
        close()
    }

    const getCheckedRadioAcceptedJudgmentElementValue = (): string => {
        const currentElements = document.getElementsByName(
            'grosse.acceptedJudgement'
        )
        let i: number = 0
        for (i = 0; i < currentElements.length; i++) {
            if ((currentElements[i] as HTMLInputElement).checked)
                return (currentElements[i] as HTMLInputElement).value
        }

        return 'false'
    }

    const goToDetailsPage = async (props: FormikProps<JudgmentRequestDto>) => {
        Object.freeze(props.values)
        const judgmentRequestObject = { ...props.values }

        try {
            judgmentRequestObject.id = parseInt(judgementRequestId ?? '0')
            judgmentRequestObject.grosse.judgmentRequestId = parseInt(
                judgementRequestId ?? '0'
            )

            if (
                props.values.applicant.knownBirthDate &&
                props.values.applicant.knownBirthDate.toString() === 'false' &&
                props.values.applicant.unspecifiedBirthDate &&
                props.values.applicant.unspecifiedBirthDate
                    ?.toLowerCase()
                    .includes('vers')
            ) {
                judgmentRequestObject.applicant.birthDate =
                    props.values.applicant.unspecifiedBirthDate
            }

            if (
                props.values.mother.knownBirthDate &&
                props.values.mother.knownBirthDate.toString() === 'false' &&
                props.values.mother.unspecifiedBirthDate &&
                props.values.mother.unspecifiedBirthDate
                    ?.toLowerCase()
                    .includes('vers')
            ) {
                judgmentRequestObject.mother.birthDate =
                    props.values.mother.unspecifiedBirthDate
            }

            if (
                props.values.father.knownBirthDate &&
                props.values.father.knownBirthDate.toString() === 'false' &&
                props.values.father.unspecifiedBirthDate &&
                props.values.father.unspecifiedBirthDate
                    ?.toLowerCase()
                    .includes('vers')
            ) {
                judgmentRequestObject.father.birthDate =
                    props.values.father.unspecifiedBirthDate
            }

            const shouldAcceptJudgement =
                getCheckedRadioAcceptedJudgmentElementValue() === 'true'

            judgmentRequestObject.grosse.acceptedJudgement =
                shouldAcceptJudgement
            judgmentRequestObject.grosse.identityNumber =
                judgmentRequest?.numDemand.toString() || '0'

            // UPDATE SOME CITIZEN DATA
            const applicantCitizen = {
                id: judgmentRequest?.applicant?.id,
                citizen: judgmentRequestObject.applicant,
            }

            await updateCitizen(applicantCitizen).unwrap()

            const fatherCitizen = {
                id: judgmentRequest?.father?.id,
                citizen: judgmentRequestObject.father,
            }

            await updateCitizen(fatherCitizen).unwrap()

            const motherCitizen = {
                id: judgmentRequest?.mother?.id,
                citizen: judgmentRequestObject.mother,
            }

            await updateCitizen(motherCitizen).unwrap()

            const requesterCitizen = {
                id: judgmentRequest?.requester?.id,
                citizen: judgmentRequestObject.requester,
            }

            await updateCitizen(requesterCitizen).unwrap()

            // END UPDATE CITIZEN HERE

            await updateJudgementRequestWithGrosse(
                judgmentRequestObject
            ).unwrap()

            if (shouldAcceptJudgement) {
                const responseNui = await generateCitizenUniqueId()

                const applicantNui = {
                    applicantId: judgmentRequest?.applicant?.id,
                    applicantNui: {
                        nui: responseNui,
                    },
                }

                await updateCitizenNui(applicantNui).unwrap()
            }

            await displayUserSignature({
                isActive: true,
                tag: shouldAcceptJudgement
                    ? ProfileUserSignatureTag.ACCEPTED_FROM_COURT_CLERK
                    : ProfileUserSignatureTag.REJECTED_FROM_COURT_CLERK,
                judgmentRequestId: parseInt(judgementRequestId ?? '0'),
            }).unwrap()

            navigate(`/judgement/details/${judgementRequestId}`, {
                replace: true,
            })
        } catch (error: any) {
            console.log('error: ' + error)
            console.log('error: ' + JSON.stringify(error))
        }
    }

    const schemaArray = [
        grosseValidationSchema,
        judgeValidationSchema,
        shouldAcceptGrosseValidationSchema,
        shouldAcceptGrosseValidationSchema,
    ]

    const [isInitialValid, setIsInitialValid] = useState(false)

    useEffect(() => {
        const fetchJudgementQuery = async () => {
            const judgementRequest = await getJudgmentById(
                judgementRequestId!
            ).unwrap()
            setJudgmentRequest(judgementRequest)
        }

        schemaArray[active]
            .validate(judgement.grosse)
            .then(() => setIsInitialValid(true))
            .catch(() => setIsInitialValid(false))

        fetchJudgementQuery()
    }, [active, isInitialValid])

    return (
        <React.Fragment>
            <Title mb="x" order={3} sx={{ paddingBottom: 20 }}>
                Fitsarana an'i: {judgmentRequest?.applicant?.fullName}{' '}
                {judgmentRequest?.applicant?.fullLastName}
            </Title>
            <Formik
                initialValues={judgement}
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
                                label="Didim-pitsarana"
                                allowStepClick={false}
                                allowStepSelect={false}
                            >
                                {active == 0 && (
                                    <Grosse
                                        judgmentData={judgmentRequest!}
                                        form={props!}
                                    />
                                )}
                            </Stepper.Step>

                            <Stepper.Step
                                label="Mpitsara"
                                allowStepClick={false}
                                allowStepSelect={false}
                                mb="xl"
                            >
                                {active == 1 && <Judge form={props!} />}
                            </Stepper.Step>

                            <Stepper.Step
                                label="Fitsarana"
                                allowStepClick={false}
                                allowStepSelect={false}
                                mb="xl"
                            >
                                {active == 2 && (
                                    <JudgmentResult
                                        judgmentData={judgmentRequest!}
                                        form={props}
                                    />
                                )}
                            </Stepper.Step>

                            <Stepper.Completed>
                                <JudgmentResult
                                    judgmentData={judgmentRequest!}
                                    form={props}
                                />
                                <Modal
                                    opened={opened}
                                    onClose={close}
                                    closeOnClickOutside={true}
                                    centered
                                    size="lg"
                                >
                                    <Title mb="xl" align="center">
                                        Fanamafisana
                                    </Title>
                                    <Text size="xl" align="center" mb="xl">
                                        Mialoha ny handefasana azy, ekenao tokoa
                                        ve fa io no fanam-pahan-kevitra farany
                                        noraisina mikasika io fitsarana io?
                                    </Text>
                                    <Flex justify="center" gap="xl">
                                        <Button
                                            variant={'outline'}
                                            onClick={() => closeDialogBox()}
                                            size="lg"
                                        >
                                            Tsia
                                        </Button>
                                        <Button
                                            variant={'filled'}
                                            onClick={() =>
                                                goToDetailsPage(props)
                                            }
                                            size="lg"
                                        >
                                            Eny
                                        </Button>
                                    </Flex>
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
                                    onClick={() => nextStep(props)}
                                    disabled={
                                        active != 0 &&
                                        Object.keys(props.errors).length > 0
                                    }
                                >
                                    Manaraka
                                </Button>
                            )}
                        </Group>
                    </Form>
                )}
            </Formik>
        </React.Fragment>
    )
}

Launch.displayName = 'Launch judgement page'

export default Launch
