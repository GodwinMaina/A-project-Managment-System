export interface User{
    user_id:string;
    userName:string;
    email:string
    Password:string;

}

export interface loginUserDetails{
    user_id: string,
    userName:string;
    email: string,
    isWelcomed: boolean
}