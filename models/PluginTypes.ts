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

export type Icon = {
  light: string;
  dark: string;
};

export type Manifest = {
  name: string;
  id: string;
  main: string;
  editorType: string[];
  ui: string;
  type: string;
  icon: string | Icon;
  runtime: string;
};

export type Plugin = {
  ui: PluginUI;
  script: string;
  manifest: string;
};

export type PluginUI = {
  html: string;
  css: string;
  javascript: string;
};
