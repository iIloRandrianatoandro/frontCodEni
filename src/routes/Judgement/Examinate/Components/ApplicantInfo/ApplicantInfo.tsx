import React, { useState } from 'react'
import { Grid, TextInput, Text } from '@mantine/core'
import { JudgmentRequestDto } from '@/features/judgement/state/types'
import { FormikProps } from 'formik'

interface ApplicantInfoProps {
    judgmentData: JudgmentRequestDto
    form: FormikProps<JudgmentRequestDto>
}

const ApplicantInfo: React.FC<ApplicantInfoProps> = ({
    judgmentData,
    form,
}): JSX.Element => {
    const [displayApplicantAgeResult, setDisplayApplicantAgeResult] =
        useState('')
    const handleKeyUpHereee = (e: any) => {
        const currentKey = e.key
        if (!/^[0-9]$/i.test(currentKey)) return
        let currentValue = parseInt(e.target.value)

        setDisplayApplicantAgeResult(
            `Vers ${new Date().getFullYear() - currentValue}`
        )
    }
    return (
        <React.Fragment>
            <Grid>
                <Grid.Col span={6}>
                    <TextInput
                        id="applicant_fullName"
                        name="applicant_fullName"
                        label="Anarana sy fanampiny"
                        placeholder={'RAFANOMEZANTSOA Mendrika Toavina'}
                        variant={'filled'}
                        value={`${judgmentData?.applicant?.fullName} ${judgmentData?.applicant?.fullLastName}`}
                        sx={{ paddingBottom: 5 }}
                    />
                    <TextInput
                        id="applicant_father_fullName"
                        name="applicant_father_fullName"
                        label="Zanak'i"
                        variant={'filled'}
                        placeholder={'RAFANOMEZANTSOA Eric'}
                        value={`${judgmentData?.father?.fullName} ${judgmentData?.father?.fullLastName}`}
                        sx={{ paddingBottom: 5 }}
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <TextInput
                        id="applicantDob"
                        name="accused_birth_place"
                        label="Teraka tamin'ny"
                        variant="filled"
                        size="md"
                        sx={{ paddingBottom: 20, marginTop: -10 }}
                        value={judgmentData?.applicant?.birthDate
                            .split('T')[0]
                            .replaceAll('-', '/')}
                    />
                    <TextInput
                        id="applicant_mother_FullName"
                        name="applicant_mother_FullName"
                        label="sy"
                        placeholder={'ANDRIANTSEHENO Monica'}
                        value={`${judgmentData?.mother?.fullName} ${judgmentData?.mother?.fullLastName}`}
                        variant={'filled'}
                    />
                </Grid.Col>
            </Grid>
            <Grid>
                <Grid.Col span={12}>
                    <TextInput
                        id="applicant_residency"
                        name="applicant_residency"
                        label="Monina ao"
                        placeholder={'Barikadimy'}
                        variant={'filled'}
                        value={`${judgmentData?.applicant?.address}`}
                        sx={{ paddingBottom: 5 }}
                    />
                </Grid.Col>
            </Grid>
            <Grid>
                <Grid.Col span={4}>
                    <Text>Ireo fandinihana rehetra sy ny toe-batana ankapobeny dia ahafahana manome azy ny taona</Text>
                    <TextInput
                        required
                        withAsterisk
                        id="somaticExamApplicantAge"
                        name="somaticExam.applicantAge"
                        placeholder={'EXEMPLE: 21'}
                        variant={'filled'}
                        type="number"
                        max={2}
                        maxLength={2}
                        value={form.values.somaticExam?.applicantAge}
                        onBlur={form.handleBlur('somaticExam.applicantAge')}
                        onChange={form.handleChange('somaticExam.applicantAge')}
                        sx={{
                            paddingBottom: 5, 
                            border: form.values.somaticExam?.applicantAge==0
                            || form.values.somaticExam?.applicantAge==undefined
                            || form.values.somaticExam?.applicantAge <=0
                                ? '1px solid red'
                                : '1px solid white',
                            borderRadius: 5
                        }}
                        // error={
                        //     form.touched.somaticExam?.applicantAge &&
                        //     form.errors.somaticExam?.applicantAge!
                        // }
                        onKeyUp={(e) => handleKeyUpHereee(e)}
                    />
                    <label
                        style={{
                            marginTop: 20,
                            color: '#000000',
                            backgroundColor: '#E5E4E2',
                            fontWeight: 900,
                        }}
                    >
                        {form.values.somaticExam?.applicantAge > 0 && displayApplicantAgeResult}
                    </label>
                </Grid.Col>
            </Grid>
        </React.Fragment>
    )
}

ApplicantInfo.displayName = 'ApplicantInfo component'

export default ApplicantInfo
