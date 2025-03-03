import express, { Application, NextFunction, Request, Response } from "express";
import appRoutes from "./globals/routes/appRoutes";
import { CustomError, NotFoundException } from "./globals/middlewares/error.middleware";
import cors from 'cors';

class Server {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public start(): void {

    this.setupCors();
    this.setupMiddleware();
    this.setupRoutes();
    this.setupGlobalError();
    this.startServer();
  }

  private setupCors(): void {
    this.app.use(cors({
      origin: 'http://localhost:5173',
      credentials: true
    }))
  }

  private setupMiddleware(): void {
    this.app.use(express.json()); // req.body
  }

  private setupRoutes(): void {
    appRoutes(this.app);
  }
  private setupGlobalError(): void {
    // Not Found
    this.app.all('*', (req, res, next) => {
      return next(new NotFoundException(`The url ${req.originalUrl} not found`))
    })

    // Global
    this.app.use((error: any, req: Request, res: Response, next: NextFunction) => {
      console.log('error', error)
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json(error.getErrorResponse());
      }
      return res.status(500).json(error);
    })
  }

  private startServer() {
    const port = parseInt(process.env.PORT!) || 5050;

    this.app.listen(port, () => {
      console.log(`App listen to port ${port}`)
    })
  }
}

export default Server;