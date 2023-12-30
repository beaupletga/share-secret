import ResponseService from './response';

export interface Env {
	sharesecretnamespace: KVNamespace;
}

async function saveSecret(env: Env, secret: string): Promise<string> {
	const key = crypto.randomUUID()
	const sevenDaysInSeconds = 60 * 60 * 24 * 7

	await env.sharesecretnamespace.put(key, secret, { expirationTtl: sevenDaysInSeconds });

	return key
}

async function getSecret(env: Env, key: string): Promise<string | null> {
	const value = await env.sharesecretnamespace.get(key);

	return value
}

function parseSecretKey(request: Request): string | null {
	const { searchParams } = new URL(request.url)

	const secretKey = searchParams.get('secretKey')
	return secretKey
}

async function deleteAllSecrets(env: Env) {
	const secrets = await env.sharesecretnamespace.list()

	secrets.keys.map(key => env.sharesecretnamespace.delete(key.name))
}

async function deleteSecret(env: Env, key: string) {
	await env.sharesecretnamespace.delete(key)
}

async function parseSecret(request: Request): Promise<string | null> {
	const contentType = request.headers.get("content-type");

	if (!contentType) {
		console.log("Content-Type header is missing");
		return null
	}

	if (!contentType.includes("multipart/form-data")) {
		console.log("Content-Type must be multipart/form-data");
		return null
	}

	const formData = await request.formData();
	for (const entry of formData.entries()) {
		if (entry[0] == "secretValue") {
			return entry[1]
		}
	}
	console.log("secretValue property is missing in the request body");
	return null
}

function getSecretLink(request: Request, secretKey: string): string {
	return `${request.url}?secretKey=${secretKey}`
}

async function handleRequest(request: Request, env: Env): Promise<Response> {
	const queryKey = parseSecretKey(request)
	const method = request.method
	const url = new URL(request.url)

	console.log(url, method, queryKey)

	if (method === 'GET' && url.pathname === '/' && queryKey) {
		const secret = await getSecret(env, queryKey)
		if (secret === null) {
			return ResponseService.getSecretNotFound()
		}
		await deleteSecret(env, queryKey)
		return ResponseService.getSecret(secret)
	}
	if (method === 'POST') {
		const secret = await parseSecret(request)
		if (secret === null) {
			return ResponseService.getSecretForm()
		}
		const secretKey = await saveSecret(env, secret)
		const secretLink = getSecretLink(request, secretKey)
		return ResponseService.getSecretLink(secretLink)
	}

	return ResponseService.getSecretForm()
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {

		return handleRequest(request, env)
	},
};
