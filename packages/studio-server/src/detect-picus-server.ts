import http from 'http';
import type {PicusConfigResponse} from './picus-config-response';

type PicusDetectionResult =
	| {type: 'match'}
	| {type: 'mismatch'}
	| {type: 'not-picus'};

export const detectPicusServer = ({
	port,
	cwd,
	hostname,
}: {
	port: number;
	cwd: string;
	hostname: string;
}): Promise<PicusDetectionResult> => {
	return new Promise((resolve) => {
		const req = http.get(
			{
				hostname,
				port,
				path: '/__picus_config',
				timeout: 1000,
			},
			(res) => {
				if (res.statusCode !== 200) {
					res.resume();
					return resolve({type: 'not-picus'});
				}

				let data = '';

				res.on('data', (chunk) => {
					data += chunk;
				});

				res.on('error', () => {
					resolve({type: 'not-picus'});
				});

				res.on('end', () => {
					try {
						const json = JSON.parse(data) as PicusConfigResponse;

						if (json.isPicus !== true) {
							return resolve({type: 'not-picus'});
						}

						// Normalize paths for comparison to avoid issues with different separators or casing on Windows
						const normalize = (p: string) =>
							p.replace(/\\/g, '/').toLowerCase();

						if (normalize(json.cwd) === normalize(cwd)) {
							return resolve({type: 'match'});
						}

						return resolve({type: 'mismatch'});
					} catch {
						resolve({type: 'not-picus'});
					}
				});
			},
		);

		req.on('error', () => resolve({type: 'not-picus'}));
		req.on('timeout', () => {
			req.destroy();
		});
	});
};
