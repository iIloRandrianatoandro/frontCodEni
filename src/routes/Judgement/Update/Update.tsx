import { JudgmentDetails } from '@/features/judgement/components/Details'
import { useLazyGetJudgmentByIdQuery } from '@/features/judgement/judgementApi'
import {
    JudgmentRequestDto,
    judgementDetailValidationSchema,
} from '@/features/judgement/state/types'
import { Box } from '@mantine/core'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Form, useParams } from 'react-router-dom'

const Update: React.FC = () => {
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
                                    disabled={false}
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

Update.displayName = 'Update judgement page'

export default Update
