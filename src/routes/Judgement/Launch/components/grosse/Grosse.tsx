import React from 'react'
import { DateInput } from '@mantine/dates'
import { IconCalendar } from '@tabler/icons-react'
import { JudgmentRequestDto } from '@/features/judgement/state/types'
import { Box, Grid, Paper, TextInput, Title, Text } from '@mantine/core'
import { FormikProps } from 'formik'

interface GrosseProps {
    judgmentData?: JudgmentRequestDto
    form: FormikProps<JudgmentRequestDto>
}

const Grosse: React.FC<GrosseProps> = ({ judgmentData, form }): JSX.Element => {
    return (
        <React.Fragment>
            <Paper p="xl">
                <Box mx="auto">
                    <Title order={3} mb="xl">
                        Fangatahana didim-pitsarana misolo sora-pahaterahana (Grosse)
                    </Title>
                    <Grid gutter="xl">
                        <Grid.Col span={4}>
                            <Grid gutter="xl">
                                <Grid.Col span={6}>
                                    <Text>Laharana fangatahana</Text>
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <TextInput
                                        id="grosse.identityNumber"
                                        name="grosse.identityNumber"
                                        placeholder="0452852"
                                        variant="filled"
                                        readOnly
                                        size="md"
                                        onBlur={form.handleBlur}
                                        onChange={form.handleChange}
                                        value={judgmentData?.numDemand}
                                        defaultValue={judgmentData?.numDemand}
                                    />
                                </Grid.Col>
                            </Grid>
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <Grid gutter="xl">
                                <Grid.Col span={6}>
                                    <Text>Androany faha</Text>
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <DateInput
                                        readOnly
                                        required
                                        withAsterisk
                                        autoFocus
                                        id={'grosse.dateVerdict'}
                                        name={'grosse.dateVerdict'}
                                        valueFormat="DD/MM/YYYY"
                                        rightSection={<IconCalendar />}
                                        mx="auto"
                                        size="md"
                                        variant="filled"
                                        onBlur={form.handleBlur}
                                        onChange={(val) =>
                                            form.setFieldValue(
                                                'grosse.dateVerdict',
                                                val?.toISOString()
                                            )
                                        }
                                        defaultValue={
                                            new Date(
                                                form.values.grosse.dateVerdict
                                            )
                                        }
                                        value={
                                            new Date(
                                                form.values.grosse.dateVerdict
                                            )
                                        }
                                        error={
                                            form.touched.grosse?.dateVerdict &&
                                            form.errors.grosse?.dateVerdict
                                        }
                                    />
                                </Grid.Col>
                            </Grid>
                        </Grid.Col>
                    </Grid>
                </Box>
            </Paper>
        </React.Fragment>
    )
}

Grosse.displayName = 'Grosse Component'

export default Grosse
