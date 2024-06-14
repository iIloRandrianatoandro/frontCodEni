import React from 'react'
import { Box, Grid, Paper, TextInput, Title } from '@mantine/core'
import { JudgmentRequestDto } from '@/features/judgement/state/types'
import { FormikProps } from 'formik'
import { useTypedSelector } from '@/store'

interface JudgeProps {
    judgmentData?: JudgmentRequestDto
    form: FormikProps<JudgmentRequestDto>
}

const Judge: React.FC<JudgeProps> = ({ form }): JSX.Element => {
    const { accessToken, currentUser } = useTypedSelector(
        (state) => state.authentication
    )

    return (
        <React.Fragment>
            <Paper p="xl">
                <Box mx="auto">
                    <Title order={3} mb="xl">
                        Mahakasika ny mpitsara
                    </Title>

                    <Title order={4} mb="xl">
                        {' '}
                        Filoha{' '}
                    </Title>
                    <Grid gutter="xl">
                        <Grid.Col span={4}>
                            <TextInput
                                required
                                withAsterisk
                                autoFocus
                                id="grosse.tribunalPresidentFullName"
                                name="grosse.tribunalPresidentFullName"
                                label="Anarana feno"
                                placeholder="RAFANOMEZANTSOA Gisele"
                                variant="filled"
                                size="md"
                                sx={{ paddingBottom: 20, marginTop: -20 }}
                                value={
                                    form.values.grosse.tribunalPresidentFullName
                                }
                                onBlur={form.handleBlur}
                                onChange={form.handleChange}
                                error={
                                    form.touched.grosse
                                        ?.tribunalPresidentFullName &&
                                    form.errors.grosse
                                        ?.tribunalPresidentFullName
                                }
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <TextInput
                                required
                                withAsterisk
                                id="grosse.tpiNamePlace"
                                name="grosse.tpiNamePlace"
                                label="Toeram-piadidiana"
                                placeholder="Fitsarana ambaratonga voalohany, Toamasina"
                                variant="filled"
                                size="md"
                                sx={{ paddingBottom: 20, marginTop: -20 }}
                                value={form.values.grosse.tpiNamePlace}
                                onBlur={form.handleBlur}
                                onChange={form.handleChange}
                                error={
                                    form.touched.grosse?.tpiNamePlace &&
                                    form.errors.grosse?.tpiNamePlace
                                }
                            />
                        </Grid.Col>
                    </Grid>

                    <Title order={4} mb="xl">
                        {' '}
                        Mpiraki-draharana{' '}
                    </Title>
                    <Grid gutter="xl">
                        <Grid.Col span={4}>
                            <TextInput
                                readOnly
                                id="clerk_name"
                                name="clerk_name"
                                label="Anarana feno"
                                placeholder="ZAFIMAHITSY Griffine"
                                variant="filled"
                                size="md"
                                sx={{ paddingBottom: 20, marginTop: -20 }}
                                value={`${currentUser?.firstName} ${currentUser?.lastName}`}
                            />
                        </Grid.Col>
                    </Grid>
                </Box>
            </Paper>
        </React.Fragment>
    )
}

Judge.displayName = 'Judge Component'

export default Judge
