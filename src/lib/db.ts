import Pocketbase from "pocketbase";

const db = new Pocketbase(import.meta.env.VITE_APP_POCKETBASE);

export default db;
