import { WebTracerProvider } from "@opentelemetry/sdk-trace-web";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { ZoneContextManager } from "@opentelemetry/context-zone";
import { ATTR_SERVICE_NAME } from "@opentelemetry/semantic-conventions";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { getWebAutoInstrumentations } from "@opentelemetry/auto-instrumentations-web";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";

const provider = new WebTracerProvider({
  resource: {
    attributes: {
      [ATTR_SERVICE_NAME]: "nex-door-ui",
    },
  },
});

provider.addSpanProcessor(
  new BatchSpanProcessor(
    new OTLPTraceExporter({
      url: import.meta.env.VITE_OTEL_EXPORTER_OTLP_TRACES_ENDPOINT,
      headers: {},
    }),
  ),
);

provider.register({
  contextManager: new ZoneContextManager(),
});

registerInstrumentations({
  provider: provider,
  instrumentations: [getWebAutoInstrumentations()],
});
