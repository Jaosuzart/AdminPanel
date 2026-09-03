export const logger = {
  info: (msg) => process.stdout.write(`[INFO] ${new Date().toISOString()} — ${msg}\n`),
  error: (msg, err) => process.stderr.write(`[ERROR] ${new Date().toISOString()} — ${msg}${err ? `: ${err.message}` : ''}\n`),
};
