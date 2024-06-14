import React, { useState } from 'react'
import { IconEye, IconPrinter } from '@tabler/icons-react'
import { Button, Checkbox, Grid, Group, Text } from '@mantine/core'
import { AttachmentStatus } from '@/components/AttachmentItem/AttachmentType'
import { PrintAttachmentModal } from '@/components/AttachmentItem/components/PrintAttachmentModal'
import { DisplayAttachmentModal } from '@/components/AttachmentItem/components/DisplayAttachmentModal'

interface AttachmentItemProps {
    title: string
    name: string
    file: string
    action?: JSX.Element
    status?: string
    contentForm?: JSX.Element
}

const AttachmentItem: React.FC<AttachmentItemProps> = ({
    title,
    name,
    file,
    status,
    contentForm,
}): JSX.Element => {
    const [openDisplayModal, setOpenDisplayModal] = useState(false)
    const [openPrintModal, setOpenPrintModal] = useState(false)

    const handleCheckboxClick = (e: {
        preventDefault: () => void
        stopPropagation: () => void
    }) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const onOpenDisplayModal = () => {
        setOpenDisplayModal(true)
    }
    const onCloseDisplayModal = () => {
        setOpenDisplayModal(false)
    }

    const onOpenPrintModal = () => {
        setOpenPrintModal(true)
    }
    const onClosePrintModal = () => {
        setOpenPrintModal(false)
    }

    return (
        <React.Fragment>
            <Grid>
                <Grid.Col span={4}>
                    <Grid>
                        <Grid.Col span={1} sx={{ marginTop: 15 }}>
                            {status === AttachmentStatus.FOUND ? (
                                <Checkbox
                                    defaultChecked
                                    readOnly
                                    onClick={handleCheckboxClick}
                                />
                            ) : (
                                <Checkbox disabled indeterminate />
                            )}
                        </Grid.Col>
                        <Grid.Col span={10}>
                            <Text sx={{ padding: 12 }}>{title}</Text>
                        </Grid.Col>
                    </Grid>
                </Grid.Col>

                <Grid.Col span={6}>
                    <Text sx={{ padding: 12 }}>{name}</Text>
                </Grid.Col>

                <Grid.Col span={2}>
                    <Group sx={{ padding: 10 }}>
                        {status === AttachmentStatus.FOUND ? (
                            <Button color="red" onClick={onOpenDisplayModal}>
                                {' '}
                                <IconEye />
                            </Button>
                        ) : (
                            <Button
                                color="red"
                                data-disabled
                                onClick={onOpenDisplayModal}
                            >
                                {' '}
                                <IconEye />
                            </Button>
                        )}
                        {status === AttachmentStatus.FOUND ? (
                            <Button color="#110B11" onClick={onOpenPrintModal}>
                                {' '}
                                <IconPrinter />
                            </Button>
                        ) : (
                            <Button
                                color="#110B11"
                                data-disabled
                                onClick={onOpenPrintModal}
                            >
                                <IconPrinter />
                            </Button>
                        )}
                    </Group>
                </Grid.Col>
            </Grid>

            <DisplayAttachmentModal
                openedDisplayModal={openDisplayModal}
                onCloseDisplayModal={onCloseDisplayModal}
                file={file}
                contentForm={contentForm}
            />

            <PrintAttachmentModal
                openedPrintModal={openPrintModal}
                onClosePrintModal={onClosePrintModal}
                file={file}
                contentForm={contentForm}
            />
        </React.Fragment>
    )
}

AttachmentItem.displayName = 'AttachmentItem'

export default AttachmentItem
