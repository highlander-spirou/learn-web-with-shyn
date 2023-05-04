import jwt from 'jsonwebtoken'

const secret_key = `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEArwY8WHEw2oywIIHFozf56FSi5WrVVtzohV572LTxWQV1ZkbP
kTGV9fGJvAkSHNHJHy6XCzS9Q1HoPrQRdjeKSSeoT2chCa8wjubIY/meDSGvq16C
4RjtmNn2EKqfYJ36hPRzOmnRyES9OzzOjdgdhBAv8hOdhbvB7ZyqbAHIW/I7a+LS
G/wAlIa/wKcqvLiMWzsnI7SWPoDheNWjX26Mjs4U3W48KSG4+Hn2ntaXJrkrFFeZ
xR25yNOBUl8C5DSIIXxDzqcfgwrTk/lszUn0vBZ+/X/JzkLT3lUURmjUzB8Fhncm
F/FIjvRdesSodoB/z0YR85D7BAlvm/hKSqj5lQIDAQABAoIBAEsnZVAgwnaFxLcg
oinUxmWBujTCq/rRfrKOAKXsBFpSYrfZHhXdceQapCbuyi0/05mlGsyAB+jZSd1q
2rilXqbM9ZOq19/drv8dj9yF+dzvowv12EMpvhRNO0Cq0ybcjw76HGRvvdm90neW
Q6darknf3YaX76LWHY6XIAKivVLlOCa7vAF4ILv4VaNxJRWToMfrCUheEaf347k1
aN301AlZtJ/sqhN2tesfYBMgraWul0O89x45nle0BkLJB/UAd//KA1HRn2udLfLE
1wAL8C04ONioU93SpfPe2A39M7HKEAN3rJdOddbFhoN63dSKmB7SJSmrZnGoH2TY
f5h5aH0CgYEA8uOJ5K6HNY7BVz5DGK9sdrYIbrz3yBJXe93lEIUsz36HBVDN6gU3
Ra7gZ8E+wcZCucdP9xT3Q94SC8XZooIi8BCmRiXrbbTKHNcnHPCFGMiFLSXRTau2
TPU1xct1B/ecpv0B/JZvvCOjXj7JwNRUEee9PoO4Vm+wrftwyF8Vk7sCgYEAuHji
KKXBspiYynDq3aMleTLLmnyO4hzmp5glTvw6Wg8NRHYLdO9yLMAhtjcASbA5MVGA
5C9iSWb4+D0jNBkt520SHLx0w0Bso2p6G+2pqoRC/ANRi3GkoIqYww0mDhn8USZ+
ZSVz2yuURF8upWBAow4A4479SzpO3g49ngVwSu8CgYA+Whs0EXm0TglkFB+1XpNB
hklz5B7XxZ2ftr7vFsECI0EWJEA4K06dHN+OwxUROYw3lOr6Su+PBJstWoUcKrw9
VIjayTE+4IJiFPl9fGEuk4tco7Cvd7081FYRiMFqYi5cz+aKqTPV4HA36XZxghBy
6EK0oavYxKNehoXValNnsQKBgQCkyR9FriQkVNoP5OR5DlbYOD7WhrPgWm7UgT26
m+fIMS/p2wUK9SZpwUucCO/R44CDhMn9jDJhXYHDxmFfFasC01TdpJ8tF6y0IdZo
gloQf0uS8afzR5YG7yfc/S7kY+QX3aoE0nr26qvsk5YIlr3GqiizHjU38SMoi1IR
icwwswKBgASJx+I1rItmWk9ULza0s4qKMZ+2d9ogG9oVLNxqW80UBPFDadXe0c2L
VGGWU8Jew85U0NmKr67oZWhwypjhPgYaopA2Srn/AObebjZHoAW5jkuG5fbufmT9
U2baFrXR/f6fZbscHYKASSoYfnxZgUoS9kQzT8LEoUn/rJ8Ml0LF
-----END RSA PRIVATE KEY-----`

const public_key = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArwY8WHEw2oywIIHFozf5
6FSi5WrVVtzohV572LTxWQV1ZkbPkTGV9fGJvAkSHNHJHy6XCzS9Q1HoPrQRdjeK
SSeoT2chCa8wjubIY/meDSGvq16C4RjtmNn2EKqfYJ36hPRzOmnRyES9OzzOjdgd
hBAv8hOdhbvB7ZyqbAHIW/I7a+LSG/wAlIa/wKcqvLiMWzsnI7SWPoDheNWjX26M
js4U3W48KSG4+Hn2ntaXJrkrFFeZxR25yNOBUl8C5DSIIXxDzqcfgwrTk/lszUn0
vBZ+/X/JzkLT3lUURmjUzB8FhncmF/FIjvRdesSodoB/z0YR85D7BAlvm/hKSqj5
lQIDAQAB
-----END PUBLIC KEY-----`

interface AccessTokenPayload {
    username: string
    email: string
}

export const createAccessToken = (payload: AccessTokenPayload) => {
    return jwt.sign(payload, secret_key, { algorithm: "RS256", expiresIn: '1m' })
}

export const verifyAccessToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, public_key)
        return { payload: decoded }
    } catch (error: any) {
        return null
    }
}

export const createRefreshToken = (sessionId: number) => {
    return jwt.sign({ id: sessionId }, 'refresh-token-key', { expiresIn: '1y' })
}

export const verifyRefreshToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, 'refresh-token-key') as { id: number | string }
        return { payload: decoded }
    } catch (error: any) {
        return null
    }
}
