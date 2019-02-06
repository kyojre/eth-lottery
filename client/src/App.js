import React, { Component } from "react";
import CardExampleCard from "./display/ui";
import LotteryContract from "./contracts/Lottery.json";
import getWeb3 from "./utils/getWeb3";

class App extends Component {
	state = { 
		web3: null,
		contract: null,
		address: "",
		addressWeb: "",
		currentAccount: "", 
		manager: "", 
		winner: "", 
		round: 0,
		playersSlice: [], 
		playersCnt: 0,
		balance: 0,
		isClicking: false,
		isShowButton:  "none",
	}

        componentDidMount = async () => {                                                                                    
	    	try {
      			const web3 = await getWeb3();
      			const networkId = await web3.eth.net.getId();
      			const deployedNetwork = LotteryContract.networks[networkId];
			const instance = new web3.eth.Contract(
					LotteryContract.abi,
					deployedNetwork && deployedNetwork.address,
			);

			const address = instance.options.address
			let accounts = await web3.eth.getAccounts()
			let currentAccount = accounts[0]
			let manager = await instance.methods.manager().call()
			let winner = await instance.methods.winner().call()
			let round = await instance.methods.round().call()
			let playersSlice = await instance.methods.getPlayersSlice().call()
			let playersCnt = await instance.methods.getPlayersCnt().call()
			let balanceWei = await instance.methods.getBalance().call()
			let balance = web3.utils.fromWei(balanceWei, "ether")
			let isShowButton = currentAccount === manager ? "inline" : "none"
                	this.setState({
				web3,
				contract: instance,
                       		address,
				currentAccount,
				manager,
				winner,
				round,
				playersSlice,
				playersCnt,                                                                                          
				balance,
				isShowButton,
                	})
			if (networkId === 3) {
				this.setState({
					addressWeb: 'https://ropsten.etherscan.io/address/'+address,
				})
			}
		}
		catch (e) {
      			alert("Failed to load web3, accounts, or contract. Check console for details.");
      			console.error(e);
    		}
        }

        play = async () => {                                                                                                 
		try{
			const { web3, contract } = this.state
                        this.setState({
                                isClicking:true
                        })
                        let accounts = await web3.eth.getAccounts()
                        await contract.methods.play().send({
                                from: accounts[0],
                                value: web3.utils.toWei('1', "ether")
                        })
                        this.setState({
                                isClicking:false
                        })
                        alert("投注成功！")
                        window.location.reload(true)
                }
                catch(e) {
                        this.setState({
                                isClicking:false
                        })
                        alert("投注失败！")
                        console.log(e)
                }
        }

        drawPrize = async () => {
                try {
			const { web3, contract } = this.state
                        this.setState({
                                isClicking:true
                        })  
                        let accounts = await web3.eth.getAccounts()
                        await contract.methods.drawPrize().send({
                                from: accounts[0],
                        })  
                        this.setState({
                                isClicking:false
                        })  

                        let winner = await contract.methods.winner().call()

                        alert(`开奖成功！\n中奖人：${winner}`)
                        window.location.reload(true)
                }   
                catch(e) {
                        this.setState({
                                isClicking:false
                        })  
                        alert("开奖失败！")
                        console.log(e)
                }   
        }

        withdrawPrize = async () => {
                try {
			const { web3, contract } = this.state
                        this.setState({
                                isClicking:true
                        })
                        let accounts = await web3.eth.getAccounts()
                        await contract.methods.withdrawPrize().send({
                                from: accounts[0],
                        })
                        this.setState({
                                isClicking:false
                        })
                        alert("退奖成功！")
                        window.location.reload(true)
                }
                catch(e) {
                        this.setState({
                                isClicking:false
                        })
                        alert("退奖失败！")
                        console.log(e)
                }
        }	

	render() {                                                                                                           
                return (
                        <div>
                                <CardExampleCard
                                        address={this.state.address}
                                        currentAccount={this.state.currentAccount}
                                        manager={this.state.manager}
                                        winner={this.state.winner}
                                        round={this.state.round}
                                        playersSlice={this.state.playersSlice}
                                        playersCnt={this.state.playersCnt}
                                        balance={this.state.balance}
                                        play={this.play}
                                        drawPrize={this.drawPrize}
                                        withdrawPrize={this.withdrawPrize}
                                        isClicking={this.state.isClicking}
                                        isShowButton={this.state.isShowButton}
                                        addressWeb={this.state.addressWeb}
                        />
                        </div>
                );
        }

}

export default App;
