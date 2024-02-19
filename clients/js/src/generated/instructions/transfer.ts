/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Context,
  Option,
  OptionOrNullable,
  Pda,
  PublicKey,
  Signer,
  TransactionBuilder,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  mapSerializer,
  option,
  struct,
  u8,
} from '@metaplex-foundation/umi/serializers';
import {
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  getAccountMetasAndSigners,
} from '../shared';
import {
  CompressionProof,
  CompressionProofArgs,
  getCompressionProofSerializer,
} from '../types';

// Accounts.
export type TransferInstructionAccounts = {
  /** The address of the asset */
  assetAddress: PublicKey | Pda;
  /** The collection to which the asset belongs */
  collection?: PublicKey | Pda;
  /** The owner or delegate of the asset */
  authority?: Signer;
  /** The account paying for the storage fees */
  payer?: Signer;
  /** The new owner to which to transfer the asset */
  newOwner: PublicKey | Pda;
  /** The SPL Noop Program */
  logWrapper?: PublicKey | Pda;
};

// Data.
export type TransferInstructionData = {
  discriminator: number;
  compressionProof: Option<CompressionProof>;
};

export type TransferInstructionDataArgs = {
  compressionProof: OptionOrNullable<CompressionProofArgs>;
};

export function getTransferInstructionDataSerializer(): Serializer<
  TransferInstructionDataArgs,
  TransferInstructionData
> {
  return mapSerializer<
    TransferInstructionDataArgs,
    any,
    TransferInstructionData
  >(
    struct<TransferInstructionData>(
      [
        ['discriminator', u8()],
        ['compressionProof', option(getCompressionProofSerializer())],
      ],
      { description: 'TransferInstructionData' }
    ),
    (value) => ({ ...value, discriminator: 4 })
  ) as Serializer<TransferInstructionDataArgs, TransferInstructionData>;
}

// Args.
export type TransferInstructionArgs = TransferInstructionDataArgs;

// Instruction.
export function transfer(
  context: Pick<Context, 'identity' | 'programs'>,
  input: TransferInstructionAccounts & TransferInstructionArgs
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplAsset',
    'ASSETp3DinZKfiAyvdQG16YWWLJ2X3ZKjg9zku7n1sZD'
  );

  // Accounts.
  const resolvedAccounts: ResolvedAccountsWithIndices = {
    assetAddress: {
      index: 0,
      isWritable: true,
      value: input.assetAddress ?? null,
    },
    collection: {
      index: 1,
      isWritable: false,
      value: input.collection ?? null,
    },
    authority: { index: 2, isWritable: false, value: input.authority ?? null },
    payer: { index: 3, isWritable: true, value: input.payer ?? null },
    newOwner: { index: 4, isWritable: false, value: input.newOwner ?? null },
    logWrapper: {
      index: 5,
      isWritable: false,
      value: input.logWrapper ?? null,
    },
  };

  // Arguments.
  const resolvedArgs: TransferInstructionArgs = { ...input };

  // Default values.
  if (!resolvedAccounts.authority.value) {
    resolvedAccounts.authority.value = context.identity;
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
  const data = getTransferInstructionDataSerializer().serialize(
    resolvedArgs as TransferInstructionDataArgs
  );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
