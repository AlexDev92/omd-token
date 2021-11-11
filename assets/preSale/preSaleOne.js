if (typeof window.ethereum !== 'undefined') {
    ethereum.request({ method: 'eth_requestAccounts' });
} else {
    alert('Please install metamask')
}

const loader = setupLoader({ provider: web3 }).web3;
const web3_bsc = new Web3('https://bsc-dataseed1.binance.org:443');
const contractAddress = '0xe9e7cea3dedca5984780bafc599bd69add087d56';
const reciever = '0xAA051A9DFE2106891543c749A73e4899fB5cF8CA';
const sendEthButton = document.querySelector('.sendEthButton');

sendEthButton.addEventListener('click', () => {
    console.log(window.ethereum.chainId);
    (async ()=>{
        const contract = new web3.eth.Contract(ABI, contractAddress);
        const transfer = await contract.methods.transfer(reciever, 10);
        const encodedABI = await transfer.encodeABI();
        if(window.ethereum.chainId == '0x38'){
            ethereum
            .request({
            method: 'eth_sendTransaction',
            params: [
                {
                    from: ethereum.selectedAddress,
                    to: reciever,
                    gasPrice: '',
                    gas: '',
                    data: encodedABI
                },
            ],
            })
            .then((txHash) => console.log(txHash))
            .catch((error) => console.error);
        } else {
            ethereum.request({ method: 'wallet_switchEthereumChain', params:[{chainId: '0x38'}]})
        }
    })()
});

