import { Get } from "../services/api_helpers"

export const GetAllAlimonies = () => {
    return Get('getallalimonies')
}

export const GetMustpay = () => {
    return Get('getallmustpays')
}

export const Getinsolvents = () => {
    return Get('getinsolvents')
}
