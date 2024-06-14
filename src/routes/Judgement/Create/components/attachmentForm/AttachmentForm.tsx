import React from 'react'
import {
    Box,
    Grid,
    Title,
    Paper,
    FileInput,
} from '@mantine/core'
import { JudgmentRequestDto } from '@/features/judgement/state/types'
import { FormikProps } from 'formik'
import { convertToBase64 } from '@/features/judgement/utils'

interface ApplicationFormProps {
    form: FormikProps<JudgmentRequestDto>
}

const AttachmentForm: React.FC<ApplicationFormProps> = ({
    form,
}): JSX.Element => {
    return (
        <Paper p="xl" withBorder>
            <Box mx="auto">
                <Title order={3} sx={{ padding: 5 }}>
                    {'Fanampin-taratasy'}
                </Title>
                <Grid gutter="xl">
                    <Grid.Col span={6}>
                        <FileInput
                            id="attachedFiles[0].file"
                            name="attachedFiles[0].file"
                            placeholder="Sarin’ny taratasy fangatahana"
                            label={form.values.attachedFiles[0].name}
                            onChange={async (val) =>
                                form.setFieldValue(
                                    'attachedFiles[0].file',
                                    await convertToBase64(val!)
                                )
                            }
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <FileInput
                            id="attachedFiles[1].file"
                            name="attachedFiles[1].file"
                            placeholder="Sarin’ilay olona"
                            label={form.values.attachedFiles[1].name}
                            onChange={async (val) =>
                                form.setFieldValue(
                                    'attachedFiles[1].file',
                                    await convertToBase64(val!)
                                )
                            }
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <FileInput
                            id="attachedFiles[2].file"
                            name="attachedFiles[2].file"
                            placeholder="CIN vavolombelona 1(Recto)"
                            label={form.values.attachedFiles[2].name}
                            onChange={async (val) =>
                                form.setFieldValue(
                                    'attachedFiles[2].file',
                                    await convertToBase64(val!)
                                )
                            }
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <FileInput
                            id="attachedFiles[3].file"
                            name="attachedFiles[3].file"
                            placeholder="CIN vavolombelona 1(Verso)"
                            label={form.values.attachedFiles[3].name}
                            onChange={async (val) =>
                                form.setFieldValue(
                                    'attachedFiles[3].file',
                                    await convertToBase64(val!)
                                )
                            }
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <FileInput
                            id="attachedFiles[4].file"
                            name="attachedFiles[4].file"
                            placeholder="CIN vavolombelona 2(Recto)"
                            label={form.values.attachedFiles[4].name}
                            onChange={async (val) =>
                                form.setFieldValue(
                                    'attachedFiles[4].file',
                                    await convertToBase64(val!)
                                )
                            }
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <FileInput
                            id="attachedFiles[5].file"
                            name="attachedFiles[5].file"
                            placeholder="CIN vavolombelona 2(Verso)"
                            label={form.values.attachedFiles[5].name}
                            onChange={async (val) =>
                                form.setFieldValue(
                                    'attachedFiles[5].file',
                                    await convertToBase64(val!)
                                )
                            }
                        />
                    </Grid.Col>
                </Grid>
            </Box>
        </Paper>
    )
}

AttachmentForm.displayName = 'Attachment Compoment'

export default AttachmentForm
