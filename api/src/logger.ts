import * as Bunyan from 'bunyan';

export function bunyanLogger(): Bunyan {
  // add the global bunyan logger to std out
  const streams = [];
  streams.push({
    stream: process.stdout,
  });

  return Bunyan.createLogger({
    streams,
    name: 'EliakarisBlog',
  });
}
