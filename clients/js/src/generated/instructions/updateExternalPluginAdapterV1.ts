/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Context,
  Pda,
  PublicKey,
  Signer,
  TransactionBuilder,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  mapSerializer,
  struct,
  u8,
} from '@metaplex-foundation/umi/serializers';
import {
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  getAccountMetasAndSigners,
} from '../shared';
import {
  BaseExternalPluginAdapterKey,
  BaseExternalPluginAdapterKeyArgs,
  BaseExternalPluginAdapterUpdateInfo,
  BaseExternalPluginAdapterUpdateInfoArgs,
  getBaseExternalPluginAdapterKeySerializer,
  getBaseExternalPluginAdapterUpdateInfoSerializer,
} from '../types';

// Accounts.
export type UpdateExternalPluginAdapterV1InstructionAccounts = {
  /** The address of the asset */
  asset: PublicKey | Pda;
  /** The collection to which the asset belongs */
  collection?: PublicKey | Pda;
  /** The account paying for the storage fees */
  payer?: Signer;
  /** The owner or delegate of the asset */
  authority?: Signer;
  /** The system program */
  systemProgram?: PublicKey | Pda;
  /** The SPL Noop Program */
  logWrapper?: PublicKey | Pda;
};

// Data.
export type UpdateExternalPluginAdapterV1InstructionData = {
  discriminator: number;
  key: BaseExternalPluginAdapterKey;
  updateInfo: BaseExternalPluginAdapterUpdateInfo;
};

export type UpdateExternalPluginAdapterV1InstructionDataArgs = {
  key: BaseExternalPluginAdapterKeyArgs;
  updateInfo: BaseExternalPluginAdapterUpdateInfoArgs;
};

export function getUpdateExternalPluginAdapterV1InstructionDataSerializer(): Serializer<
  UpdateExternalPluginAdapterV1InstructionDataArgs,
  UpdateExternalPluginAdapterV1InstructionData
> {
  return mapSerializer<
    UpdateExternalPluginAdapterV1InstructionDataArgs,
    any,
    UpdateExternalPluginAdapterV1InstructionData
  >(
    struct<UpdateExternalPluginAdapterV1InstructionData>(
      [
        ['discriminator', u8()],
        ['key', getBaseExternalPluginAdapterKeySerializer()],
        ['updateInfo', getBaseExternalPluginAdapterUpdateInfoSerializer()],
      ],
      { description: 'UpdateExternalPluginAdapterV1InstructionData' }
    ),
    (value) => ({ ...value, discriminator: 26 })
  ) as Serializer<
    UpdateExternalPluginAdapterV1InstructionDataArgs,
    UpdateExternalPluginAdapterV1InstructionData
  >;
}

// Args.
export type UpdateExternalPluginAdapterV1InstructionArgs =
  UpdateExternalPluginAdapterV1InstructionDataArgs;

// Instruction.
export function updateExternalPluginAdapterV1(
  context: Pick<Context, 'payer' | 'programs'>,
  input: UpdateExternalPluginAdapterV1InstructionAccounts &
    UpdateExternalPluginAdapterV1InstructionArgs
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplCore',
    'CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d'
  );

  // Accounts.
  const resolvedAccounts = {
    asset: {
      index: 0,
      isWritable: true as boolean,
      value: input.asset ?? null,
    },
    collection: {
      index: 1,
      isWritable: true as boolean,
      value: input.collection ?? null,
    },
    payer: {
      index: 2,
      isWritable: true as boolean,
      value: input.payer ?? null,
    },
    authority: {
      index: 3,
      isWritable: false as boolean,
      value: input.authority ?? null,
    },
    systemProgram: {
      index: 4,
      isWritable: false as boolean,
      value: input.systemProgram ?? null,
    },
    logWrapper: {
      index: 5,
      isWritable: false as boolean,
      value: input.logWrapper ?? null,
    },
  } satisfies ResolvedAccountsWithIndices;

  // Arguments.
  const resolvedArgs: UpdateExternalPluginAdapterV1InstructionArgs = {
    ...input,
  };

  // Default values.
  if (!resolvedAccounts.payer.value) {
    resolvedAccounts.payer.value = context.payer;
  }
  if (!resolvedAccounts.systemProgram.value) {
    resolvedAccounts.systemProgram.value = context.programs.getPublicKey(
      'splSystem',
      '11111111111111111111111111111111'
    );
    resolvedAccounts.systemProgram.isWritable = false;
  }

  // Accounts in order.
  const orderedAccounts: ResolvedAccount[] = Object.values(
    resolvedAccounts
  ).sort((a, b) => a.index - b.index);

  // Keys and Signers.
  const [keys, signers] = getAccountMetasAndSigners(
    orderedAccounts,
    'programId',
    programId
  );

  // Data.
  const data =
    getUpdateExternalPluginAdapterV1InstructionDataSerializer().serialize(
      resolvedArgs as UpdateExternalPluginAdapterV1InstructionDataArgs
    );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
