/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_CEPHALOMETRY_LOAD_URL?: string;
	readonly VITE_CLINIC_API_URL?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
