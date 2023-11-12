const STYLE = `
	<style>
		.column-layout {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
		.row-layout {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
		}

		header {
			padding: 4% 0 0 0;
			height: 120px;
			text-align:center;
			margin-bottom: 2%;
		}

		#secretValue {
			height: 300px;
			width: 600px;
			background-color: #dee2e6;
			border: 1px solid #a9a2a2;
			box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		}

		#submit-container {
		}

		a{
			text-decoration: none;
			color: inherit;
		}

		#subtitle {
		}

		#link{
			margin-top: 20px;
			padding: 16px;
			background-color: #dee2e6;
			border: 1px solid #a9a2a2;
			box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
			text-decoration: none;
		}

		#display-container {
			height: 300px;
			width: 600px;
			margin-top: 20px;
			background-color: #dee2e6;
			border: 1px solid #a9a2a2;
			box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		}

		#submit-button {
			margin-top: 2%;
			background-color: #4285f4;
			color: white;
			border: none;
			border-radius: 4px;
			padding: 5px 10px;
			cursor: pointer;
			font-size: 14px;
			width: 150px;
			height: 30px;
		}

		#copy-button {
			margin-top: 2%;
			background-color: #4285f4;
			color: white;
			border: none;
			border-radius: 4px;
			padding: 5px 10px;
			cursor: pointer;
			font-size: 14px;
			width: 150px;
			height: 30px;
		}

	</style>`

const HEAD = `
<head>
	<title>Share your secret</title>
	<meta charset="UTF-8">
	<meta name="description" content="Share a secret and get a link towards this secret">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="favicon" type="image/png" href="/favicon.ico"/>
</head> 
`

const HEADER = `
<header >
<h1>
	<a href='/'>Share your secret</a>
</h1>
<p id="subtitle">Enter a secret, and receive a link to distribute this secret. Your secret will be destroyed upon opening and expires after 7 days.</p>
</header>`

async function getSecretForm(): Promise<Response> {
	const html = `
		<!DOCTYPE html>
		${STYLE}
		${HEAD}
		<div class="column-layout">
			${HEADER}
			<main class="row-layout">
				<form id="form" method="POST" action="/" enctype="multipart/form-data">
					<textarea id="secretValue" name="secretValue" form="form" placeholder="Write your secret here"></textarea>
					<div id="submit-container" class="row-layout">
						<input id="submit-button" type="submit" value="Get your secret link" aria-label="Get your secret link">
					</div>
				</form>		
			</main>
		</div>`;

	return new Response(html, {
		headers: {
			"content-type": "text/html;charset=UTF-8",
		},
	});
}

async function getSecretNotFound(): Promise<Response> {
	const html = `
		<!DOCTYPE html>
		${STYLE}
		${HEAD}
		<div class="column-layout">
			${HEADER}
			<main class="row-layout">
				<div id="display-container">
					The secret could not be found
				</div>
			</main>
		</div>`;

	return new Response(html, {
		headers: {
			"content-type": "text/html;charset=UTF-8",
		},
	});
}

async function getSecret(secret: string): Promise<Response> {
	const html = `
		<!DOCTYPE html>
		${STYLE}
		${HEAD}
		<div class="column-layout">
			${HEADER}
			<main class="row-layout">
				<div id="display-container">
					${secret}
				</div>
			</main>
			<button id="copy-button" onclick="navigator.clipboard.writeText
            	(document.getElementById('display-container').innerText);">Copy secret</button>
		</div>`;

	return new Response(html, {
		headers: {
			"content-type": "text/html;charset=UTF-8",
		},
	});
}

async function getSecretLink(link: string): Promise<Response> {
	const html = `
		<!DOCTYPE html>
		${STYLE}
		${HEAD}
		<div class="column-layout">
			${HEADER}
			<main class="row-layout">
				<a id='link' href="${link}">${link}</a>
			</main>
			<button id="copy-button" onclick="navigator.clipboard.writeText
            (document.getElementById('link').innerText);">Copy link</button>
		</div>`;

	return new Response(html, {
		headers: {
			"content-type": "text/html;charset=UTF-8",
		},
	});
}


const ResponseService = {
	getSecret,
	getSecretForm,
	getSecretNotFound,
	getSecretLink
};

export default ResponseService;

