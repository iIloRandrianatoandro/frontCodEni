//https://fakeapi.platzi.com/en/rest/auth-jwt

const constants = {
    api: {
        baseURL:
            import.meta.env.VITE_API_BASE_URL ??
            'https://api.escuelajs.co/api/v1',
        locationBaseURL: import.meta.env.VITE_LOCATION_BASE_URL ?? '',
    },
    layout: {
        drawer: {
            key: 'kc_iam_layout_drawer_state',
            open: 'open',
            closed: 'closed',
            width: 240,
        },
    },
    storage: {
        authentication: 'persist:authentication',
    },
    routes: {
        root: '/',
        login: '/login',
        register: '/register',
        judgement: 'judgment/demand/list',
        demand: {
            parent: 'demand',
            create: ':create',
            update: ':update',
        },
    },
    filter: {
        value: {
            all: 'all',
            done: 'done',
            inprogress: 'inprogress',
            waiting: 'waiting',
            answered: 'answered',
            rejected: 'rejected',
        },
    },
    pagination: {
        perPage: 10,
    },
    nuiGenerator: {
        nuiGeneratorUrl: import.meta.env.VITE_NUI_GENERATOR_URL,
        nuiGeneratorToken: import.meta.env.VITE_NUI_GENERATOR_TOKEN,
    },
    progressionState: {
        done: 'Vita',
        inprogress: 'Mandroso',
        rejected: 'Nolavina',
        waiting: 'Miandry',
        all: 'Rehetra',
    },
    progressStepColor: {
        stepDone: '#CFD8DC',
        stepOrStatusInprogress: '#FFBF00',
        stepOrStatusRejected: '#DB262A',
        statusComplete: '#168E54',
    },
    progressStepStepLevel: {
        fokontany: 'fokontany',
        municipality: 'firaisana',
        doctor: 'doctor',
        tpi: 'tpi',
    },
    maritalStatus: {
        divorced: 'Nisara-bady',
        married: 'Vita soratra ara-panjakana',
        not_stated: 'Tsy voambara',
        separated: 'Nisaraka',
        single: 'Mpitovo',
        widowed: 'Maty vady',
    },
}

export default constants
