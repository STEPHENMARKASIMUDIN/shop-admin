import { App } from "./helpers/function";
import { join } from "path";
import { config } from "dotenv";
import { adminRoutes } from "./routes/routes";

config({ path: join(__dirname, "../.env") });
const authRoutes = adminRoutes.map(r => r.path).slice(3);
const app: App = new App(adminRoutes, process.env.PORT, authRoutes);

export default app;
