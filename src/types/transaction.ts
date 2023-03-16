import type { Address } from 'abitype'
import type { transactionType } from '../utils'
import type { FeeValuesEIP1559, FeeValuesLegacy } from './fee'
import type { Log } from './log'
import type { Hash, Hex } from './misc'
import type { ValueOf } from './utils'

export type AccessList = { address: Address; storageKeys: Hex[] }[]

export type TransactionType = ValueOf<typeof transactionType>

export type TransactionReceipt<
  TQuantity = bigint,
  TIndex = number,
  TStatus = 'success' | 'reverted',
  TType = TransactionType,
> = {
  /** Hash of block containing this transaction */
  blockHash: Hash
  /** Number of block containing this transaction */
  blockNumber: TQuantity
  /** Address of new contract or `null` if no contract was created */
  contractAddress: Address | null
  /** Gas used by this and all preceding transactions in this block */
  cumulativeGasUsed: TQuantity
  /** Pre-London, it is equal to the transaction's gasPrice. Post-London, it is equal to the actual gas price paid for inclusion. */
  effectiveGasPrice: TQuantity
  /** Transaction sender */
  from: Address
  /** Gas used by this transaction */
  gasUsed: TQuantity
  /** List of log objects generated by this transaction */
  logs: Log<TQuantity, TIndex>[]
  /** Logs bloom filter */
  logsBloom: Hex
  /** `1` if this transaction was successful or `0` if it failed */
  status: TStatus
  /** Transaction recipient or `null` if deploying a contract */
  to: Address | null
  /** Hash of this transaction */
  transactionHash: Hash
  /** Index of this transaction in the block */
  transactionIndex: TIndex
  /** Transaction type */
  type: TType
}

export type TransactionBase<TQuantity = bigint, TIndex = number> = {
  /** Hash of block containing this transaction or `null` if pending */
  blockHash: Hash | null
  /** Number of block containing this transaction or `null` if pending */
  blockNumber: TQuantity | null
  /** Chain ID. */
  chainId: TIndex
  /** Transaction sender */
  from: Address
  /** Gas provided for transaction execution */
  gas: TQuantity
  /** Hash of this transaction */
  hash: Hash
  /** Contract code or a hashed method call */
  input: Hex
  /** Unique number identifying this transaction */
  nonce: TIndex
  /** ECDSA signature r */
  r: Hex
  /** ECDSA signature s */
  s: Hex
  /** Transaction recipient or `null` if deploying a contract */
  to: Address | null
  /** Index of this transaction in the block or `null` if pending */
  transactionIndex: TIndex | null
  /** ECDSA recovery ID */
  v: TQuantity
  /** Value in wei sent with this transaction */
  value: TQuantity
}
export type TransactionLegacy<
  TQuantity = bigint,
  TIndex = number,
  TType = 'legacy',
> = TransactionBase<TQuantity, TIndex> &
  FeeValuesLegacy<TQuantity> & {
    accessList?: never
    type: TType
  }
export type TransactionEIP2930<
  TQuantity = bigint,
  TIndex = number,
  TType = 'eip2930',
> = TransactionBase<TQuantity, TIndex> &
  FeeValuesLegacy<TQuantity> & {
    accessList: AccessList
    type: TType
  }
export type TransactionEIP1559<
  TQuantity = bigint,
  TIndex = number,
  TType = 'eip1559',
> = TransactionBase<TQuantity, TIndex> &
  FeeValuesEIP1559<TQuantity> & {
    accessList: AccessList
    type: TType
  }
export type Transaction<TQuantity = bigint, TIndex = number> =
  | TransactionLegacy<TQuantity, TIndex>
  | TransactionEIP2930<TQuantity, TIndex>
  | TransactionEIP1559<TQuantity, TIndex>

export type TransactionRequestBase<TQuantity = bigint, TIndex = number> = {
  /** Contract code or a hashed method call with encoded args */
  data?: Hex
  /** Transaction sender */
  from: Address
  /** Gas provided for transaction execution */
  gas?: TQuantity
  /** Unique number identifying this transaction */
  nonce?: TIndex
  /** Transaction recipient */
  to?: Address
  /** Value in wei sent with this transaction */
  value?: TQuantity
}
export type TransactionRequestLegacy<
  TQuantity = bigint,
  TIndex = number,
> = TransactionRequestBase<TQuantity, TIndex> &
  Partial<FeeValuesLegacy<TQuantity>> & {
    accessList?: never
  }
export type TransactionRequestEIP2930<
  TQuantity = bigint,
  TIndex = number,
> = TransactionRequestBase<TQuantity, TIndex> &
  Partial<FeeValuesLegacy<TQuantity>> & {
    accessList?: AccessList
  }
export type TransactionRequestEIP1559<
  TQuantity = bigint,
  TIndex = number,
> = TransactionRequestBase<TQuantity, TIndex> &
  Partial<FeeValuesEIP1559<TQuantity>> & {
    accessList?: AccessList
  }
export type TransactionRequest<TQuantity = bigint, TIndex = number> =
  | TransactionRequestLegacy<TQuantity, TIndex>
  | TransactionRequestEIP2930<TQuantity, TIndex>
  | TransactionRequestEIP1559<TQuantity, TIndex>
