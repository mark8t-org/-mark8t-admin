import { fetchJsonFromUrlWithLocalStorage } from '../../../node_modules/@mark8t/core/src/lib/utils/api/fetchJsonFromUrl';
import { Loading, Backups } from '../stores';

let env = import.meta.env;

let backups: Array<String> = [];

// Validate required environment variables
if (!env.VITE_TENANT_ID) {
	throw new Error("VITE_TENANT_ID is not defined");
}

// Utility function to generate URLs
const generateUrl = (domain, apiVersion, tenantId, endpoint, isDev = false) => {


	const devPath = isDev ? '/dev' : '';
	return `${domain}${devPath}/api/${apiVersion}/${tenantId}/${endpoint}`;
};


// Constants
const DOMAIN = env.VITE_API_DOMAIN || 'https://mark8t.ca';
const API_VERSION = 'v2';
const TENANT_ID = env.VITE_TENANT_ID;
const IS_DEV = env.MODE === 'development'; // Assuming env.MODE exists, adjust as needed

// API URLs
export const API_URL_BACKUP_LIST = generateUrl(DOMAIN, API_VERSION, TENANT_ID, 'backup/list', IS_DEV);


//...
async function backupList(tenant) {
	backups = await fetchJsonFromUrlWithLocalStorage(API_URL_BACKUP_LIST, 'backups', 0);
	Backups.set(backups.data);
}

//...
async function backupAllData(tenantId: string, suffix: string = '') {
	Loading.set(true);
	const response = await fetch('https://mark8t.ca/api/backup.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: `tenant=${tenantId}&suffix=${suffix}`
	});

	const result = await response.json();

	if (result.success) {
		console.log(`Backup for tenant ${tenantId} was successful.`);
		console.log(result.details);
		Loading.set(false);
	} else {
		console.error(`Backup for tenant ${tenantId} failed.`);
		console.error(result.error);
		Loading.set(false);
	}
}

//...
async function deleteBackup(tenant, file) {
	return await fetch('https://mark8t.ca/api/delete.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: `tenant=${tenant}&file=${file}`
	})
		.then((response) => response.json())
		.then((data) => {
			if (data.success) {
				console.log(data.message);
			} else {
				console.error(data.message);
			}
		});
}
//...
async function restoreBackup(tenantId, filename) {
	const response = await fetch('https://mark8t.ca/api/restore.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: `tenant=${tenantId}&file=${filename}`
	});
	const result = await response.json();
	if (result.success) {
		console.log(`Restore completed successfully: ${result.message}`);
	} else {
		console.error(`Restore failed: ${result.message}`);
	}
}

//...
async function renameBackup(tenant_id, backup_file, new_backup_file) {
	console.log(new_backup_file);
	//add .tar.gz if not in new_backup_file
	if (!new_backup_file.includes('.tar.gz')) {
		new_backup_file = new_backup_file + '.tar.gz';
	}
	//add .gz if not in new_backup_file
	if (!new_backup_file.includes('.gz')) {
		new_backup_file = new_backup_file + '.gz';
	}
	//if new_backup_file doesnt include a date, put it between the name and the .tar.gz

	const addDateToBackupFile = () => {
		let date = new Date().toISOString().substring(0, 19).replace(/[-T]/g, '-');

		if (!new_backup_file.includes(date)) {
			let [name, extension] = new_backup_file.split('.tar.gz');
			new_backup_file = `${name}-${date}.tar.gz`;
		}
	};

	addDateToBackupFile();

	try {
		let response = await fetch('https://mark8t.ca/api/rename.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: `tenant=${tenant_id}&old_filename=${backup_file}&new_filename=${new_backup_file}`
		});
		let data = await response.json();
		if (data.success) {
			console.log(
				`Success: Backup file "${backup_file}" was renamed to "${new_backup_file}" for tenant "${tenant_id}".`
			);
		} else {
			console.error(
				`Error: Could not rename backup file "${backup_file}" for tenant "${tenant_id}". Reason: ${data.message}`
			);
		}
	} catch (error) {
		console.error(
			`Error: Could not rename backup file "${backup_file}" for tenant "${tenant_id}". Reason: ${error}`
		);
	}
}

export {
	backupAllData,
	backupList,
	deleteBackup,
	restoreBackup,
	renameBackup
}