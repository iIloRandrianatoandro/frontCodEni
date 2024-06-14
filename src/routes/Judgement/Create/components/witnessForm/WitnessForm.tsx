import React from 'react'
import { Box, Grid, Paper, Title } from '@mantine/core'
import { CitizenForm } from '@/features/judgement/components/Form'
import { JudgmentRequestDto } from '@/features/judgement/state/types'
import { FormikProps } from 'formik'

type WitnessFormData = {
    name: string
    title: string
    knownBirthDate: string
}

interface WitnessFormProps {
    witnessFormData: WitnessFormData[]
    form: FormikProps<JudgmentRequestDto>
    setRawKnownCitizenBirthDate: (rawKnownBirthDate: string) => void
}

const WitnessForm: React.FC<WitnessFormProps> = ({
    witnessFormData,
    form,
    setRawKnownCitizenBirthDate,
}): JSX.Element => {
    const handleKnownCitizenBirthDate = (rawKnownBirthDateValue: string) => {
        setRawKnownCitizenBirthDate(rawKnownBirthDateValue)
    }
    return (
        <Paper p="xl" withBorder>
            <Box mx="auto">
                <Title order={3} mb="lg">
                    Mahakasika ny vavolombelona
                </Title>
                <Grid gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50}>
                    {witnessFormData.map((witnessForm, index) => {
                        return (
                            <CitizenForm
                                key={`${witnessForm.name}-${index}`}
                                form={form}
                                citizen={witnessForm.name}
                                title={witnessForm.title}
                                handleKnownCitizenBirthDate={
                                    handleKnownCitizenBirthDate
                                }
                                knownBirthDate={witnessForm.knownBirthDate}
                            />
                        )
                    })}
                </Grid>
            </Box>
        </Paper>
    )
}

WitnessForm.displayName = 'Witness component'

export default WitnessForm
