# share-secret

Simple website to share a secret with confidence.

## How it works

### Storing the secret

- Client enters a secret into the web interface
- The server securely stores this secret in Cloudflare KV using a unique UUID key and a 7-day Time-to-Live (TTL) to ensure secure access
- The server returns a unique link containing the UUID (e.g., https://share-secret.beaupletga.workers.dev/?secretKey=5ffbe83f-0af9-4fa9-bf2a-4da5fc3bab18)

### Getting 

- Client clicks on a shared link (e.g., https://share-secret.beaupletga.workers.dev/?secretKey=5ffbe83f-0af9-4fa9-bf2a-4da5fc3bab18)
- The server checks if the secret key exists in Cloudflare KV
    - If it does, the server retrieves the secret from memory and deletes it from Cloudflare KV
    - The server returns the shared secret to the client

![](https://github.com/beaupletga/share-secret/blob/master/assets/share-secret-homepage.png)
![](https://github.com/beaupletga/share-secret/blob/master/assets/share-secret-link.png)
![](https://github.com/beaupletga/share-secret/blob/master/assets/share-secret-retrieval.png)

