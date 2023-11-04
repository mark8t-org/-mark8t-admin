// Reexport your entry components here


import Admin from "./+Admin.svelte";
import Modules from "./modules";
import Components from "./components";

import type Mark8tCore from "@mark8t/core";

export type { Mark8tCore };

export {
	Modules,
	Components
}

export default Admin;
