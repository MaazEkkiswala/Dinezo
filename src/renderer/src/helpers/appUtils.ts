export default class AppUtils {
  static classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ')
  }

  static setValueToLocalStorage(key: string, value: string) {
    return localStorage.setItem(key, value)
  }

  static deleteValueFromLocalStorage(key: string) {
    return localStorage.removeItem(key)
  }

  static clearLocalStorage() {
    return localStorage.clear()
  }

  static getValueFromStorage(key: string) {
    const value = localStorage.getItem(key)

    return value
  }
}
