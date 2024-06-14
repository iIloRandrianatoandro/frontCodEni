import React from 'react'
import { Select, Text } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'

interface LocalizationProps {
    identifier: string
    type: string
    label: string
    data?: string[]
    handleChange?: (value: string) => void
}

const Localization: React.FC<LocalizationProps> = ({
    identifier,
    type,
    label,
    data,
    handleChange,
}): JSX.Element => {
    return (
        <React.Fragment>
            {type === 'select' ? (
                <Select
                    id={`localization_${identifier}`}
                    name={`localization_${identifier}`}
                    label={label}
                    variant="filled"
                    sx={{ paddingTop: 8 }}
                    rightSection={<IconChevronDown size="1rem" />}
                    rightSectionWidth={30}
                    styles={{
                        rightSection: { pointerEvents: 'none' },
                    }}
                    data={data ? data : []}
                    onChange={(e) => {
                        handleChange!(e!)
                    }}
                />
            ) : type === 'text' ? (
                <Text id={`localization_${identifier}`}>{label}</Text>
            ) : (
                <Text id={`localization_${identifier}`}>{label}</Text>
            )}
        </React.Fragment>
    )
}

Localization.displayName = 'Location component'

export default Localization
