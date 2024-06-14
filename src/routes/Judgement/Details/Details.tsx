import React, { useEffect, useState } from 'react'
import { Box } from '@mantine/core'
import { Formik } from 'formik'
import {
    JudgmentRequestDto,
    judgementDetailValidationSchema,
} from '@/features/judgement/state/types'
import { Form, useParams } from 'react-router-dom'
import { useLazyGetJudgmentByIdQuery } from '@/features/judgement/judgementApi'
import { JudgmentDetails } from '@/features/judgement/components/Details'

const Details: React.FC = (): JSX.Element => {
    const applicantParentFormData = [
        {
            name: 'father',
            title: 'Ray',
        },
        {
            name: 'mother',
            title: 'Reny',
        },
    ]
    const witnessFormData = [
        {
            name: 'firstWitness',
            title: 'Vavolombelona voalohany',
        },
        {
            name: 'secondWitness',
            title: 'Vavolombelona faharoa',
        },
    ]

    const handleSubmit = (values: JudgmentRequestDto) => {
        console.log(JSON.stringify(values, null, 2))
    }

    const [isInitialValid, setIsInitialValid] = useState(false)
    const { judgementRequestId } = useParams()
    const [getJudgmentById] = useLazyGetJudgmentByIdQuery()
    const [judgementRequest, setJudgementRequest] =
        useState<JudgmentRequestDto | null>(null)

    useEffect(() => {
        const fetchJudgementQuery = async () => {
            const judgementRequest = await getJudgmentById(
                judgementRequestId!
            ).unwrap()

            setJudgementRequest(judgementRequest)

            judgementDetailValidationSchema
                .validate(judgementRequest)
                .then(() => setIsInitialValid(true))
                .catch(() => setIsInitialValid(false))
        }

        fetchJudgementQuery()
    }, [])

    return (
        <React.Fragment>
            <Box>
                {judgementRequest && (
                    <Formik
                        initialValues={judgementRequest!}
                        onSubmit={handleSubmit}
                        validationSchema={judgementDetailValidationSchema}
                        isInitialValid={isInitialValid}
                        enableReinitialize
                    >
                        {(props) => (
                            <Form>
                                <JudgmentDetails
                                    form={props}
                                    parentFormData={applicantParentFormData}
                                    witnessFormData={witnessFormData}
                                    judgmentData={judgementRequest}
                                />
                            </Form>
                        )}
                    </Formik>
                )}
            </Box>
        </React.Fragment>
    )
}

Details.displayName = 'Judgment Details page'

export default Details
