import React from 'react'
import {Card, Image, Statistic, Button} from 'semantic-ui-react'

const CardExampleCard = (props) => (
    <Card>
        <Image src='/images/logo.jpg'/>
        <Card.Content>
            <Card.Header>天天中彩票</Card.Header>
            <Card.Meta>
                <p>合约地址: {props.address}</p>
                <p>管理员地址: {props.manager}</p>
                <p>当前帐号地址: {props.currentAccount}</p>
            </Card.Meta>
            <Card.Description>每晚八点准时开奖, 不见不散!</Card.Description>
        </Card.Content>
        <Card.Content extra>
		<p>上期赢家{props.winner}</p>
        </Card.Content>
        <Card.Content extra>
		<p>{props.playersCnt}人参与</p>
        </Card.Content>

        <Card.Content extra>
            <Statistic color='red'>
                <Statistic.Value>{props.balance}ETH</Statistic.Value>
                <Statistic.Label>奖金池</Statistic.Label>
            </Statistic>
        </Card.Content>

        <Card.Content extra>
            <Statistic color='blue'>
                <Statistic.Value>第{props.round}期</Statistic.Value>
                <a href={props.addressWeb}>点击我查看交易历史</a>
            </Statistic>
        </Card.Content>

	<Button animated='fade' color='orange' onClick={props.play} disabled={props.isClicking}>
		<Button.Content visible>投注</Button.Content>
		<Button.Content hidden>支付1ETH</Button.Content>
	</Button>
	<Button inverted color='green' style={{display:props.isShowButton}} onClick={props.drawPrize} disabled={props.isClicking}>
		开奖
	</Button>
	<Button inverted color='red' style={{display:props.isShowButton}} onClick={props.withdrawPrize} disabled={props.isClicking}>
		退奖
	</Button>

    </Card>
)

export default CardExampleCard
//import  es6

//<a href='https://ropsten.etherscan.io/address/0x006644a6b68047df61c18c84c0bfacc23a642ae9'>点击我查看交易历史</a>
