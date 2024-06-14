import React, { useState } from 'react'
import { Checkbox, Grid, Paper, Select } from '@mantine/core'
import { Box, Title } from '@mantine/core'
import { CitizenForm } from '@/features/judgement/components/Form'
import {
    JudgmentRequestDto,
    MaritalStatus,
} from '@/features/judgement/state/types'
import { FormikProps } from 'formik'
import constants from '@/core/constants'

type ParentFormData = {
    name: string
    title: string
    knownBirthDate: string
}
interface ParentFormProps {
    parentFormData: ParentFormData[]
    form: FormikProps<JudgmentRequestDto>
    setRawKnownCitizenBirthDate: (rawKnownBirthDate: string) => void
    setRawMaritalStatus: (maritalStatus: MaritalStatus) => void
}

const ApplicantsParentForm: React.FC<ParentFormProps> = ({
    parentFormData,
    form,
    setRawKnownCitizenBirthDate,
    setRawMaritalStatus,
}): JSX.Element => {
    const handleKnownCitizenBirthDate = (rawKnownBirthDateValue: string) => {
        setRawKnownCitizenBirthDate(rawKnownBirthDateValue)
    }

    const [maritalStatus, setMaritalStatus] = useState<string | null>(
        MaritalStatus.SINGLE
    )

    const handleMaritalStatusOnChange = (maritalStatusValue: MaritalStatus) => {
        setRawMaritalStatus(maritalStatusValue)
        setMaritalStatus(maritalStatusValue)
    }

    return (
        <Paper p="xl" withBorder>
            <Box mx="auto">
                <Title order={3} mb="lg">
                    Mahakasika ny ray aman-dreny
                </Title>
                {/* <Grid gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50}>
                    <Grid.Col span={6}>
                        <Checkbox
                            id="parentMarried"
                            name="parentMarried"
                            label="Fifandraisan'ny ray aman-dreny niteraka"
                            checked={form.values.parentMarried}
                            onChange={form.handleChange}
                            error={form.values.parentMarried}
                            size="md"
                        />
                    </Grid.Col>
                </Grid> */}
                <Grid gutter="xl">
                    <Grid.Col span={6} >
                        <Select
                            required
                            withAsterisk
                            id="typeRequester"
                            name="typeRequester"
                            label="Fifandraisan'ny ray aman-dreny niteraka"
                            placeholder="Misafidiana iray"
                            variant="filled"
                            size="md"
                            data={[
                                {
                                    label: constants.maritalStatus.single,
                                    value: MaritalStatus.SINGLE,
                                },
                                {
                                    label: constants.maritalStatus.married,
                                    value: MaritalStatus.MARRIED,
                                },
                                {
                                    label: constants.maritalStatus.not_stated,
                                    value: MaritalStatus.NOT_STATED,
                                },
                                {
                                    label: constants.maritalStatus.separated,
                                    value: MaritalStatus.SEPARATED,
                                },
                                {
                                    label: constants.maritalStatus.widowed,
                                    value: MaritalStatus.WIDOWED,
                                },
                            ]}
                            defaultValue={MaritalStatus.SINGLE}
                            value={maritalStatus}
                            onBlur={form.handleBlur('maritalStatus')}
                            onChange={(e) => {
                                form.handleChange('maritalStatus'),
                                    handleMaritalStatusOnChange(
                                        e as MaritalStatus
                                    )
                            }}
                            // error={
                            //     form.touched.maritalStatus &&
                            //     form.errors.maritalStatus!
                            // }
                        />
                    </Grid.Col>
                    <Grid.Col span={6}></Grid.Col>
                </Grid>
                <Grid gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50}>
                    {parentFormData.map((parentForm, index) => {
                        return (
                            <CitizenForm
                                citizen={parentForm.name}
                                title={parentForm.title}
                                form={form}
                                key={`${parentForm.name}-${index}`}
                                handleKnownCitizenBirthDate={
                                    handleKnownCitizenBirthDate
                                }
                                knownBirthDate={parentForm.knownBirthDate}
                            />
                        )
                    })}
                </Grid>
            </Box>
        </Paper>
    )
}

ApplicantsParentForm.displayName = "Applicant's parent component"

export default ApplicantsParentForm
