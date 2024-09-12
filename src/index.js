import app from "./app.js";
import { PORT } from "./config.js";


//========================= APP =======================================================

app.listen(PORT || 3000, () => {
  console.log(`Server on port http://localhost:${PORT}`);
});

