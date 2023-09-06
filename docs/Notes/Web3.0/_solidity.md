# Solidity basic



recieve 是一個特殊的 function，當你在 Tx (transaction) 時沒有指定要呼叫的 function 名稱時會被呼叫

```solidity
contract faucet {
	recieve() external payable {}
}
```

external function 是 contact interface 的一部分，代表他可以透過合約或是其他 Tx 被呼叫

payable 代表可以接收在 transaction 裡面指定的 ether

view: readonly function (不會產生 transaction, gas fee) flag, 代表 function 不會以任何形式改變 storage 的 state

pure: readonly function (不會產生 transaction, gas fee) flag, 比 view 更嚴格，代表連讀取 storage state 不行