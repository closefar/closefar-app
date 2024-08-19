export interface FlowModuleOptions {
  readonly minterFlowAddress: string;
  readonly minterPrivateKeyHex: string;
  readonly minterAccountIndex: number;
  readonly adminCommission: number;
  readonly network: string;
}
