import React from 'react'
import { Badge, Grid } from '@mantine/core'

interface NUmberStateProps {
    status?: string
    total?: number
    percentage?: number
}

const NumberState: React.FC<NUmberStateProps> = ({
    status,
    total,
    percentage,
}): JSX.Element => {
    return (
        <React.Fragment>
            <Grid>
                <Grid.Col span={8}>
                    {status}: {total}
                </Grid.Col>
                <Grid.Col span={4}>
                    <Badge
                        color={
                            status?.toString().toLowerCase() === 'rejeté'
                                ? 'red'
                                : 'green'
                        }
                        sx={{ marginLeft: -12 }}
                    >
                        {`${percentage} %`}
                    </Badge>
                </Grid.Col>
            </Grid>
        </React.Fragment>
    )
}

NumberState.displayName = 'NumberState Component'

export default NumberState
