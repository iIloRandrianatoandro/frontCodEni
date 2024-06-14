/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * OpenCRVS is also distributed under the terms of the Civil Registration
 * & Healthcare Disclaimer located at http://opencrvs.org/license.
 *
 * Copyright (C) The OpenCRVS Authors. OpenCRVS and the OpenCRVS
 * graphic logo are (registered/a) trademark(s) of Plan International.
 */

const unit = [
    '',
    'iraika ',
    'roa ',
    'telo ',
    'efatra ',
    'dimy ',
    'enina ',
    'fito ',
    'valo ',
    'sivy ',
    'folo ',
    "iraika ambin'ny folo ",
    "roa ambin'ny folo ",
    "telo ambin'ny folo ",
    "efatra ambin'ny folo ",
    "dimy ambin'ny folo ",
    "enina ambin'ny folo ",
    "fito ambin'ny folo ",
    "valo ambin'ny folo ",
    "sivy ambin'ny folo ",
]

const ten = [
    '',
    '',
    'roapolo ',
    'telopolo ',
    'efapolo ',
    'dimapolo ',
    'enipolo ',
    'fitopolo ',
    'valopolo ',
    'sivy folo ',
]

const hundred = [
    '',
    'zato ',
    'roanjato ',
    'telonjato ',
    'efa-jato ',
    'dimanjato ',
    'eninjato ',
    'fitonjato ',
    'valonjato ',
    'sivinjato ',
]

const hours: string[] = [
    '',
    'iray',
    'roa',
    'telo',
    'efatra',
    'dimy',
    'enina',
    'fito',
    'valo',
    'sivy',
    'folo',
    "iraika ambin'ny folo",
    "roa ambin'ny folo",
]

const months: string[] = [
    '',
    'Janoary',
    'Febroary',
    'Martsa',
    'Aprily',
    'Mey',
    'Jona',
    'Jolay',
    'Aogositra',
    'Septambra',
    'Oktobra',
    'Novambra',
    'Desambra',
]

const monthsFr: string[] = [
    '',
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
]

function setUnitFr(currentNumber: number) {
    let frUnit = ''
    switch (currentNumber) {
        case 0:
            frUnit = 'zéro'
            break
        case 1:
            frUnit = 'un'
            break
        case 2:
            frUnit = 'deux'
            break
        case 3:
            frUnit = 'trois'
            break
        case 4:
            frUnit = 'quatre'
            break
        case 5:
            frUnit = 'cinq'
            break
        case 6:
            frUnit = 'six'
            break
        case 7:
            frUnit = 'sept'
            break
        case 8:
            frUnit = 'huit'
            break
        case 9:
            frUnit = 'neuf'
            break
    }
    return frUnit
}

function setTenFr(currentNumber: number) {
    let frTen = ''
    switch (currentNumber) {
        case 10:
            frTen = 'dix'
            break
        case 11:
            frTen = 'onze'
            break
        case 12:
            frTen = 'douze'
            break
        case 13:
            frTen = 'treize'
            break
        case 14:
            frTen = 'quatorze'
            break
        case 15:
            frTen = 'quinze'
            break
        case 16:
            frTen = 'seize'
            break
        case 17:
            frTen = 'dix-sept'
            break
        case 18:
            frTen = 'dix-huit'
            break
        case 19:
            frTen = 'dix-neuf'
            break
        case 20:
            frTen = 'vingt'
            break
        case 30:
            frTen = 'trente'
            break
        case 40:
            frTen = 'quarante'
            break
        case 50:
            frTen = 'cinquante'
            break
        case 60:
            frTen = 'soixante'
            break
        case 70:
            frTen = 'soixante-dix'
            break
        case 80:
            frTen = 'quatre-vingt'
            break
        case 90:
            frTen = 'quatre-vingt-dix'
            break
    }
    return frTen
}

export function setNumberToLetterWithFrLanguage(currentNumber: number) {
    let quotient,
        result = 0
    let numberToFrLetter = ''

    if (currentNumber.toString().replace(/ /gi, '').length > 15)
        return 'dépassement de capacité'
    if (isNaN(currentNumber.toString().replace(/ /gi, '') as any))
        return 'Nombre non valide'

    let toNumber = parseFloat(currentNumber.toString().replace(/ /gi, ''))
    if (Math.ceil(toNumber) != toNumber) return 'Nombre avec virgule non géré.'

    switch (toNumber.toString().length) {
        case 1:
            numberToFrLetter = setUnitFr(toNumber)
            break
        case 2:
            if (toNumber > 19) {
                quotient = Math.floor(toNumber / 10)
                result = toNumber % 10
                if (toNumber < 71 || (toNumber > 79 && toNumber < 91)) {
                    if (result == 0) numberToFrLetter = setTenFr(quotient * 10)
                    if (result == 1)
                        numberToFrLetter =
                            setTenFr(quotient * 10) + '-et-' + setUnitFr(result)
                    if (result > 1)
                        numberToFrLetter =
                            setTenFr(quotient * 10) + '-' + setUnitFr(result)
                } else
                    numberToFrLetter =
                        setTenFr((quotient - 1) * 10) +
                        '-' +
                        setTenFr(10 + result)
            } else numberToFrLetter = setTenFr(toNumber)
            break
        case 3:
            quotient = Math.floor(toNumber / 100)
            result = toNumber % 100
            if (quotient == 1 && result == 0) numberToFrLetter = 'cent'
            if (quotient == 1 && result != 0)
                numberToFrLetter =
                    'cent' + ' ' + setNumberToLetterWithFrLanguage(result)
            if (quotient > 1 && result == 0)
                numberToFrLetter = setUnitFr(quotient) + ' cents'
            if (quotient > 1 && result != 0)
                numberToFrLetter =
                    setUnitFr(quotient) +
                    ' cent ' +
                    setNumberToLetterWithFrLanguage(result)
            break
        case 4:
            quotient = Math.floor(toNumber / 1000)
            result = toNumber - quotient * 1000
            if (quotient == 1 && result == 0) numberToFrLetter = 'mille'
            if (quotient == 1 && result != 0)
                numberToFrLetter =
                    'mille' + ' ' + setNumberToLetterWithFrLanguage(result)
            if (quotient > 1 && result == 0)
                numberToFrLetter =
                    setNumberToLetterWithFrLanguage(quotient) + ' mille'
            if (quotient > 1 && result != 0)
                numberToFrLetter =
                    setNumberToLetterWithFrLanguage(quotient) +
                    ' mille ' +
                    setNumberToLetterWithFrLanguage(result)
            break
        case 5:
            quotient = Math.floor(toNumber / 1000)
            result = toNumber - quotient * 1000
            if (quotient == 1 && result == 0) numberToFrLetter = 'mille'
            if (quotient == 1 && result != 0)
                numberToFrLetter =
                    'mille' + ' ' + setNumberToLetterWithFrLanguage(result)
            if (quotient > 1 && result == 0)
                numberToFrLetter =
                    setNumberToLetterWithFrLanguage(quotient) + ' mille'
            if (quotient > 1 && result != 0)
                numberToFrLetter =
                    setNumberToLetterWithFrLanguage(quotient) +
                    ' mille ' +
                    setNumberToLetterWithFrLanguage(result)
            break
        case 6:
            quotient = Math.floor(toNumber / 1000)
            result = toNumber - quotient * 1000
            if (quotient == 1 && result == 0) numberToFrLetter = 'mille'
            if (quotient == 1 && result != 0)
                numberToFrLetter =
                    'mille' + ' ' + setNumberToLetterWithFrLanguage(result)
            if (quotient > 1 && result == 0)
                numberToFrLetter =
                    setNumberToLetterWithFrLanguage(quotient) + ' mille'
            if (quotient > 1 && result != 0)
                numberToFrLetter =
                    setNumberToLetterWithFrLanguage(quotient) +
                    ' mille ' +
                    setNumberToLetterWithFrLanguage(result)
            break
        case 7:
            quotient = Math.floor(toNumber / 1000000)
            result = toNumber % 1000000
            if (quotient == 1 && result == 0) numberToFrLetter = 'un million'
            if (quotient == 1 && result != 0)
                numberToFrLetter =
                    'un million' + ' ' + setNumberToLetterWithFrLanguage(result)
            if (quotient > 1 && result == 0)
                numberToFrLetter =
                    setNumberToLetterWithFrLanguage(quotient) + ' millions'
            if (quotient > 1 && result != 0)
                numberToFrLetter =
                    setNumberToLetterWithFrLanguage(quotient) +
                    ' millions ' +
                    setNumberToLetterWithFrLanguage(result)
            break
        case 8:
            quotient = Math.floor(toNumber / 1000000)
            result = toNumber % 1000000
            if (quotient == 1 && result == 0) numberToFrLetter = 'un million'
            if (quotient == 1 && result != 0)
                numberToFrLetter =
                    'un million' + ' ' + setNumberToLetterWithFrLanguage(result)
            if (quotient > 1 && result == 0)
                numberToFrLetter =
                    setNumberToLetterWithFrLanguage(quotient) + ' millions'
            if (quotient > 1 && result != 0)
                numberToFrLetter =
                    setNumberToLetterWithFrLanguage(quotient) +
                    ' millions ' +
                    setNumberToLetterWithFrLanguage(result)
            break
        case 9:
            quotient = Math.floor(toNumber / 1000000)
            result = toNumber % 1000000
            if (quotient == 1 && result == 0) numberToFrLetter = 'un million'
            if (quotient == 1 && result != 0)
                numberToFrLetter =
                    'un million' + ' ' + setNumberToLetterWithFrLanguage(result)
            if (quotient > 1 && result == 0)
                numberToFrLetter =
                    setNumberToLetterWithFrLanguage(quotient) + ' millions'
            if (quotient > 1 && result != 0)
                numberToFrLetter =
                    setNumberToLetterWithFrLanguage(quotient) +
                    ' millions ' +
                    setNumberToLetterWithFrLanguage(result)
            break
        case 10:
            quotient = Math.floor(toNumber / 1000000000)
            result = toNumber - quotient * 1000000000
            if (quotient == 1 && result == 0) numberToFrLetter = 'un milliard'
            if (quotient == 1 && result != 0)
                numberToFrLetter =
                    'un milliard' +
                    ' ' +
                    setNumberToLetterWithFrLanguage(result)
            if (quotient > 1 && result == 0)
                numberToFrLetter =
                    setNumberToLetterWithFrLanguage(quotient) + ' milliards'
            if (quotient > 1 && result != 0)
                numberToFrLetter =
                    setNumberToLetterWithFrLanguage(quotient) +
                    ' milliards ' +
                    setNumberToLetterWithFrLanguage(result)
            break
        case 11:
            quotient = Math.floor(toNumber / 1000000000)
            result = toNumber - quotient * 1000000000
            if (quotient == 1 && result == 0) numberToFrLetter = 'un milliard'
            if (quotient == 1 && result != 0)
                numberToFrLetter =
                    'un milliard' +
                    ' ' +
                    setNumberToLetterWithFrLanguage(result)
            if (quotient > 1 && result == 0)
                numberToFrLetter =
                    setNumberToLetterWithFrLanguage(quotient) + ' milliards'
            if (quotient > 1 && result != 0)
                numberToFrLetter =
                    setNumberToLetterWithFrLanguage(quotient) +
                    ' milliards ' +
                    setNumberToLetterWithFrLanguage(result)
            break
        case 12:
            quotient = Math.floor(toNumber / 1000000000)
            result = toNumber - quotient * 1000000000
            if (quotient == 1 && result == 0) numberToFrLetter = 'un milliard'
            if (quotient == 1 && result != 0)
                numberToFrLetter =
                    'un milliard' +
                    ' ' +
                    setNumberToLetterWithFrLanguage(result)
            if (quotient > 1 && result == 0)
                numberToFrLetter =
                    setNumberToLetterWithFrLanguage(quotient) + ' milliards'
            if (quotient > 1 && result != 0)
                numberToFrLetter =
                    setNumberToLetterWithFrLanguage(quotient) +
                    ' milliards ' +
                    setNumberToLetterWithFrLanguage(result)
            break
        case 13:
            quotient = Math.floor(toNumber / 1000000000000)
            result = toNumber - quotient * 1000000000000
            if (quotient == 1 && result == 0) numberToFrLetter = 'un billion'
            if (quotient == 1 && result != 0)
                numberToFrLetter =
                    'un billion' + ' ' + setNumberToLetterWithFrLanguage(result)
            if (quotient > 1 && result == 0)
                numberToFrLetter =
                    setNumberToLetterWithFrLanguage(quotient) + ' billions'
            if (quotient > 1 && result != 0)
                numberToFrLetter =
                    setNumberToLetterWithFrLanguage(quotient) +
                    ' billions ' +
                    setNumberToLetterWithFrLanguage(result)
            break
        case 14:
            quotient = Math.floor(toNumber / 1000000000000)
            result = toNumber - quotient * 1000000000000
            if (quotient == 1 && result == 0) numberToFrLetter = 'un billion'
            if (quotient == 1 && result != 0)
                numberToFrLetter =
                    'un billion' + ' ' + setNumberToLetterWithFrLanguage(result)
            if (quotient > 1 && result == 0)
                numberToFrLetter =
                    setNumberToLetterWithFrLanguage(quotient) + ' billions'
            if (quotient > 1 && result != 0)
                numberToFrLetter =
                    setNumberToLetterWithFrLanguage(quotient) +
                    ' billions ' +
                    setNumberToLetterWithFrLanguage(result)
            break
        case 15:
            quotient = Math.floor(toNumber / 1000000000000)
            result = toNumber - quotient * 1000000000000
            if (quotient == 1 && result == 0) numberToFrLetter = 'un billion'
            if (quotient == 1 && result != 0)
                numberToFrLetter =
                    'un billion' + ' ' + setNumberToLetterWithFrLanguage(result)
            if (quotient > 1 && result == 0)
                numberToFrLetter =
                    setNumberToLetterWithFrLanguage(quotient) + ' billions'
            if (quotient > 1 && result != 0)
                numberToFrLetter =
                    setNumberToLetterWithFrLanguage(quotient) +
                    ' billions ' +
                    setNumberToLetterWithFrLanguage(result)
            break
    }
    if (
        numberToFrLetter.substr(
            numberToFrLetter.length - 'quatre-vingt'.length,
            'quatre-vingt'.length
        ) == 'quatre-vingt'
    )
        numberToFrLetter = numberToFrLetter + 's'

    return numberToFrLetter
}

export function setTimeToCustomString(timeString: string) {
    const [hour, minute] = timeString.split(':')
    let newHour = parseInt(hour)
    const newMinute = parseInt(minute)
    let timePeriod = 'maraina'
    if (newHour <= 12 && newHour >= 10) timePeriod = 'atoandro'
    else if (newHour > 12) {
        if (newHour <= 16 && newHour >= 13) timePeriod = 'tolakandro'
        if (newHour <= 19 && newHour >= 17) timePeriod = 'hariva'
        if (newHour < 24 && newHour >= 20) timePeriod = 'alina'
        newHour = newHour - 12
    } else if (newHour === 0 && newMinute > 0) {
        return `roa ambin'ny folo ora sy ${setNumberToLetterForMalagasySpecificLanguage(
            newMinute
        )} minitra alina`
    } else if (newHour === 0 && newMinute === 0) {
        return `roa ambin'ny folo ora alina`
    }

    return `${
        hours[newHour]
    } ora sy ${setNumberToLetterForMalagasySpecificLanguage(
        newMinute
    )} minitra ${timePeriod}`
}

export function setDateCustomString(dateString: string) {
    const [year, month, day] = dateString.split('-')
    const dateValue =
        parseInt(day) === 1
            ? "voalohan'ny volana"
            : `${setNumberToLetterForMalagasySpecificLanguage(
                  parseInt(day)
              )}ny volana`

    return `${dateValue} ${
        months[parseInt(month)]
    }, taona ${setNumberToLetterForMalagasySpecificLanguage(parseInt(year))}`
}

export function setDateCustomStringWithFrLanguage(dateString: string) {
    const [year, month, day] = dateString.split('-')
    const dateValue =
        parseInt(day) === 1
            ? 'premier'
            : `${setNumberToLetterWithFrLanguage(parseInt(day))}`

    return `${dateValue} ${
        monthsFr[parseInt(month)]
    }, ${setNumberToLetterWithFrLanguage(parseInt(year))}`
}

export function setLocaleDateCustomString(dateString: string) {
    const [year, month, day] = dateString.split('-')
    return `${day} ${months[parseInt(month)]} ${year}` // return `${day}/${month}/${year}`
}

export function setNumberToLetterForMalagasySpecificLanguage(num: number) {
    const digitLength = num.toString()
    if (digitLength.length > 9) return 'mihoatra lavitra'
    const digits = ('000000000' + digitLength)
        .substr(-9)
        .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/)

    if (!digits) return
    let numberToLetter = ''
    numberToLetter +=
        digits[3] != '0'
            ? (parseInt(digits[3]) != 1
                  ? unit[Number(digits[3])] ||
                    ten[parseInt(digits[3][0])] +
                        ' ' +
                        unit[parseInt(digits[3][1])]
                  : '') + ' arivo '
            : ''
    if (digits[3] != '0' && digits[4] != '0')
        numberToLetter = ' sy ' + numberToLetter
    if (digits[3] != '0' && digits[4] == '0')
        numberToLetter = '' + numberToLetter
    numberToLetter =
        digits[4] != ''
            ? hundred[Number(digits[4])] +
              (parseInt(digits[3]) != 0 && parseInt(digits[4]) >= 0
                  ? numberToLetter
                  : '')
            : ''
    numberToLetter =
        digits[5] != '00'
            ? (unit[Number(digits[5])] ||
                  (unit[parseInt(digits[5][1])] != ''
                      ? unit[parseInt(digits[5][1])] +
                        ' amby ' +
                        ten[parseInt(digits[5][0])]
                      : ' ' + ten[parseInt(digits[5][0])])) +
              (numberToLetter != ''
                  ? numberToLetter != 'zato '
                      ? ' sy '
                      : ' amby '
                  : '') +
              numberToLetter
            : numberToLetter != ''
            ? numberToLetter
            : ' aotra'

    return numberToLetter
}

export function setNumberToLetterForMalagasySpecificLanguageV2(num: number) {
    const digitLength = num.toString()
    if (digitLength.length > 9) return 'mihoatra lavitra'
    const digits = ('000000000' + digitLength)
        .substr(-9)
        .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/)

    if (!digits) return
    let numberToLetter = ''
    numberToLetter +=
        digits[3] != '0'
            ? (parseInt(digits[3]) != 1
                  ? unit[Number(digits[3])] ||
                    ten[parseInt(digits[3][0])] +
                        ' ' +
                        unit[parseInt(digits[3][1])]
                  : '') + ' arivo '
            : ''
    if (digits[3] != '0' && digits[4] != '0')
        numberToLetter = ' sy ' + numberToLetter
    if (digits[3] != '0' && digits[4] == '0')
        numberToLetter = '' + numberToLetter
    numberToLetter =
        digits[4] != ''
            ? hundred[Number(digits[4])] +
              (parseInt(digits[3]) != 0 && parseInt(digits[4]) >= 0
                  ? numberToLetter
                  : '')
            : ''
    numberToLetter =
        digits[5] != '00'
            ? (unit[Number(digits[5])] ||
                  (unit[parseInt(digits[5][1])] != ''
                      ? unit[parseInt(digits[5][1])] +
                        ' amby ' +
                        ten[parseInt(digits[5][0])]
                      : ' ' + ten[parseInt(digits[5][0])])) +
              (numberToLetter != ''
                  ? numberToLetter != 'zato '
                      ? ' sy '
                      : ' amby '
                  : '') +
              numberToLetter
            : numberToLetter != ''
            ? numberToLetter
            : ' aotra'

    return numberToLetter
}

const ROMAN_NUMBERS = {
    I: 'Voalohany',
    II: 'Faharoa',
    III: 'Fahatelo',
    IV: 'Fahaefatra',
    V: 'Fahadimy',
    VI: 'Fahaenina',
    VII: 'Fahafito',
    VIII: 'Fahavalo',
    IX: 'Fahasivy',
    X: 'Fahafolo',
}

const CITY_TRANSFORMER = {
    Tana: 'Antananarivo',
    Majunga: 'Mahajanga',
    Tulear: 'Toliary',
    Diego: 'Antsiranana',
    Tamatave: 'Toamasina',
}

export const customizeOffice = (officeName: string) =>
    officeName
        .replace('Cu', '')
        .replace('CU', '')
        .replace('cu', '')
        .replace('C U', '')
        .replace('Tana', CITY_TRANSFORMER.Tana)
        .replace('TANA', CITY_TRANSFORMER.Tana)
        .replace('Majunga', CITY_TRANSFORMER.Majunga)
        .replace('MAJUNGA', CITY_TRANSFORMER.Majunga)
        .replace('Diego', CITY_TRANSFORMER.Diego)
        .replace('DIEGO', CITY_TRANSFORMER.Diego)
        .replace('Tamatave', CITY_TRANSFORMER.Tamatave)
        .replace('TAMATAVE', CITY_TRANSFORMER.Tamatave)
        .replace('Tulear', CITY_TRANSFORMER.Tulear)
        .replace('TULAER', CITY_TRANSFORMER.Tulear)
        .replace('VIII', ROMAN_NUMBERS.VIII)
        .replace('VII', ROMAN_NUMBERS.VII)
        .replace('VI', ROMAN_NUMBERS.VI)
        .replace('IV', ROMAN_NUMBERS.IV)
        .replace('V', ROMAN_NUMBERS.V)
        .replace('III', ROMAN_NUMBERS.III)
        .replace('II', ROMAN_NUMBERS.II)
        .replace('IX', ROMAN_NUMBERS.IX)
        .replace('X', ROMAN_NUMBERS.X)
        .replace('I', ROMAN_NUMBERS.I)

export const maxDob = (valideYob: number): Date => {
    const maxValideDob: Date = new Date(
        (new Date().getMonth() > 10
            ? (new Date().getMonth() + 1).toString()
            : '0' + (new Date().getMonth() + 1).toString()) +
            '/' +
            (new Date().getDate() > 10
                ? new Date().getDate().toString()
                : '0' + new Date().getDate().toString()) +
            '/' +
            (new Date().getFullYear() - valideYob).toString()
    )
    return maxValideDob
}
