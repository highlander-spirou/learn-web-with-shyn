interface Session {
    id: number,
    payload: {
        username: string,
        email: string
    }
}

const sessions: Session[] = []

export const getSession = (id: number | string) => {
    return sessions.find((session) => session.id == id)
}


export const createSession = (username: string, email: string) => {
    const existedSession = sessions.find((session) => session.payload.username === username || session.payload.email === email)
    if (existedSession) {
        return existedSession
    }
    else {
        const newSession = { id: sessions.length, payload: { username, email } }
        sessions.push(newSession)
        return newSession
    }
}


