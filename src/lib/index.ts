// Reexport your entry components here

import Admin from "./+Admin.svelte";
import Modules from "./modules";

import type Mark8tCore from "@mark8t/core";

export type { Mark8tCore };

export {
	Modules
}

export default Admin;
