export interface EmailRequest {
    to: string[];
    cc?: string[];
    bcc?: string[];
    subject: string;
    text: string;
}
