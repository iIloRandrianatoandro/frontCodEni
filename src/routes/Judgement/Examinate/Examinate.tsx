import * as Yup from 'yup'
import React, { useEffect, useState } from 'react'
import { Button, Group, Title } from '@mantine/core'
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom'
import {
    useDisplayUserSignatureMutation,
    useLazyGetJudgmentByIdQuery,
    useLazyUpdateJudgementRequestWithSomanticQuery,
} from '@/features/judgement/judgementApi'
import { DoctorInfo } from '@/routes/Judgement/Examinate/Components/DoctorInfo'
import { ApplicantInfo } from '@/routes/Judgement/Examinate/Components/ApplicantInfo'
import {
    judgementDetailValidationSchema,
    JudgmentRequestDto,
    ProfileUserSignatureTag,
} from '@/features/judgement/state/types'
import { Form, Formik, FormikProps } from 'formik'
import { useTypedSelector } from '@/store'

const Examinate: React.FC = (): JSX.Element => {
    const { judgement } = useTypedSelector(
        (state: { judgement: any }) => state.judgement
    )
    const { judgementRequestId } = useParams()
    const navigate: NavigateFunction = useNavigate()
    const [getJudgmentById] = useLazyGetJudgmentByIdQuery()
    const [isInitialValid, setIsInitialValid] = useState(false)
    const [displayUserSignature] = useDisplayUserSignatureMutation()
    const [judgementRequest, setJudgementRequest] =
        useState<JudgmentRequestDto | null>(null)
    const [updateJudgementRequestWithSomantic, { isLoading }] =
        useLazyUpdateJudgementRequestWithSomanticQuery()

    useEffect(() => {
        const fetchJudgementQuery = async () => {
            const judgementRequesto = await getJudgmentById(
                judgementRequestId!
            ).unwrap()
            setJudgementRequest(judgementRequesto)

            judgementDetailValidationSchema
                .validate(judgementRequest)
                .then(() => setIsInitialValid(true))
                .catch(() => setIsInitialValid(false))
        }

        fetchJudgementQuery()
    }, [isInitialValid])

    const goToPreviousPage = async () => {
        navigate(`/judgement/details/${judgementRequestId}`, { replace: true })
    }
    const goToJudgmentPage = async (props: FormikProps<JudgmentRequestDto>) => {
        const judgementRequesCopy = { ...props.values }
        if (
            judgementRequesCopy.somaticExam.identity === undefined ||
            judgementRequesCopy.somaticExam.identity === '' ||
            judgementRequesCopy.somaticExam.identity === null)
            {
                console.log("it is void")
            }
        if (
            judgementRequesCopy.somaticExam.identity === undefined ||
            judgementRequesCopy.somaticExam.identity === '' ||
            judgementRequesCopy.somaticExam.identity === null ||
            judgementRequesCopy.somaticExam.applicantAge?.toString() ===
                undefined ||
            judgementRequesCopy.somaticExam.applicantAge?.toString() === '' ||
            judgementRequesCopy.somaticExam.applicantAge?.toString() === null
        )
            return
        judgementRequesCopy.somaticExam.judgmentRequestId = parseInt(
            judgementRequestId ?? '0'
        )

        // TODO: Handle Response Status Later
        await updateJudgementRequestWithSomantic(judgementRequesCopy).unwrap()
        await displayUserSignature({
            isActive: true,
            tag: ProfileUserSignatureTag.SOMANTIC_EXAMINATION_RESULT_CERTIFICATE,
            judgmentRequestId:
                judgementRequesCopy.somaticExam.judgmentRequestId,
        }).unwrap()

        navigate('/judgement', { replace: true })
    }

    const handleSubmit = (values: JudgmentRequestDto) => {
        console.log(JSON.stringify(values, null, 2))
    }

    const ExaminationValidationSchema = Yup.object().shape({
        somaticExam: Yup.object({
            identity: Yup.string().required('Mila fenoina ity'),
            applicantAge: Yup.string().required('Mila fenoina ity'),
        }),
    })

    return (
        <React.Fragment>
            <Formik
                initialValues={judgement}
                onSubmit={handleSubmit}
                validationSchema={ExaminationValidationSchema}
                isInitialValid={isInitialValid}
                enableReinitialize
            >
                {(props) => (
                    <Form>
                        <Title
                            order={3}
                            sx={{ paddingTop: 10, paddingBottom: 10 }}
                        >
                            Fitsirihana ara-pahasalamana
                        </Title>
                        <DoctorInfo form={props!} />

                        <Title
                            order={4}
                            sx={{ paddingTop: 10, paddingBottom: 10 }}
                        >
                            dia manamarina fa nanao fitsirihana an'i
                        </Title>
                        <ApplicantInfo
                            judgmentData={judgementRequest!}
                            form={props!}
                        />

                        <Group position="right">
                            <Button
                                onClick={goToPreviousPage}
                                size="lg"
                                display={'flex'}
                                variant={'outline'}
                            >
                                Hiala
                            </Button>
                            <Button
                                onClick={() => goToJudgmentPage(props)}
                                size="lg"
                                display={'flex'}
                            >
                                Manamarina
                            </Button>
                        </Group>
                    </Form>
                )}
            </Formik>
        </React.Fragment>
    )
}

Examinate.displayName = 'SomaticExamination Page'

export default Examinate
