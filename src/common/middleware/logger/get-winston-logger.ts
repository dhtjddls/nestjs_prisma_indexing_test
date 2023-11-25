import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { format, transports } from 'winston';

export function getWinstonLogger(nodeEnv: string, moduleName: string) {
  const isLocalEnv = ['local', 'test', undefined].includes(nodeEnv);
  const level = isLocalEnv ? 'debug' : 'info';

  console.log(`nodeEnv=${nodeEnv}, level=${level}`);

  return {
    transports: [
      new transports.Console({
        level: level,
        format: isLocalEnv
          ? getTextFormat(moduleName)
          : getJsonFormat(moduleName),
      }),
    ],
  };
}

function getTextFormat(moduleName: string) {
  return format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.ms(),
    format.colorize({ all: true }),
    nestWinstonModuleUtilities.format.nestLike(moduleName, {
      colors: true,
      prettyPrint: true,
    }),
  );
}

function getJsonFormat(moduleName: string) {
  return format.combine(
    format.label({ label: `[${moduleName}]` }),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.ms(),
    format.json(),
  );
}
