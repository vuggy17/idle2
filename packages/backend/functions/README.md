###  This function is not available yet

# ⚡ Replicate appwrite user to database

## Why cannot use yet
Appwrite function ip lookup resulted in 5 ips and it likely to change after each deployment
=> I cannot find a way to whitelist it's ip to an RDS security group yet 

## When

Run only when user has their email verified

## 🧰 Usage

### GET /

- Returns a "Hello, World!" message.

**Response**

Sample `200` Response:

```text
Hello, World!
```


## ⚙️ Configuration

| Setting           | Value                          |
| ----------------- | ------------------------------ |
| Runtime           | Node (18.0)                    |
| Entrypoint        | `dist/src/main.js`             |
| Root directory    | `packages/backend/functions`   |
| Build Commands    | `npm install && npm run build` |
| Permissions       | `any`                          |
| Timeout (Seconds) | 15                             |

## 🔒 Environment Variables

```
DATABASE_URL: postgres database url
```
