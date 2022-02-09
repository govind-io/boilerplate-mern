import Loggers from './internals/loggers';

export default class Logger {
  public static info(message: string): void {
    Loggers.info(message);
  }

  public static debug(message: string): void {
    Loggers.debug(message);
  }

  public static warn(message: string): void {
    Loggers.warn(message);
  }

  public static criticial(message: string): void {
    Loggers.criticial(message);
  }
}