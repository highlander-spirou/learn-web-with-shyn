# Refresh token trong bảo mật JWT

- Access token là 1 jwt token, nó lives rất ngắn, và chứa encoded infomation send from server

- Refresh token là 1 normal token, nó có span rất dài (months to years). Khi 1 request hits the server, server kiểm tra sự tồn tại của refresh token. Nếu có, nó sẽ recreate 1 access token (if expired) hoặc trả về 1 access-token. Nếu ko, nó sẽ raise error, và ta redirect người dùng về login

- App có 1 sessions object (lưu trong memcached, redis - for the sake of simplicity, bài này lưu trong 1 object). Khi 1 user login, nó sẽ tạo ra 1 Record để lưu trữ refreshToken

![session_token](/session-tokens-relationship.png)