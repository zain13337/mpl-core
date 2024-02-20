//! This code was AUTOGENERATED using the kinobi library.
//! Please DO NOT EDIT THIS FILE, instead use visitors
//! to add features, then rerun kinobi to update it.
//!
//! [https://github.com/metaplex-foundation/kinobi]
//!

use num_derive::FromPrimitive;
use thiserror::Error;

#[derive(Clone, Debug, Eq, Error, FromPrimitive, PartialEq)]
pub enum MplAssetError {
    /// 0 (0x0) - Invalid System Program
    #[error("Invalid System Program")]
    InvalidSystemProgram,
    /// 1 (0x1) - Error deserializing account
    #[error("Error deserializing account")]
    DeserializationError,
    /// 2 (0x2) - Error serializing account
    #[error("Error serializing account")]
    SerializationError,
    /// 3 (0x3) - Plugins not initialized
    #[error("Plugins not initialized")]
    PluginsNotInitialized,
    /// 4 (0x4) - Plugin not found
    #[error("Plugin not found")]
    PluginNotFound,
    /// 5 (0x5) - Numerical Overflow
    #[error("Numerical Overflow")]
    NumericalOverflow,
    /// 6 (0x6) - Incorrect account
    #[error("Incorrect account")]
    IncorrectAccount,
    /// 7 (0x7) - Incorrect asset hash
    #[error("Incorrect asset hash")]
    IncorrectAssetHash,
    /// 8 (0x8) - Invalid Plugin
    #[error("Invalid Plugin")]
    InvalidPlugin,
    /// 9 (0x9) - Invalid Authority
    #[error("Invalid Authority")]
    InvalidAuthority,
    /// 10 (0xA) - Cannot transfer a frozen asset
    #[error("Cannot transfer a frozen asset")]
    AssetIsFrozen,
    /// 11 (0xB) - Missing compression proof
    #[error("Missing compression proof")]
    MissingCompressionProof,
    /// 12 (0xC) - Cannot migrate a master edition used for prints
    #[error("Cannot migrate a master edition used for prints")]
    CannotMigrateMasterWithSupply,
    /// 13 (0xD) - Cannot migrate a print edition
    #[error("Cannot migrate a print edition")]
    CannotMigratePrints,
    /// 14 (0xE) - Cannot burn a collection NFT
    #[error("Cannot burn a collection NFT")]
    CannotBurnCollection,
    /// 15 (0xF) - Numerical overflow
    #[error("Numerical overflow")]
    NumericalOverflowError,
}

impl solana_program::program_error::PrintProgramError for MplAssetError {
    fn print<E>(&self) {
        solana_program::msg!(&self.to_string());
    }
}
