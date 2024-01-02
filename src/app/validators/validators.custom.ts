import { AbstractControl, FormGroup } from "@angular/forms";

export class Valide{
    constructor(){

    }

    passwordMatch(formCurrent : AbstractControl | FormGroup):any {
        const password = formCurrent.get('password')?.value;
        const passwordConfirm = formCurrent.get('checkPassword')?.value;
        return (password === passwordConfirm) ? null : {'mismatch' : true};
    }
}