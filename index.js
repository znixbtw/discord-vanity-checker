const fs = require('fs');
const axios = require('axios');

axios.defaults.baseURL = 'http://discord.com/api/v9/invites/';

const sleep = ms => new Promise(r => setTimeout(r, ms));

const checkVanity = async (url) => {
	try {
		await axios.get(url)
	} catch (error) {
		if (error.response.status === 404) {
			fs.appendFileSync('available.txt', url + '\n');
			console.log('URL Found:', url);
		} else {
			console.log('Unknown Error! Please report it: https://github.com/znixbtw/discord-vanity-checker/issues');
			fs.appendFileSync('error.txt', error + '\n');
			process.exit(1);
		}
	}
}

const main = async () => {
	try {

		const vanity = fs.readFileSync('urls.txt').toString().split("\n");
		console.log('Searching for Vanity URLs...');
		for (let i in vanity) {
			const url = vanity[i];
			if (url !== '') await checkVanity(url);
			await sleep(1000);
		}

	} catch (error) {
		if (error.code === 'ENOENT') console.log('Error Code: 1');
		else {
			console.log('Unknown Error! Please report it: https://github.com/znixbtw/discord-vanity-checker/issues');
			fs.appendFileSync('error.txt', error + '\n');
			process.exit(1);
		}
	}
}

(async function () {
	await main();
})();
