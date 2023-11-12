# share-secret

Simple website to share a secret with confidence. It works by storing the shared secret in a temporary, encrypted location and providing users with a unique link to access the information. After a specified period, the secret self-destructs, ensuring confidentiality.

## How it works

### Storing the secret

- Client enters a secret into the web interface
- The server securely stores this secret in Cloudflare KV using a unique UUID key and a 7-day Time-to-Live (TTL) to ensure secure access
- The server returns a unique link containing the UUID (e.g., https://share-secret.beaupletga.workers.dev/?secretKey=5ffbe83f-0af9-4fa9-bf2a-4da5fc3bab18)

### Getting the secret

- Client clicks on a shared link (e.g., https://share-secret.beaupletga.workers.dev/?secretKey=5ffbe83f-0af9-4fa9-bf2a-4da5fc3bab18)
- The server checks if the secret key exists in Cloudflare KV
    - If it does, the server retrieves the secret from memory and deletes it from Cloudflare KV
    - The server returns the shared secret to the client

### Destruction of the secret

The stored secret self-destructs after 7 days or when accessed by a recipient, ensuring that sensitive information remains confidential and does not persist indefinitely.

Homepage:
![](https://github.com/beaupletga/share-secret/blob/master/assets/share-secret-homepage.png)

Get the link:
![](https://github.com/beaupletga/share-secret/blob/master/assets/share-secret-link.png)

After opening the link:
![](https://github.com/beaupletga/share-secret/blob/master/assets/share-secret-retrieval.png)

