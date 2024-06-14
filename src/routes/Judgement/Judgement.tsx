import { Box } from '@mantine/core'
import { Button } from '@mantine/core'
import { IconCirclePlus } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

const Judgement: React.FC = () => {
    const navigate = useNavigate()
    return (
        <>
            <Button
                bg={"cadet"}
                onClick={() => navigate('create')}
                size="lg"
                leftIcon={<IconCirclePlus />}
            >
                Hampiditra
            </Button>
        </>
    )
}

Judgement.displayName = 'Judgement page'

export default Judgement
