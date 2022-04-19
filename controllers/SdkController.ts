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

import { Express } from "express";
import { fileURLToPath } from "url";
import { existsSync } from "fs";
import * as path from "path";
import { IController } from "./IController.js";

export class SdkController implements IController {
  static _instance: IController;

  private constructor() {}

  static get instance() {
    if (!this._instance) {
      this._instance = new SdkController();
    }

    return this._instance;
  }

  register(app: Express) {
    const filename = fileURLToPath(import.meta.url);
    const controllerDirectory = path.dirname(filename);
    const distDirectory = path.resolve(controllerDirectory, "..");
    const rootDirectory = path.resolve(distDirectory, "..");
    const sdkDirectory = path.join(rootDirectory, "sdk");

    app.get("/sdk/:sdkId", (request, response) => {
      try {
        const sdkId = request.params.sdkId;
        const sdkFile = path.join(sdkDirectory, sdkId);
        if (!existsSync(sdkFile)) {
          response.sendStatus(404);
          return;
        }

        response.sendFile(sdkFile);
      } catch (error) {
        console.error(
          "Something went wrong while processing the request.",
          error
        );
        response.status(500);
      }
    });
  }
}
