import { getSDK, CbEvents } from "@openim/client-sdk";

//#region OpenIM 包装方法

export function resetWrapper(sdk) {
  try {
    let instance = sdk?.messageTrigger?.instance || sdk;
    if (typeof instance?.reset === "function") {
      instance.reset();
    }
  } catch (error) {}
}

export function loginWrapper(sdk, loginParams, options = {}) {
  const { timeout = 0 } = options;

  return new Promise((resolve, reject) => {
    let settled = false;
    let loginSuccess = false;
    let connectSuccess = false;
    let loginResult = null;
    let timer = null;

    // 统一的结束函数
    function finalize(isSuccess, dataOrError) {
      if (settled) return;
      settled = true;

      // 清理定时器（仅当 timeout > 0 时 timer 才有值）
      if (timer) clearTimeout(timer);

      unregisterIMSDKListeners();

      if (isSuccess) resolve(dataOrError);
      else reject(dataOrError);
    }

    // 检查是否双条件达成
    function checkComplete() {
      if (loginSuccess && connectSuccess) {
        finalize(true, {
          success: true,
          data: loginResult,
          message: "Login and connect success",
        });
      }
    }

    // 超时处理（timeout 为 0 时跳过，不做超时限制）
    if (timeout > 0) {
      timer = setTimeout(() => {
        const reasons = [];
        if (!loginSuccess) reasons.push("login failed");
        if (!connectSuccess) reasons.push("connect failed");
        finalize(
          false,
          new Error(
            `OpenIM login timeout [${reasons.join(", ")}] after ${timeout}ms`,
          ),
        );
      }, timeout);
    }

    //#region 事件监听

    const eventHandlers = {
      [CbEvents.OnConnectSuccess]: () => {
        connectSuccess = true;
        checkComplete();
      },
      [CbEvents.OnConnectFailed]: (err) => {
        finalize(false, err || new Error("OpenIM WebSocket connection failed"));
      },
      [CbEvents.OnKickedOffline]: () => {
        finalize(false, new Error("OpenIM login failed: user kicked offline"));
      },
      [CbEvents.OnUserTokenExpired]: () => {
        finalize(false, new Error("OpenIM login failed: token expired"));
      },
    };

    function registerIMSDKListeners() {
      Object.entries(eventHandlers).forEach(([event, handler]) =>
        sdk.on(event, handler),
      );
    }

    function unregisterIMSDKListeners() {
      Object.entries(eventHandlers).forEach(([event, handler]) =>
        sdk.off(event, handler),
      );
    }

    //#endregion

    async function logout() {
      try {
        await sdk.logout();
      } catch (_) {
        // 忽略登出失败
      } finally {
        resetWrapper(sdk);
      }
    }

    async function executeLogin() {
      //  1、如果没有退出重复调用登录，则先卸载事件监听、退出登录、重置 SDK
      unregisterIMSDKListeners();
      await logout();

      //  2、重新注册监听
      registerIMSDKListeners();

      //  3、执行登录
      try {
        const res = await sdk.login(loginParams);
        loginSuccess = true;
        loginResult = res;
        checkComplete(); // 如果此时 connect 已经成功，直接结束
      } catch (err) {
        finalize(false, err);
      }
    }

    // 启动流程
    executeLogin();
  });
}

//#endregion

//#region 单例模式

let _sdk = null;
let _state = "idle"; // idle | initializing | ready | failed
let _error = null;
let _initPromise = null;
let _version = 0; // 核心机制：版本号，用于丢弃过期的异步结果

export async function initIM(loginParams, options = {}) {
  // 版本号自增，使当前调用获得最新身份
  const currentVersion = ++_version;

  // 保存旧的 SDK 实例引用
  const oldSDK = _sdk;

  _state = "initializing";
  _error = null;

  // 获取新的底层实例
  const newSDK = getSDK();
  _sdk = newSDK; // 立即替换指针，Proxy 会自动指向新实例

  // 兼容性处理：如果 getSDK() 不是单例，手动清理旧实例防止连接泄漏
  if (oldSDK && oldSDK !== newSDK) {
    try {
      await oldSDK.logout();
    } catch (_) {}
    resetWrapper(oldSDK);
  }

  _initPromise = loginWrapper(newSDK, loginParams, options)
    .then((res) => {
      // 【防抖核心】如果执行到此时代码已过期，说明用户又发了新的 initIM，直接丢弃结果
      if (currentVersion !== _version) return;
      _state = "ready";
      return res;
    })
    .catch((err) => {
      // 【防抖核心】同上，过期则不修改状态
      if (currentVersion !== _version) return;
      _state = "failed";
      _error = err;
      _sdk = null; // 彻底失败时清空引用，防止误用
      throw err;
    });

  return _initPromise;
}

export function resetIM() {
  _version++; // 递增版本号，让正在进行的 initIM 变为"过期"状态
  _state = "idle";
  _error = null;
  _initPromise = null;
  _sdk = null;
}

//#endregion

export const IMSDK = new Proxy(
  {},
  {
    get(_, prop) {
      if (prop === "$state") return _state;
      if (prop === "$error") return _error;
      if (prop === "$ready") return _state === "ready";

      if (_state === "idle")
        throw new Error("[IM] 未初始化，请先调用 await initIM()");
      if (_state === "initializing")
        throw new Error("[IM] 初始化中，请先 await initIM()");
      if (_state === "failed")
        throw new Error(`[IM] 初始化失败: ${_error?.message || _error}`);

      // 动态代理到最新的 _sdk
      const value = _sdk[prop];
      return typeof value === "function" ? value.bind(_sdk) : value;
    },

    has(_, prop) {
      if (prop.startsWith("$")) return true;
      return _state === "ready" && _sdk && prop in _sdk;
    },
  },
);
