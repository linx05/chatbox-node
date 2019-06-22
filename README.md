# chatbox-node 🚀

## **Models**

### User

  ```json
  {
    "_id": "ObjectId",
    "name": "String",
    "email": "String",
    "active": "Boolean",
    "username": "String",
    "password": "String"
  }
  ```
  
### Message

  ```json
  {
    "users": ["ObjectId", "ObjectId"],
    "from": "ObjectId",
    "to": "ObjectId",
    "date": "Date",
    "data": "String"
  }
  ```
  
### User Status

  ```json
  {
    "user": {
    "_id": "ObjectId",
    "name": "String",
    "username": "String"
    },
    "status": "String",
    "last_connected": "Date"
  }
  ```

## **Endpoints**

> All the endpoints with a 🔐 require authentication. To authenticate you need to make the request with a header called `Authorization`, which value is `Bearer {YOUR_JWT_GOES HERE}`.

---

### _Users_

- **POST** `/api/users`

  > Creates a new user

  ```json
  {
    "name": "Test User",,
    "username": "username",
    "email": "email@example.com",
    "password": "password"
  }
  ```

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
  
- 🔐 **GET** `/api/chats/conversation/:otherUserId`

  > Returns a list messages between the authenticated user and another user.
  
**Query Parameters**
      
`sort`: 
  - Parameter to sort by `message` property.
  - Can be appended with `-` to sort by descending.
  - Default to `-date`.

`skip`:
  - Parameter to skip certain amount of records.
  - Defaults to none.

`limit`:
  - Parameter to limit number or results.
  - Defaults to `100`.

- 🔐 **POST** `/api/chats/message`
  > Creates a new message
  ```json
  {
    "to": "5d0c503560436c5b996dde96", // User ID
    "data": "A message" // The message
  }
  ```

---
