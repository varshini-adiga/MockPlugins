/*************************************************************************
 *
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 *  Copyright 2022 Adobe Systems Incorporated
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 **************************************************************************/

import "dotenv/config";
import process from "process";

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import * as path from "path";
import https from "https";

import express from "express";
import cors from "cors";
import {
  HomeController,
  PluginController,
  SdkController,
} from "./controllers/index.js";

const API_PROTOCOL = "https";
const API_HOST_NAME = process.env.API_HOST_NAME;
const API_PORT = Number(process.env.API_PORT);

process.on("uncaughtException", (error) => {
  console.error("Uncaught error", error);
});

const filename = fileURLToPath(import.meta.url);
const distDirectory = path.dirname(filename);
const rootDirectory = path.resolve(distDirectory, "..");
const sslDirectory = path.join(rootDirectory, "ssl");

const key = readFileSync(path.join(sslDirectory, "key.pem"), "utf8");
const cert = readFileSync(path.join(sslDirectory, "cert.pem"), "utf8");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const homeController = HomeController.instance;
homeController.register(app);

const pluginController = PluginController.instance;
pluginController.register(app);

const sdkController = SdkController.instance;
sdkController.register(app);

const secureApiServer = https.createServer({ key, cert }, app);
secureApiServer.listen(API_PORT, API_HOST_NAME);

console.log(`API URL: ${API_PROTOCOL}://${API_HOST_NAME}:${API_PORT}\n`);
