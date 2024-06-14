import React, { useState } from 'react'
import { Grid, Paper, Box, Select, TextInput, Title } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import {
    JudgmentRequestDto,
    Requester,
    TYPE_REQUESTER_MALAGASY_LABEL,
} from '@/features/judgement/state/types'
import { FormikProps } from 'formik'
import { IconCalendar } from '@tabler/icons-react'
import { useTypedSelector } from '@/store'
import { Role } from '@/features/admin/types'

interface ApplicationFormProps {
    form: FormikProps<JudgmentRequestDto>
    setRawTypeRequester: (typeRequester: Requester) => void
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({
    form,
    setRawTypeRequester,
}): JSX.Element => {
    const [typeRequester, setTypeRequester] = useState<string | null>(
        form.values.typeRequester || Requester.MOTHER
    )

    const { accessToken, currentUser } = useTypedSelector(
        (state) => state.authentication
    )

    const handleTypeRequesterOnChange = (typeRequesterValue: Requester) => {
        setRawTypeRequester(typeRequesterValue)
        setTypeRequester(typeRequesterValue)
    }

    return (
        <>
            <Paper p="xl" withBorder>
                <Box mx="auto">
                    <Title order={3} mb="lg">
                        Mahakasika ny fangatahana
                    </Title>
                    <Grid gutter="lg" mb="xl">
                        <Grid.Col span={6}>
                            <Grid
                                gutter={5}
                                gutterXs="md"
                                gutterMd="xl"
                                gutterXl={50}
                            >
                                <Grid.Col span={6}>
                                    <TextInput
                                        required={
                                            currentUser?.role !==
                                            Role.COMMUNITY_AGENT
                                        }
                                        withAsterisk={
                                            currentUser?.role !==
                                            Role.COMMUNITY_AGENT
                                        }
                                        autoFocus
                                        id="numDemand"
                                        name="numDemand"
                                        label="Laharana"
                                        placeholder="-"
                                        variant="filled"
                                        type={'text'}
                                        size="md"
                                        defaultValue={form.values.numDemand}
                                        value={form.values.numDemand}
                                        onBlur={form.handleBlur('numDemand')}
                                        onChange={form.handleChange(
                                            'numDemand'
                                        )}
                                        error={
                                            (currentUser?.role !==
                                                Role.COMMUNITY_AGENT &&
                                                form.touched.numDemand &&
                                                form.errors.numDemand!) ||
                                            (currentUser?.role !==
                                                Role.COMMUNITY_AGENT &&
                                            Boolean(form.errors?.numDemand)
                                                ? form.errors?.numDemand
                                                : null)
                                        }
                                    />
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <DateInput
                                        required
                                        withAsterisk
                                        id="createdAt"
                                        name="createdAt"
                                        valueFormat="DD/MM/YYYY"
                                        label="Datin'ny fangatahana"
                                        placeholder="Datin'ny fangatahana"
                                        size="md"
                                        variant="filled"
                                        rightSection={<IconCalendar />}
                                        value={new Date(form.values.createdAt)}
                                        onChange={(val) =>
                                            form.setFieldValue(
                                                'createdAt',
                                                val?.toISOString()
                                            )
                                        }
                                        error={form.errors.createdAt}
                                    />
                                </Grid.Col>
                            </Grid>
                        </Grid.Col>
                    </Grid>
                </Box>

                <Box mx="auto">
                    <Title order={4} mb="md">
                        Ny mpanao fangatahana
                    </Title>
                    <Grid gutter="xl">
                        <Grid.Col span={6}>
                            <Select
                                required={
                                    currentUser?.role !== Role.COMMUNITY_AGENT
                                }
                                withAsterisk={
                                    currentUser?.role !== Role.COMMUNITY_AGENT
                                }
                                id="typeRequester"
                                name="typeRequester"
                                label="Ny mpanao fangatahana dia"
                                placeholder=""
                                variant="filled"
                                size="md"
                                data={[
                                    {
                                        label: TYPE_REQUESTER_MALAGASY_LABEL.same,
                                        value: Requester.SAME,
                                    },
                                    {
                                        label: TYPE_REQUESTER_MALAGASY_LABEL.father,
                                        value: Requester.FATHER,
                                    },
                                    {
                                        label: TYPE_REQUESTER_MALAGASY_LABEL.mother,
                                        value: Requester.MOTHER,
                                    },
                                    {
                                        label: TYPE_REQUESTER_MALAGASY_LABEL.first_witness,
                                        value: Requester.FIRST_WITNESS,
                                    },
                                    {
                                        label: TYPE_REQUESTER_MALAGASY_LABEL.second_witness,
                                        value: Requester.SECOND_WITNESS,
                                    },
                                    {
                                        label: TYPE_REQUESTER_MALAGASY_LABEL.other,
                                        value: Requester.OTHER,
                                    },
                                ]}
                                defaultValue={Requester.MOTHER}
                                value={typeRequester}
                                onBlur={form.handleBlur('typeRequester')}
                                onChange={(e) => {
                                    form.handleChange('typeRequester'),
                                        handleTypeRequesterOnChange(
                                            e as Requester
                                        )
                                }}
                                error={
                                    form.touched.typeRequester &&
                                    form.errors.typeRequester!
                                }
                            />
                        </Grid.Col>
                        <Grid.Col span={6}></Grid.Col>
                    </Grid>

                    <Grid gutter="xl">
                        <Grid.Col span={6}>
                            <TextInput
                                required={
                                    currentUser?.role !== Role.COMMUNITY_AGENT
                                }
                                withAsterisk={
                                    currentUser?.role !== Role.COMMUNITY_AGENT
                                }
                                id="requester.fullName"
                                name="requester.fullName"
                                label="Anarana"
                                placeholder="-"
                                variant="filled"
                                type={'text'}
                                size="md"
                                value={form.values.requester.fullName}
                                onBlur={form.handleBlur('requester.fullName')}
                                onChange={form.handleChange(
                                    'requester.fullName'
                                )}
                                error={
                                    form.touched.requester?.fullName &&
                                    form.errors.requester?.fullName!
                                }
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                id="requester.fullLastName"
                                name="requester.fullLastName"
                                label="Fanampin'anarana feno"
                                size="md"
                                type={'text'}
                                placeholder="-"
                                variant="filled"
                                value={form.values.requester.fullLastName}
                                onChange={form.handleChange(
                                    'requester.fullLastName'
                                )}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                label="Anaran'ny ray"
                                placeholder="-"
                                size="md"
                                variant="filled"
                                value={form.values.father?.fullName}
                                type={'text'}
                                onChange={form.handleChange('father.fullName')}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                label="Anaran'ny Reny"
                                size="md"
                                placeholder="-"
                                variant="filled"
                                value={form.values.mother?.fullName}
                                type={'text'}
                                onChange={form.handleChange('mother.fullName')}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                required={
                                    currentUser?.role !== Role.COMMUNITY_AGENT
                                }
                                withAsterisk={
                                    currentUser?.role !== Role.COMMUNITY_AGENT
                                }
                                id="requester.address"
                                name="requester.address"
                                label="Monina ao"
                                size="md"
                                type={'text'}
                                placeholder="-"
                                variant="filled"
                                value={form.values.requester.address}
                                onBlur={form.handleBlur('requester.address')}
                                onChange={form.handleChange(
                                    'requester.address'
                                )}
                                error={
                                    currentUser?.role !==
                                        Role.COMMUNITY_AGENT &&
                                    form.touched.requester?.address &&
                                    form.errors.requester?.address!
                                }
                            />
                        </Grid.Col>
                    </Grid>
                </Box>
            </Paper>
        </>
    )
}

ApplicationForm.displayName = 'Application component'

export default ApplicationForm
