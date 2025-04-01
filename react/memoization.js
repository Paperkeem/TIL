class DataCache {
  constructor(defaultCacheDuration = 1000) {
    this.cache = new Map(); // key별 데이터 저장
    this.cacheDurations = new Map(); // key별 캐시 유지 시간 저장
    this.defaultCacheDuration = defaultCacheDuration; // 기본 캐시 유지 시간
  }

  async fetchData(key, fn) {
    const now = Date.now();

    if (this.cache.has(key)) {
      const { data, timestamp } = this.cache.get(key);
      const cacheDuration =
        this.cacheDurations.get(key) || this.defaultCacheDuration;

      if (now - timestamp < cacheDuration) {
        return data; // 캐시된 데이터 반환
      }
    }

    const { data } = await fn(); // API에서 데이터 가져오기
    this.cache.set(key, { data, timestamp: Date.now() });

    return data;
  }

  setCacheDuration(ms, key) {
    this.cacheDurations.set(key, ms);
  }

  setDefaultCacheDuration(ms) {
    this.defaultCacheDuration = ms;
  }

  // 모든 캐시된 key들의 duration을 일괄 변경
  setGlobalCacheDuration(ms) {
    this.defaultCacheDuration = ms;

    // 현재 저장된 모든 key들의 개별 캐시 duration도 변경
    for (const key of this.cache.keys()) {
      this.cacheDurations.set(key, ms);
    }
  }

  clearCache(key) {
    this.cache.delete(key);
    this.cacheDurations.delete(key);
  }

  clearAllCache() {
    this.cache.clear();
    this.cacheDurations.clear();
  }
}

function memoize(fn) {
  const cache = new Map();

  return function (args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(args);
    cache.set(key, result);
    return result;
  };
}

function weakMapMemoize(fn) {
  const cache = new WeakMap();

  return function (arg) {
    if (typeof arg !== "object" || arg === null) {
      throw new Error("WeakMap은 오직 객체를 키로 사용할 수 있습니다.");
    }

    if (cache.has(arg)) {
      return cache.get(arg);
    }

    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
}

const user = { name: "JongeeKim" };

const getUserName = weakMapMemoize((user) => {
  console.log("캐싱 중...");
  return user.name.toUpperCase();
});

console.log(getUserName(user)); // 캐싱 중... JongeeKim
console.log(getUserName(user)); // JongeeKim

function createUseMemo () {
  let cache;
  let deps;

  return function useMemo(factory, nextDeps) {
    const hasChange = !deps || !nextDeps.every((dep, idx) => Object.is(dep, deps[idx]));

    if (hasChange) {
      cache = factory();
      deps = nextDeps;
    }
    return cache;
  }

}

const useMemo = createUseMemo();
const calculatedValue = useMemo(() => {
  return a + b
}, [a, b])