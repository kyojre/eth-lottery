const path = require("path");
const HDWalletProvider = require("truffle-hdwallet-provider")

module.exports = {
	// See <http://truffleframework.com/docs/advanced/configuration>
	// to customize your Truffle configuration!
	contracts_build_directory: path.join(__dirname, "client/src/contracts"),

	networks: {
		ropsten: {
			provider: function() {
				const mnemonic = 'inject stock easy learn repair fringe damage crawl cruise junior enable remember';
				const endpoint = 'https://ropsten.infura.io/v3/ba7794faf4cd4b27894283a1ded74631';
				return new HDWalletProvider(mnemonic, endpoint);
			},
    			network_id: '3',
		},
  		test: {
			provider: function() {
				const mnemonic = 'improve ripple network feature legal holiday always awkward seek enforce quick drip';
				const endpoint = 'http://127.0.0.1:8545/';
				return new HDWalletProvider(mnemonic, endpoint);
			},
			network_id: '*',
		},
	}
};
