export interface loginResponse
{
    result: |tokenResponse,
    success: boolean
}

export interface tokenResponse
{
    access_token: string,
    refresh_token: string
}