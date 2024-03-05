pub mod plugins;

use borsh::{BorshDeserialize, BorshSerialize};
pub use plugins::*;

use crate::{
    accounts::{Asset, Collection, PluginHeader, PluginRegistry},
    errors::MplCoreError,
    types::{Key, Plugin, PluginType},
};
use solana_program::account_info::AccountInfo;

impl From<&Plugin> for PluginType {
    fn from(plugin: &Plugin) -> Self {
        match plugin {
            Plugin::Reserved => PluginType::Reserved,
            Plugin::Royalties(_) => PluginType::Royalties,
            Plugin::Freeze(_) => PluginType::Freeze,
            Plugin::Burn(_) => PluginType::Burn,
            Plugin::Transfer(_) => PluginType::Transfer,
            Plugin::UpdateDelegate(_) => PluginType::UpdateDelegate,
        }
    }
}

impl Asset {
    /// The base length of the asset account with an empty name and uri.
    pub const BASE_LENGTH: usize = 1 + 32 + 33 + 4 + 4;
}

impl Collection {
    /// The base length of the collection account with an empty name and uri.
    pub const BASE_LENGTH: usize = 1 + 32 + 4 + 4 + 4 + 4;
}

impl DataBlob for Asset {
    fn get_initial_size() -> usize {
        Asset::BASE_LENGTH
    }

    fn get_size(&self) -> usize {
        Asset::BASE_LENGTH + self.name.len() + self.uri.len()
    }
}

impl SolanaAccount for Asset {
    fn key() -> Key {
        Key::Asset
    }
}

impl DataBlob for Collection {
    fn get_initial_size() -> usize {
        Self::BASE_LENGTH
    }

    fn get_size(&self) -> usize {
        Self::BASE_LENGTH + self.name.len() + self.uri.len()
    }
}

impl SolanaAccount for Collection {
    fn key() -> Key {
        Key::Collection
    }
}

impl SolanaAccount for PluginRegistry {
    fn key() -> Key {
        Key::PluginRegistry
    }
}

impl SolanaAccount for PluginHeader {
    fn key() -> Key {
        Key::PluginHeader
    }
}

impl Key {
    pub fn from_u8(value: u8) -> Option<Self> {
        match value {
            0 => Some(Key::Uninitialized),
            1 => Some(Key::Asset),
            2 => Some(Key::HashedAsset),
            3 => Some(Key::PluginHeader),
            4 => Some(Key::PluginRegistry),
            5 => Some(Key::Collection),
            _ => None,
        }
    }
}

/// Load the one byte key from the account data at the given offset.
pub fn load_key(account: &AccountInfo, offset: usize) -> Result<Key, std::io::Error> {
    let key = Key::from_u8((*account.data).borrow()[offset]).ok_or(std::io::Error::new(
        std::io::ErrorKind::Other,
        MplCoreError::DeserializationError.to_string(),
    ))?;

    Ok(key)
}

/// A trait for generic blobs of data that have size.
pub trait DataBlob: BorshSerialize + BorshDeserialize {
    /// Get the size of an empty instance of the data blob.
    fn get_initial_size() -> usize;
    /// Get the current size of the data blob.
    fn get_size(&self) -> usize;
}

/// A trait for Solana accounts.
pub trait SolanaAccount: BorshSerialize + BorshDeserialize {
    /// Get the discriminator key for the account.
    fn key() -> Key;

    /// Load the account from the given account info starting at the offset.
    fn load(account: &AccountInfo, offset: usize) -> Result<Self, std::io::Error> {
        let key = load_key(account, offset)?;

        if key != Self::key() {
            return Err(std::io::Error::new(
                std::io::ErrorKind::Other,
                MplCoreError::DeserializationError.to_string(),
            ));
        }

        let mut bytes: &[u8] = &(*account.data).borrow()[offset..];
        Self::deserialize(&mut bytes)
    }

    /// Save the account to the given account info starting at the offset.
    fn save(&self, account: &AccountInfo, offset: usize) -> Result<(), std::io::Error> {
        borsh::to_writer(&mut account.data.borrow_mut()[offset..], self)
    }
}