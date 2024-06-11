# Grizzly - `setup` GitHub Action

This action downloads and adds [Grizzly](https://github.com/grafana/grizzly) to
the PATH.

## Example usage

```yaml
uses: grafana/setup-grizzly@main
with:
  version: 'v0.4.0'
  grafana.url: 'https://my-grafana-instance:3000'
  grafana.user: admin
  grafana.token: ${{ secrets.GRIZZLY_GRAFANA_TOKEN}}
```

## Inputs

### `version`

**Required** Version of Grizzly to install. Default `"latest"`.

### `grafana_url`

**Optional** Sets `grafana.url` in the configuration.

### `grafana_token`

**Optional** Sets `grafana.token` in the configuration.

### `grafana_user`

**Optional** Sets `grafana.user` in the configuration.

### `mimir_address`

**Optional** Sets `mimir.address` in the configuration.

### `mimir_tenant_id`

**Optional** Sets `mimir.tenant-id` in the configuration.

### `mimir_api_key`

**Optional** Sets `mimir.api-key` in the configuration.

### `synthetic_monitoring_token`

**Optional** Sets `synthetic-monitoring.token` in the configuration.

### `synthetic_monitoring_stack_id`

**Optional** Sets `synthetic-monitoring.stack-id` in the configuration.

### `synthetic_monitoring_metrics_id`

**Optional** Sets `synthetic-monitoring.metrics-id` in the configuration.

### `synthetic_monitoring_logs_id`

**Optional** Sets `synthetic-monitoring.logs-id` in the configuration.

### `targets`

**Optional** Sets `targets` in the configuration.

### `output_format`

**Optional** Sets `output-format` in the configuration.

### `only_spec`

**Optional** Sets `only-spec` in the configuration.
