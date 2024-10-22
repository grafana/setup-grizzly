const core = require('@actions/core');
const tc = require('@actions/tool-cache');
const { writeConfig } = require('./lib/config');
const { downloadBinary, identifyLatest } = require('./lib/utils');

const toolName = 'grr';

const configOptionsMap = {
  grafana_url: 'grafana.url',
  grafana_token: 'grafana.token',
  grafana_user: 'grafana.user',
  mimir_address: 'mimir.address',
  mimir_tenant_id: 'mimir.tenant-id',
  mimir_api_key: 'mimir.api-key',
  synthetic_monitoring_token: 'synthetic-monitoring.token',
  synthetic_monitoring_stack_id: 'synthetic-monitoring.stack-id',
  synthetic_monitoring_metrics_id: 'synthetic-monitoring.metrics-id',
  synthetic_monitoring_logs_id: 'synthetic-monitoring.logs-id',
  targets: 'targets',
  output_format: 'output-format',
  only_spec: 'only-spec'
};

function grizzlyConfigFromInput() {
  const config = {};

  for (const option in configOptionsMap) {
    const value = core.getInput(option);

    if (value) {
      config[configOptionsMap[option]] = value;
    }
  }

  return config;
}

async function setup() {
  try {
    // Get the version to be installed
    let version = core.getInput('version');

    if (version === 'latest') {
      console.log('Identifying "latest" version...');
      version = await identifyLatest();
      console.log(`Latest version is ${version}`);
    }

    const cachedPath = tc.find(toolName, version);
    if (cachedPath) {
      // Note: this cache is only used across runs :(
      // See: https://github.com/actions/toolkit/issues/58
      console.log(`Using Grizzly ${version} from cache`);
      core.addPath(cachedPath);
      return;
    }

    const binaryDir = await downloadBinary(version);

    console.log(`Caching Grizzly ${version}`);
    const grrCacheDir = await tc.cacheDir(binaryDir, toolName, version);

    // Expose grizzly by adding it to the PATH
    console.log(`Adding Grizzly to PATH: ${grrCacheDir}`);
    core.addPath(grrCacheDir);

    const config = grizzlyConfigFromInput();
    if (Object.keys(config).length !== 0) {
      console.log(`Writing configuration`);
      await writeConfig(config, {
        stdout: console.log,
        stderr: console.error
      });
    }
  } catch (e) {
    core.setFailed(e);
  }
}

module.exports = setup;

if (require.main === module) {
  setup();
}
