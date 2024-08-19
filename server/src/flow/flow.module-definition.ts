import { ConfigurableModuleBuilder } from '@nestjs/common';
import { FlowModuleOptions } from './flow.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<FlowModuleOptions>({
    moduleName: 'Flow',
  })
    .setClassMethodName('forRoot')
    .setExtras({ isGlobal: false }, (definition, extras) => ({
      ...definition,
      global: extras.isGlobal,
    }))
    .build();
