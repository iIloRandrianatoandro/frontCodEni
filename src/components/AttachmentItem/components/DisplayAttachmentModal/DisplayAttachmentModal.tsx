import React from 'react'
import { Button, Divider, Group, Modal } from '@mantine/core'

interface AttachmentModalProps {
    openedDisplayModal: boolean
    onCloseDisplayModal: () => void
    file: string
    contentForm?: JSX.Element
}

const DisplayAttachmentModal: React.FC<AttachmentModalProps> = ({
    openedDisplayModal,
    onCloseDisplayModal,
    file,
    contentForm,
}): JSX.Element => {
    return (
        <React.Fragment>
            <Modal
                opened={openedDisplayModal}
                onClose={onCloseDisplayModal}
                title="Mombamomba ny taratasy" // TODO LATER ==> TOKONY HO MIOVAOVA ISAKA NY TYPE NY PIECE ITY
                size="55rem"
            >
                <Divider sx={{ margin: 1 }} />
                {file.toString().length > 0 ? (
                    <React.Fragment>
                        <embed src={file} width={620} height={420} />
                    </React.Fragment>
                ) : (
                    <React.Fragment>{contentForm}</React.Fragment>
                )}
                <Divider sx={{ margin: 1 }} />
                <Group position="right" mt="xl">
                    <Button
                        variant="outline"
                        onClick={onCloseDisplayModal}
                        size="lg"
                    >
                        Akatona
                    </Button>
                </Group>
            </Modal>
        </React.Fragment>
    )
}

DisplayAttachmentModal.displayName = 'DisplayAttachmentModal component'

export default DisplayAttachmentModal
