import dotenv from "dotenv"
import db from "../services/auth.service.js"
dotenv.config()
async function getrole(req) {
  return await db.verifyRole(req)
}


function role() {
  return async(req, res, next) => {
    try {
        console.log(req.user)
      const role = await getrole(req.user);
      console.log(role)
    if (role === "usuario") {
       return res.status(401).send("No esta autorizado")
    }

      next();
    } catch (err) {
      
      return res.status(500).json({ error: "Invalid role", detail: err.message });
    }
  };
}




export{
    role
}