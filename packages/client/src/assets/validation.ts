export enum Validation {
    PASSWORD = '(?=.*[A-Za-z0-9]).{8,40}',
    LOGIN = '^[A-Za-z0-9]{3,20}$',
    DISPLAY_NAME = '^[A-Za-z0-9]{3,20}$',
    EMAIL = '^\\S+@\\S+\\.\\S+$',
    NAME = '^[A-ZА-Я][a-zа-я-]*$',
    PHONE = '([+]*[0-9]+){10,15}'
}
