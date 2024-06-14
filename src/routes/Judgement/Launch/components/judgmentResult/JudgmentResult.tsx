import React, { useState } from 'react'
import { DateInput } from '@mantine/dates'
import { IconCalendar } from '@tabler/icons-react'
import {
    CitizenDto,
    JudgmentRequestDto,
    MaritalStatus,
    Requester,
    TYPE_REQUESTER_MALAGASY_LABEL,
    TypeRequesterLabel,
} from '@/features/judgement/state/types'
import {
    Box,
    Grid,
    Group,
    Paper,
    Radio,
    Select,
    Textarea,
    TextInput,
    Title,
} from '@mantine/core'
import { FormikProps } from 'formik'

interface JudgmentResultProps {
    judgmentData?: JudgmentRequestDto
    form: FormikProps<JudgmentRequestDto>
}

const JudgmentResult: React.FC<JudgmentResultProps> = ({
    judgmentData,
    form,
}): JSX.Element => {
    const [isAcceptedValue, setAcceptedValue] = useState(
        judgmentData?.grosse?.acceptedJudgement?.toString() || 'true'
    )
    const capitalizeFirst = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    const [isApplicantKnownBirthDate, setApplicantKnownBirthDate] = useState(
        (!judgmentData?.applicant.birthDate
            .toLowerCase()
            .includes('vers')).toString()
    )

    const [isMotherKnownBirthDate, setMotherKnownBirthDate] = useState(
        (!judgmentData?.mother.birthDate
            .toLowerCase()
            .includes('vers')).toString()
    )

    const [isFatherKnownBirthDate, setFatherKnownBirthDate] = useState(
        (!judgmentData?.father.birthDate
            .toLowerCase()
            .includes('vers')).toString()
    )

    const [typeRequester, setTypeRequester] = useState<string | null>(
        judgmentData?.typeRequester || null
    )

    const [fatherCanBeExtended, setFatherCanBeExtended] = useState(
        (
            (judgmentData?.mother?.maritalStatus &&
                judgmentData?.mother?.maritalStatus.toUpperCase() !==
                    MaritalStatus.MARRIED) ||
            judgmentData?.mother?.maritalStatus === null
        ).toString()
    )

    return (
        <React.Fragment>
            <Paper p="xl" withBorder>
                <Box mx="auto">
                    <Grid gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50}>
                        <Grid.Col span={6}>
                            <Grid gutter="xl">
                                <Grid.Col span={6}>
                                    <DateInput
                                        required
                                        withAsterisk
                                        id="createdAt"
                                        name="createdAt"
                                        label="Datin'ny fangatahana"
                                        valueFormat="DD/MM/YYYY"
                                        rightSection={<IconCalendar />}
                                        mx="auto"
                                        size="md"
                                        variant="filled"
                                        sx={{
                                            paddingBottom: 20,
                                            marginTop: -20,
                                        }}
                                        onChange={(val) =>
                                            form.setFieldValue(
                                                `createdAt`,
                                                val?.toISOString()
                                            )
                                        }
                                        defaultValue={
                                            new Date(
                                                judgmentData?.createdAt ??
                                                    new Date()
                                            )
                                        }
                                        value={new Date(form.values.createdAt)}
                                        error={
                                            form.touched.createdAt &&
                                            form.errors.createdAt!
                                        }
                                    />
                                </Grid.Col>
                            </Grid>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Grid gutter="xl">
                                <Grid.Col span={6}>
                                    <Select
                                        id="judgment.typeRequester"
                                        name="judgment.typeRequester"
                                        label="Fifandraisana amin'ilay hotsaraina"
                                        placeholder="Misafidiana iray"
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
                                            {
                                                label: (
                                                    TYPE_REQUESTER_MALAGASY_LABEL as any
                                                )[
                                                    `${
                                                        judgmentData?.typeRequester
                                                            ?.toString()
                                                            .toLowerCase() ||
                                                        'other'
                                                    }`
                                                ],
                                                value: judgmentData?.typeRequester!,
                                            },
                                        ]}
                                        defaultValue={`${judgmentData?.typeRequester!}`}
                                        value={typeRequester}
                                        onChange={(e) => {
                                            form.handleChange('typeRequester'),
                                                setTypeRequester(e as Requester)
                                        }}
                                        error={
                                            form.touched.typeRequester &&
                                            form.errors.typeRequester!
                                        }
                                    />
                                </Grid.Col>
                            </Grid>
                        </Grid.Col>

                        <Grid.Col span={6}>
                            <Title order={4} mb="lg">
                                Ilay anaovana fangatahana
                            </Title>

                            <Grid gutter="xl">
                                <Grid.Col span={6}>
                                    <TextInput
                                        withAsterisk
                                        required
                                        id={`applicant.fullName`}
                                        name={`applicant.fullName`}
                                        label="Anarana"
                                        placeholder="RAKOTOARISON"
                                        variant="filled"
                                        size="md"
                                        type={'text'}
                                        onChange={form.handleChange(
                                            `applicant.fullName`
                                        )}
                                        defaultValue={
                                            judgmentData?.applicant.fullName
                                        }
                                        value={
                                            form.values.applicant?.fullName ||
                                            judgmentData?.applicant.fullName
                                        }
                                        error={form.errors.applicant?.fullName!}
                                    />
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <TextInput
                                        id={`applicant.fullLastName`}
                                        name={`applicant.fullLastName`}
                                        label="Fanampin'anarana feno"
                                        placeholder="Amédé"
                                        variant="filled"
                                        size="md"
                                        type={'text'}
                                        onChange={form.handleChange(
                                            `applicant.fullLastName`
                                        )}
                                        defaultValue={
                                            judgmentData?.applicant.fullLastName
                                        }
                                        value={
                                            form.values.applicant
                                                ?.fullLastName ||
                                            judgmentData?.applicant.fullLastName
                                        }
                                    />
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <Grid gutter="xl">
                                        <Grid.Col span={6}>
                                            <Radio.Group
                                                withAsterisk
                                                name={`applicant.knownBirthDate`}
                                                id={`applicant.knownBirthDate`}
                                                label="Fantatra ny daty nahaterahana ?"
                                                value={
                                                    isApplicantKnownBirthDate
                                                }
                                                onChange={
                                                    setApplicantKnownBirthDate
                                                }
                                                sx={{
                                                    paddingBottom: 20,
                                                    marginTop: -20,
                                                }}
                                                required
                                            >
                                                <Group mt="xs">
                                                    <Radio
                                                        value="true"
                                                        label="Eny"
                                                    />
                                                    <Radio
                                                        value="false"
                                                        label="Tsia"
                                                    />
                                                </Group>
                                            </Radio.Group>
                                        </Grid.Col>
                                        <Grid.Col span={6}>
                                            <DateInput
                                                id={`applicant.birthDate`}
                                                name={`applicant.birthDate`}
                                                valueFormat="DD/MM/YYYY"
                                                label="Daty nahaterahana"
                                                placeholder="Daty nahaterahana"
                                                size="md"
                                                variant="filled"
                                                onChange={(val) =>
                                                    form.setFieldValue(
                                                        `applicant.birthDate`,
                                                        val?.toISOString()
                                                    )
                                                }
                                                defaultValue={
                                                    new Date(
                                                        judgmentData?.applicant
                                                            ?.birthDate ??
                                                            new Date()
                                                    )
                                                }
                                                value={
                                                    new Date(
                                                        form.values.applicant.birthDate
                                                    )
                                                }
                                                style={{
                                                    display:
                                                        isApplicantKnownBirthDate ===
                                                        'false'
                                                            ? 'none'
                                                            : 'block',
                                                }}
                                            />
                                            <TextInput
                                                id={`applicant.unspecifiedBirthDate`}
                                                name={`applicant.unspecifiedBirthDate`}
                                                label="Daty nahaterahana"
                                                placeholder="Daty nahaterahana"
                                                size="md"
                                                type={'text'}
                                                variant="filled"
                                                defaultValue={
                                                    judgmentData?.applicant
                                                        ?.birthDate &&
                                                    judgmentData?.applicant?.birthDate.includes(
                                                        'vers'
                                                    )
                                                        ? judgmentData
                                                              ?.applicant
                                                              ?.birthDate
                                                        : `vers ${
                                                              new Date().getFullYear() -
                                                              20
                                                          }`
                                                }
                                                value={
                                                    form.values.applicant
                                                        .unspecifiedBirthDate
                                                }
                                                onChange={form.handleChange(
                                                    `applicant.unspecifiedBirthDate`
                                                )}
                                                style={{
                                                    display:
                                                        isApplicantKnownBirthDate ===
                                                        'true'
                                                            ? 'none'
                                                            : 'block',
                                                }}
                                            />
                                        </Grid.Col>
                                    </Grid>
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <TextInput
                                        id={`applicant.occupation`}
                                        name={`applicant.occupation`}
                                        label="Anton'asa"
                                        placeholder="Mpamboly"
                                        variant="filled"
                                        size="md"
                                        type={'text'}
                                        onChange={form.handleChange(
                                            `applicant.occupation`
                                        )}
                                        defaultValue={
                                            judgmentData?.applicant.occupation
                                        }
                                        value={
                                            form.values.applicant?.occupation ||
                                            judgmentData?.applicant.occupation
                                        }
                                    />
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <TextInput
                                        // required={IS_APPLIED_TO_FATHER}
                                        // withAsterisk={IS_APPLIED_TO_FATHER}
                                        id={`applicant.address`}
                                        name={`applicant.address`}
                                        label="Adiresy"
                                        placeholder="Lot 169 KD Barikadimy"
                                        variant="filled"
                                        size="md"
                                        type={'text'}
                                        onChange={form.handleChange(
                                            `applicant.address`
                                        )}
                                        defaultValue={
                                            judgmentData?.applicant.address
                                        }
                                        value={
                                            form.values.applicant?.address ||
                                            judgmentData?.applicant.address
                                        }
                                    />
                                </Grid.Col>
                            </Grid>
                        </Grid.Col>
                        {/* <Grid.Col span={6}>
                            <Title order={4} mb="lg">
                                Ny Mpanao fangatahana
                            </Title>

                            <Grid gutter="xl">
                                <Grid.Col span={6}>
                                    <TextInput
                                        id={`requester.fullName`}
                                        name={`requester.fullName`}
                                        label="Anarana feno"
                                        placeholder="RAKOTOARISON"
                                        variant="filled"
                                        size="md"
                                        type={'text'}
                                        onChange={form.handleChange(
                                            `requester.fullName`
                                        )}
                                        defaultValue={
                                            judgmentData?.requester.fullName
                                        }
                                        value={
                                            form.values.requester?.fullName ||
                                            judgmentData?.requester.fullName
                                        }
                                    />
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <TextInput
                                        id={`requester.fullLastName`}
                                        name={`requester.fullLastName`}
                                        label="Fanampin'anarana feno"
                                        placeholder="Amédé"
                                        variant="filled"
                                        size="md"
                                        type={'text'}
                                        onChange={form.handleChange(
                                            `requester.fullLastName`
                                        )}
                                        defaultValue={
                                            judgmentData?.requester.fullLastName
                                        }
                                        value={
                                            form.values.requester
                                                ?.fullLastName ||
                                            judgmentData?.requester.fullLastName
                                        }
                                    />
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <TextInput
                                        id={`requester.address`}
                                        name={`requester.address`}
                                        label="Monina ao"
                                        placeholder="Toamasina"
                                        variant="filled"
                                        size="md"
                                        type={'text'}
                                        onChange={form.handleChange(
                                            `requester.address`
                                        )}
                                        defaultValue={
                                            judgmentData?.requester.address
                                        }
                                        value={
                                            form.values.requester?.address ||
                                            judgmentData?.requester.address
                                        }
                                    />
                                </Grid.Col>
                            </Grid>
                        </Grid.Col> */}
                        <Grid.Col span={6}>
                            <Title order={4} mb="lg">
                                Ny Reny
                            </Title>

                            <Grid gutter="xl">
                                <Grid.Col span={6}>
                                    <TextInput
                                        withAsterisk
                                        required
                                        id={`mother.fullName`}
                                        name={`mother.fullName`}
                                        label="Anarana"
                                        placeholder="RAKOTOARISON"
                                        variant="filled"
                                        size="md"
                                        type={'text'}
                                        onChange={form.handleChange(
                                            `mother.fullName`
                                        )}
                                        defaultValue={
                                            judgmentData?.mother.fullName
                                        }
                                        value={
                                            form.values.mother?.fullName ||
                                            judgmentData?.mother.fullName
                                        }
                                    />
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <TextInput
                                        id={`mother.fullLastName`}
                                        name={`mother.fullLastName`}
                                        label="Fanampin'anarana feno"
                                        placeholder="Amédé"
                                        variant="filled"
                                        size="md"
                                        type={'text'}
                                        onChange={form.handleChange(
                                            `mother.fullLastName`
                                        )}
                                        defaultValue={
                                            judgmentData?.mother.fullLastName
                                        }
                                        value={
                                            form.values.mother?.fullLastName ||
                                            judgmentData?.mother.fullLastName
                                        }
                                    />
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <Grid gutter="xl">
                                        <Grid.Col span={6}>
                                            <Radio.Group
                                                withAsterisk
                                                name={`mother.knownBirthDate`}
                                                id={`mother.knownBirthDate`}
                                                label="Fantatra ny daty nahaterahana ?"
                                                value={isMotherKnownBirthDate}
                                                onChange={
                                                    setMotherKnownBirthDate
                                                }
                                                sx={{
                                                    paddingBottom: 20,
                                                    marginTop: -20,
                                                }}
                                                required
                                            >
                                                <Group mt="xs">
                                                    <Radio
                                                        value="true"
                                                        label="Eny"
                                                    />
                                                    <Radio
                                                        value="false"
                                                        label="Tsia"
                                                    />
                                                </Group>
                                            </Radio.Group>
                                        </Grid.Col>
                                        <Grid.Col span={6}>
                                            <DateInput
                                                id={`mother.birthDate`}
                                                name={`mother.birthDate`}
                                                valueFormat="DD/MM/YYYY"
                                                label="Daty nahaterahana"
                                                placeholder="Daty nahaterahana"
                                                size="md"
                                                variant="filled"
                                                onChange={(val) =>
                                                    form.setFieldValue(
                                                        `father.birthDate`,
                                                        val?.toISOString()
                                                    )
                                                }
                                                defaultValue={
                                                    new Date(
                                                        judgmentData?.mother
                                                            ?.birthDate ??
                                                            new Date()
                                                    )
                                                }
                                                value={
                                                    new Date(
                                                        form.values.mother.birthDate
                                                    )
                                                }
                                                style={{
                                                    display:
                                                        isMotherKnownBirthDate ===
                                                        'false'
                                                            ? 'none'
                                                            : 'block',
                                                }}
                                            />
                                            <TextInput
                                                id={`mother.unspecifiedBirthDate`}
                                                name={`motherunspecifiedBirthDate`}
                                                label="Daty nahaterahana"
                                                placeholder="Daty nahaterahana"
                                                size="md"
                                                type={'text'}
                                                variant="filled"
                                                defaultValue={
                                                    judgmentData?.mother
                                                        ?.birthDate &&
                                                    judgmentData?.mother?.birthDate.includes(
                                                        'vers'
                                                    )
                                                        ? judgmentData?.mother
                                                              ?.birthDate
                                                        : `vers ${
                                                              new Date().getFullYear() -
                                                              20
                                                          }`
                                                }
                                                value={
                                                    form.values.mother
                                                        .unspecifiedBirthDate
                                                }
                                                onChange={form.handleChange(
                                                    `mother.unspecifiedBirthDate`
                                                )}
                                                style={{
                                                    display:
                                                        isMotherKnownBirthDate ===
                                                        'true'
                                                            ? 'none'
                                                            : 'block',
                                                }}
                                            />
                                        </Grid.Col>
                                    </Grid>
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <TextInput
                                        id={`mother.occupation`}
                                        name={`mother.occupation`}
                                        label="Anton'asa"
                                        placeholder="Mpamboly"
                                        variant="filled"
                                        size="md"
                                        type={'text'}
                                        onChange={form.handleChange(
                                            `mother.occupation`
                                        )}
                                        defaultValue={
                                            judgmentData?.mother.occupation
                                        }
                                        value={
                                            form.values.mother?.occupation ||
                                            judgmentData?.mother.occupation
                                        }
                                    />
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <TextInput
                                        id={`mother.numCIN`}
                                        name={`mother.numCIN`}
                                        label="Laharana kara-panondro (CIN)"
                                        placeholder="501031145899"
                                        variant="filled"
                                        size={'md'}
                                        type={'text'}
                                        onChange={form.handleChange(
                                            `mother.numCIN`
                                        )}
                                        defaultValue={
                                            judgmentData?.mother.numCIN
                                        }
                                        value={
                                            form.values.mother?.numCIN ||
                                            judgmentData?.mother.numCIN
                                        }
                                    />
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <DateInput
                                        id={`mother.dateCIN`}
                                        name={`mother.dateCIN`}
                                        valueFormat="DD/MM/YYYY"
                                        label="Tamin'ny"
                                        placeholder="Tamin'ny"
                                        rightSection={<IconCalendar />}
                                        size="md"
                                        variant="filled"
                                        defaultValue={
                                            new Date(
                                                judgmentData?.mother.dateCIN ??
                                                    new Date()
                                            )
                                        }
                                        value={
                                            new Date(form.values.mother.dateCIN)
                                        }
                                        onChange={(val) =>
                                            form.setFieldValue(
                                                `mother.dateCIN`,
                                                val?.toISOString()
                                            )
                                        }
                                    />
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <TextInput
                                        id={`mother.issuancePlaceCIN`}
                                        name={`mother.issuancePlaceCIN`}
                                        label="Tao"
                                        placeholder="Toamasina"
                                        variant="filled"
                                        size="md"
                                        type={'text'}
                                        onChange={form.handleChange(
                                            `mother.issuancePlaceCIN`
                                        )}
                                        defaultValue={
                                            judgmentData?.mother
                                                .issuancePlaceCIN
                                        }
                                        value={
                                            form.values.mother
                                                ?.issuancePlaceCIN ||
                                            judgmentData?.mother
                                                .issuancePlaceCIN
                                        }
                                    />
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <TextInput
                                        // required={IS_APPLIED_TO_FATHER}
                                        // withAsterisk={IS_APPLIED_TO_FATHER}
                                        id={`mother.address`}
                                        name={`mother.address`}
                                        label="Adiresy"
                                        placeholder="Lot 169 KD Barikadimy"
                                        variant="filled"
                                        size="md"
                                        type={'text'}
                                        onChange={form.handleChange(
                                            `mother.address`
                                        )}
                                        defaultValue={
                                            judgmentData?.mother.address
                                        }
                                        value={
                                            form.values.mother?.address ||
                                            judgmentData?.mother.address
                                        }
                                    />
                                </Grid.Col>
                            </Grid>
                        </Grid.Col>
                        {judgmentData?.father === null &&
                        fatherCanBeExtended === 'false' ? (
                            <Grid.Col span={6}>
                                <Title order={4} mb="lg">
                                    Hanao fanjanahana ny Rainy ?
                                </Title>
                                <br />
                                <Grid gutter="xl">
                                    <Radio.Group
                                        value={fatherCanBeExtended}
                                        onChange={setFatherCanBeExtended}
                                        name="fathercanBeExtended"
                                        // label="Manaiky ny hanjanaka ?"
                                        withAsterisk
                                        defaultValue={(
                                            (judgmentData?.mother
                                                ?.maritalStatus &&
                                                judgmentData?.mother?.maritalStatus.toUpperCase() !==
                                                    MaritalStatus.MARRIED) ||
                                            judgmentData?.mother
                                                ?.maritalStatus === null
                                        ).toString()}
                                        sx={{
                                            paddingBottom: 20,
                                            marginTop: -20,
                                        }}
                                        required
                                    >
                                        <Group mt="xs">
                                            <Radio value="true" label="Eny" />
                                            <Radio value="false" label="Tsia" />
                                        </Group>
                                    </Radio.Group>
                                </Grid>
                            </Grid.Col>
                        ) : (
                            <Grid.Col span={6}>
                                <Title order={4} mb="lg">
                                    Ny Ray
                                </Title>

                                <Grid gutter="xl">
                                    <Grid.Col span={6}>
                                        <br />
                                        <Radio.Group
                                            style={{
                                                display:
                                                    judgmentData?.mother
                                                        ?.maritalStatus &&
                                                    judgmentData?.mother?.maritalStatus.toUpperCase() ===
                                                        MaritalStatus.MARRIED
                                                        ? 'none'
                                                        : 'block',
                                            }}
                                            value={fatherCanBeExtended}
                                            onChange={setFatherCanBeExtended}
                                            name="fathercanBeExtended"
                                            label="Hanao fanjanahana ny Rainy ?"
                                            withAsterisk
                                            defaultValue={(
                                                (judgmentData?.mother
                                                    ?.maritalStatus &&
                                                    judgmentData?.mother?.maritalStatus.toUpperCase() ==
                                                        MaritalStatus.MARRIED) ||
                                                judgmentData?.mother
                                                    ?.maritalStatus === null
                                            ).toString()}
                                            sx={{
                                                paddingBottom: 20,
                                                marginTop: -20,
                                            }}
                                            required
                                        >
                                            <Group mt="xs">
                                                <Radio
                                                    value="true"
                                                    label="Eny"
                                                />
                                                <Radio
                                                    value="false"
                                                    label="Tsia"
                                                />
                                            </Group>
                                        </Radio.Group>
                                    </Grid.Col>
                                    <Grid.Col span={6}></Grid.Col>
                                    <Grid.Col
                                        span={6}
                                        style={{
                                            display:
                                                fatherCanBeExtended === 'false'
                                                    ? 'none'
                                                    : 'block',
                                        }}
                                    >
                                        <TextInput
                                            id={`father.fullName`}
                                            name={`father.fullName`}
                                            label="Anarana"
                                            placeholder="RAKOTOARISON"
                                            variant="filled"
                                            size="md"
                                            type={'text'}
                                            onChange={form.handleChange(
                                                `father.fullName`
                                            )}
                                            defaultValue={
                                                judgmentData?.father.fullName
                                            }
                                            value={
                                                form.values.father?.fullName ||
                                                judgmentData?.father.fullName
                                            }
                                        />
                                    </Grid.Col>
                                    <Grid.Col
                                        span={6}
                                        style={{
                                            display:
                                                fatherCanBeExtended === 'false'
                                                    ? 'none'
                                                    : 'block',
                                        }}
                                    >
                                        <TextInput
                                            id={`father.fullLastName`}
                                            name={`father.fullLastName`}
                                            label="Fanampin'anarana feno"
                                            placeholder="Amédé"
                                            variant="filled"
                                            size="md"
                                            type={'text'}
                                            onChange={form.handleChange(
                                                `father.fullLastName`
                                            )}
                                            defaultValue={
                                                judgmentData?.father
                                                    .fullLastName
                                            }
                                            value={
                                                form.values.father
                                                    ?.fullLastName ||
                                                judgmentData?.father
                                                    .fullLastName
                                            }
                                        />
                                    </Grid.Col>
                                    <Grid.Col
                                        span={6}
                                        style={{
                                            display:
                                                fatherCanBeExtended === 'false'
                                                    ? 'none'
                                                    : 'block',
                                        }}
                                    >
                                        <Grid gutter="xl">
                                            <Grid.Col span={6}>
                                                <Radio.Group
                                                    withAsterisk
                                                    name={`father.knownBirthDate`}
                                                    id={`father.knownBirthDate`}
                                                    label="Fantatra ny daty nahaterahana ?"
                                                    value={
                                                        isFatherKnownBirthDate
                                                    }
                                                    onChange={
                                                        setFatherKnownBirthDate
                                                    }
                                                    sx={{
                                                        paddingBottom: 20,
                                                        marginTop: -20,
                                                    }}
                                                    required
                                                >
                                                    <Group mt="xs">
                                                        <Radio
                                                            value="true"
                                                            label="Eny"
                                                        />
                                                        <Radio
                                                            value="false"
                                                            label="Tsia"
                                                        />
                                                    </Group>
                                                </Radio.Group>
                                            </Grid.Col>
                                            <Grid.Col span={6}>
                                                <DateInput
                                                    id={`father.birthDate`}
                                                    name={`father.birthDate`}
                                                    valueFormat="DD/MM/YYYY"
                                                    label="Daty nahaterahana"
                                                    placeholder="Daty nahaterahana"
                                                    size="md"
                                                    variant="filled"
                                                    onChange={(val) =>
                                                        form.setFieldValue(
                                                            `father.birthDate`,
                                                            val?.toISOString()
                                                        )
                                                    }
                                                    defaultValue={
                                                        new Date(
                                                            judgmentData?.father
                                                                ?.birthDate ??
                                                                new Date()
                                                        )
                                                    }
                                                    value={
                                                        new Date(
                                                            form.values.father.birthDate
                                                        )
                                                    }
                                                    style={{
                                                        display:
                                                            isFatherKnownBirthDate ===
                                                            'false'
                                                                ? 'none'
                                                                : 'block',
                                                    }}
                                                />
                                                <TextInput
                                                    id={`father.unspecifiedBirthDate`}
                                                    name={`father.unspecifiedBirthDate`}
                                                    label="Daty nahaterahana"
                                                    placeholder="Daty nahaterahana"
                                                    size="md"
                                                    type={'text'}
                                                    variant="filled"
                                                    defaultValue={
                                                        judgmentData?.father
                                                            ?.birthDate &&
                                                        judgmentData?.father?.birthDate.includes(
                                                            'vers'
                                                        )
                                                            ? judgmentData
                                                                  ?.father
                                                                  ?.birthDate
                                                            : `vers ${
                                                                  new Date().getFullYear() -
                                                                  20
                                                              }`
                                                    }
                                                    value={
                                                        form.values.father
                                                            .unspecifiedBirthDate
                                                    }
                                                    onChange={form.handleChange(
                                                        `father.unspecifiedBirthDate`
                                                    )}
                                                    style={{
                                                        display:
                                                            isFatherKnownBirthDate ===
                                                            'true'
                                                                ? 'none'
                                                                : 'block',
                                                    }}
                                                />
                                            </Grid.Col>
                                        </Grid>
                                    </Grid.Col>
                                    <Grid.Col
                                        span={6}
                                        style={{
                                            display:
                                                fatherCanBeExtended === 'false'
                                                    ? 'none'
                                                    : 'block',
                                        }}
                                    >
                                        <TextInput
                                            id={`father.occupation`}
                                            name={`father.occupation`}
                                            label="Anton'asa"
                                            placeholder="Mpamboly"
                                            variant="filled"
                                            size="md"
                                            type={'text'}
                                            onChange={form.handleChange(
                                                `father.occupation`
                                            )}
                                            defaultValue={
                                                judgmentData?.father.occupation
                                            }
                                            value={
                                                form.values.father
                                                    ?.occupation ||
                                                judgmentData?.father.occupation
                                            }
                                        />
                                    </Grid.Col>
                                    <Grid.Col
                                        span={6}
                                        style={{
                                            display:
                                                fatherCanBeExtended === 'false'
                                                    ? 'none'
                                                    : 'block',
                                        }}
                                    >
                                        <TextInput
                                            id={`father.numCIN`}
                                            name={`father.numCIN`}
                                            label="Laharana kara-panondro (CIN)"
                                            placeholder="501031145899"
                                            variant="filled"
                                            size={'md'}
                                            type={'text'}
                                            onChange={form.handleChange(
                                                `father.numCIN`
                                            )}
                                            defaultValue={
                                                judgmentData?.father.numCIN
                                            }
                                            value={
                                                form.values.father?.numCIN ||
                                                judgmentData?.father.numCIN
                                            }
                                        />
                                    </Grid.Col>
                                    <Grid.Col
                                        span={6}
                                        style={{
                                            display:
                                                fatherCanBeExtended === 'false'
                                                    ? 'none'
                                                    : 'block',
                                        }}
                                    >
                                        <DateInput
                                            id={`father.dateCIN`}
                                            name={`father.dateCIN`}
                                            valueFormat="DD/MM/YYYY"
                                            label="Tamin'ny"
                                            placeholder="Tamin'ny"
                                            rightSection={<IconCalendar />}
                                            size="md"
                                            variant="filled"
                                            defaultValue={
                                                new Date(
                                                    judgmentData?.father
                                                        .dateCIN ?? new Date()
                                                )
                                            }
                                            value={
                                                new Date(
                                                    form.values.father.dateCIN
                                                )
                                            }
                                            onChange={(val) =>
                                                form.setFieldValue(
                                                    `father.dateCIN`,
                                                    val?.toISOString()
                                                )
                                            }
                                        />
                                    </Grid.Col>
                                    <Grid.Col
                                        span={6}
                                        style={{
                                            display:
                                                fatherCanBeExtended === 'false'
                                                    ? 'none'
                                                    : 'block',
                                        }}
                                    >
                                        <TextInput
                                            id={`father.issuancePlaceCIN`}
                                            name={`father.issuancePlaceCIN`}
                                            label="Tao"
                                            placeholder="Toamasina"
                                            variant="filled"
                                            size="md"
                                            type={'text'}
                                            onChange={form.handleChange(
                                                `father.issuancePlaceCIN`
                                            )}
                                            defaultValue={
                                                judgmentData?.father
                                                    .issuancePlaceCIN
                                            }
                                            value={
                                                form.values.father
                                                    ?.issuancePlaceCIN ||
                                                judgmentData?.father
                                                    .issuancePlaceCIN
                                            }
                                        />
                                    </Grid.Col>
                                    <Grid.Col
                                        span={6}
                                        style={{
                                            display:
                                                fatherCanBeExtended === 'false'
                                                    ? 'none'
                                                    : 'block',
                                        }}
                                    >
                                        <TextInput
                                            // required={IS_APPLIED_TO_FATHER}
                                            // withAsterisk={IS_APPLIED_TO_FATHER}
                                            id={`father.address`}
                                            name={`father.address`}
                                            label="Adiresy"
                                            placeholder="Lot 169 KD Barikadimy"
                                            variant="filled"
                                            size="md"
                                            type={'text'}
                                            onChange={form.handleChange(
                                                `father.address`
                                            )}
                                            defaultValue={
                                                judgmentData?.father.address
                                            }
                                            value={
                                                form.values.father?.address ||
                                                judgmentData?.father.address
                                            }
                                        />
                                    </Grid.Col>
                                </Grid>
                            </Grid.Col>
                        )}

                        <Grid.Col span={6}>
                            <Title order={4} mb="lg">
                                Vokatry ny fitsarana
                            </Title>

                            <Grid gutter="xl">
                                <Grid.Col span={6}>
                                    <Radio.Group
                                        value={isAcceptedValue}
                                        onChange={setAcceptedValue}
                                        name="grosse.acceptedJudgement"
                                        label="Ekena sa Lavina ?"
                                        withAsterisk
                                        sx={{
                                            paddingBottom: 20,
                                            marginTop: -20,
                                        }}
                                        required
                                    >
                                        <Group mt="xs">
                                            <Radio value="true" label="Ekena" />
                                            <Radio
                                                value="false"
                                                label="Lavina"
                                            />
                                        </Group>
                                    </Radio.Group>
                                    <Textarea
                                        name="grosse.refuseCause"
                                        label="Anton'ny fanapahan-kevitrao"
                                        placeholder="Ampidiro eto ny anton'ny nahatonga ny fandraisana io fanapahan-kevitra io"
                                        onBlur={form.handleBlur}
                                        onChange={form.handleChange}
                                        value={form.values.grosse.refuseCause}
                                        error={form.errors.grosse?.refuseCause}
                                        autosize
                                        minRows={4}
                                        maxRows={6}
                                        style={{
                                            display:
                                                isAcceptedValue === 'true'
                                                    ? 'none'
                                                    : 'block',
                                        }}
                                    />
                                </Grid.Col>
                                <Grid.Col span={4}></Grid.Col>
                            </Grid>
                        </Grid.Col>
                    </Grid>
                </Box>
            </Paper>
        </React.Fragment>
    )
}

JudgmentResult.displayName = 'JudgmentResult Component'

export default JudgmentResult
