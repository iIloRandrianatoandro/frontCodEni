export const handleNaNValue = (value: any): number => {
    return isNaN(value) ? 0 : value
}

export const filterByState = (judgements: any[], state: string) => {
    return judgements.filter((judgement) => {
        return judgement.progression?.state.toString().toLowerCase() === state
    })
}

export const filterByStep = (judgements: any[], step: string) => {
    return judgements.filter((judgement) => {
        return judgement.progression?.step.toString().toLowerCase() === step
    })
}

export const filterBy = (judgements: any[], step: string, state: string) => {
    return judgements.filter((judgement) => {
        return (
            judgement.progression?.state.toString().toLowerCase() === state &&
            judgement.progression?.step.toString().toLowerCase() === step
        )
    })
}
