export interface userSchema{
    id: number,
    rolid: number,
    nombre: string,
    apellido: string,
    telefono: string,
    observacion: string,
    ad: string,
    correo: string,
    tipoUsuario: string,
    estado: boolean
}

export interface roleShema{
    id: number,
    nombre: string,
    descripcion: string,
    estado: boolean,
}

export interface credentiaView{
    id: number,
    Username: string,
    Correo: string,
}