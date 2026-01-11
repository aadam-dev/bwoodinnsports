/**
 * Logging Utility
 * Centralized logging with different levels
 * 
 * In production, replace this with a proper logging service
 * like Winston, Pino, or integrate with Sentry
 */

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: unknown;
}

/**
 * Logger class for structured logging
 * 
 * Production: Replace with proper logging service
 */
class Logger {
  private isDevelopment = process.env.NODE_ENV === "development";
  private isProduction = process.env.NODE_ENV === "production";

  /**
   * Log debug message (development only)
   */
  debug(message: string, data?: unknown): void {
    if (this.isDevelopment) {
      this.log("debug", message, data);
    }
  }

  /**
   * Log info message
   */
  info(message: string, data?: unknown): void {
    this.log("info", message, data);
  }

  /**
   * Log warning message
   */
  warn(message: string, data?: unknown): void {
    this.log("warn", message, data);
  }

  /**
   * Log error message
   */
  error(message: string, error?: Error | unknown, data?: unknown): void {
    const errorData = {
      ...(error instanceof Error
        ? {
            name: error.name,
            message: error.message,
            stack: this.isDevelopment ? error.stack : undefined,
          }
        : { error }),
      ...(data && typeof data === "object" ? data : { data }),
    };

    this.log("error", message, errorData);

    // In production, send to error tracking service
    if (this.isProduction) {
      // TODO: Integrate with Sentry or similar
      // Sentry.captureException(error, { extra: errorData });
    }
  }

  /**
   * Internal log method
   */
  private log(level: LogLevel, message: string, data?: unknown): void {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      ...(data && typeof data === 'object' ? { data } : {}),
    };

    // Format log entry
    const logMessage = `[${entry.timestamp}] [${level.toUpperCase()}] ${message}`;

    // Use appropriate console method
    switch (level) {
      case "debug":
        console.debug(logMessage, data || "");
        break;
      case "info":
        console.info(logMessage, data || "");
        break;
      case "warn":
        console.warn(logMessage, data || "");
        break;
      case "error":
        console.error(logMessage, data || "");
        break;
    }

    // In production, send to logging service
    if (this.isProduction) {
      // TODO: Send to logging service (Winston, Pino, etc.)
      // loggerService.log(entry);
    }
  }
}

// Export singleton instance
export const logger = new Logger();

