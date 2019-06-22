# chatbox-node 🚀

## **Endpoints**

> All the endpoints with a 🔐 require authentication. To authenticate you need to make the request with a header called `Authorization`, which value is `Bearer {YOUR_JWT_GOES HERE}`.

---

### _Users_

- **POST** `/api/users`

  > Creates a new user

  ```json
  {
    "username": "username",
    "email": "email@example.com",
    "password": "password"
  }
  ```

- 🔐 **GET** `/api/users/all`
  > This will return all the registered users

---

### _Authentication_

- **POST** `/api/auth/token`

  > This endpoint will return a JWT, make sure to save this token somewhere in the application. You will need it for using other endpoints.

  ```json
  {
    "login": "email/username",
    "password": "password"
  }
  ```

---

### _Chat_

- 🔐 **GET** `/api/chats/connect`

  > This will set your user with an _ONLINE_ status

- 🔐 **GET** `/api/chats/connected`

  > Returns a list of connected users

- 🔐 **GET** `/api/chats/users`

  > Returns a list of users and their status

- 🔐 **POST** `/api/chats/message`
  > Creates a new message
  ```json
  {
    "to": "5d0c503560436c5b996dde96", // User ID
    "data": "A message" // The message
  }
  ```

---