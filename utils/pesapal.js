"use strict";
// utils/pesapal.ts
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactionStatus = exports.submitOrderRequest = exports.registerIPN = exports.getPesapalToken = void 0;
var axios_1 = require("axios");
var PESAPAL_BASE_URL = process.env.NEXT_PUBLIC_PESAPAL_BASE_URL;
var PESAPAL_CONSUMER_KEY = process.env.PESAPAL_CONSUMER_KEY;
var PESAPAL_CONSUMER_SECRET = process.env.PESAPAL_CONSUMER_SECRET;
// Function to get authentication token
function getPesapalToken() {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.post("".concat(PESAPAL_BASE_URL, "/api/Auth/RequestToken"), {
                            consumer_key: PESAPAL_CONSUMER_KEY,
                            consumer_secret: PESAPAL_CONSUMER_SECRET,
                        })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data.token];
                case 2:
                    error_1 = _a.sent();
                    console.error("Error getting Pesapal token:", error_1);
                    throw error_1;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getPesapalToken = getPesapalToken;
function registerIPN(url, token) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.post("".concat(PESAPAL_BASE_URL, "/api/URLSetup/RegisterIPN"), {
                            url: url,
                            ipn_notification_type: "GET", // or "POST", depending on your preference
                        }, {
                            headers: {
                                Authorization: "Bearer ".concat(token),
                                "Content-Type": "application/json",
                            },
                        })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
                case 2:
                    error_2 = _a.sent();
                    console.error("Error registering IPN:", error_2);
                    throw error_2;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.registerIPN = registerIPN;
// Function to submit order request
function submitOrderRequest(orderData, token) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.post("".concat(PESAPAL_BASE_URL, "/api/Transactions/SubmitOrderRequest"), orderData, {
                            headers: {
                                Authorization: "Bearer ".concat(token),
                                "Content-Type": "application/json",
                            },
                        })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
                case 2:
                    error_3 = _a.sent();
                    console.error("Error submitting order request:", error_3);
                    throw error_3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.submitOrderRequest = submitOrderRequest;
// Function to get transaction status
function getTransactionStatus(orderTrackingId, token) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.get("".concat(PESAPAL_BASE_URL, "/api/Transactions/GetTransactionStatus?orderTrackingId=").concat(orderTrackingId), {
                            headers: {
                                Authorization: "Bearer ".concat(token),
                            },
                        })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
                case 2:
                    error_4 = _a.sent();
                    console.error("Error getting transaction status:", error_4);
                    throw error_4;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getTransactionStatus = getTransactionStatus;