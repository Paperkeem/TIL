class DataCache {
  constructor(apiService, defaultCacheDuration = 1000) {
    this.apiService = apiService; // API 서비스 주입
    this.cache = new Map(); // key별 데이터 저장
    this.cacheDurations = new Map(); // key별 캐시 유지 시간 저장
    this.defaultCacheDuration = defaultCacheDuration; // 기본 캐시 유지 시간
  }

  async fetchData(key) {
    const now = Date.now();

    if (this.cache.has(key)) {
      const { data, timestamp } = this.cache.get(key);
      const cacheDuration =
        this.cacheDurations.get(key) || this.defaultCacheDuration;

      if (now - timestamp < cacheDuration) {
        return data; // 캐시된 데이터 반환
      }
    }

    const { data } = await this.apiService.fetch(key); // API에서 데이터 가져오기
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
