import { json } from "react-router-dom"

export const TOKEN_KEY = 'token'
export const TOKEN_EXPIRATION = 'token-expiration'
export const EXPIRED = 'expired'


export function addAuthToken(token) {
    const expiration = new Date()
    expiration.setHours(expiration.getHours() + 1)

    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(TOKEN_EXPIRATION, expiration.toISOString())
}


export function getAuthToken() {
    const token = localStorage.getItem(TOKEN_KEY)
    const tokenDuration = getTokenDuration()
    console.log(tokenDuration);


    if (!token)
        return null

    if (tokenDuration <= 0)
        return EXPIRED

    return token
}

export function removeAuthToken() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(TOKEN_EXPIRATION)
}

export function tokenLoader() {
    return getAuthToken() || null
}

export function isAuthenLoader() {
    const token = getAuthToken()
    if (!token)
        throw json({ message: 'You need to sign in to add new event!' }, { status: 401 })
    else
        return token
}

export function getTokenDuration() {
    const expirationISO = localStorage.getItem(TOKEN_EXPIRATION)
    const expiration = new Date(expirationISO)
    const now = new Date()
    return expiration.getTime() - now.getTime()
}