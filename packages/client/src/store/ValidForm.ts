import { makeObservable, observable} from 'mobx'

class ValidForm {
    validLogin = false
    validPassword = false
    validForm = false
    validEmail = false
    validFirstName = false
    validSecondName = false
    validPhone = false
    validCheckPassword = false
    
    constructor(){
        makeObservable(
            this,
            {
                validLogin: observable,
                validPassword: observable,
                validEmail: observable,
                validFirstName: observable,
                validSecondName: observable,
                validPhone: observable,
                validCheckPassword: observable,
                validForm: observable
            },
            { deep:true }
    )
}
}

export default new ValidForm()