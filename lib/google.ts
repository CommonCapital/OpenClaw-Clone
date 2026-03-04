import { google } from "googleapis";


export const GOOGLE_SCOPES = {
    gmail: [
        'https://www.googleapis.com/auth/gmail.readonly',
        'https://www.googleapis.com/auth/gmail.modify',
        'https://www.googleapis.com/auth/gmail.compose',
    ],
    google_calendar: [
        'https://www.googleapis.com/auth/calendar.readonly',
        'https://www.googleapis.com/auth/calendar.events',
    ],
} as const;
export type GoogleProvider = keyof typeof GOOGLE_SCOPES;

export function createOAuth2Client() {
    return new google.auth.OAuth2(
process.env.GOOGLE_CLIENT_ID!,
process.env.
    )
}