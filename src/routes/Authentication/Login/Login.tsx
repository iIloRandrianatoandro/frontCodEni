import { BackgroundImage } from '@mantine/core';
import { useNavigate } from 'react-router-dom'
import LoginBackground from '@/assets/Login.png'
import LoginForm from '@/features/authentication/LoginForm'

const Login: React.FC = () => {
    const navigate = useNavigate()

    return (
        <BackgroundImage
            src={LoginBackground}
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <LoginForm navigate={navigate} />
        </BackgroundImage>
    )
}

Login.displayName = 'Login page'

export default Login
