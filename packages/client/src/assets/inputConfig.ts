export const LoginConfig = {
	label: 'Логин',
	minLength: 3,
	maxLength: 20,
	placeholder: 'Введите логин',
	isRequired: true,
	name: 'Логин',
	errorText:
    'Логин должен содержать цифры (но полностью не состоять из них), буквы, длина от 3 до 20 символов',
};
export const PasswordConfig = {
	label: 'Пароль',
	minLength: 8,
	maxLength: 40,
	placeholder: 'Введите пароль',
	isRequired: true,
	name: 'Пароль',
	errorText: 'от 8 до 40 символов, английские буквы и цифры',
};
export const EmailConfig = {
	label: 'Адрес почты',
	minLength: 5,
	maxLength: 40,
	placeholder: 'Введите адрес почты',
	isRequired: true,
	name: 'Почта',
	errorText: 'Введите корректный адрес почты',
};
export const PhoneConfig = {
	label: 'Телефон',
	minLength: 10,
	maxLength: 15,
	placeholder: 'Введите номер телефона',
	isRequired: true,
	name: 'Телефон',
	errorText: 'от 10 до 15 символов, состоит из цифр, может начинаться с плюса.',
};
export const FirstNameConfig = {
	label: 'Имя',
	minLength: 1,
	maxLength: 40,
	placeholder: 'Введите имя',
	isRequired: true,
	name: 'Имя',
	errorText:
    'Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
};
export const SecondNameConfig = {
	label: 'Фамилия',
	minLength: 1,
	maxLength: 40,
	placeholder: 'Введите фамилию',
	isRequired: true,
	name: 'Фамилия',
	errorText:
    'Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
};
export const CheckPasswordConfig = {
	label: 'Пароль ещё раз',
	minLength: 8,
	maxLength: 40,
	placeholder: 'Введите пароль ещё раз',
	isRequired: true,
	name: 'Пароль ещё раз',
	errorText: 'Пароли должны совпадать',
};
