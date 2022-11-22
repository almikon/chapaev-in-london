export enum Validation {
    PASSWORD = '(?=.*[A-Za-z0-9]).{8,40}',
    LOGIN = '^(?=.*[A-Za-z])[A-Za-z0-9-_]{3,20}$',
    EMAIL = '^\\S+@\\S+\\.\\S+$',
    NAME = '^[A-ZА-Я][a-zа-я-]*$',
    PHONE = '^([8]|(\\+7))[0-9]{10,15}$'
}