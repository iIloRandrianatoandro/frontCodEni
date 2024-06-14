import React from 'react'
import { Grid, Text, TextInput, Title } from '@mantine/core'
import { JudgmentRequestDto } from '@/features/judgement/state/types'
import { useTypedSelector } from '@/store'
import { FormikProps } from 'formik'

interface DoctorInfoProps {
    form: FormikProps<JudgmentRequestDto>
}

const DoctorInfo: React.FC<DoctorInfoProps> = ({ form }): JSX.Element => {
    const { accessToken, currentUser } = useTypedSelector(
        (state: { authentication: any }) => state.authentication
    )

    return (
        <React.Fragment>
            <Grid>
                <Grid.Col span={4}>
                    <Text>N° </Text>
                    <TextInput
                        required
                        withAsterisk
                        id="somaticExamIdentity"
                        name="somaticExam.identity"
                        placeholder={
                            'EXEMPLE: 0001/2023/MSANP/SG/DRSP ATS/SDSP TOAMASINA/Cert'
                        }
                        variant={'filled'}
                        sx={{
                            paddingBottom: 5, 
                            border: form.values.somaticExam?.identity=='' || form.values.somaticExam?.identity==undefined
                                ? '1px solid red'
                                : '1px solid white',
                            borderRadius: 5
                        }}
                        value={form.values.somaticExam?.identity}
                        onBlur={form.handleBlur('somaticExam.identity')}
                        onChange={form.handleChange('somaticExam.identity')}
                        // error={form.touched.somaticExam?.identity && form.errors.somaticExam?.identity!}
                    />
                </Grid.Col>
            </Grid>
            <Grid>
                <Grid.Col span={6}>
                    <TextInput
                        id="doctor_fullName"
                        name="doctor_fullName"
                        label="Izaho"
                        placeholder={'RALANTOSON Patric Rodolph'}
                        variant={'filled'}
                        value={`${currentUser?.firstName} ${currentUser?.lastName}`}
                        sx={{ paddingBottom: 5 }}
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <TextInput
                        id="doctor_uid"
                        name="doctor_uid"
                        label="Dokotera mitondra ny laharana"
                        placeholder={'2047858524'}
                        variant={'filled'}
                        sx={{ paddingBottom: 5 }}
                        value={currentUser?.matriculation}
                    />
                </Grid.Col>
            </Grid>
            <Grid>
                <Grid.Col span={12}>
                    <TextInput
                        id="doctor_workPlace"
                        name="doctor_workPlace"
                        label="Miasa ao amin'ny"
                        placeholder={'CHU Analankininina Toamasina'}
                        variant={'filled'}
                        sx={{ paddingBottom: 5 }}
                        value={currentUser?.workPlace}
                    />
                </Grid.Col>
            </Grid>
        </React.Fragment>
    )
}

DoctorInfo.displayName = 'DoctorInfo component'

export default DoctorInfo
