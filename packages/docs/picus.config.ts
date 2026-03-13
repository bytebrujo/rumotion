import path from 'path';
import {Config} from '@picus/cli/config';

Config.setPublicDir(path.join(process.cwd(), 'static'));
