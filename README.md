# HLComposer-HLExplorer
Despliegue del HyperledgerExplorer en HyperledgerComposer

```
cd fabric-dev-servers/fabric-scripts/hlfv12/composer/

docker-compose -f docker-compose.yml --build up -d

docker exec peer0.org1.example.com peer channel create -o orderer.example.com:7050 -c composerchannel -f /etc/hyperledger/configtx/composer-channel.tx

docker exec -e "CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/msp/users/Admin@org1.example.com/msp" peer0.org1.example.com peer channel join -b composerchannel.block

cd blockchain-explorer

./deploy_explorer.sh supplychain composer_default



```
