
import { Response, Request } from "express";


export  async  function PainelControlArea(req: Request, res: Response) {
    try { /* empty */ } catch (error) {
      console.log(error);
      res.redirect("/");
    }
}