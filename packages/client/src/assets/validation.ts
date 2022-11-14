export enum Validation {
    LOGIN = '^[A-Za-z0-9_-]{3,20}$',
    PASSWORD = '^[A-Za-z0-9-_]{7,}$',
    EMAIL = '\\S+@\\S+\\.\\S+',
    PHONE = '(^[+]*)([0-9]{10,15})',
    NAME = '([A-ZА-Яa-zа-я-]+)'
}
