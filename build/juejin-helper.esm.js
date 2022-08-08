import axios from 'axios';
import { v4 } from 'uuid';
import jwt from 'jsonwebtoken';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
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
}

var instance$1 = axios.create({
    baseURL: "https://api.juejin.cn",
    headers: {
        referer: "https://juejin.cn/"
    }
});
instance$1.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});
instance$1.interceptors.response.use(function (response) {
    if (response.data.err_no) {
        throw new Error(response.data.err_msg);
    }
    return response.data.data;
}, function (error) {
    return Promise.reject(error);
});

function parseCookieTokens(cookie) {
  const cookieTokens = {
    aid: "",
    uuid: "",
    user_unique_id: "",
    web_id: ""
  };

  const tokensReg = /^__tea_cookie_tokens_(\d+)$/;
  for (const [key, value] of cookie.entries()) {
    if (tokensReg.test(key)) {
      cookieTokens.aid = key.match(tokensReg)[1];
      const json = JSON.parse(decodeURIComponent(decodeURIComponent(value)));
      cookieTokens.uuid = json.user_unique_id;
      cookieTokens.user_unique_id = json.user_unique_id;
      cookieTokens.web_id = json.web_id;
      break;
    }
  }

  return cookieTokens;
}

async function wait(time = 0) {
  return new Promise(resolve => setTimeout(resolve, time));
}

function randomRangeNumber(start = 500, end = 1000) {
  return (Math.random() * (end - start) + start) >> 0;
}

function generateUUID() {
  return v4();
}

var Cookie = /** @class */ (function () {
    function Cookie(cookie) {
        if (cookie === void 0) { cookie = ""; }
        this.cookie = "";
        this.stack = new Map();
        if (cookie) {
            this.setCookieValue(cookie);
        }
    }
    Cookie.prototype.setCookieValue = function (cookie) {
        var _this = this;
        if (cookie === void 0) { cookie = ""; }
        this.stack.clear();
        this.cookie = cookie;
        cookie
            .split("; ")
            .map(function (string) { return string.split("="); })
            .forEach(function (_a) {
            var key = _a[0], value = _a[1];
            _this.stack.set(key, value);
        });
    };
    Cookie.prototype.get = function (key) {
        return this.stack.get(key);
    };
    Cookie.prototype.has = function (key) {
        return this.stack.has(key);
    };
    Cookie.prototype.set = function (key, value) {
        return this.stack.set(key, value);
    };
    Cookie.prototype.entries = function () {
        return this.stack.entries();
    };
    Cookie.prototype.clear = function () {
        this.cookie = "";
        this.stack.clear();
    };
    Cookie.prototype.toString = function () {
        return this.cookie;
    };
    return Cookie;
}());

var instance = axios.create({
    baseURL: "",
    headers: {
        // "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36",
        referer: "https://juejin.cn/",
        origin: "https://juejin.cn",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "cross-site"
    }
});
instance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});
instance.interceptors.response.use(function (response) {
    var res = response.data;
    if ("e" in res) {
        return res;
    }
    if (res.errno !== 200) {
        throw new Error(res.message);
    }
    return res.data;
}, function (error) {
    return Promise.reject(error);
});

/**
 * SDK
 */
var Sdk = /** @class */ (function () {
    function Sdk(juejin) {
        this.sdk_type = "npm";
        this.sdk_lib = "js";
        this.sdk_version = "4.2.9";
        this.juejin = juejin;
    }
    Sdk.prototype.slardarSDKSetting = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, instance.get("https://i.snssdk.com/slardar/sdk_setting?bid=juejin_web", {
                        headers: {
                            cookie: "MONITOR_WEB_ID=".concat(this.juejin.cookie.get("MONITOR_WEB_ID"))
                        }
                    })];
            });
        });
    };
    Sdk.prototype.list = function (events) {
        var _a;
        if (events === void 0) { events = []; }
        return __awaiter(this, void 0, void 0, function () {
            var cookieTokens, userInfo, userIsLogin, data;
            return __generator(this, function (_b) {
                cookieTokens = this.juejin.getCookieTokens();
                userInfo = this.juejin.getUser();
                userIsLogin = !!userInfo;
                data = [
                    {
                        events: events,
                        header: {
                            app_id: Number(cookieTokens === null || cookieTokens === void 0 ? void 0 : cookieTokens.aid),
                            browser: "Chrome",
                            browser_version: "99.0.4844.51",
                            custom: JSON.stringify(userIsLogin
                                ? {
                                    student_verify_status: userInfo.student_status ? "student" : "not_student",
                                    user_level: userInfo.level
                                }
                                : {}),
                            device_model: "Windows NT 10.0",
                            os_name: "windows",
                            os_version: "10",
                            resolution: "1920x1080",
                            screen_width: 1920,
                            screen_height: 1080,
                            width: 1920,
                            height: 1080,
                            language: "zh-CN",
                            platform: "Web",
                            referrer: "",
                            referrer_host: "",
                            sdk_lib: this.sdk_lib,
                            sdk_version: this.sdk_version,
                            timezone: 8,
                            tz_offset: -28800,
                            utm_campaign: "ad",
                            utm_medium: "user_center"
                        },
                        local_time: (Date.now() / 1000) >> 0,
                        user: {
                            user_id: ((_a = this.juejin.getUser()) === null || _a === void 0 ? void 0 : _a.user_id) || "",
                            user_is_login: userIsLogin,
                            user_unique_id: (cookieTokens === null || cookieTokens === void 0 ? void 0 : cookieTokens.user_unique_id) || "",
                            web_id: (cookieTokens === null || cookieTokens === void 0 ? void 0 : cookieTokens.web_id) || ""
                        }
                    }
                ];
                return [2 /*return*/, instance.post("https://mcs.snssdk.com/list", {
                        headers: {
                            host: "mcs.snssdk.com"
                        },
                        data: data
                    })];
            });
        });
    };
    // 模拟成长API事件埋点
    Sdk.prototype.mockTrackGrowthEvent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sessionid, localtime, eventindex;
            return __generator(this, function (_a) {
                sessionid = generateUUID();
                localtime = Date.now();
                eventindex = localtime + randomRangeNumber(4000, 10000);
                return [2 /*return*/, this.list([
                        {
                            ab_sdk_version: "90000611,90001195",
                            event: "task_center_sign_in_visit",
                            is_bav: 0,
                            local_time_ms: localtime + 1,
                            params: JSON.stringify({
                                event_index: eventindex + 1,
                                _staging_flag: 0
                            }),
                            session_id: sessionid
                        },
                        {
                            ab_sdk_version: "90000611,90001195",
                            event: "predefine_pageview",
                            is_bav: 0,
                            local_time_ms: localtime,
                            params: JSON.stringify({
                                $is_first_time: "false",
                                event_index: eventindex,
                                referrer: "",
                                time: localtime,
                                title: "每日签到 - 掘金",
                                url: "https://juejin.cn/user/center/signin",
                                url_path: "/user/center/signin",
                                _staging_flag: 0
                            }),
                            session_id: sessionid
                        }
                    ])];
            });
        });
    };
    // 模拟OnLoad事件埋点
    Sdk.prototype.mockTrackOnloadEvent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cookieTokens, localtime;
            return __generator(this, function (_a) {
                cookieTokens = this.juejin.getCookieTokens();
                localtime = Date.now();
                return [2 /*return*/, this.list([
                        {
                            event: "onload",
                            local_time_ms: localtime,
                            params: JSON.stringify({
                                app_id: Number(cookieTokens === null || cookieTokens === void 0 ? void 0 : cookieTokens.aid),
                                app_name: "",
                                sdk_version: this.sdk_version,
                                sdk_type: this.sdk_type,
                                sdk_config: {
                                    app_id: Number(cookieTokens === null || cookieTokens === void 0 ? void 0 : cookieTokens.aid),
                                    channel: "cn",
                                    log: false,
                                    enable_ab_test: true,
                                    ab_channel_domain: "https://abtestvm.bytedance.com",
                                    cross_subdomain: true,
                                    cookie_expire: 94608000000,
                                    cookie_domain: "juejin.cn",
                                    enable_stay_duration: true,
                                    maxDuration: 1200000
                                }
                            })
                        }
                    ])];
            });
        });
    };
    return Sdk;
}());

var Growth = /** @class */ (function () {
    function Growth(juejin) {
        this.http = axios.create({
            baseURL: "https://api.juejin.cn",
            headers: {
                referer: "https://juejin.cn/",
                origin: "https://juejin.cn"
            }
        });
        this.http.interceptors.request.use(function (config) {
            // @ts-ignore
            config.headers.cookie = juejin === null || juejin === void 0 ? void 0 : juejin.getCookie();
            if (juejin.user) {
                var tokens = juejin.getCookieTokens();
                // @ts-ignore
                config.url += "".concat(config.url.indexOf("?") === -1 ? "?" : "&", "aid=").concat(tokens.aid, "&uuid=").concat(tokens.uuid);
            }
            return config;
        }, function (error) {
            return Promise.reject(error);
        });
        this.http.interceptors.response.use(function (response) {
            if (response.data.err_no) {
                throw new Error(response.data.err_msg);
            }
            return response.data.data;
        }, function (error) {
            return Promise.reject(error);
        });
    }
    /**
     * 获取统计签到天数
     * @returns {Promise<*>}
     * {
     *   cont_count 连续签到天数
     *   sum_count 累计签到天数
     * }
     */
    Growth.prototype.getCounts = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http.get("/growth_api/v1/get_counts")];
            });
        });
    };
    /**
     * 获取当前矿石数
     * @returns {Promise<*>}
     * number 当前矿石数
     */
    Growth.prototype.getCurrentPoint = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http.get("/growth_api/v1/get_cur_point")];
            });
        });
    };
    /**
     * 获取今日签到状态
     * @returns {Promise<*>}
     * boolean 是否签到
     */
    Growth.prototype.getTodayStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http.get("/growth_api/v1/get_today_status")];
            });
        });
    };
    /**
     * 获取月签到日历
     * @returns {Promise<*>}
     * [
     *   {
     *     date: timestamp(格式1646150400)
     *     point: number增加矿石数
     *     status: enum(1 今日, 4 未签到, 3 已签到)
     *   }
     * ]
     */
    Growth.prototype.getByMonth = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http.get("/growth_api/v1/get_by_month")];
            });
        });
    };
    Growth.prototype.getLotteryConfig = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http.get("/growth_api/v1/lottery_config/get")];
            });
        });
    };
    Growth.prototype.drawLottery = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http.post("/growth_api/v1/lottery/draw")];
            });
        });
    };
    Growth.prototype.checkIn = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http.post("/growth_api/v1/check_in")];
            });
        });
    };
    Growth.prototype.getLotteriesLuckyUsers = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, page_no, _c, page_size;
            return __generator(this, function (_d) {
                _a = data || {}, _b = _a.page_no, page_no = _b === void 0 ? 1 : _b, _c = _a.page_size, page_size = _c === void 0 ? 5 : _c;
                return [2 /*return*/, this.http.post("/growth_api/v1/lottery_history/global_big", {
                        page_no: page_no,
                        page_size: page_size
                    })];
            });
        });
    };
    Growth.prototype.dipLucky = function (lottery_history_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http.post("/growth_api/v1/lottery_lucky/dip_lucky", {
                        lottery_history_id: lottery_history_id
                    })];
            });
        });
    };
    Growth.prototype.getMyLucky = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http.post("/growth_api/v1/lottery_lucky/my_lucky")];
            });
        });
    };
    return Growth;
}());

var Seagold = /** @class */ (function () {
    function Seagold(juejin) {
        this.juejin = juejin;
        this.http = axios.create({
            baseURL: "https://juejin-game.bytedance.com/game",
            headers: {
                referer: "https://juejin.cn/",
                origin: "https://juejin.cn",
                Authorization: ""
            }
        });
        this.http.interceptors.request.use(function (config) {
            if (juejin.user) {
                // @ts-ignore
                config.url += (config.url.indexOf("?") === -1 ? "?" : "&") + "uid=".concat(juejin.user.user_id, "&time=").concat(Date.now());
            }
            return config;
        }, function (error) {
            return Promise.reject(error);
        });
        this.http.interceptors.response.use(function (response) {
            var res = response.data;
            if (res.code !== 0) {
                throw new Error(res.message);
            }
            return res.data;
        }, function (error) {
            return Promise.reject(error);
        });
    }
    Seagold.prototype.setToken = function (token) {
        // @ts-ignore
        this.http.defaults.headers.Authorization = "Bearer ".concat(token);
    };
    Seagold.prototype.gameLogin = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = this.setToken;
                        return [4 /*yield*/, this.juejin.makeToken()];
                    case 1:
                        _b.apply(this, [_c.sent()]);
                        return [2 /*return*/, this.http.post("/sea-gold/user/login", {
                                name: (_a = this.juejin.user) === null || _a === void 0 ? void 0 : _a.user_name
                            })];
                }
            });
        });
    };
    Seagold.prototype.gameInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http.get("/sea-gold/home/info")];
            });
        });
    };
    Seagold.prototype.gameStart = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, roleId;
            return __generator(this, function (_b) {
                _a = (data || {}).roleId, roleId = _a === void 0 ? 3 : _a;
                return [2 /*return*/, this.http.post("/sea-gold/game/start", {
                        roleId: roleId
                    })];
            });
        });
    };
    Seagold.prototype.gameOver = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, isButton;
            return __generator(this, function (_b) {
                _a = (data || {}).isButton, isButton = _a === void 0 ? 1 : _a;
                // const result = {
                //   activity: "",
                //   deep: 3,
                //   gameDiamond: 34, // 当局获取
                //   originMapData: [],
                //   passLine: [{ x: 0, y: 0 }, { x: 0, y: 1 }],
                //   picoDiamond: 0,
                //   realDiamond: 34, // 真实获取
                //   todayDiamond: 34, // 今日获取
                //   todayLimitDiamond: 1500 // 今日最大获取
                // };
                return [2 /*return*/, this.http.post("/sea-gold/game/over", {
                        isButton: isButton
                    })];
            });
        });
    };
    Seagold.prototype.gameCommand = function (gameId, command) {
        if (command === void 0) { command = []; }
        return __awaiter(this, void 0, void 0, function () {
            var privateKey, token;
            return __generator(this, function (_a) {
                privateKey = "-----BEGIN EC PARAMETERS-----\nBggqhkjOPQMBBw==\n-----END EC PARAMETERS-----\n-----BEGIN EC PRIVATE KEY-----\nMHcCAQEEIDB7KMVQd+eeKt7AwDMMUaT7DE3Sl0Mto3LEojnEkRiAoAoGCCqGSM49\nAwEHoUQDQgAEEkViJDU8lYJUenS6IxPlvFJtUCDNF0c/F/cX07KCweC4Q/nOKsoU\nnYJsb4O8lMqNXaI1j16OmXk9CkcQQXbzfg==\n-----END EC PRIVATE KEY-----\n";
                token = jwt.sign({
                    gameId: gameId,
                    time: new Date().getTime()
                }, privateKey, {
                    algorithm: "ES256",
                    expiresIn: 2592e3,
                    header: {
                        alg: "ES256",
                        typ: "JWT"
                    }
                });
                return [2 /*return*/, this.http.post("/sea-gold/game/command", {
                        command: command
                        // command: ["R", { times: 2, command: ["R"] }, "2"]
                    }, {
                        headers: {
                            "x-tt-gameid": token
                        }
                    })];
            });
        });
    };
    return Seagold;
}());

/**
 * 数字拼图
 * 游戏地址: https://juejin.cn/game/shuzimiti/
 */
var NumPuzz = /** @class */ (function () {
    function NumPuzz(juejin) {
        this.juejin = juejin;
        this.http = axios.create({
            baseURL: "https://juejin-game.bytedance.com/game",
            headers: {
                referer: "https://juejin.cn/",
                origin: "https://juejin.cn",
                Authorization: ""
            }
        });
        this.http.interceptors.request.use(function (config) {
            if (juejin.user) {
                // @ts-ignore
                config.url += (config.url.indexOf("?") === -1 ? "?" : "&") + "uid=".concat(juejin.user.user_id, "&time=").concat(Date.now());
            }
            return config;
        }, function (error) {
            return Promise.reject(error);
        });
        this.http.interceptors.response.use(function (response) {
            var res = response.data;
            if (res.code !== 0) {
                throw new Error(res.message);
            }
            return res.data;
        }, function (error) {
            return Promise.reject(error);
        });
    }
    NumPuzz.prototype.setToken = function (token) {
        // @ts-ignore
        this.http.defaults.headers.Authorization = "Bearer ".concat(token);
    };
    /**
     * 游戏登录
     * @returns {Promise<*>}
     */
    NumPuzz.prototype.gameLogin = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = this.setToken;
                        return [4 /*yield*/, this.juejin.makeToken()];
                    case 1:
                        _b.apply(this, [_c.sent()]);
                        return [2 /*return*/, this.http.post("/num-puzz/user/login", {
                                name: (_a = this.juejin.user) === null || _a === void 0 ? void 0 : _a.user_name
                            })];
                }
            });
        });
    };
    /**
     * 获取主页信息
     * @returns {Promise<*>}
     * bug: 0
     * diamond: 200
     * originality: 0
     * showToast: false
     */
    NumPuzz.prototype.gameInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http.get("/num-puzz/home/info")];
            });
        });
    };
    /**
     * 开始游戏
     * @param level Number [1|2|3] 简单|中等|困难
     * @returns {Promise<*>}
     * guide: 0
     * level: 游戏等级
     * map: 游戏地图
     * round: 关卡
     * target: 目标结果
     */
    NumPuzz.prototype.gameStart = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, level;
            return __generator(this, function (_b) {
                _a = (data || {}).level, level = _a === void 0 ? 1 : _a;
                return [2 /*return*/, this.http.post("/num-puzz/game/start", {
                        level: level
                    })];
            });
        });
    };
    /**
     * 跳过游戏
     * @description 结构同开始游戏
     * @param level
     * @returns {Promise<*>}
     */
    NumPuzz.prototype.gameSkip = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, level;
            return __generator(this, function (_b) {
                _a = (data || {}).level, level = _a === void 0 ? 1 : _a;
                return [2 /*return*/, this.http.post("/num-puzz/game/skip", {
                        level: level
                    })];
            });
        });
    };
    /**
     * 游戏完成
     * @param level Array<[x, y, direction]>, direction["u", "d", "l", "r"]
     * @param command
     * @returns {Promise<*>}
     */
    NumPuzz.prototype.gameComplete = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, level, _c, command;
            return __generator(this, function (_d) {
                _a = data || {}, _b = _a.level, level = _b === void 0 ? 1 : _b, _c = _a.command, command = _c === void 0 ? [] : _c;
                return [2 /*return*/, this.http.post("/num-puzz/game/complete", {
                        level: level,
                        command: command
                    })];
            });
        });
    };
    return NumPuzz;
}());

var Bugfix = /** @class */ (function () {
    function Bugfix(juejin) {
        this.http = axios.create({
            baseURL: "https://api.juejin.cn",
            headers: {
                referer: "https://juejin.cn/",
                origin: "https://juejin.cn"
            }
        });
        this.http.interceptors.request.use(function (config) {
            // @ts-ignore
            config.headers.cookie = juejin === null || juejin === void 0 ? void 0 : juejin.getCookie();
            if (juejin.user) {
                var tokens = juejin.getCookieTokens();
                // @ts-ignore
                config.url += "".concat(config.url.indexOf("?") === -1 ? "?" : "&", "aid=").concat(tokens.aid, "&uuid=").concat(tokens.uuid);
            }
            return config;
        }, function (error) {
            return Promise.reject(error);
        });
        this.http.interceptors.response.use(function (response) {
            if (response.data.err_no) {
                throw new Error(response.data.err_msg);
            }
            return response.data.data;
        }, function (error) {
            return Promise.reject(error);
        });
    }
    /**
     * 获取竞赛信息
     * @returns {Promise<*>}
     */
    Bugfix.prototype.getCompetition = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http.post("/user_api/v1/bugfix/competition", {
                    // 必须加个空对象，否则接口提示少了参数
                    })];
            });
        });
    };
    /**
     * 获取用户信息
     * @param competition_id
     * @returns {Promise<*>}
     */
    Bugfix.prototype.getUser = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var competition_id;
            return __generator(this, function (_a) {
                competition_id = data.competition_id;
                return [2 /*return*/, this.http.post("/user_api/v1/bugfix/user", {
                        competition_id: competition_id
                    })];
            });
        });
    };
    /**
     * 获取未收集的Bug
     * @returns {Promise<*>}
     *  [
     *   {
     *     bug_type: number 类型位置
     *     bug_time: number 时间戳
     *     bug_show_type: 1 显示类型
     *     is_first: boolean 是否第一次
     *   }
     * ]
     *
     */
    Bugfix.prototype.getNotCollectBugList = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http.post("/user_api/v1/bugfix/not_collect", {
                    // 必须加个空对象，否则接口提示少了参数
                    })];
            });
        });
    };
    /**
     * 收集Bug
     * @param bug_time
     * @param bug_type
     * @returns {Promise<*>}
     */
    Bugfix.prototype.collectBug = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var bug_time, bug_type;
            return __generator(this, function (_a) {
                bug_time = data.bug_time, bug_type = data.bug_type;
                return [2 /*return*/, this.http.post("/user_api/v1/bugfix/collect", {
                        bug_time: bug_time,
                        bug_type: bug_type
                    })];
            });
        });
    };
    /**
     * 批量收集Bug
     * @param buglist
     * @returns {Promise<boolean|*>}
     */
    Bugfix.prototype.collectBugBatch = function (buglist) {
        if (buglist === void 0) { buglist = []; }
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Promise.all(buglist.map(function (bug) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.collectBug(bug)];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, wait(randomRangeNumber(500, 1000))];
                                        case 2:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, error_1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Bugfix;
}());

var JuejinHelper = /** @class */ (function () {
    function JuejinHelper() {
        this.cookie = new Cookie();
        this.cookieTokens = null;
        this.user = null;
    }
    JuejinHelper.prototype.login = function (cookie) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.cookie.setCookieValue(cookie);
                        this.cookieTokens = parseCookieTokens(this.cookie);
                        _a = this;
                        return [4 /*yield*/, instance$1.get("/user_api/v1/user/get", {
                                headers: { cookie: this.getCookie() }
                            })];
                    case 1:
                        _a.user = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    JuejinHelper.prototype.logout = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.cookie.clear();
                this.user = null;
                return [2 /*return*/];
            });
        });
    };
    JuejinHelper.prototype.getCookie = function () {
        return this.cookie.toString();
    };
    JuejinHelper.prototype.getCookieTokens = function () {
        return this.cookieTokens;
    };
    JuejinHelper.prototype.getUser = function () {
        return this.user;
    };
    JuejinHelper.prototype.makeToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, instance$1.get("/get/token", {
                        baseURL: "https://juejin.cn",
                        headers: { cookie: this.getCookie() }
                    })];
            });
        });
    };
    JuejinHelper.prototype.sdk = function () {
        return new Sdk(this);
    };
    JuejinHelper.prototype.growth = function () {
        return new Growth(this);
    };
    JuejinHelper.prototype.seagold = function () {
        return new Seagold(this);
    };
    JuejinHelper.prototype.numpuzz = function () {
        return new NumPuzz(this);
    };
    JuejinHelper.prototype.bugfix = function () {
        return new Bugfix(this);
    };
    return JuejinHelper;
}());

export { JuejinHelper as default };
