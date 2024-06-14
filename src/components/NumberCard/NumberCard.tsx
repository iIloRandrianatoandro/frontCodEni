import React from 'react'
import { Box } from '@mantine/core'
import { Divider, Grid, Paper, Text } from '@mantine/core'

interface NumberCardProps {
    title: string
    value: number
    numberState?: React.ReactNode
}

const NumberCard: React.FC<NumberCardProps> = ({title, value, numberState}) => {
    return (
        <Paper
            withBorder
            p='xl'
            maw={900}
            mah={900}
            mih={250}
            shadow='xs'
        >
        <Text sx = {{ padding: 3 }}>
            { title }
        </Text>
        <Divider my='sm'/>
        <Box>
            <Grid
                gutter={5}
                gutterXs='md'
                gutterMd='xl'
                gutterXl={50}
            >
                <Grid.Col span={12} sx={{ fontSize: 45, textAlign: 'center' }}>
                    {value}
                </Grid.Col>
            </Grid>
        </Box>
        <Box>
            {numberState}    
        </Box>
    </Paper>
    );
};

NumberCard.displayName='NumberCard Component'

export default NumberCard;