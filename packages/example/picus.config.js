import {Config} from '@picus/cli/config';

Config.setConcurrency(require('os').cpus().length);
Config.Output.setOverwriteOutput(true);
