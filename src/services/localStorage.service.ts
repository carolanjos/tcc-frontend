class LocalStorageService {
    public setItem(key: string, value: string) {
      localStorage.setItem(key, value);
    }
  
    public getItem(key: string): string | null {
      return localStorage.getItem(key);
    }
  
    public removeItem(key: string) {
      localStorage.removeItem(key);
    }
  
    public clear() {
      localStorage.clear();
    }
  
    public setObject(key: string, object: any) {
      localStorage.setItem(key, JSON.stringify(object));
    }
  
    public getObject(key: string) {
      const object = localStorage.getItem(key);
      return object ? JSON.parse(object) : null;
    }
  }
  
  export default new LocalStorageService();
  