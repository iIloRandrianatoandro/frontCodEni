import React from 'react'
import { useReactToPrint } from 'react-to-print'
import { IconPrinter } from '@tabler/icons-react'
import { Box, Button, Divider, Group, Modal } from '@mantine/core'

interface PrintAttachmentModalProps {
    openedPrintModal: boolean
    onClosePrintModal: () => void
    file: string
    contentForm?: JSX.Element
}

const PrintAttachmentModal: React.FC<PrintAttachmentModalProps> = ({ openedPrintModal, onClosePrintModal, file, contentForm }): JSX.Element => {

    const printRef: React.RefObject<HTMLDivElement> =
    React.useRef<HTMLDivElement>(null)
    const printAttachmentFile = useReactToPrint({
        content: () => printRef.current,
    })

    return (
        <React.Fragment>
                <Modal
                    opened={openedPrintModal}
                    onClose={onClosePrintModal}
                    title='Imprimer des fichiers jointes'
                    size='55rem'
                >
                    <Divider sx={{margin: 1}}/>
                    <Box
                        component={'div'}
                        ref={printRef}
                        sx={{ display: 'flex', justifyContent: 'center' }}
                    >
                        {
                            (file.toString().length > 0)
                            ?
                            <React.Fragment>
                                <embed src={file} width={620} height={420}/>
                            </React.Fragment>
                            :
                            <React.Fragment>
                                {contentForm}
                            </React.Fragment>
                        }
                    </Box>
                    <Divider sx={{margin: 1}}/>
                    <Group position='right' mt='xl'>
                        <Button
                            variant='outline'
                            onClick={onClosePrintModal}
                            size='lg'
                        >
                            Fermer
                        </Button>
                        <Button
                            leftIcon={<IconPrinter />}
                            variant='filled'
                            onClick={() => {
                                printAttachmentFile()
                            }}
                            size='lg'
                        >
                            Imprimer
                        </Button>
                    </Group>
                </Modal>
        </React.Fragment>
    );
};

PrintAttachmentModal.displayName='PrintAttachmentModal component'

export default PrintAttachmentModal
