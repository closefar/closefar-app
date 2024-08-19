import { Module } from '@nestjs/common';
import { FlowService } from './flow.service';
import { ConfigurableModuleClass } from './flow.module-definition';

@Module({
  providers: [FlowService],
  exports: [FlowService],
})
// export class FlowModule {}
export class FlowModule extends ConfigurableModuleClass {}
