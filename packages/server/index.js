"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var cors_1 = require("cors");
var dotenv_1 = require("dotenv");
var express_1 = require("express");
var fs = require("fs");
var path = require("path");
var vite_1 = require("vite");
dotenv_1["default"].config();
var isDev = function () { return process.env.NODE_ENV === 'development'; };
var startServer = function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, port, vite, distPath, srcPath, ssrClientPath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = (0, express_1["default"])();
                app.use((0, cors_1["default"])());
                port = Number(process.env.SERVER_PORT) || 3001;
                distPath = path.dirname(require.resolve('chapaevinlondon/dist/index.html'));
                srcPath = path.dirname(require.resolve('chapaevinlondon'));
                ssrClientPath = require.resolve('chapaevinlondon/ssr-dist/chapaevinlondon.cjs');
                if (!isDev()) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, vite_1.createServer)({
                        server: { middlewareMode: true },
                        root: srcPath,
                        appType: 'custom'
                    })];
            case 1:
                vite = _a.sent();
                app.use(vite.middlewares);
                _a.label = 2;
            case 2:
                app.get('/api', function (_, res) {
                    res.json('👋 Howdy from the server :)');
                });
                // app.use(express.static(distPath));
                // if (!isDev()) {
                app.use('/assets', express_1["default"].static(path.resolve(distPath, 'assets')));
                // }
                app.use('*', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
                    var url, template, render, appHtml, html, e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                url = req.originalUrl;
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 10, , 11]);
                                template = void 0;
                                if (!!isDev()) return [3 /*break*/, 2];
                                template = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8');
                                return [3 /*break*/, 4];
                            case 2:
                                template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8');
                                return [4 /*yield*/, vite.transformIndexHtml(url, template)];
                            case 3:
                                template = _a.sent();
                                _a.label = 4;
                            case 4:
                                render = void 0;
                                if (!!isDev()) return [3 /*break*/, 6];
                                return [4 /*yield*/, Promise.resolve().then(function () { return require(ssrClientPath); })];
                            case 5:
                                render = (_a.sent()).render;
                                return [3 /*break*/, 8];
                            case 6: return [4 /*yield*/, vite.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx'))];
                            case 7:
                                render = (_a.sent()).render;
                                _a.label = 8;
                            case 8: return [4 /*yield*/, render(req.url)];
                            case 9:
                                appHtml = _a.sent();
                                html = template.replace('<!--ssr-outlet-->', appHtml);
                                res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
                                return [3 /*break*/, 11];
                            case 10:
                                e_1 = _a.sent();
                                if (!isDev()) {
                                    vite.ssrFixStacktrace(e_1);
                                }
                                next(e_1);
                                return [3 /*break*/, 11];
                            case 11: return [2 /*return*/];
                        }
                    });
                }); });
                app.listen(port, function () {
                    console.log("  \u279C \uD83C\uDFB8 Server is listening on port: ".concat(port));
                });
                return [2 /*return*/];
        }
    });
}); };
startServer();
