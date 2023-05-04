const userCredentials = [{
    username: 'nhan',
    password: '123',
    email: 'haha@mail.com'
}]
export const getUser = (email: string, password:string) => {
    const user = userCredentials.find((user) => user.email === email)
    if(user?.password === password) {
        return user
    }
    return undefined
}
