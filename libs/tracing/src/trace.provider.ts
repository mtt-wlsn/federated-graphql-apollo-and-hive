import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import {
  ConsoleSpanExporter,
  SimpleSpanProcessor,
  SpanExporter,
} from '@opentelemetry/sdk-trace-base';
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
import { GraphQLInstrumentation } from '@opentelemetry/instrumentation-graphql';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { FilteredConsoleSpanExporter } from './filteredConsoleSpanExporter';

class TracerProvider {
  private readonly _provider: NodeTracerProvider;

  constructor() {
    this._provider = new NodeTracerProvider();

    this._provider.addSpanProcessor(
      //new SimpleSpanProcessor(new ConsoleSpanExporter()),
      new SimpleSpanProcessor(new FilteredConsoleSpanExporter()),
    );
    registerInstrumentations({
      tracerProvider: this._provider,
      instrumentations: [
        //new NestInstrumentation(),
        //new GraphQLInstrumentation(),
        new HttpInstrumentation(),
      ],
    });

    this._provider.register();

    //   diag.setLogger(
    //     new DiagConsoleLogger(),
    //     DiagLogLevel[process.env.TRACER_DIAG_LOG_LEVEL],
    //   );
  }
}

export const tracer = new TracerProvider();
