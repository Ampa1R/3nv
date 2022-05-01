export class Env<T = EnvValues> {
  private cache: Partial<T>;

  constructor(defaultValues: Partial<T> = {}) {
    this.cache = defaultValues;
  }

  set(key: keyof T, value: T[keyof T]) {
    this.cache[key] = value;
  }

  has(key: keyof T): boolean {
    return Object.hasOwnProperty.call(this.cache, key);
  }

  get(key: keyof T): T[typeof key] | undefined {
    return this.cache[key];
  }

  all(): Partial<T> {
    return this.cache;
  }

  update(newCache: EnvValues): void {
    Object.assign(this.cache, newCache);
  }
}
